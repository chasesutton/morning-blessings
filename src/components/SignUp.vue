<!-- src/components/SignUp.vue -->
<template>
  <div>
    <h1>Sign Up</h1>
    <v-text-field v-model="email" label="Email" type="email"></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      type="password"
    ></v-text-field>
    <v-btn @click="signUp" color="primary">Sign Up</v-btn>
  </div>
</template>

<script>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const auth = getAuth();

    const signUp = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        alert("Sign-up successful!");
      } catch (error) {
        console.error(error);
        alert("Error signing up.");
      }
    };

    return {
      email,
      password,
      signUp,
    };
  },
};
</script>

<style scoped>
/* Add custom styles here */
</style>
