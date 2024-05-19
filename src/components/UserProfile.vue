<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h1>User Profile</h1>
          <v-form @submit.prevent="updateProfile">
            <v-text-field
              v-model="name"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="Email"
              required
              disabled
            ></v-text-field>
            <v-btn type="submit" color="primary">Update Profile</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { getAuth } from "firebase/auth";
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { db } from "@/firebase";
  
  export default {
    setup() {
      const auth = getAuth();
      const user = ref(null);
      const name = ref("");
      const email = ref("");
  
      const loadUserProfile = async () => {
        const userProfile = await getDoc(doc(db, "users", user.value.uid));
        if (userProfile.exists()) {
          const data = userProfile.data();
          name.value = data.name || "";
          email.value = user.value.email;
        }
      };
  
      const updateProfile = async () => {
        if (!user.value) return;
  
        await setDoc(doc(db, "users", user.value.uid), {
          name: name.value,
          email: user.value.email,
        });
      };
  
      onMounted(() => {
        auth.onAuthStateChanged((currentUser) => {
          if (currentUser) {
            user.value = currentUser;
            loadUserProfile();
          }
        });
      });
  
      return {
        name,
        email,
        updateProfile,
      };
    },
  };
  </script>
  