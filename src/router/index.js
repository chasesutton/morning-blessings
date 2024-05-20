import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from 'firebase/auth';
import Home from '@/components/Home.vue';
import UserProfile from '@/components/UserProfile.vue';
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/components/SignUp.vue';
import ChatPage from '@/components/ChatPage.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/profile', name: 'Profile', component: UserProfile, meta: { requiresAuth: true } },
  { path: '/signin', name: 'SignIn', component: SignIn },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/chat', name: 'Chat', component: ChatPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (to.meta.requiresAuth && !user) {
    next('/signin');
  } else {
    next();
  }
});

export default router;
