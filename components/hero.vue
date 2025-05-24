<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Welcome to 3D Print Shop Harm'
  },
  subtitle: {
    type: String,
    default: 'Your Ultimate Destination for Customized 3D Printing Solutions!'
  },
  buttonText: {
    type: String,
    default: '🌟 Discover the Magic of 3D Printing with Us! 🌟'
  },
  buttonLink: {
    type: String,
    default: '#'
  }
});
</script>

<template>
  <section class="hero">
    <div class="hero-content">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
      <a :href="buttonLink" class="btn btn-primary">{{ buttonText }}</a>
    </div>
  </section>
</template>

<style scoped>
:root {
  --primary-color: #1B998B;
  --secondary-color: #F46036;
  --background-color: #282C34;
  --text-color: #F0F0F0;
  --accent-color: #E8C547;
}

.hero {
  background-color: var(--primary-color);
  color: #ffffff;
  padding: 60px 0;
  margin: 48px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
}

p {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 32px;
}

.btn {
  display: inline-block;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  padding: 12px 24px;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 4px;
  text-decoration: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.btn-primary {
  background-image: linear-gradient(135deg, #1B998B, #147C7A);
  color: #ffffff;
}

.btn-primary:hover {
  background-image: linear-gradient(135deg, #0F6A67, #0D554F);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 767px) {
  h1 {
    font-size: 30px;
  }
  
  p {
    font-size: 20px;
  }
  
  .hero {
    padding: 40px 0;
  }
}
</style>