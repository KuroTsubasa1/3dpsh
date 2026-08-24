# Redesign, Teil 1: Fundament, Layout und Hero — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tailwind v4 mit den Marken-Tokens als Fundament etablieren, ein
gemeinsames Layout mit Header, Footer und Filament-Spool schaffen, und den Hero
mit den drei Wegen im „Werkbank"-Stil bauen — alles live deployt.

**Architecture:** Tailwind v4 läuft über das Vite-Plugin parallel zum
bestehenden `modern.css`; die Werkbank-Eigenheiten (Kontur, harter Schatten,
Kippung) werden einmal als `@utility` definiert statt in jeder Komponente neu.
Header und Footer wandern aus den einzelnen Seiten in ein `layouts/default.vue`.
Die Scroll-Mathematik des Spools ist eine reine Funktion mit echten Tests; die
Optik drumherum wird visuell geprüft.

**Tech Stack:** Nuxt 3.21.11, Vue 3.5, Vite 6.4.3, Tailwind v4
(`@tailwindcss/vite`), vitest, Space Grotesk + Inter (Google Fonts)

**Spec:** `docs/superpowers/specs/2026-08-25-redesign-design.md`

## Global Constraints

- **Farben ausschließlich aus dem Bestand:** `#6aaa43`, `#7bc04f`, `#5a9236`,
  `#20201f`, `#727271`, `#e6e6e6`, `#FBFBF7`. Keine zusätzlichen Buntfarben
- **Anrede durchgängig „du"** in allen sichtbaren Texten
- **Keine erfundenen Fakten** über das Unternehmen. Wo Zahlen fehlen (Anzahl
  Drucker, Gründungsjahr, Conventions), bleibt der Platzhalter sichtbar im
  Text stehen und wird im Commit erwähnt — nicht raten
- **`prefers-reduced-motion: reduce` schaltet jede scrollgekoppelte Bewegung ab**
- **Deutsch** für sichtbare Texte, **Englisch** für Commits, Code und Kommentare
- **Keine Nennung von Claude oder KI** in Commit-Nachrichten
- Der Port der App ist **5001**, Deploy läuft über die bestehende Pipeline

---

## Dateistruktur

| Datei | Verantwortung |
| --- | --- |
| `assets/css/app.css` | Tailwind-Import, `@theme`-Tokens, Werkbank-`@utility` |
| `utils/scrollProgress.ts` | reine Fortschritts-Mathematik, getestet |
| `test/scrollProgress.test.ts` | Tests dazu |
| `components/FilamentProgress.vue` | Spool, Strang, Druckkopf, Reduced-Motion |
| `layouts/default.vue` | Header + Slot + Footer + Spool, einmal für alle Seiten |
| `components/TheHeader.vue` | Navigation im Werkbank-Stil (umgeschrieben) |
| `components/TheFooter.vue` | Footer im Werkbank-Stil (umgeschrieben) |
| `components/TheHero.vue` | Hero mit den drei Wegen (umgeschrieben) |
| `nuxt.config.ts` | Vite-Plugin, CSS-Einbindung, Schrift-Link |

---

### Task 1: Tailwind-Fundament mit Marken-Tokens

**Files:**
- Create: `assets/css/app.css`
- Modify: `nuxt.config.ts` (Zeilen 110–112 `css`, 114 `vite`, 47–51 `link`)
- Modify: `package.json`

**Interfaces:**
- Consumes: nichts
- Produces: Utility-Klassen `bg-brand`, `text-ink`, `border-ink`, `font-display`,
  `shadow-wb`, sowie die Utilities `wb-frame`, `wb-tilt`

- [ ] **Step 1: Sauberen Arbeitsbaum bestätigen**

Die `@nuxt/devtools`-Änderung war beabsichtigt und ist bereits als eigener
Commit (`1656de0`) auf diesem Branch. Vor dem ersten `npm install` prüfen:

```bash
git branch --show-current    # erwartet: redesign/fundament
git status --short           # erwartet: nur untracked Vorträge/
```

