<template>
    <div>
        <h1>About Page</h1>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from '#imports';
const route = useRoute();
console.log("ROUTE", route);
console.log("PATH", route.fullPath);
</script>
