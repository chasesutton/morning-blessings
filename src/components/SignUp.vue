<template>
    <v-container>
      <v-form @submit.prevent="signUpUser">
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
        <v-btn type="submit" color="primary">Sign Up</v-btn>
        <v-alert v-if="error" type="error" dismissible>{{ error }}</v-alert>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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
        if (password.value.length < 6) {
          passwordErrors.value.push("Password must be at least 6 characters.");
        }
      };
  
      const signUpUser = async () => {
        validateEmail();
        validatePassword();
        if (emailErrors.value.length > 0 || passwordErrors.value.length > 0) {
          return;
        }
        try {
          await createUserWithEmailAndPassword(auth, email.value, password.value);
          router.push('/');
        } catch (err) {
          error.value = "Error signing up: " + err.message;
        }
      };
  
      return { email, password, showPassword, signUpUser, error, emailErrors, passwordErrors };
    },
  };
  </script>  
  
  <style scoped>
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  v-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  v-btn {
    margin-top: 20px;
  }
  </style>
  