<template>
  <section id="home" class="hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="fade-in-up">Willkommen bei 3D Print Shop Harm</h1>
        <p class="fade-in-up">Ihre innovative Lösung für professionellen 3D-Druck in höchster Qualität</p>
        <div class="hero-buttons">
          <a href="#services" class="btn btn-primary">Unsere Leistungen</a>
          <a href="#contact" class="btn btn-secondary">Jetzt anfragen</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  animation: fadeInUp 0.8s ease 0.4s;
  animation-fill-mode: both;
}

@media (max-width: 768px) {
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-buttons .btn {
    width: 100%;
    max-width: 250px;
  }
}
</style>