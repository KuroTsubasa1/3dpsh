<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="card">
    <img v-if="image" :src="image" :alt="title">
    <div class="card-header">{{ title }}</div>
    <div class="card-body">
      <h4 v-if="content && content.includes(':')">{{ content.split(':')[0] + ':' }}</h4>
      <slot>
        <p v-if="content">{{ content.includes(':') ? content.split(':').slice(1).join(':').trim() : content }}</p>
      </slot>
    </div>
  </div>
</template>