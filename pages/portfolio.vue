<template>
  <div class="portfolio-page">
    <TheHeader />
    
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="fade-in-up">Unser Portfolio</h1>
          <p class="fade-in-up">Entdecken Sie unsere vielfältigen 3D-Druck Projekte und lassen Sie sich inspirieren</p>
          <div class="hero-buttons">
            <a href="#gallery" class="btn btn-primary">Projekte ansehen</a>
            <a href="/#contact" class="btn btn-secondary">Projekt anfragen</a>
          </div>
        </div>
      </div>
    </section>

    <section id="gallery" class="portfolio-gallery">
      <div class="container">
        <div class="portfolio-filters">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="activeCategory = category"
            :class="{ active: activeCategory === category }"
            class="filter-btn"
          >
            {{ category }}
          </button>
        </div>

        <div class="portfolio-grid">
          <div 
            v-for="item in filteredItems" 
            :key="item.id"
            class="portfolio-item"
            @click="openModal(item)"
          >
            <img 
              :src="item.image" 
              :alt="item.title"
              loading="lazy"
            />
            <div class="portfolio-overlay">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <span class="view-more">Mehr ansehen →</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal for detailed view -->
    <div v-if="selectedItem" class="portfolio-modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">&times;</button>
        <img :src="selectedItem.image" :alt="selectedItem.title" />
        <div class="modal-info">
          <h2>{{ selectedItem.title }}</h2>
          <p class="modal-category">{{ selectedItem.category }}</p>
          <p class="modal-description">{{ selectedItem.fullDescription }}</p>
          <div class="modal-details">
            <div class="detail-item" v-if="selectedItem.material">
              <strong>Material:</strong> {{ selectedItem.material }}
            </div>
            <div class="detail-item" v-if="selectedItem.dimensions">
              <strong>Abmessungen:</strong> {{ selectedItem.dimensions }}
            </div>
            <div class="detail-item" v-if="selectedItem.printTime">
              <strong>Druckzeit:</strong> {{ selectedItem.printTime }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface PortfolioItem {
  id: number
  title: string
  description: string
  fullDescription: string
  image: string
  category: string
  material?: string
  dimensions?: string
  printTime?: string
}

const activeCategory = ref('Alle')
const selectedItem = ref<PortfolioItem | null>(null)

const categories = ['Alle', 'Cosplay', 'Gaming', 'Tabletop', 'Personalisiert', 'Zubehör']

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'LEGO Cosplay',
    description: 'Einzigartiges Cosplay-Set mit Helm und Händen',
    fullDescription: 'Dieses beeindruckende LEGO Cosplay-Set besteht aus einem detailgetreuen Helm und passenden Händen. Perfekt für LEGO-Fans und Cosplayer, die auf Conventions auffallen möchten.',
    image: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/o9ltsz9npcjst72/img_20230907_wa0005_bdjN7Z6V7g.jpg',
    category: 'Cosplay',
    material: 'PLA+',
    dimensions: 'Helm: 30x25x25cm',
    printTime: '48 Stunden'
  },
  {
    id: 2,
    title: 'PS5 Ladestation',
    description: 'Maßgeschneiderte Ladestation mit Kundenlogo',
    fullDescription: 'Eine elegante und funktionale Ladestation für PS5 Controller. Das Design wurde speziell für den Kunden angepasst und mit seinem Firmenlogo versehen.',
    image: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/8j9m9x7ks23uxhb/20230928_135701_Q5bsN6HfNH.jpg',
    category: 'Gaming',
    material: 'PETG',
    dimensions: '20x15x10cm',
    printTime: '12 Stunden'
  },
  {
    id: 3,
    title: 'DnD Würfelbox',
    description: 'Kunstvolle Würfelbox mit Magnetverschluss',
    fullDescription: 'Diese wunderschön gestaltete Würfelbox bietet Platz für ein komplettes Würfelset. Mit Magnetverschluss und persönlichem Initial des Spielers.',
    image: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/m5pt0pai83y1c73/20230925_150854_FLUX8pk920.jpg',
    category: 'Tabletop',
    material: 'PLA',
    dimensions: '10x8x4cm',
    printTime: '6 Stunden'
  },
  {
    id: 4,
    title: 'Mandalorianer Helm',
    description: 'Authentischer Cosplay-Helm für Star Wars Fans',
    fullDescription: 'Ein detailgetreuer Nachbau des ikonischen Mandalorianer Helms. Perfekt für Cosplay-Events und als Sammlerstück für Star Wars Enthusiasten.',
    image: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/yb7bjv78pgg8w06/img_20231108_wa0008_topaz_sharpen_xhgUWfMgQr.jpg',
    category: 'Cosplay',
    material: 'ABS',
    dimensions: '30x25x30cm',
    printTime: '36 Stunden'
  },
  {
    id: 5,
    title: 'PS5 Controller Paddle',
    description: 'Custom Paddle mit Firmenlogo',
    fullDescription: 'Maßgefertigte Paddle-Erweiterung für PS5 Controller. In den Firmenfarben des Kunden gedruckt und mit Logo versehen für professionelles Gaming.',
    image: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/235xrzpr4zb0eqx/img_20231002_wa0001_1_topaz_sharpen_4iFm08ZuZn.jpg',
    category: 'Gaming',
    material: 'PETG',
    dimensions: '5x3x2cm',
    printTime: '2 Stunden'
  },
  {
    id: 6,
    title: 'One Piece Anhänger',
    description: 'Detailreicher Anime-Kettenanhänger',
    fullDescription: 'Ein fein gearbeiteter Kettenanhänger mit One Piece Motiv. In elegantem Schwarz-Weiß Design für Anime-Fans.',
    image: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/0nm3ll9q4tmobjc/20230915_232851_It4UjEoNqo.jpg',
    category: 'Personalisiert',
    material: 'Resin',
    dimensions: '4x3x0.5cm',
    printTime: '1 Stunde'
  },
  {
    id: 7,
    title: 'Demon Maske',
    description: 'Eindrucksvolle Dämonenmaske für Cosplay',
    fullDescription: 'Diese detailreiche Dämonenmaske wurde speziell für Cosplay-Events entworfen. Mit authentischen Details und perfekter Passform für beeindruckende Auftritte.',
    image: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/b82pb1ynlvdxk8f/img_20220603_wa0026_30Wdy75FFo.jpg',
    category: 'Cosplay',
    material: 'PLA+',
    dimensions: '25x20x15cm',
    printTime: '24 Stunden'
  },
  {
    id: 8,
    title: 'Fuchs Maske',
    description: 'Kunstvolle Kitsune-Maske im japanischen Stil',
    fullDescription: 'Eine wunderschön gestaltete Fuchs-Maske inspiriert von der japanischen Kitsune-Mythologie. Perfekt für Cosplay, Theater oder als dekoratives Kunstwerk.',
    image: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/icnq51uj8bb9e8y/20240709_235056_ABsGZxEUph.jpg',
    category: 'Cosplay',
    material: 'PLA',
    dimensions: '22x18x10cm',
    printTime: '18 Stunden'
  },
  {
    id: 9,
    title: 'No Face Maske',
    description: 'Ikonische Maske aus Spirited Away',
    fullDescription: 'Eine authentische Nachbildung der No Face (Kaonashi) Maske aus dem beliebten Studio Ghibli Film "Spirited Away". Ein Muss für jeden Anime-Fan.',
    image: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/1q5rx9qb4tt6u7h/20240709_234658_ib82gpyiUY.jpg',
    category: 'Cosplay',
    material: 'PLA',
    dimensions: '20x15x8cm',
    printTime: '12 Stunden'
  },
  {
    id: 10,
    title: 'Gaming Trophäe',
    description: 'Personalisierte Trophäe für E-Sport Events',
    fullDescription: 'Eine beeindruckende Trophäe speziell für Gaming-Turniere und E-Sport Events. Mit individueller Gravur und in verschiedenen Größen erhältlich.',
    image: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/lbpqcdejjg85new/screenshot_20230317_082959_reddit_3_sZrsKYkbPM.jpg',
    category: 'Personalisiert',
    material: 'PETG',
    dimensions: '15x15x30cm',
    printTime: '20 Stunden'
  },
  {
    id: 11,
    title: 'Pokéball zum Öffnen',
    description: 'Funktionsfähiger Pokéball mit Mechanismus',
    fullDescription: 'Ein voll funktionsfähiger Pokéball mit Öffnungsmechanismus. Perfekt für Pokémon-Fans und Sammler. Bietet Platz für kleine Figuren oder als dekoratives Element.',
    image: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/aorrdhlquzxvqoj/20250218_131626_SNP7FLu2fC.jpg',
    category: 'Gaming',
    material: 'PLA+',
    dimensions: '8x8x8cm',
    printTime: '6 Stunden'
  },
  {
    id: 12,
    title: 'Monster Hunter Lanze',
    description: 'Detaillierter Schlüsselanhänger für MH-Fans',
    fullDescription: 'Ein präzise gefertigter Schlüsselanhänger in Form einer Monster Hunter Lanze. Perfekt für Fans der beliebten Spieleserie.',
    image: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/y8jxyqnefyel0p9/20250216_044328_6dxKg7EqHL.jpg',
    category: 'Gaming',
    material: 'Resin',
    dimensions: '6x2x1cm',
    printTime: '1 Stunde'
  },
  {
    id: 13,
    title: 'Flareon Schlüsselanhänger',
    description: 'Niedlicher Pokémon-Anhänger',
    fullDescription: 'Ein liebevoll gestalteter Flareon Schlüsselanhänger. Perfekt für Pokémon-Trainer und Fans der Evoli-Entwicklungen.',
    image: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/y9jqn9k4n9xh9jn/20250216_045420_FrtmwQT3X2.jpg',
    category: 'Gaming',
    material: 'Resin',
    dimensions: '5x4x1cm',
    printTime: '45 Minuten'
  }
]

