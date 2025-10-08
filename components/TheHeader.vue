Use <template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-container">
        <a href="#" class="logo">
          <img 
            src="/logo.png" 
            alt="3D Print Shop Harm Logo"
            width="50"
            height="50"
          />
          <span>3D Print Shop Harm</span>
        </a>
        
        <ul class="nav-menu" :class="{ active: menuOpen }">
          <li><NuxtLink to="/" class="nav-link" @click="closeMenu">Start</NuxtLink></li>
          <li><a href="/#services" class="nav-link" @click="closeMenu">Leistungen</a></li>
          <li><a href="/#etsy" class="nav-link" @click="closeMenu">Shop</a></li>
          <li><NuxtLink to="/portfolio" class="nav-link" @click="closeMenu">Portfolio</NuxtLink></li>
          <li><a href="/#pricing-calculator" class="nav-link" @click="closeMenu">Preise</a></li>
          <li><a href="/#faq" class="nav-link" @click="closeMenu">FAQ</a></li>
          <li><a href="/#about" class="nav-link" @click="closeMenu">Über uns</a></li>
          <li><a href="/#contact" class="nav-link" @click="closeMenu">Kontakt</a></li>
        </ul>
        
        <button class="menu-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}
</script>

<style scoped>
.navbar {
  background-color: #1a1a1a;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
}

.logo img {
  height: 50px;
  width: 50px;
  object-fit: contain;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #3498db;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.menu-toggle span {
  display: block;
  width: 100%;
  height: 3px;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Mobile styles */
@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background-color: #1a1a1a;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    padding: 2rem 0;
    gap: 1rem;
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-link {
    display: block;
    padding: 1rem;
  }

  /* Hamburger animation when menu is open */
  .nav-menu.active ~ .menu-toggle span:nth-child(1) {
    transform: rotate(45deg) translate(8px, 8px);
  }

  .nav-menu.active ~ .menu-toggle span:nth-child(2) {
    opacity: 0;
  }

  .nav-menu.active ~ .menu-toggle span:nth-child(3) {
    transform: rotate(-45deg) translate(8px, -8px);
  }
}
</style>