<script setup>
useHead({
  title: "Todo List",
});
</script>

<template>
  <nuxt-layout>
    <v-app style="max-width: 800px; margin: 0 auto; background: whitesmoke; border-radius: 10px">
      <nuxt-loading-indicator />
      <nuxt-page />
    </v-app>
  </nuxt-layout>
</template>
