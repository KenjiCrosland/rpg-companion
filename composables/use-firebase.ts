import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

export const sayFoo =  async () => { 
    console.log('foo');
};

export const createUser = async (email, password) => {
    const { $auth } = useNuxtApp();
  const userCredentials = await createUserWithEmailAndPassword(
    $auth,
    email,
    password,
  ).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { errorCode, errorMessage};
  });
  return userCredentials;
};

export const signInUser = async (email, password) => {
    const { $auth } = useNuxtApp();
  const userCredentials = await signInWithEmailAndPassword(
    $auth,
    email,
    password,
  ).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  return userCredentials;
};

export const initUser = async () => {
    const { $auth } = useNuxtApp();
  onAuthStateChanged($auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(user);
    } else {
      // User is signed out
      // ...
    }
  });
};
