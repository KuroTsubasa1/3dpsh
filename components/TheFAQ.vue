<template>
  <section id="faq" class="faq">
    <div class="container">
      <div class="section-title">
        <h2>Häufig gestellte Fragen</h2>
        <p>Antworten auf Ihre wichtigsten Fragen</p>
      </div>
      
      <div class="faq-list">
        <div 
          v-for="(item, index) in faqItems" 
          :key="index"
          class="faq-item"
          :class="{ active: activeIndex === index }"
        >
          <button 
            class="faq-question"
            @click="toggleFAQ(index)"
            :aria-expanded="activeIndex === index"
          >
            <span>{{ item.question }}</span>
            <svg 
              class="faq-icon" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
          <div class="faq-answer">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref<number | null>(null)

const faqItems = [
  {
    question: "Welche Dateiformate werden akzeptiert?",
    answer: "Wir akzeptieren alle gängigen 3D-Dateiformate wie STL, OBJ, 3MF, und STEP. STL ist das bevorzugte Format für den 3D-Druck. Falls Sie andere Formate haben, kontaktieren Sie uns gerne für eine Konvertierung."
  },
  {
    question: "Wie lange dauert die Produktion?",
    answer: "Die Produktionszeit hängt von der Größe und Komplexität Ihres Projekts ab. Kleine Teile sind oft innerhalb von 1-2 Werktagen fertig. Größere Projekte können 3-5 Werktage dauern. Express-Service ist auf Anfrage verfügbar."
  },
  {
    question: "Welche Materialien stehen zur Verfügung?",
    answer: "Für FDM-Druck bieten wir PLA, PETG, ABS, TPU und weitere Spezialfilamente an. Beim Resin-Druck verwenden wir Standard-, Tough- und flexible Resins. Jedes Material hat spezifische Eigenschaften für verschiedene Anwendungen."
  },
  {
    question: "Wie wird der Preis berechnet?",
    answer: "Der Preis basiert auf: Materialverbrauch, Druckzeit, Nachbearbeitung und Komplexität. FDM-Druck startet bei 12,50€/Stunde, Resin-Druck bei 15€/Stunde. CAD-Modellierung wird mit 30€/Stunde berechnet. Gerne erstellen wir Ihnen ein individuelles Angebot."
  },
  {
    question: "Bieten Sie auch Nachbearbeitung an?",
    answer: "Ja! Wir bieten verschiedene Nachbearbeitungsoptionen: Schleifen, Grundieren, Lackieren, Kleben von Bauteilen und mehr. Die Nachbearbeitung wird je nach Aufwand separat berechnet."
  },
  {
    question: "Kann ich meine Bestellung abholen?",
    answer: "Selbstverständlich! Sie können Ihre Bestellung nach Absprache in Eutin abholen. Alternativ versenden wir deutschlandweit und auf Anfrage auch international."
  },
  {
    question: "Was ist der Unterschied zwischen FDM und Resin-Druck?",
    answer: "FDM-Druck eignet sich für größere, robuste Teile und ist kostengünstiger. Resin-Druck bietet höchste Detailgenauigkeit und glatte Oberflächen, ideal für Miniaturen und filigrane Modelle. Wir beraten Sie gerne zur optimalen Technologie für Ihr Projekt."
  },
  {
    question: "Helfen Sie auch bei der 3D-Modellierung?",
    answer: "Ja! Unser CAD-Service erstellt professionelle 3D-Modelle nach Ihren Vorgaben. Ob aus Skizzen, Fotos oder Beschreibungen - wir setzen Ihre Ideen digital um. Die Modellierung kostet 30€ pro Stunde."
  }
]

const toggleFAQ = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<style scoped>
.faq {
  padding: 80px 0;
  background-color: white;
}

.faq-list {
  max-width: 800px;
  margin: 3rem auto 0;
}

.faq-item {
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: var(--transition);
}

.faq-item:hover {
  border-color: var(--primary-color);
}

.faq-item.active {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(106, 170, 67, 0.1);
}

.faq-question {
  width: 100%;
  padding: 1.5rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--gray-900);
  transition: var(--transition);
}

.faq-question:hover {
  color: var(--primary-color);
}

.faq-icon {
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.faq-item.active .faq-icon {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-item.active .faq-answer {
  max-height: 300px;
}

.faq-answer p {
  padding: 0 1.5rem 1.5rem;
  color: var(--gray-700);
  line-height: 1.8;
  margin: 0;
}

@media (max-width: 768px) {
  .faq-question {
    font-size: 1rem;
    padding: 1.25rem;
  }
  
  .faq-answer p {
    padding: 0 1.25rem 1.25rem;
    font-size: 0.95rem;
  }
}
</style>