<template>
  <section id="testimonials" class="testimonials">
    <div class="container">
      <div class="section-title">
        <h2>Kundenstimmen</h2>
        <p>Was unsere zufriedenen Kunden über uns sagen</p>
      </div>
      
      <div class="testimonials-grid">
        <div class="testimonial-card">
          <div class="stars">
            <span v-for="i in 5" :key="i">⭐</span>
          </div>
          <p class="testimonial-text">
            "Hervorragende Qualität und super schnelle Lieferung! Mein Cosplay-Helm wurde perfekt umgesetzt. Die Kommunikation war erstklassig und alle meine Wünsche wurden berücksichtigt."
          </p>
          <div class="testimonial-author">
            <strong>Marco S.</strong>
            <span>Cosplay-Enthusiast</span>
          </div>
        </div>
        
        <div class="testimonial-card">
          <div class="stars">
            <span v-for="i in 5" :key="i">⭐</span>
          </div>
          <p class="testimonial-text">
            "Als Kleinunternehmer bin ich auf schnelle Prototypen angewiesen. 3D Print Shop Harm liefert konstant hochwertige Ergebnisse zu fairen Preisen. Absolut empfehlenswert!"
          </p>
          <div class="testimonial-author">
            <strong>Sarah K.</strong>
            <span>Produktdesignerin</span>
          </div>
        </div>
        
        <div class="testimonial-card">
          <div class="stars">
            <span v-for="i in 5" :key="i">⭐</span>
          </div>
          <p class="testimonial-text">
            "Die CAD-Modellierung war perfekt! Aus meiner groben Skizze wurde ein professionelles 3D-Modell. Der Druck war makellos. Vielen Dank für die tolle Arbeit!"
          </p>
          <div class="testimonial-author">
            <strong>Thomas H.</strong>
            <span>Hobby-Erfinder</span>
          </div>
        </div>
        
        <div class="testimonial-card">
          <div class="stars">
            <span v-for="i in 5" :key="i">⭐</span>
          </div>
          <p class="testimonial-text">
            "Für unser Tabletop-Spiel haben wir mehrere Miniaturen drucken lassen. Die Details sind unglaublich! Jede Figur ist ein kleines Kunstwerk. Gerne wieder!"
          </p>
          <div class="testimonial-author">
            <strong>Gaming Club Eutin</strong>
            <span>Tabletop-Verein</span>
          </div>
        </div>
        
        <div class="testimonial-card">
          <div class="stars">
            <span v-for="i in 5" :key="i">⭐</span>
          </div>
          <p class="testimonial-text">
            "Schnell, zuverlässig und immer erreichbar. Die Ersatzteile für unsere Maschine wurden perfekt nachgebildet. Ein echter Lebensretter für unser Unternehmen!"
          </p>
          <div class="testimonial-author">
            <strong>Andreas M.</strong>
            <span>Geschäftsführer</span>
          </div>
        </div>
        
        <div class="testimonial-card">
          <div class="stars">
            <span v-for="i in 5" :key="i">⭐</span>
          </div>
          <p class="testimonial-text">
            "Die personalisierte Würfelbox war das perfekte Geschenk! Hochwertige Verarbeitung und der Magnetverschluss funktioniert einwandfrei. Sehr zu empfehlen!"
          </p>
          <div class="testimonial-author">
            <strong>Lisa W.</strong>
            <span>DnD-Spielerin</span>
          </div>
        </div>
      </div>
      
      <div class="testimonial-cta">
        <p>Werden Sie unser nächster zufriedener Kunde!</p>
        <a href="#contact" class="btn btn-primary">Projekt starten</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials {
  padding: 80px 0;
  background-color: var(--gray-50);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.stars {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.testimonial-text {
  font-style: italic;
  color: var(--gray-700);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--gray-200);
  padding-top: 1rem;
}

.testimonial-author strong {
  color: var(--gray-900);
  font-size: 1.1rem;
}

.testimonial-author span {
  color: var(--primary-color);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.testimonial-cta {
  text-align: center;
  margin-top: 3rem;
}

.testimonial-cta p {
  font-size: 1.2rem;
  color: var(--gray-700);
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .testimonial-card {
    padding: 1.5rem;
  }
}
</style>