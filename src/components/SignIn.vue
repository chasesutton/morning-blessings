<template>
    <v-container>
      <v-form @submit.prevent="signInUser">
        <v-text-field
          v-model="email"
          label="Email"
          required
          :error-messages="emailErrors"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          required
          :error-messages="passwordErrors"
          append-icon="mdi-eye"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-btn type="submit" color="primary">Sign In</v-btn>
        <v-alert v-if="error" type="error" dismissible>{{ error }}</v-alert>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const email = ref('');
      const password = ref('');
      const showPassword = ref(false);
      const error = ref('');
      const emailErrors = ref([]);
      const passwordErrors = ref([]);
      const router = useRouter();
      const auth = getAuth();
  
      const validateEmail = () => {
        emailErrors.value = [];
        if (!email.value) {
          emailErrors.value.push("Email is required.");
        }
      };
  
      const validatePassword = () => {
        passwordErrors.value = [];
        if (!password.value) {
          passwordErrors.value.push("Password is required.");
        }
      };
  
      const signInUser = async () => {
        validateEmail();
        validatePassword();
        if (emailErrors.value.length > 0 || passwordErrors.value.length > 0) {
          return;
        }
        try {
          await signInWithEmailAndPassword(auth, email.value, password.value);
          router.push('/');
        } catch (err) {
          error.value = "Error signing in: " + err.message;
        }
      };
  
      return { email, password, showPassword, signInUser, error, emailErrors, passwordErrors };
    },
  };
  </script>
  