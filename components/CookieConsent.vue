<template>
  <div v-if="showBanner" class="cookie-consent">
    <div class="cookie-content">
      <div class="cookie-text">
        <h4>🍪 Cookie-Einstellungen</h4>
        <p>
          Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. 
          Durch die weitere Nutzung dieser Website stimmen Sie unserer Verwendung von Cookies zu.
        </p>
      </div>
      <div class="cookie-actions">
        <button @click="acceptAll" class="btn btn-primary">Alle akzeptieren</button>
        <button @click="acceptEssential" class="btn btn-secondary">Nur notwendige</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showBanner = ref(false)

onMounted(() => {
  // Check if user has already made a cookie choice
  const cookieConsent = localStorage.getItem('cookieConsent')
  if (!cookieConsent) {
    showBanner.value = true
  }
})

const acceptAll = () => {
  localStorage.setItem('cookieConsent', 'all')
  localStorage.setItem('cookieConsentDate', new Date().toISOString())
  showBanner.value = false
  // Here you would initialize analytics, marketing cookies, etc.
}

const acceptEssential = () => {
  localStorage.setItem('cookieConsent', 'essential')
  localStorage.setItem('cookieConsentDate', new Date().toISOString())
  showBanner.value = false
  // Only essential cookies, no analytics
}
</script>

<style scoped>
.cookie-consent {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: slideUp 0.3s ease;
}

.cookie-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.cookie-text h4 {
  margin: 0 0 0.5rem 0;
  color: var(--gray-900);
  font-size: 1.1rem;
}

.cookie-text p {
  margin: 0;
  color: var(--gray-600);
  font-size: 0.95rem;
}

.cookie-actions {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

.cookie-actions .btn {
  white-space: nowrap;
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
}

.btn-secondary {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-secondary:hover {
  background: var(--primary-color);
  color: white;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .cookie-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .cookie-actions {
    width: 100%;
    flex-direction: column;
  }
  
  .cookie-actions .btn {
    width: 100%;
  }
}
</style>