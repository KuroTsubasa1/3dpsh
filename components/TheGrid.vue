<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  }
});

// Convert the title to a css class (e.g. "Our Services" -> "services")
const sectionClass = computed(() => {
  return props.title.toLowerCase().replace(/\s+/g, '-');
});
</script>

<template>
  <section :class="sectionClass">
    <h2>{{ title }}</h2>
    <div class="grid">
      <slot></slot>
    </div>
  </section>
</template>