<script setup>
useHead({
  title: "Todo List",
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" }],
});

const isOnline = offlineStore();
</script>

<template>
  <nuxt-layout>
    <v-app class="app-container safe-area">
      <template v-if="isOnline">
        <nuxt-loading-indicator />
        <nuxt-page />
      </template>
      <template v-else>
        <div class="d-flex align-center justify-center flex-column ga-2" style="height: 80dvh">
          <v-progress-circular :size="70" :width="7" color="primary" indeterminate />
          <p>No internet</p>
        </div>
      </template>
    </v-app>
  </nuxt-layout>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  background: whitesmoke;
  border-radius: 10px;
}

.safe-area {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
</style>
