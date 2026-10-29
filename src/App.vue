<script setup lang="ts">
import { watchEffect } from "vue";
import { useLanguage } from "@/composables/useLanguage";

const { language } = useLanguage();

// Keep the <html lang="..."> attribute in sync with the displayed language.
watchEffect(() => {
  document.documentElement.lang = language.value;
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
