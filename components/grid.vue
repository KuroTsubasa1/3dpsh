<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  },
  columns: {
    type: Number,
    default: 3
  }
});
</script>

<template>
  <section>
    <h2 v-if="title">{{ title }}</h2>
    <div class="grid" :style="{ '--columns': columns }">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 48px 0;
}

h2 {
  margin-bottom: 32px;
  font-size: 32px;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: 24px;
}

@media (max-width: 991px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  h2 {
    font-size: 24px;
  }
}
</style>