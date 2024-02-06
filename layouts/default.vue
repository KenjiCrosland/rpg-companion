<template>
    <div>
        <header>
            <ul>
                <li><nuxt-link to="/about">About</nuxt-link></li>
                <li class="loginBtn" style="float: right">
                    <nuxt-link to="/login">Login</nuxt-link>
                </li>
            </ul>
        </header>
        <div class="mainContent">
            <NuxtPage />
            <button @click="testFirebase">Test Firebase</button> <!-- Added button -->
        </div>
        <footer>
            <h1>Footer</h1>
        </footer>
    </div>
</template>

<script lang="ts" setup>
const testFirebase = async () => {
    const email = 'ks@cross.land';
    const password = '123asdas456';
    const credentials = await createUser(email, password);
    console.log("Credentials", credentials);
};
</script>

  