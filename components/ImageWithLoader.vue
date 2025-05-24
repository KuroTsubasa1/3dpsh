<template>
  <div class="image-with-loader-container">
    <div v-if="!loaded" class="image-skeleton"></div>
    <img
      :src="src"
      :alt="alt"
      @load="onImageLoad"
      @error="onImageError"
      :class="{ 'loaded': loaded, 'error': error }"
      class="lazy-image"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  src: string
  alt: string
}

const props = defineProps<Props>()
const loaded = ref(false)
const error = ref(false)

const onImageLoad = () => {
  loaded.value = true
  error.value = false
}

const onImageError = () => {
  loaded.value = true
  error.value = true
}
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  overflow: hidden;
  background-color: var(--gray-100);
}

.image-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    var(--gray-100) 25%, 
    var(--gray-200) 50%, 
    var(--gray-100) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.lazy-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lazy-image.loaded {
  opacity: 1;
}

.lazy-image.error {
  opacity: 0.3;
}
</style>