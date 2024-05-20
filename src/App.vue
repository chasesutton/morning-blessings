<template>
  <div id="app">
    <v-app>
      <v-app-bar v-if="!isAuthRoute" app color="primary" dark>
        <v-toolbar-title>My App</v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="user">
          <span>Welcome, {{ user.email }}</span>
          <v-btn icon @click="goToProfile">
            <v-icon>mdi-account</v-icon>
          </v-btn>
          <v-btn icon @click="signOutUser">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
        <div v-else>
          <router-link to="/signin">Sign In</router-link>
          <router-link to="/signup">Sign Up</router-link>
        </div>
      </v-app-bar>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const user = ref(null);
    const auth = getAuth();
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser;
      });
    });

    const signOutUser = () => {
      signOut(auth).then(() => {
        router.push('/signin');
      }).catch((error) => {
        console.error("Error signing out:", error);
      });
    };

    const goToProfile = () => {
      router.push('/profile');
    };

    const isAuthRoute = computed(() => {
      return route.path === '/signin' || route.path === '/signup';
    });

    return { user, signOutUser, goToProfile, isAuthRoute };
  },
};
</script>
