<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h1>Chat with Abraham Hicks</h1>
          <v-card>
            <v-card-text>
              <v-list>
                <v-list-item v-for="message in chatStore.messages" :key="message.id" :class="{ 'user-message': message.user, 'bot-message': !message.user }">
                  <v-list-item-content>
                    <v-list-item-title>{{ message.text }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
            </v-card-text>
          </v-card>
          <v-text-field v-model="newMessage" @keyup.enter="sendMessage" label="Type a message..."></v-text-field>
          <v-btn @click="sendMessage" color="primary">Send</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
// Import the functions you need from the SDKs you need
import { ref } from "vue";
import { useChatStore } from "@/stores/chat";
import { getFunctions, httpsCallable } from "firebase/functions";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import axios from "axios";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEddBUOO0_0SFDDNF-I3fAAO7C_k6qDdI",
  authDomain: "morning-blessings.firebaseapp.com",
  projectId: "morning-blessings",
  storageBucket: "morning-blessings.appspot.com",
  messagingSenderId: "32135850629",
  appId: "1:32135850629:web:df660c49c833f0e73697ec",
  measurementId: "G-5BS50EFWM1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const functions = getFunctions(app);
const getBotResponse = httpsCallable(functions, "getBotResponse");

export default {
  setup() {
    const chatStore = useChatStore();
    const newMessage = ref("");

    const sendMessage = async () => {
      if (!newMessage.value.trim()) return;

      chatStore.addMessage({
        id: chatStore.messages.length + 1,
        text: newMessage.value,
        user: true,
      });

      try {
        const response = await axios.post(
          "https://us-central1-morning-blessings.cloudfunctions.net/getBotResponse",
          { message: newMessage.value },
          {
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
        chatStore.addMessage({
          id: chatStore.messages.length + 2,
          text: response.data.text,
          user: false,
        });
      } catch (error) {
        console.error("Error sending message:", error);
        chatStore.addMessage({
          id: chatStore.messages.length + 2,
          text: "Error getting response from chatbot.",
          user: false,
        });
      }

      newMessage.value = ""; // Clear input field
    };

    return {
      chatStore,
      newMessage,
      sendMessage,
    };
  },
};
</script>

<style scoped>
.user-message {
  text-align: right;
  color: blue;
}

.bot-message {
  text-align: left;
  color: green;
}
</style>