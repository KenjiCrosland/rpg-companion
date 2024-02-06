import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();
  console.log('THE KEY', config.firebaseApiKey);

  const firebaseConfig = {
    apiKey: process.env.NUXT_FIREBASE_API_KEY,
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const firestore = getFirestore(app);

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);

  nuxtApp.vueApp.provide('firestore', firestore);
  nuxtApp.provide('firestore', firestore);
});