const filteredItems = computed(() => {
  if (activeCategory.value === 'Alle') {
    return portfolioItems
  }
  return portfolioItems.filter(item => item.category === activeCategory.value)
})

const openModal = (item: PortfolioItem) => {
  selectedItem.value = item
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedItem.value = null
  document.body.style.overflow = 'auto'
}

// SEO Meta
useHead({
  title: 'Portfolio - 3D Print Shop Hannover',
  meta: [
    { name: 'description', content: 'Entdecken Sie unsere vielfältigen 3D-Druck Projekte: Cosplay, Gaming-Zubehör, Tabletop-Miniaturen und personalisierte Artikel.' },
    { property: 'og:title', content: 'Portfolio - 3D Print Shop Hannover' },
    { property: 'og:description', content: 'Unsere besten 3D-Druck Projekte im Überblick' },
  ]
})
</script>

<style scoped>
.portfolio-page {
  min-height: 100vh;
}

.portfolio-page .hero {
  min-height: 60vh;
  padding: 80px 0;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  animation: fadeInUp 0.8s ease 0.4s;
  animation-fill-mode: both;
}

.fade-in-up {
  animation: fadeInUp 0.8s ease;
  animation-fill-mode: both;
}

.fade-in-up:nth-child(2) {
  animation-delay: 0.2s;
}

