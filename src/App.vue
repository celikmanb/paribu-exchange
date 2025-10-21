<script setup lang="ts">
import HomeView from './views/HomeView.vue';
import { useTheme } from './composables/useTheme';

// Initialize theme - useTheme handles all initialization
useTheme();
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
    <HomeView />
  </div>
</template>

<style scoped>
</style>
