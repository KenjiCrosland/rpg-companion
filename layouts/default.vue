<template>
    <div>
        <header>
            <ul>
                <li><nuxt-link to="/">Home</nuxt-link></li>
                <li><nuxt-link to="/about">About</nuxt-link></li>
                <li v-if="!authenticated" class="loginBtn" style="float: right">
                    <nuxt-link to="/login">Login</nuxt-link>
                </li>
                <li v-if="authenticated" class="loginBtn" style="float: right">
                    <nuxt-link @click="logout">Logout</nuxt-link>
                </li>
            </ul>
        </header>
        <div class="mainContent">
            <NuxtPage />
        </div>
        <footer>
            <h1>Footer</h1>
        </footer>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '../store/auth'; // import the auth store we just created
import { useRouter } from 'vue-router'; // import useRouter function from vue-router package

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
    logUserOut();
    router.push('/login');
};
</script>

  