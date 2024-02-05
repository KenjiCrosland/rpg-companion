<template>
    <div>
        <h1>OAuth Redirect Page</h1>
        <p>Redirecting...</p>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from '#imports';
const route = useRoute();
const code = route.query.code;
console.log("ROUTE", route);
console.log("CODE", route.query.code);
console.log("PATH", route.fullPath);
const { data } = await useFetch('/patreon-oauth', {
    query: { 'code': code }
})
console.log("DA DATA:", data);

</script>

<style scoped></style>
