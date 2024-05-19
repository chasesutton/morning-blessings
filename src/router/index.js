import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Home from '@/views/Home.vue';
import UserProfile from '@/components/UserProfile.vue';
import ChatPage from '@/components/ChatPage.vue'; // Import ChatPage
import SignUp from '@/components/SignUp.vue'; // Import SignUp
import SignIn from '@/components/SignIn.vue'; // Import SignIn

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  {
    path: '/chat',
    name: 'Chat',
    component: ChatPage,
    meta: { requiresAuth: true }, // Assuming chat also requires authentication
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
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
  } else if (to.meta.requiresRole) {
    const userRoleDoc = await getDoc(doc(db, 'roles', user.uid));
    if (userRoleDoc.exists() && userRoleDoc.data().role === to.meta.requiresRole) {
      next();
    } else {
      next('/unauthorized');
    }
  } else {
    next();
  }
});

export default router;
