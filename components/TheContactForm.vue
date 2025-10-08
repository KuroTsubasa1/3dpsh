<template>
  <section class="contact">
    <h2>Contact Us</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group form-col">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="formData.name" name="name" class="form-control" required>
        </div>
        <div class="form-group form-col">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="formData.email" name="email" class="form-control" required>
        </div>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" v-model="formData.message" name="message" class="form-control" rows="5" required></textarea>
      </div>
      <div v-if="statusMessage" :class="['status-message', statusMessage.type]">
        {{ statusMessage.text }}
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          {{ isSubmitting ? 'Sending...' : 'Submit' }}
        </button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const statusMessage = ref<{ type: 'success' | 'error', text: string } | null>(null)

const handleSubmit = async () => {
  isSubmitting.value = true
  statusMessage.value = null

  try {
    // For now, we'll just simulate a successful submission
    // In production, you would send this to your backend API
    await new Promise(resolve => setTimeout(resolve, 1000))

    // You can replace this with actual API call:
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData.value)
    // })

    statusMessage.value = {
      type: 'success',
      text: 'Thank you for your message! We will get back to you soon.'
    }

    // Clear form
    formData.value = {
      name: '',
      email: '',
      message: ''
    }
  } catch (error) {
    statusMessage.value = {
      type: 'error',
      text: 'Sorry, there was an error sending your message. Please try again later.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 40px;
  margin: 40px 0;
}

.contact form {
  max-width: 800px;
  margin: 0 auto;
}

.form-control {
  padding: 12px;
  font-size: 16px;
}

.contact h2 {
  color: var(--accent-color);
}

@media (max-width: 768px) {
  .contact {
    padding: 20px;
  }

  .form-row {
    flex-direction: column;
  }

  .form-col {
    width: 100%;
    margin-right: 0;
  }
}

.status-message {
  padding: 12px;
  border-radius: 6px;
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
}

.status-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>