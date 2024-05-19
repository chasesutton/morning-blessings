<template>
    <v-btn @click="signOut" color="primary">Sign Out</v-btn>
  </template>
  
  <script>
  import { getAuth, signOut as firebaseSignOut } from "firebase/auth";
  
  export default {
    setup() {
      const signOut = async () => {
        const auth = getAuth();
        await firebaseSignOut(auth);
      };
  
      return {
        signOut,
      };
    },
  };
  </script>
  