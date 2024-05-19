<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1>Welcome to Your Vue.js App</h1>
          <p>
            This is the home page. Use the navigation links below to explore the
            app.
          </p>
          <v-btn color="primary" @click="$router.push('/signup')"
            >Sign Up</v-btn
          >
          <v-btn color="secondary" @click="$router.push('/chat')"
            >Go to Chat</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
