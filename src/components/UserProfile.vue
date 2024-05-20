<template>
    <v-container>
      <h1>User Profile</h1>
      <v-card>
        <v-card-text>
          <p><strong>Email:</strong> {{ user?.email }}</p>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  
  export default {
    setup() {
      const user = ref(null);
      const auth = getAuth();
  
      onMounted(() => {
        onAuthStateChanged(auth, (currentUser) => {
          user.value = currentUser;
        });
      });
  
      return { user };
    },
  };
  </script>
  