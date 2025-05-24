<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="card">
    <img v-if="image" :src="image" :alt="title" />
    <div class="card-header">{{ title }}</div>
    <div class="card-body">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-header {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-color);
}

.card-body {
  font-size: 16px;
  line-height: 1.5;
  flex-grow: 1;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 16px;
}
</style>