Sind andere Änderungen offen: **stoppen und melden**, nicht überschreiben.

- [ ] **Step 2: Tailwind installieren**

```bash
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: `assets/css/app.css` anlegen**

```css
@import "tailwindcss";

@theme {
  /* Marke — vollständige Palette, keine weiteren Buntfarben */
  --color-brand:       #6aaa43;
  --color-brand-light: #7bc04f;
  --color-brand-dark:  #5a9236;
  --color-ink:         #20201f;
  --color-gray:        #727271;
  --color-gray-200:    #e6e6e6;
  --color-paper:       #FBFBF7;

  --font-display: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-sans:    Inter, ui-sans-serif, system-ui, sans-serif;

  --radius-wb: 0.75rem;
  --shadow-wb: 4px 4px 0 var(--color-ink);
  --shadow-wb-lg: 7px 7px 0 var(--color-ink);
}

/* Werkbank-Grundformen: einmal definiert statt in jeder Komponente wiederholt. */
@utility wb-frame {
  border: 3px solid var(--color-ink);
  border-radius: var(--radius-wb);
  box-shadow: var(--shadow-wb);
}

/* Kippt beim Hovern leicht heraus. Die Bewegung ist dekorativ und wird
   bei prefers-reduced-motion abgeschaltet. */
@utility wb-tilt {
  transition: transform 150ms ease, box-shadow 150ms ease;

  &:hover {
    transform: translate(-2px, -2px) rotate(-1.2deg);
    box-shadow: var(--shadow-wb-lg);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover { transform: none; }
  }
}
```

- [ ] **Step 4: `nuxt.config.ts` verdrahten**

Ganz oben einfügen:

```ts
import tailwindcss from '@tailwindcss/vite'
```

`css` (Zeile 110) ersetzen — `modern.css` bleibt während der Migration bestehen:

```ts
  css: [
    '@/assets/css/modern.css',
    '@/assets/css/app.css'
  ],
