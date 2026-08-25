<template>
  <section class="bg-paper py-16">
    <div class="mx-auto max-w-6xl px-4">
      <span class="wb-frame inline-block bg-brand px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-ink">
        Eutin
      </span>

      <h1 class="mt-6 max-w-3xl font-display text-5xl font-bold leading-none tracking-tight text-ink sm:text-6xl">
        Designs, die man anfassen kann.
      </h1>

      <p class="mt-5 max-w-xl font-sans text-lg text-gray">
        Untersetzer, Deko und Prints — auf Conventions, im Shop, und in
        Workshops zum Selbermachen.
      </p>

      <div class="mt-10 grid gap-4 sm:grid-cols-3">
        <NuxtLink v-for="path in paths" :key="path.to" :to="path.to"
                  class="wb-frame wb-tilt block p-5" :class="path.tone">
          <h2 class="font-display text-xl font-bold text-ink">{{ path.title }}</h2>
          <span class="mt-1 block font-sans text-sm text-ink/75">{{ path.text }}</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { siteLinks } from '~/utils/siteLinks'

// The three paths from the spec, ordered by what the site can actually move:
// shop and workshops are the growth areas, jobbing print stays smaller.
const paths = [
  { to: siteLinks.catalog, title: 'Shop & Designs', text: 'Untersetzer, Deko, Fandom-Motive', tone: 'bg-brand/10' },
  { to: siteLinks.workshops, title: 'Workshops', text: '3D-Druck, Blender, Cosplay-Foto', tone: 'bg-brand-light/15' },
  { to: siteLinks.services, title: 'Auftragsdruck', text: 'Prototypen, Ersatzteile, Kleinserie', tone: 'bg-gray-200/40' }
]
</script>
