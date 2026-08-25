<template>
  <section id="workshops" class="bg-paper py-16">
    <div class="mx-auto max-w-6xl px-4">
      <h2 class="font-display text-3xl font-bold tracking-tight text-ink">{{ heading }}</h2>
      <p class="mt-2 max-w-xl font-sans text-ink/75">
        Drei Reihen, aufeinander aufbauend. Du steigst da ein, wo du stehst.
      </p>

      <div class="mt-8 space-y-4">
        <article v-for="fam in families" :key="fam.slug" class="wb-frame bg-paper p-5">
          <h3 class="font-display text-xl font-bold text-ink">{{ fam.name }}</h3>
          <div class="mt-4 grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="f in fam.formats" :key="f.slug" class="wb-frame bg-paper p-4">
              <!-- Not every deck names a level. An empty badge would be worse
                   than none, so it only renders when the data says something. -->
              <span v-if="f.level"
                    class="wb-frame inline-block bg-brand px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-widest text-ink">
                {{ f.level }}
              </span>
              <h4 class="mt-2 font-display text-base font-bold text-ink">{{ f.title }}</h4>
              <p v-if="f.duration" class="mt-1 font-sans text-sm text-ink/75">{{ f.duration }}</p>
              <p v-if="f.summary" class="mt-1 font-sans text-sm text-ink/75">{{ f.summary }}</p>
              <ul v-if="f.agenda.length" class="mt-2 list-disc pl-5 font-sans text-xs text-ink/75">
                <li v-for="a in f.agenda" :key="a">{{ a }}</li>
              </ul>
            </div>
          </div>
        </article>
      </div>

      <p class="mt-6 font-sans text-sm text-ink/75">
        Termine und Konditionen auf Anfrage —
        <NuxtLink :to="siteLinks.contact" class="text-ink underline decoration-brand decoration-2 underline-offset-2">schreib uns kurz</NuxtLink>,
        was du vorhast.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { siteLinks } from '~/utils/siteLinks'
import data from '~/data/workshops.json'

// The heading is a prop because this section appears both on the homepage,
// where "Workshops" is the right label, and on /workshops, where the page
// title already says that and repeating it reads as two stacked titles.
withDefaults(defineProps<{ heading?: string }>(), { heading: 'Workshops' })

const families = data.families
</script>
