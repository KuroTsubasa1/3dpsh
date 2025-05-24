. <template>
  <section id="etsy" class="etsy-shop">
    <div class="container">
      <div class="etsy-content">
        <div class="etsy-info">
          <h2>Besuchen Sie unseren Etsy Shop</h2>
          <p>
            Entdecken Sie unsere vorgefertigten 3D-Druckprodukte in unserem Etsy Shop. 
            Von dekorativen Objekten bis zu praktischen Alltagsgegenständen - 
            alles mit Liebe zum Detail gefertigt.
          </p>
          <div class="etsy-features">
            <div class="etsy-feature">
              <span class="feature-icon">✓</span>
              <span>Sofort lieferbare Produkte</span>
            </div>
            <div class="etsy-feature">
              <span class="feature-icon">✓</span>
              <span>Sichere Bezahlung über Etsy</span>
            </div>
            <div class="etsy-feature">
              <span class="feature-icon">✓</span>
              <span>Weltweiter Versand</span>
            </div>
            <div class="etsy-feature">
              <span class="feature-icon">✓</span>
              <span>Kundenbewertungen</span>
            </div>
          </div>
          <a href="https://www.etsy.com/de-en/shop/3DPrintShopHarm" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn btn-primary etsy-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24" fill="currentColor" style="vertical-align: middle; margin-right: 0.5rem;">
              <path d="M384 348c-1.8 10.8-13.8 110-15.5 132-117.9-4.3-219.9-4.7-368.5 0v-25.5c45.5-8.9 60.6-8 61-35.3 1.8-72.3 3.5-244.1 0-322-1-28.5-12.1-26.8-61-36v-25.5c73.9 2.4 255.9 8.6 363-3.8-3.5 38.3-7.8 126.5-7.8 126.5H332C320.9 115.7 313.2 68 277.3 68h-137c-10.3 0-10.8 3.5-10.8 9.8V241.5c58 .5 88.5-2.5 88.5-2.5 29.8-1 27.6-8.5 40.8-65.3h25.8c-4.4 101.4-3.9 61.8-1.8 160.3H257c-9.2-40.1-9.1-61-39.5-61.5 0 0-21.5-2-88-2v139c0 26 14.3 38.3 44.3 38.3H263c63.6 0 66.6-25 98.8-99.8H384z"/>
            </svg>
            Zum Etsy Shop
          </a>
        </div>
        <div class="etsy-image">
          <div class="etsy-logo-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="200" height="200" fill="#F1641E">
              <path d="M384 348c-1.8 10.8-13.8 110-15.5 132-117.9-4.3-219.9-4.7-368.5 0v-25.5c45.5-8.9 60.6-8 61-35.3 1.8-72.3 3.5-244.1 0-322-1-28.5-12.1-26.8-61-36v-25.5c73.9 2.4 255.9 8.6 363-3.8-3.5 38.3-7.8 126.5-7.8 126.5H332C320.9 115.7 313.2 68 277.3 68h-137c-10.3 0-10.8 3.5-10.8 9.8V241.5c58 .5 88.5-2.5 88.5-2.5 29.8-1 27.6-8.5 40.8-65.3h25.8c-4.4 101.4-3.9 61.8-1.8 160.3H257c-9.2-40.1-9.1-61-39.5-61.5 0 0-21.5-2-88-2v139c0 26 14.3 38.3 44.3 38.3H263c63.6 0 66.6-25 98.8-99.8H384z"/>
            </svg>
            <p class="etsy-tagline">Handgemacht mit Liebe</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.etsy-shop {
  background-color: var(--gray-100);
  padding: 5rem 0;
}

.etsy-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.etsy-info h2 {
  color: var(--text-dark);
  margin-bottom: 1.5rem;
}

.etsy-info p {
  color: var(--gray-600);
  font-size: 1.125rem;
  margin-bottom: 2rem;
  line-height: 1.8;
}

.etsy-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.etsy-feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.etsy-feature .feature-icon {
  color: var(--primary-color);
  font-size: 1.25rem;
  font-weight: bold;
}

.etsy-btn {
  display: inline-flex;
  align-items: center;
}

.etsy-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.etsy-logo-container {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
}

.etsy-tagline {
  margin-top: 1rem;
  color: var(--gray-600);
  font-style: italic;
}

@media (max-width: 768px) {
  .etsy-content {
    grid-template-columns: 1fr;
  }
  
  .etsy-features {
    grid-template-columns: 1fr;
  }
}
</style>