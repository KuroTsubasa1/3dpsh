<template>
  <section id="pricing-calculator" class="pricing-calculator">
    <div class="container">
      <div class="section-title">
        <h2>Preiskalkulator</h2>
        <p>Berechnen Sie eine Kostenschätzung für Ihr Projekt</p>
      </div>
      
      <div class="calculator-container">
        <div class="calculator-form">
          <div class="form-section">
            <label for="print-type">Druckverfahren</label>
            <select id="print-type" v-model="calculator.printType" class="form-control">
              <option value="fdm">FDM-Druck (12,50€/Stunde)</option>
              <option value="resin">Resin-Druck (15€/Stunde)</option>
            </select>
          </div>
          
          <div class="form-section">
            <label>Geschätzte Druckzeit</label>
            <div class="time-inputs">
              <div class="time-input">
                <input 
                  type="number" 
                  v-model.number="calculator.hours" 
                  min="0" 
                  max="100"
                  class="form-control"
                >
                <span>Stunden</span>
              </div>
              <div class="time-input">
                <input 
                  type="number" 
                  v-model.number="calculator.minutes" 
                  min="0" 
                  max="59"
                  class="form-control"
                >
                <span>Minuten</span>
              </div>
            </div>
          </div>
          
          <div class="form-section">
            <label>Zusätzliche Optionen</label>
            <div class="checkbox-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  v-model="calculator.expressDelivery"
                >
                <span>Express-Lieferung (+15€)</span>
              </label>
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  v-model="calculator.postProcessing"
                >
                <span>Nachbearbeitung (ab +10€)</span>
              </label>
            </div>
          </div>
          
          <div class="form-section">
            <label for="cad-hours">CAD-Modellierung (optional)</label>
            <div class="cad-input">
              <input 
                type="number" 
                id="cad-hours"
                v-model.number="calculator.cadHours" 
                min="0" 
                max="50"
                class="form-control"
                placeholder="0"
              >
              <span>Stunden (30€/Stunde)</span>
            </div>
          </div>
        </div>
        
        <div class="calculator-result">
          <h3>Kostenschätzung</h3>
          
          <div class="cost-breakdown">
            <div class="cost-item" v-if="printCost > 0">
              <span>{{ calculator.printType === 'fdm' ? 'FDM' : 'Resin' }}-Druck:</span>
              <span>{{ printCost.toFixed(2) }}€</span>
            </div>
            <div class="cost-item" v-if="calculator.expressDelivery">
              <span>Express-Lieferung:</span>
              <span>15,00€</span>
            </div>
            <div class="cost-item" v-if="calculator.postProcessing">
              <span>Nachbearbeitung:</span>
              <span>10,00€+</span>
            </div>
            <div class="cost-item" v-if="cadCost > 0">
              <span>CAD-Modellierung:</span>
              <span>{{ cadCost.toFixed(2) }}€</span>
            </div>
          </div>
          
          <div class="total-cost">
            <span>Geschätzter Gesamtpreis:</span>
            <span class="price">ab {{ totalCost.toFixed(2) }}€</span>
          </div>
          
          <div class="disclaimer-box">
            <p class="disclaimer">
              <strong>Wichtiger Hinweis:</strong> Dies ist nur eine grobe Durchschnittskalkulation, um Ihnen einen ersten Eindruck zu vermitteln. 
              Für eine genaue Preisberechnung benötigen wir Ihr 3D-Modell bzw. Ihre Datei, da der finale Preis von vielen Faktoren abhängt:
            </p>
            <ul class="disclaimer-list">
              <li>Tatsächlicher Materialverbrauch</li>
              <li>Komplexität des Modells</li>
              <li>Benötigte Stützstrukturen</li>
              <li>Nachbearbeitungsaufwand</li>
            </ul>
            <p class="disclaimer">
              <strong>Diese Preisschätzung ist unverbindlich und nicht bindend.</strong> Kontaktieren Sie uns für ein konkretes Angebot.
            </p>
          </div>
          
          <a href="#contact" class="btn btn-primary">Konkretes Angebot anfragen</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const calculator = ref({
  printType: 'fdm',
  hours: 1,
  minutes: 0,
  expressDelivery: false,
  postProcessing: false,
  cadHours: 0
})

const printCost = computed(() => {
  const totalHours = calculator.value.hours + (calculator.value.minutes / 60)
  const hourlyRate = calculator.value.printType === 'fdm' ? 12.5 : 15
  return totalHours * hourlyRate
})

const cadCost = computed(() => {
  return calculator.value.cadHours * 30
})

const totalCost = computed(() => {
  let total = printCost.value + cadCost.value
  
  if (calculator.value.expressDelivery) total += 15
  if (calculator.value.postProcessing) total += 10
  
  return total
})
</script>

<style scoped>
.pricing-calculator {
  padding: 80px 0;
  background-color: var(--gray-50);
}

.calculator-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 3rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.calculator-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
}

.form-section {
  margin-bottom: 1.5rem;
}

.form-section label {
  display: block;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--gray-300);
  border-radius: 6px;
  font-size: 1rem;
  transition: var(--transition);
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-color);
}

.time-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.time-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.time-input span {
  color: var(--gray-600);
  font-size: 0.9rem;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: normal;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.cad-input {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cad-input input {
  max-width: 100px;
}

.cad-input span {
  color: var(--gray-600);
  font-size: 0.9rem;
}

.calculator-result {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 80px;
}

.calculator-result h3 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.cost-breakdown {
  border-top: 1px solid var(--gray-200);
  border-bottom: 1px solid var(--gray-200);
  padding: 1rem 0;
  margin-bottom: 1rem;
}

.cost-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  color: var(--gray-700);
}

.total-cost {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--gray-900);
}

.total-cost .price {
  color: var(--primary-color);
  font-size: 1.5rem;
}

.disclaimer {
  font-size: 0.85rem;
  color: var(--gray-600);
  line-height: 1.5;
  margin: 1rem 0 1.5rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .calculator-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .calculator-result {
    position: static;
  }
  
  .time-inputs {
    grid-template-columns: 1fr;
  }
}
</style>