```

Im `vite`-Block (Zeile 114) als erste Eigenschaft ergänzen:

```ts
  vite: {
    plugins: [tailwindcss()],
    server: {
```

Den Schrift-Link (Zeile 47–51) um Space Grotesk erweitern:

```ts
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap'
        },
```

- [ ] **Step 5: Sonde einbauen, um die Utilities zu beweisen**

Tailwind erzeugt nur benutzte Klassen — ohne Verwendung beweist ein grüner Build
nichts. In `app.vue` vorübergehend direkt nach `<div id="app">` einfügen:

```html
    <div id="tw-probe" class="wb-frame wb-tilt bg-brand font-display text-paper">Sonde</div>
```

- [ ] **Step 6: Bauen und die erzeugte CSS prüfen**

```bash
npm run build
grep -r --include="*.css" -l "6aaa43" .output/public/_nuxt/ && echo "TOKEN OK"
grep -rh --include="*.css" -o "\.wb-frame{[^}]*}" .output/public/_nuxt/ | head -1
```

Erwartung: „TOKEN OK" und eine `.wb-frame`-Regel mit `border:3px solid`. Wenn
nichts gefunden wird, greift das Vite-Plugin nicht — dann `nuxt.config.ts`
prüfen, **nicht** die CSS von Hand nachbessern.

- [ ] **Step 7: Sonde wieder entfernen**

Die Zeile aus `app.vue` löschen. Sie hat ihren Zweck erfüllt.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json nuxt.config.ts assets/css/app.css
git commit -m "build: add Tailwind v4 with the existing brand tokens

Tailwind runs through the Vite plugin alongside modern.css so sections can be
migrated one at a time. The theme block carries only the colours the brand
already uses; the Werkbank primitives (contour, hard offset shadow, hover tilt)
are defined once as utilities instead of being repeated per component."
```

---

### Task 2: Scroll-Fortschritt als getestete Funktion

Die einzige echte Logik am Spool ist die Fortschrittsrechnung, und die hat
Fallstricke: Division durch null auf kurzen Seiten, Werte außerhalb 0…1 durch
Overscroll auf iOS. Das gehört getestet, die Optik nicht.

**Files:**
- Create: `utils/scrollProgress.ts`
- Create: `test/scrollProgress.test.ts`
- Create: `vitest.config.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: nichts
- Produces: `scrollProgress(scrollTop: number, scrollHeight: number, viewportHeight: number): number`
  — liefert immer einen Wert zwischen 0 und 1

- [ ] **Step 1: vitest installieren und Script eintragen**

```bash
npm install -D vitest
```

In `package.json` bei `scripts` ergänzen:

```json
    "test": "vitest run",
```

- [ ] **Step 2: `vitest.config.ts` anlegen**

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts']
  }
})
```

- [ ] **Step 3: Den fehlschlagenden Test schreiben**

`test/scrollProgress.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { scrollProgress } from '../utils/scrollProgress'

describe('scrollProgress', () => {
  it('is 0 at the top of a scrollable page', () => {
    expect(scrollProgress(0, 3000, 1000)).toBe(0)
  })

  it('is 1 at the bottom', () => {
    expect(scrollProgress(2000, 3000, 1000)).toBe(1)
  })

  it('is 0.5 halfway down', () => {
    expect(scrollProgress(1000, 3000, 1000)).toBe(0.5)
  })

  it('returns 0 when the page is not scrollable (no division by zero)', () => {
    expect(scrollProgress(0, 800, 1000)).toBe(0)
  })

  it('clamps negative scrollTop from overscroll', () => {
    expect(scrollProgress(-120, 3000, 1000)).toBe(0)
  })

  it('clamps scrollTop beyond the maximum from overscroll', () => {
    expect(scrollProgress(9999, 3000, 1000)).toBe(1)
  })
})
```

- [ ] **Step 4: Test laufen lassen und Fehlschlag bestätigen**

Run: `npm test`
Erwartung: FAIL — „Failed to resolve import '../utils/scrollProgress'"

- [ ] **Step 5: Minimale Implementierung**

`utils/scrollProgress.ts`:

```ts
/**
 * Fraction of the page that has been scrolled, always within 0…1.
 *
 * Guards two real-world cases: pages shorter than the viewport (max === 0 would
 * divide by zero) and iOS rubber-band overscroll (scrollTop can be negative or
 * exceed the maximum).
 */
export function scrollProgress(
  scrollTop: number,
  scrollHeight: number,
  viewportHeight: number
): number {
  const max = scrollHeight - viewportHeight
  if (max <= 0) return 0
  return Math.min(1, Math.max(0, scrollTop / max))
}
```

- [ ] **Step 6: Tests laufen lassen**

Run: `npm test`
Erwartung: 6 Tests bestanden

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts utils/scrollProgress.ts test/scrollProgress.test.ts
git commit -m "test: add scroll progress helper for the filament indicator

First test infrastructure in this project. Covers the two cases that actually
break in the wild: a page shorter than the viewport, and iOS rubber-band
overscroll producing values outside the range."
```

---

### Task 3: Filament-Spool-Komponente

**Files:**
- Create: `components/FilamentProgress.vue`

**Interfaces:**
- Consumes: `scrollProgress()` aus Task 2
- Produces: Komponente `<FilamentProgress />`, wird in Task 4 vom Layout eingebunden

- [ ] **Step 1: Komponente schreiben**

`components/FilamentProgress.vue`:

```vue
<template>
  <!-- Dekoratives Element: für Screenreader unsichtbar, aber der Fortschritt
       ist als Text vorhanden, falls jemand ihn doch vorgelesen bekommt. -->
  <div v-if="!hidden" class="fil" aria-hidden="true">
    <div class="fil-spool">
      <svg viewBox="0 0 92 92">
        <g :transform="`rotate(${progress * 900} 46 46)`">
          <circle cx="46" cy="46" r="40" fill="#FBFBF7" stroke="#20201f" stroke-width="5" />
          <circle cx="46" cy="46" r="27" fill="#6aaa43" stroke="#20201f" stroke-width="4" />
          <circle cx="46" cy="46" r="9" fill="#FBFBF7" stroke="#20201f" stroke-width="4" />
          <g stroke="#20201f" stroke-width="3" stroke-linecap="round">
            <line x1="46" y1="19" x2="46" y2="28" /><line x1="46" y1="64" x2="46" y2="73" />
            <line x1="19" y1="46" x2="28" y2="46" /><line x1="64" y1="46" x2="73" y2="46" />
          </g>
        </g>
      </svg>
    </div>

    <div class="fil-readout">{{ Math.round(progress * 100) }} % gedruckt</div>

    <div class="fil-track">
      <svg viewBox="0 0 1000 96" preserveAspectRatio="none">
        <path :d="railPath" fill="none" stroke="#e6e6e6" stroke-width="2"
              stroke-dasharray="2 8" stroke-linecap="round" />
        <path :d="strandPath" fill="none" stroke="#6aaa43" stroke-width="5" stroke-linecap="round" />
        <g :transform="`translate(${headX} 62)`">
          <rect x="-13" y="-30" width="26" height="26" rx="4" fill="#FBFBF7" stroke="#20201f" stroke-width="4" />
          <path d="M -7 -4 L 7 -4 L 0 6 Z" fill="#6aaa43" stroke="#20201f" stroke-width="3.5" stroke-linejoin="round" />
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { scrollProgress } from '~/utils/scrollProgress'

const X0 = 100
const X1 = 1000
const Y = 62

const progress = ref(0)
const hidden = ref(false)
let reduceMotion = false
let ticking = false

const headX = computed(() => X0 + (X1 - X0) * progress.value)
const railPath = `M ${X0} ${Y} L ${X1} ${Y}`

// Leichter Durchhang, damit der Strang nicht wie ein Lineal wirkt.
const strandPath = computed(() => {
  const x = headX.value
  const midX = X0 + (x - X0) / 2
  const sag = Y + Math.min(16, (x - X0) * 0.035)
  return `M ${X0} ${Y} Q ${midX} ${sag} ${x} ${Y}`
})

function update() {
  ticking = false
  if (reduceMotion) { progress.value = 1; return }
  const el = document.scrollingElement || document.documentElement
  progress.value = scrollProgress(el.scrollTop, el.scrollHeight, window.innerHeight)
}

function onScroll() {
  if (!ticking) { ticking = true; requestAnimationFrame(update) }
}

// Der Cookie-Banner sitzt ebenfalls unten. Solange er offen ist, tritt der
// Spool zurück — zwei gestapelte Leisten verdecken den Seiteninhalt.
function syncBannerCollision() {
  hidden.value = !!document.querySelector('.cookie-consent:not([hidden])')
}

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  syncBannerCollision()
  update()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<style scoped>
.fil-track {
  position: fixed; left: 0; right: 0; bottom: 0; height: 96px;
  pointer-events: none; z-index: 40;
}
.fil-track svg { width: 100%; height: 100%; display: block; }

.fil-spool {
  position: fixed; left: 18px; bottom: 14px; width: 92px; height: 92px;
  pointer-events: none; z-index: 41;
}

.fil-readout {
  position: fixed; left: 120px; bottom: 58px; z-index: 42; pointer-events: none;
  font-family: var(--font-display); font-weight: 700; font-size: 11px;
  letter-spacing: .08em; text-transform: uppercase; color: var(--color-gray);
  background: var(--color-paper); border: 2px solid var(--color-ink);
  border-radius: 999px; padding: 5px 10px; box-shadow: 2px 2px 0 var(--color-ink);
}

/* Auf dem Telefon ist unten links kein freier Platz: nur eine dünne
   Fortschrittslinie, kein Spool und keine Anzeige. */
@media (max-width: 767px) {
  .fil-spool, .fil-readout { display: none; }
  .fil-track { height: 6px; }
}
</style>
```

- [ ] **Step 2: Tests weiterhin grün**

Run: `npm test`
Erwartung: 6 Tests bestanden (die Komponente ändert die Funktion nicht)

- [ ] **Step 3: Klassennamen des Cookie-Banners verifizieren**

Run: `grep -n "class=" components/CookieConsent.vue | head -5`

Der Selektor `.cookie-consent` in `syncBannerCollision()` muss zur echten Klasse
passen. Weicht sie ab, den Selektor in der Komponente anpassen — **nicht** den
Banner umbenennen, der ist nicht Teil dieses Plans.

- [ ] **Step 4: Commit**

```bash
git add components/FilamentProgress.vue
git commit -m "feat: add scroll-driven filament spool

A spool at the bottom left pays out filament as the page scrolls, doubling as a
progress indicator. Honours prefers-reduced-motion by standing still, drops to a
plain 6px line below 768px, and steps aside while the cookie banner occupies the
bottom edge."
```

---

### Task 4: Gemeinsames Layout

Header und Footer sind heute pro Seite dupliziert: `index.vue` und
`portfolio.vue` haben beides, `coaster-catalog.vue` nur den Footer,
`impressum.vue` keins von beidem. Ein Layout beendet das.

**Files:**
- Create: `layouts/default.vue`
- Modify: `pages/index.vue`, `pages/portfolio.vue`, `pages/coaster-catalog.vue`
- Modify: `app.vue`

**Interfaces:**
- Consumes: `<FilamentProgress />` aus Task 3
- Produces: Layout, das auf allen Seiten Header, Footer und Spool stellt

- [ ] **Step 1: `layouts/default.vue` anlegen**

```vue
<template>
  <div>
    <TheHeader />
    <main>
      <slot />
    </main>
    <TheFooter />
    <ClientOnly>
      <FilamentProgress />
    </ClientOnly>
  </div>
</template>
```

`ClientOnly`, weil der Spool `window` und `document` liest — ohne das bricht
der SSR-Durchlauf.

- [ ] **Step 2: `app.vue` auf das Layout umstellen**

```vue
<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <WhatsAppButton />
      <CookieConsent />
      <BackToTop />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
</script>
```

- [ ] **Step 3: Doppelte Einbindungen aus den Seiten entfernen**

In `pages/index.vue` die Zeilen `<TheHeader />`, `<TheFooter />` sowie das
umschließende `<main>` löschen — das Layout stellt beides. In
`pages/portfolio.vue` ebenso, in `pages/coaster-catalog.vue` den `<TheFooter />`.

- [ ] **Step 4: Alle vier Seiten prüfen**

```bash
npm run build
PORT=5099 node .output/server/index.mjs &
sleep 4
for u in / /portfolio /coaster-catalog /impressum; do
  printf "%-18s %s\n" "$u" "$(curl -sS -o /dev/null -w '%{http_code}' http://127.0.0.1:5099$u)"
done
curl -fsS http://127.0.0.1:5099/impressum | grep -c "<footer"
kill %1
```

Erwartung: viermal `200`, und das Impressum enthält jetzt einen Footer, den es
vorher nicht hatte.

- [ ] **Step 5: Commit**

```bash
git add layouts/default.vue app.vue pages/index.vue pages/portfolio.vue pages/coaster-catalog.vue
git commit -m "refactor: move header and footer into a default layout

They were duplicated per page and inconsistently applied — the imprint had
neither, the catalogue only a footer. The layout also hosts the filament
indicator so every page gets it."
```

---

### Task 5: Header im Werkbank-Stil

Die Navigation zeigt heute acht Punkte, davon vier auf Anker der alten
Startseitenstruktur (`#services`, `#etsy`, `#pricing-calculator`, `#faq`), die
mit Struktur X verschwinden.

**Files:**
- Modify: `components/TheHeader.vue` (164 Zeilen, wird ersetzt)

**Interfaces:**
- Consumes: Utilities aus Task 1
- Produces: `<TheHeader />` mit der neuen Navigation

- [ ] **Step 1: Template ersetzen**

```vue
<template>
  <header class="sticky top-0 z-30 border-b-[3px] border-ink bg-paper">
    <nav class="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
      <NuxtLink to="/" class="flex items-center gap-3 font-display font-bold text-ink">
        <img src="/logo.png" alt="" width="40" height="40"
             class="rounded-full border-[2.5px] border-ink" />
        <span class="hidden sm:inline">3D Print Shop Harm</span>
      </NuxtLink>

      <ul class="ml-auto hidden items-center gap-1 md:flex">
        <li v-for="item in nav" :key="item.to">
          <NuxtLink :to="item.to"
                    class="rounded-lg px-3 py-2 font-display text-sm font-bold text-ink hover:bg-brand hover:text-paper">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>

      <button class="ml-auto md:hidden wb-frame bg-paper px-3 py-2 font-display text-sm font-bold"
              :aria-expanded="menuOpen" aria-controls="mobile-nav"
              @click="menuOpen = !menuOpen">
        {{ menuOpen ? 'Schließen' : 'Menü' }}
      </button>
    </nav>

    <ul v-show="menuOpen" id="mobile-nav" class="border-t-[3px] border-ink bg-paper md:hidden">
      <li v-for="item in nav" :key="item.to" class="border-b border-gray-200 last:border-0">
        <NuxtLink :to="item.to" class="block px-4 py-3 font-display font-bold text-ink"
                  @click="menuOpen = false">
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuOpen = ref(false)

// Nur Ziele, die es heute gibt. /katalog und die Workshop-Sektion entstehen in
// Teil 2 und 3; bis dahin verlinkt hier nichts ins Leere. Die Anker #services
// und #contact stammen aus den noch bestehenden Sektionen der Startseite.
const nav = [
  { to: '/coaster-catalog', label: 'Katalog' },
  { to: '/#services', label: 'Auftragsdruck' },
  { to: '/#contact', label: 'Kontakt' }
]
</script>
```

- [ ] **Step 2: Bauen und beide Breiten prüfen**

```bash
npm run build
PORT=5099 node .output/server/index.mjs &
sleep 4
curl -fsS http://127.0.0.1:5099/ | grep -o "Katalog\|Auftragsdruck\|Kontakt" | sort -u
kill %1
```

Erwartung: alle drei Labels erscheinen. Danach visuell prüfen: bei 390 px muss
der Menü-Button sichtbar sein und die Liste beim Klick aufklappen, bei 1280 px
die waagerechte Navigation.

- [ ] **Step 3: Commit**

```bash
git add components/TheHeader.vue
git commit -m "feat: rebuild the header in the new visual language

Three entries instead of eight — the removed ones pointed at anchors that
structure X drops. Workshops joins once its section exists in part 3; a nav item
pointing at a section that does not exist yet is a broken link in production. The mobile menu is now a labelled button with aria-expanded
rather than three unlabelled bars."
```

---

### Task 6: Footer im Werkbank-Stil

**Files:**
- Modify: `components/TheFooter.vue` (78 Zeilen)

**Interfaces:**
- Consumes: Utilities aus Task 1
- Produces: `<TheFooter />`

- [ ] **Step 1: Template ersetzen**

Die drei externen Links und das Impressum sind aus dem alten Footer übernommen;
die internen Anker (`#home`, `#services`, `#portfolio`, `#about`) fallen weg,
weil es diese Abschnitte nach Struktur X nicht mehr gibt. Der untere
Innenabstand hält den Inhalt über dem Filament-Strang frei:

```vue
<template>
  <footer class="border-t-[3px] border-ink bg-ink pb-28 pt-12 text-paper">
    <div class="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3">
      <div>
        <p class="font-display text-lg font-bold">3D Print Shop Harm</p>
        <p class="mt-2 font-sans text-sm text-gray-200">
          Krete 8, 23701 Eutin<br />
          Keine festen Öffnungszeiten — Besuche nach Terminabsprache.
        </p>
        <a href="mailto:service@3dps.space"
           class="mt-3 inline-block font-sans text-sm text-brand-light">service@3dps.space</a>
      </div>

      <div>
        <p class="font-display text-sm font-bold uppercase tracking-wider">Wo du uns findest</p>
        <ul class="mt-3 space-y-2 font-sans text-sm text-gray-200">
          <li><a class="hover:text-brand-light" href="https://www.etsy.com/de-en/shop/3DPrintShopHarm" target="_blank" rel="noopener noreferrer">Etsy-Shop</a></li>
          <li><a class="hover:text-brand-light" href="https://www.instagram.com/3d.print.shop.harm" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a class="hover:text-brand-light" href="https://www.facebook.com/profile.php?id=61551244577763" target="_blank" rel="noopener noreferrer">Facebook</a></li>
        </ul>
      </div>

      <div>
        <p class="font-display text-sm font-bold uppercase tracking-wider">Seite</p>
        <ul class="mt-3 space-y-2 font-sans text-sm text-gray-200">
          <li><NuxtLink class="hover:text-brand-light" to="/coaster-catalog">Katalog</NuxtLink></li>
          <li><NuxtLink class="hover:text-brand-light" to="/impressum">Impressum</NuxtLink></li>
        </ul>
      </div>
    </div>

    <p class="mx-auto mt-10 max-w-6xl px-4 font-sans text-xs text-gray">
      © {{ new Date().getFullYear() }} 3D Print Shop Harm
    </p>
  </footer>
</template>
```

- [ ] **Step 2: Kein Link verloren**

Gegen `HEAD` vergleichen, nicht über `git stash` — der Vergleich muss auch dann
greifen, wenn die neue Fassung schon committet ist:

```bash
git show HEAD:components/TheFooter.vue | grep -oE 'https?://[^"]+' | sort -u > /tmp/links-alt.txt
grep -oE 'https?://[^"]+' components/TheFooter.vue | sort -u > /tmp/links-neu.txt
comm -23 /tmp/links-alt.txt /tmp/links-neu.txt
grep -c "/impressum" components/TheFooter.vue
```

Erwartung: keine Ausgabe aus `comm` (jede Zeile wäre ein verlorener externer
Link), und mindestens ein Treffer für `/impressum` — das ist Pflichtangabe.

- [ ] **Step 3: Commit**

```bash
git add components/TheFooter.vue
git commit -m "feat: rebuild the footer in the new visual language

Same links, new surface. The bottom padding keeps the content clear of the
filament strand."
```

---

### Task 7: Hero mit den drei Wegen

**Files:**
- Modify: `components/TheHero.vue`

**Interfaces:**
- Consumes: Utilities aus Task 1
- Produces: `<TheHero />` — erster Abschnitt der Startseite nach Struktur X

- [ ] **Step 1: Template ersetzen**

```vue
<template>
  <section class="bg-paper px-4 py-16">
    <div class="mx-auto max-w-6xl">
      <span class="wb-frame inline-block bg-brand px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-paper">
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
                  class="wb-frame wb-tilt block bg-white p-5" :class="path.tone">
          <span class="font-display text-xl font-bold text-ink">{{ path.title }}</span>
          <span class="mt-1 block font-sans text-sm text-gray">{{ path.text }}</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Die drei Wege aus dem Spec. Reihenfolge folgt der Gewichtung: Shop und
// Workshops sind die Wachstumsfelder, Auftragsdruck bleibt bewusst kleiner.
// Die Workshop-Sektion entsteht erst in Teil 3. Bis dahin führt die Karte zum
// Kontaktformular — der Untertitel sagt das ehrlich, statt ins Leere zu zeigen.
const paths = [
  { to: '/coaster-catalog', title: 'Shop & Designs', text: 'Untersetzer, Deko, Fandom-Motive', tone: 'bg-brand/10' },
  { to: '/#contact', title: 'Workshops', text: '3D-Druck, Blender, Cosplay-Foto — Termine auf Anfrage', tone: 'bg-brand-light/15' },
  { to: '/#services', title: 'Auftragsdruck', text: 'Prototypen, Ersatzteile, Kleinserie', tone: 'bg-gray-200/40' }
]
</script>
```

- [ ] **Step 2: Bauen und Inhalt prüfen**

```bash
npm run build
PORT=5099 node .output/server/index.mjs &
sleep 4
curl -fsS http://127.0.0.1:5099/ | grep -c "Designs, die man anfassen kann"
curl -fsS http://127.0.0.1:5099/ | grep -o "Shop & Designs\|Workshops\|Auftragsdruck" | sort -u
kill %1
```

Erwartung: die Headline einmal, alle drei Wege vorhanden.

- [ ] **Step 3: Visuell prüfen, auch ohne Bewegung**

Bei 390 px und 1280 px ansehen. Danach im Browser „Bewegung reduzieren"
einschalten und neu laden: die Karten dürfen beim Hovern nicht mehr kippen, der
Spool nicht mehr drehen.

- [ ] **Step 4: Commit**

```bash
git add components/TheHero.vue
git commit -m "feat: rebuild the hero with three entry points

Replaces the full-bleed gradient and the interchangeable claim. The three paths
are ordered by what the site can actually move: shop and workshops lead, jobbing
print stays deliberately smaller."
```

---

### Task 8: Ausliefern und nachweisen

**Files:** keine

- [ ] **Step 1: Vollständiger Durchlauf lokal**

```bash
npm test && npm run build
```

Erwartung: 6 Tests bestanden, Build ohne Fehler.

- [ ] **Step 2: Assets im Build vorhanden**

```bash
ls .output/public/_nuxt/ | grep -cE "\.(js|css)$"
```

Erwartung: mehr als 0. Steht dort 0, fehlen die Client-Assets — dieselbe Falle
wie am 24.08.; dann `nuxt.config.ts` auf `vite.build.rollupOptions` prüfen.

- [ ] **Step 3: Lokal am gebauten Server nachweisen**

Die Arbeit läuft auf `redesign/fundament`; ein Push löst **keinen** Deploy aus
(die Pipeline hängt an `master`). Deshalb wird hier lokal nachgewiesen, was sonst
gegen die Live-Seite geprüft würde:

```bash
PORT=5099 node .output/server/index.mjs &
sleep 4
for a in $(curl -fsS http://127.0.0.1:5099/ | grep -oE '/_nuxt/[^"]*\.(js|css)"' | tr -d '"' | sort -u); do
  printf "%-40s %s\n" "$a" "$(curl -sS -o /dev/null -w '%{http_code}' http://127.0.0.1:5099$a)"
done
curl -fsS http://127.0.0.1:5099/ | grep -c "Designs, die man anfassen kann"
kill %1
```

Erwartung: jedes Asset `200`, Headline genau einmal.

- [ ] **Step 4: Im Browser prüfen, was HTTP-Codes nicht zeigen**

Bei 390 px und 1280 px ansehen: Spool läuft beim Scrollen, Menü-Button klappt
auf (die Seite ist also hydriert), Karten kippen beim Hovern. Danach „Bewegung
reduzieren" aktivieren und neu laden — Spool steht still, Karten kippen nicht.

- [ ] **Step 5: Branch pushen**

```bash
git push -u origin redesign/fundament
```

Kein Deploy, keine Pipeline. Der Weg auf die Produktion wird nach dem finalen
Review entschieden.

---

## Nicht in diesem Plan

- **Teil 2 — Katalog-Schaufenster:** `data/coasters.json`, `scripts/sync-coasters.mjs`,
  die Seite `/katalog`, die 301-Weiterleitungen, Tests für die Datenzuordnung
- **Teil 3 — restliche Sektionen und Unterseiten:** Katalog-Teaser, Workshops,
  Conventions, Auftragsdruck, Werkstatt, Kontakt; danach `modern.css` und die
  verwaisten Komponenten löschen
- **Offene Punkte aus §9 des Specs** — Fakten übers Unternehmen, Convention-Daten,
  Werkstattfoto, Datenschutzerklärung
