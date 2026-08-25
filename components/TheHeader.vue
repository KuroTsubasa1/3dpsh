<template>
  <header class="sticky top-0 z-30 wb-edge-b bg-paper">
    <nav class="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3" aria-label="Hauptnavigation">
      <NuxtLink to="/" class="flex items-center gap-3 font-display font-bold text-ink" aria-label="3D Print Shop Harm, zur Startseite">
        <img src="/logo.png" alt="" width="40" height="40"
             class="rounded-full border-[2.5px] border-ink" />
        <span class="hidden sm:inline">3D Print Shop Harm</span>
      </NuxtLink>

      <ul class="ml-auto hidden items-center gap-1 md:flex">
        <li v-for="item in nav" :key="item.to">
          <NuxtLink :to="item.to"
                    class="rounded-lg px-3 py-2 font-display text-sm font-bold text-ink hover:bg-brand hover:text-ink">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>

      <button class="ml-auto md:hidden wb-frame bg-paper px-3 py-2 font-display text-sm font-bold"
              :aria-expanded="menuOpen" aria-controls="mobile-nav"
              @click="menuOpen = !menuOpen">
        {{ menuOpen ? 'Schließen' : 'Menü' }}
      </button>

      <ul v-show="menuOpen" id="mobile-nav" class="absolute inset-x-0 top-full border-t-[3px] border-ink bg-paper md:hidden">
        <li v-for="item in nav" :key="item.to" class="border-b border-gray-200 last:border-0">
          <NuxtLink :to="item.to" class="block px-4 py-3 font-display font-bold text-ink"
                    @click="menuOpen = false">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { siteLinks } from '~/utils/siteLinks'

const menuOpen = ref(false)

// Only targets that exist today. /katalog and the workshops section arrive in
// parts 2 and 3; until then nothing here points into the void. The #services and
// #contact anchors come from the homepage sections still in place.
const nav = [
  { to: siteLinks.catalog, label: 'Katalog' },
  { to: siteLinks.services, label: 'Auftragsdruck' },
  { to: siteLinks.contact, label: 'Kontakt' }
]
</script>
