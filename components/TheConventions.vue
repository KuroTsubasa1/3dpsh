<template>
  <section id="conventions" class="bg-gray-200/40 py-16">
    <div class="mx-auto max-w-6xl px-4">
      <h2 class="font-display text-3xl font-bold tracking-tight text-ink">Wo ihr uns trefft</h2>
      <p class="mt-2 max-w-xl font-sans text-gray">
        Die meisten Designs verkaufen wir persönlich auf Conventions. Hier steht,
        wo wir als Nächstes sind.
      </p>

      <ul v-if="upcoming.length" class="mt-8 space-y-3">
        <li v-for="c in upcoming" :key="c.name + c.from"
            class="wb-frame flex flex-wrap items-center gap-4 bg-paper p-4">
          <span class="wb-frame flex w-20 flex-none flex-col items-center bg-brand px-2 py-1 text-paper">
            <span class="font-display text-xl font-bold leading-none">{{ dayOf(c.from) }}</span>
            <span class="font-display text-[10px] font-bold uppercase tracking-widest">{{ monthOf(c.from) }}</span>
          </span>
          <span class="min-w-0 flex-1">
            <h3 class="font-display text-lg font-bold text-ink">{{ c.name }}</h3>
            <span class="block font-sans text-sm text-ink/75">{{ whereAndWhen(c) }}</span>
          </span>
          <span v-if="c.stand" class="wb-frame bg-paper px-3 py-1 font-display text-xs font-bold">
            {{ c.stand }}
          </span>
        </li>
      </ul>

      <!-- The one state that is easy to forget: out of season this section would
           otherwise be a heading above nothing. -->
      <p v-else class="mt-8 rounded-xl border-[3px] border-dashed border-gray bg-paper p-6 font-sans text-gray">
        Die Termine für die nächste Saison stehen noch nicht fest.
        <NuxtLink :to="siteLinks.contact" class="text-brand underline">Schreib uns</NuxtLink>,
        wenn du wissen willst, wo wir als Nächstes sind.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { upcomingConventions, validateConventions, type Convention } from '~/utils/conventions'
import { siteLinks } from '~/utils/siteLinks'
import data from '~/data/conventions.json'

const MONTHS = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']

// Computed once per render on the server. Good enough: the list changes at
// midnight and the page is server-rendered per request.
const today = new Date().toISOString().slice(0, 10)

// The data file is edited by hand, so a bad entry is dropped rather than
// breaking the page — but silently would just hide the operator's mistake.
// A console.warn per problem puts it in the server log instead of nowhere.
const { valid, problems } = validateConventions(data.conventions as Convention[])
for (const p of problems) {
  console.warn(`[conventions] ${p.name}: ${p.reason}`)
}

const upcoming = upcomingConventions(valid, today)

const dayOf = (iso: string) => iso.slice(8, 10)
const monthOf = (iso: string) => MONTHS[Number(iso.slice(5, 7)) - 1]

function whereAndWhen(c: Convention) {
  const place = [c.city, c.venue].filter(Boolean).join(' · ')
  const span = c.from === c.to
    ? `${dayOf(c.from)}. ${monthOf(c.from)}`
    : `${dayOf(c.from)}.–${dayOf(c.to)}. ${monthOf(c.to)}`
  return `${place} · ${span}`
}
</script>
