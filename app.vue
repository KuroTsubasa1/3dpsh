<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <WhatsAppButton />
      <CookieConsent />
      <BackToTop />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
</script>