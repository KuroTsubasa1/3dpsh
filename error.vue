<template>
  <div class="error-page">
    <div class="container">
      <div class="error-content">
        <h1>404</h1>
        <h2>Seite nicht gefunden</h2>
        <p>Die von Ihnen gesuchte Seite existiert leider nicht.</p>
        <NuxtLink to="/" class="btn btn-primary">Zurück zur Startseite</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: '404 - Seite nicht gefunden | 3D Print Shop Harm',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--gray-50);
  padding: 2rem;
}

.error-content {
  text-align: center;
}

.error-content h1 {
  font-size: 6rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 800;
}

.error-content h2 {
  font-size: 2rem;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

.error-content p {
  font-size: 1.125rem;
  color: var(--gray-600);
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .error-content h1 {
    font-size: 4rem;
  }
  
  .error-content h2 {
    font-size: 1.5rem;
  }
}
</style>