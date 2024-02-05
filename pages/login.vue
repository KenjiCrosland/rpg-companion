<template>
    <div>
        <div class="title">
            <h2>Login</h2>
        </div>
        <div>
            <label for="uname"><b>Username</b></label>
            <input v-model="user.username" type="text" name="uname" required />

            <label for="psw"><b>Password</b></label>
            <input v-model="user.password" type="password" name="psw" required />

            <button @click.prevent="login" class="button">Login</button>
            <button @click="loginWithPatreon">Log in with Patreon</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created
const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const user = ref({
    username: 'kminchelle',
    password: '0lelplR',
});
const router = useRouter();

const login = async () => {
    await authenticateUser(user.value); // call authenticateUser and pass the user object
    // redirect to homepage if user is authenticated
    if (authenticated.value) {
        router.push('/');
    }
};

const loginWithPatreon = () => {
  const clientId = 'WX2xQlmUVgr6euAVbA8MczBAlFMcjGc5CUGwD7xW2RfZf2ah1zzcSMZOvs9ZE98d';
  const redirectUri = encodeURIComponent('http://localhost:3000/oauth')

  const authUrl = `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=identity%20identity%5Bemail%5D`

  window.location.href = authUrl
}
</script>
  