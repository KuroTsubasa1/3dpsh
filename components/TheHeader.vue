<template>
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
          <li><a href="#home" class="nav-link" @click="closeMenu">Start</a></li>
          <li><a href="#services" class="nav-link" @click="closeMenu">Leistungen</a></li>
          <li><a href="#etsy" class="nav-link" @click="closeMenu">Shop</a></li>
          <li><a href="#portfolio" class="nav-link" @click="closeMenu">Portfolio</a></li>
          <li><a href="#pricing-calculator" class="nav-link" @click="closeMenu">Preise</a></li>
          <li><a href="#faq" class="nav-link" @click="closeMenu">FAQ</a></li>
          <li><a href="#about" class="nav-link" @click="closeMenu">Über uns</a></li>
          <li><a href="#contact" class="nav-link" @click="closeMenu">Kontakt</a></li>
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