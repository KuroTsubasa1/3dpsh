<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const message = ref('');
const submitted = ref(false);
const error = ref('');

const submitForm = () => {
  // Form validation
  if (!name.value || !email.value || !message.value) {
    error.value = 'Please fill out all fields';
    return;
  }
  
  // Reset error
  error.value = '';
  
  // In a real app, you would send the form data to a server here
  console.log('Form submitted', { name: name.value, email: email.value, message: message.value });
  
  // Show success message
  submitted.value = true;
  
  // Reset form
  name.value = '';
  email.value = '';
  message.value = '';
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    submitted.value = false;
  }, 5000);
};
</script>

<template>
  <section class="contact">
    <h2>Contact Us</h2>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="submitted" class="alert alert-success">
      Thank you for your message! We'll get back to you soon.
    </div>
    <form @submit.prevent="submitForm">
      <div class="form-row">
        <div class="form-group form-col">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name" class="form-control">
        </div>
        <div class="form-group form-col">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" class="form-control">
        </div>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" v-model="message" class="form-control" rows="5"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>
</template>

<style scoped>
.contact {
  padding: 48px 0;
}

h2 {
  margin-bottom: 32px;
  font-size: 32px;
  text-align: center;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.form-col {
  flex: 1;
}

.form-group {
  width: 100%;
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
}

input[type="text"],
input[type="email"],
textarea {
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 16px;
  line-height: 1.5;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

input[type="text"]:focus,
input[type="email"]:focus,
textarea:focus {
  outline: none;
  border-color: var(--primary-color);
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
  border: none;
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

.alert {
  padding: 16px;
  margin-bottom: 24px;
  border-radius: 4px;
  font-weight: 600;
  position: relative;
}

.alert-success {
  background-color: rgba(39, 174, 96, 0.1);
  border: 1px solid #27ae60;
  color: #27ae60;
}

.alert-danger {
  background-color: rgba(231, 76, 60, 0.1);
  border: 1px solid #e74c3c;
  color: #e74c3c;
}

@media (max-width: 768px) {
  .form-col {
    flex: none;
    width: 100%;
  }
  
  h2 {
    font-size: 24px;
  }
}
</style>