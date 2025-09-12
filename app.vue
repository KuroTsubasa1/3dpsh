<template>
  <div id="app">
    <NuxtPage />
    <ClientOnly>
      <WhatsAppButton />
      <CookieConsent />
      <BackToTop />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
</script>