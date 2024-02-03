<template>
    <div>
        <h1>Welcome to my Vue app!</h1>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth' // this should match the name of the file inside the middleware directory 
})
</script>

<style scoped>
/* Your styles go here */
</style>