.portfolio-gallery {
  padding: 80px 0;
}

.portfolio-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.filter-btn:hover {
  border-color: #3498db;
  color: #3498db;
}

.filter-btn.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.portfolio-item {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.portfolio-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.portfolio-item img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.portfolio-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  color: white;
  padding: 2rem 1.5rem 1.5rem;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.portfolio-item:hover .portfolio-overlay {
  transform: translateY(0);
}

.portfolio-overlay h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.portfolio-overlay p {
  margin-bottom: 0.5rem;
  opacity: 0.9;
}

.view-more {
  display: inline-block;
  font-size: 0.9rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portfolio-item:hover .view-more {
  opacity: 1;
}

/* Modal Styles */
.portfolio-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: white;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 10px;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  border: none;
  font-size: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 10;
}

.modal-content img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.modal-info {
  padding: 2rem;
}

.modal-info h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.modal-category {
  color: #3498db;
  font-weight: 500;
  margin-bottom: 1rem;
}

.modal-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.modal-details {
  display: grid;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.detail-item {
  display: flex;
  gap: 0.5rem;
}

.detail-item strong {
  color: #2c3e50;
}

@media (max-width: 768px) {
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-buttons .btn {
    width: 100%;
    max-width: 250px;
  }
  
  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .modal-content img {
    height: 250px;
  }
  
  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>