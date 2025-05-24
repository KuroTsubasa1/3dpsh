<template>
  <section id="contact" class="contact">
    <div class="container">
      <div class="section-title">
        <h2>Kontakt</h2>
        <p>Lassen Sie uns gemeinsam Ihre Ideen verwirklichen</p>
      </div>
      
      <div class="contact-content">
        <div class="contact-form">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                class="form-control"
                required
                v-model="formData.name"
              >
            </div>
            
            <div class="form-group">
              <label for="email">E-Mail</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                class="form-control"
                required
                v-model="formData.email"
              >
            </div>
            
            <div class="form-group">
              <label for="message">Nachricht</label>
              <textarea 
                id="message" 
                name="message" 
                class="form-control" 
                rows="5"
                required
                v-model="formData.message"
              ></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? 'Wird gesendet...' : 'Nachricht senden' }}
            </button>
          </form>
        </div>
        
        <div class="contact-info">
          <h3>Kontaktinformationen</h3>
          
          <div class="info-item">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div>
              <h4>Adresse</h4>
              <p>
                <a href="https://www.google.de/maps/place/3D+Print+Shop+Harm/@54.1538495,10.6175128,79m/data=!3m1!1e3!4m6!3m5!1s0x47b265dadcb1e789:0xbb5e5e21264bb07a!8m2!3d54.1539146!4d10.6172643!16s%2Fg%2F11vbqwxhfb?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="address-link">
                  3D Print Shop Harm<br>
                  Standort auf Google Maps anzeigen
                </a>
              </p>
            </div>
          </div>
          
          <div class="info-item">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
            <div>
              <h4>Telefon</h4>
              <p>+49 (0) 123 456789</p>
            </div>
          </div>
          
          <div class="info-item">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <div>
              <h4>E-Mail</h4>
              <p>info@3dprintshopharm.de</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Google Maps Embed -->
      <div class="map-container">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d315.9090741582566!2d10.617264!3d54.1539146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b265dadcb1e789%3A0xbb5e5e21264bb07a!2s3D%20Print%20Shop%20Harm!5e0!3m2!1sde!2sde!4v1698765432100!5m2!1sde!2sde"
          width="100%"
          height="400"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="3D Print Shop Harm Location">
        </iframe>
      </div>
    </div>
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

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // Using the exact endpoint and format from the original code
    const data = {
      msg: formData.value.message,
      sender: formData.value.email,
      name: formData.value.name
    }
    
    const response = await fetch('https://pocket.lasseharm.space/form/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response.status === 200) {
      alert('Nachricht erfolgreich gesendet!')
      
      // Reset form
      formData.value = {
        name: '',
        email: '',
        message: ''
      }
    } else {
      alert('Fehler beim Senden der Nachricht. Bitte überprüfen Sie Ihre Eingaben.')
    }
  } catch (error) {
    console.error('Form submission error:', error)
    alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.')
  } finally {
    isSubmitting.value = false
  }
}
</script>