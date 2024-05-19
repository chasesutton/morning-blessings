<style scoped>
/* Add custom styles here */
</style>
<!-- src/components/SignIn.vue -->
<template>
  <div>
    <h1>Sign In</h1>
    <v-text-field v-model="email" label="Email" type="email"></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      type="password"
    ></v-text-field>
    <v-btn @click="signIn" color="primary">Sign In</v-btn>
  </div>
</template>

<script>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "SignIn",
  setup() {
    const email = ref("");
    const password = ref("");
    const auth = getAuth();

    const signIn = async () => {
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        alert("Sign-in successful!");
      } catch (error) {
        console.error(error);
        alert("Error signing in.");
      }
    };

    return {
      email,
      password,
      signIn,
    };
  },
};
</script>

<style scoped>
/* Add custom styles here */
</style>
