<template>
    <button @click="signOut">Sign Out</button>
  </template>
  
  <script>
  import { getAuth, signOut } from 'firebase/auth';
  
  export default {
    setup() {
      const signOutUser = async () => {
        const auth = getAuth();
        try {
          await signOut(auth);
          alert('Sign Out Successful');
        } catch (error) {
          console.error('Sign Out Error:', error);
          alert('Sign Out Failed');
        }
      };
  
      return { signOut: signOutUser };
    },
  };
  </script>
  