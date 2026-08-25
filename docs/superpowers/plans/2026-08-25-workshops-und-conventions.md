# Redesign, Teil 2: Workshops und Con-Kalender — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zwei neue Abschnitte auf der Startseite — eine Workshop-Übersicht aus
den echten Präsentationsinhalten und ein Con-Kalender, den der Betreiber über
eine Datei pflegt — plus eine Übersichtsseite `/workshops`.

**Architecture:** Beide Abschnitte sind datengetrieben: `data/workshops.json`
wird einmalig aus den `.pptx` erzeugt und danach von Hand gepflegt,
`data/conventions.json` pflegt der Betreiber selbst. Die einzige echte Logik —
welche Termine noch anstehen — ist eine reine Funktion mit Tests. Die
Darstellung nutzt die Werkbank-Utilities aus Teil 1.

**Tech Stack:** Nuxt 3.21.11, Vue 3.5, Tailwind v4, vitest

**Spec:** `docs/superpowers/specs/2026-08-25-redesign-design.md` (§4 Revision, §5b)

**Voraussetzung:** Dieser Plan baut auf `redesign/fundament` auf. Der Branch ist
fertig und reviewt, aber **nicht gemerged** — das ist eine bewusste Entscheidung
des Betreibers. Teil 2 zweigt von ihm ab, nicht von `master`.

## Global Constraints

- **Farben ausschließlich:** `#6aaa43`, `#7bc04f`, `#5a9236`, `#20201f`,
  `#727271`, `#e6e6e6`, `#FBFBF7` — im Regelfall nur über Tailwind-Klassen
- **Anrede durchgängig „du"**
- **Keine erfundenen Fakten.** Insbesondere: keine Dauer, kein Preis, keine
  Teilnehmerzahl bei den Workshops. Fehlt eine Angabe, steht dort „auf Anfrage"
- **Kontrast mindestens 4,5:1** für Fließtext. `text-gray` (#727271) reicht auf
  hellem Grund knapp nicht, wenn die Fläche getönt ist — auf getönten Karten
  `text-ink/75` verwenden
- **Niemals heller Text auf `bg-brand`.** `text-paper` auf `#6aaa43` ergibt
  **2,72:1** und verfehlt sogar die 3:1 für Großtext; `bg-brand-dark` bringt nur
  3,62:1. Auf Grün gehört `text-ink` (**5,78:1**). Gilt auch für Hover-Zustände
- **Echte Überschriften**, keine fett gestylten `<p>`. Die Startseite hat genau
  ein `<h1>` (im Hero); Abschnittsüberschriften sind `<h2>`, Karten darin `<h3>`
- **`prefers-reduced-motion: reduce`** schaltet dekorative Bewegung ab. Das
  erledigt die `wb-tilt`-Utility — keine eigenen Hover-Transforms schreiben
- **Keine `<style scoped>`-Blöcke in neuen Komponenten.** Sie sind ungeschichtet
  und schlagen jede Tailwind-Utility; das hat in Teil 1 zwei Anläufe gekostet
- **Deutsch** für sichtbare Texte, **Englisch** für Code, Kommentare, Commits
- **Keine Nennung von Claude oder KI** in Commit-Nachrichten
- Port 3000 ist belegt — für den gebauten Server **PORT=5099**
- `Vorträge/` niemals `git add`

---

## Dateistruktur

| Datei | Verantwortung |
| --- | --- |
| `utils/conventions.ts` | reine Filter- und Sortierlogik für Termine, getestet |
| `test/conventions.test.ts` | Tests dazu |
| `data/conventions.json` | vom Betreiber gepflegte Termine |
| `components/TheConventions.vue` | Abschnitt „Wo ihr uns trefft" inkl. Leerzustand |
| `scripts/extract-workshops.mjs` | einmalige Extraktion aus den `.pptx` |
| `data/workshops.json` | Workshop-Daten, danach von Hand gepflegt |
| `components/TheWorkshops.vue` | Abschnitt auf der Startseite |
| `pages/workshops.vue` | Übersichtsseite mit allen Formaten |
| `pages/index.vue` | bindet die zwei neuen Abschnitte ein |

---

### Task 1: Termin-Logik mit Tests

Die einzige Stelle mit echter Logik. Fallstricke: ein laufender Termin (heute
liegt zwischen Start und Ende) muss sichtbar bleiben, nicht verschwinden.

**Files:**
- Create: `utils/conventions.ts`, `test/conventions.test.ts`

**Interfaces:**
- Consumes: nichts
- Produces: `upcomingConventions(list: Convention[], today: string): Convention[]`
  und das Interface `Convention`

- [ ] **Step 1: Den fehlschlagenden Test schreiben**

`test/conventions.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { upcomingConventions, type Convention } from '../utils/conventions'

const con = (name: string, from: string, to: string): Convention => ({
  name, from, to, city: 'Eutin', venue: '', stand: '', url: ''
})

describe('upcomingConventions', () => {
  it('hides events that ended before today', () => {
    const list = [con('Vergangen', '2026-03-01', '2026-03-02')]
    expect(upcomingConventions(list, '2026-08-25')).toEqual([])
  })

  it('keeps an event that is running today', () => {
    const list = [con('Laeuft', '2026-08-24', '2026-08-26')]
    expect(upcomingConventions(list, '2026-08-25').map(c => c.name)).toEqual(['Laeuft'])
  })

  it('keeps an event that ends today', () => {
    const list = [con('Endet heute', '2026-08-20', '2026-08-25')]
    expect(upcomingConventions(list, '2026-08-25').map(c => c.name)).toEqual(['Endet heute'])
  })

  it('sorts the remaining events by start date', () => {
    const list = [
      con('Spaeter', '2026-11-01', '2026-11-02'),
      con('Frueher', '2026-09-01', '2026-09-02')
    ]
    expect(upcomingConventions(list, '2026-08-25').map(c => c.name))
      .toEqual(['Frueher', 'Spaeter'])
  })

  it('returns an empty array for an empty list', () => {
    expect(upcomingConventions([], '2026-08-25')).toEqual([])
  })

  it('does not mutate the input array', () => {
    const list = [con('B', '2026-11-01', '2026-11-02'), con('A', '2026-09-01', '2026-09-02')]
    upcomingConventions(list, '2026-08-25')
    expect(list.map(c => c.name)).toEqual(['B', 'A'])
  })
})
```

- [ ] **Step 2: Test laufen lassen, Fehlschlag bestätigen**

Run: `npm test`
Erwartung: FAIL — „Failed to resolve import '../utils/conventions'"

- [ ] **Step 3: Implementierung**

`utils/conventions.ts`:

```ts
export interface Convention {
  name: string
  /** ISO date, first day, e.g. "2026-09-14" */
  from: string
  /** ISO date, last day. An event is shown through the end of this day. */
  to: string
  city: string
  venue: string
  stand: string
  url: string
}

/**
 * Events that have not finished yet, earliest first.
 *
 * Compares ISO date strings directly — they sort lexicographically, which
 * avoids timezone surprises from Date parsing on the server. An event running
 * across today stays visible: the cut-off is its end date, not its start.
 */
export function upcomingConventions(list: Convention[], today: string): Convention[] {
  return list
    .filter(c => c.to >= today)
    .slice()
    .sort((a, b) => a.from.localeCompare(b.from))
}
```

- [ ] **Step 4: Tests laufen lassen**

Run: `npm test`
Erwartung: 12 bestanden (6 aus Teil 1, 6 neue)

- [ ] **Step 5: Beweisen, dass die Tests etwas prüfen**

Ändere `c.to >= today` versuchsweise in `c.from >= today` und lass `npm test`
laufen: der Test „keeps an event that is running today" **muss** fehlschlagen.
Danach zurückändern und erneut testen. Beide Ausgaben in den Report.

- [ ] **Step 6: Commit**

```bash
git add utils/conventions.ts test/conventions.test.ts
git commit -m "feat(conventions): add upcoming-event filtering with tests

Compares ISO strings rather than Date objects to keep the server timezone out
of it. An event running across today stays visible — the cut-off is its end
date, which is the case a naive start-date filter gets wrong."
```

---

### Task 2: Con-Kalender-Abschnitt

**Files:**
- Create: `data/conventions.json`, `components/TheConventions.vue`

**Interfaces:**
- Consumes: `upcomingConventions`, `Convention` aus Task 1
- Produces: `<TheConventions />`

- [ ] **Step 1: Datendatei anlegen**

`data/conventions.json` — **leer starten.** Der Betreiber trägt seine echten
Termine selbst ein; erfundene Beispieltermine dürfen nicht in die Datei, weil
sie sonst live gehen könnten:

```json
{
  "conventions": []
}
```

- [ ] **Step 2: Komponente schreiben**

`components/TheConventions.vue`:

```vue
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
import { upcomingConventions, type Convention } from '~/utils/conventions'
import { siteLinks } from '~/utils/siteLinks'
import data from '~/data/conventions.json'

const MONTHS = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']

// Computed once per render on the server. Good enough: the list changes at
// midnight and the page is server-rendered per request.
const today = new Date().toISOString().slice(0, 10)
const upcoming = upcomingConventions(data.conventions as Convention[], today)

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
```

- [ ] **Step 3: Beide Zustände prüfen**

Mit leerer Datei bauen und den Leerzustand im gerenderten HTML nachweisen:

```bash
npm run build
(PORT=5099 node .output/server/index.mjs >/tmp/nitro.log 2>&1 &)
sleep 5
curl -fsS http://127.0.0.1:5099/ | grep -c "stehen noch nicht fest"
```

Erwartung: `1`.

Danach **vorübergehend** zwei Termine eintragen (einen vergangenen, einen
künftigen), neu bauen, und prüfen dass nur der künftige erscheint. **Datei
danach wieder auf `{"conventions": []}` zurücksetzen** — Beispieltermine dürfen
nicht committet werden.

```bash
pkill -f "index.mjs"
```

- [ ] **Step 4: Commit**

```bash
git add data/conventions.json components/TheConventions.vue
git commit -m "feat(conventions): add the where-to-find-us section

Ships with an empty data file: the operator fills in real dates, and invented
placeholders must never reach production. The empty state is part of the
component, not an afterthought — this is the one section that runs dry on its
own out of season."
```

---

### Task 3: Workshop-Daten aus den Präsentationen

**Files:**
- Create: `scripts/extract-workshops.mjs`, `data/workshops.json`

**Interfaces:**
- Produces: `data/workshops.json` mit `families[]`, jede mit `formats[]`

- [ ] **Step 1: Extraktionsskript schreiben**

`scripts/extract-workshops.mjs` — liest die `.pptx` im Ordner `Vorträge/`, holt
Titel und Agenda aus den ersten beiden Folien:

```js
// One-off extraction of workshop content from the .pptx decks in Vorträge/.
// A .pptx is a zip of XML; slide text sits in <a:t> elements. The two Keynote
// files in that folder are not readable this way — they are listed in the
// output with empty agendas so the gap is visible rather than silent.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { execSync } from 'node:child_process'

const DIR = 'Vorträge'

function slideText(file, slide) {
  const xml = execSync(`unzip -p ${JSON.stringify(file)} ppt/slides/slide${slide}.xml`,
    { maxBuffer: 20 * 1024 * 1024 }).toString()
  return [...xml.matchAll(/<a:t>(.*?)<\/a:t>/g)]
    .map(m => m[1].replace(/&amp;/g, '&').trim())
    .filter(Boolean)
}

const decks = readdirSync(DIR).filter(f => f.endsWith('.pptx'))
console.log(`Found ${decks.length} .pptx decks`)
for (const d of decks) {
  console.log('---', d)
  console.log('  title slide:', slideText(`${DIR}/${d}`, 1).slice(0, 8).join(' | '))
  console.log('  agenda:     ', slideText(`${DIR}/${d}`, 2).slice(0, 20).join(' | '))
}
```

Run: `node scripts/extract-workshops.mjs`

- [ ] **Step 2: `data/workshops.json` aus der Ausgabe schreiben**

Von Hand, aus dem was das Skript ausgibt. **Nichts hinzuerfinden.** Die beiden
Keynote-Formate bekommen `"summary": ""` und `"agenda": []`.

> **Achtung, das folgende JSON zeigt nur die Struktur.** Seine Inhalte sind
> Platzhalter und stimmen *nicht* mit den echten Folien überein — die
> Aufbau-Agenda „Modellieren/Drucken/Lackieren" etwa kommt in keiner
> Präsentation vor. Jeder Wert für `summary` und `agenda` muss aus der
> Skript-Ausgabe stammen, nicht von hier.

```json
{
  "families": [
    {
      "slug": "3d-druck",
      "name": "3D-Druck",
      "formats": [
        { "slug": "3d-druck-einsteiger", "title": "Einsteiger", "level": "Stufe 1",
          "summary": "", "agenda": [] },
        { "slug": "3d-druck-aufbau", "title": "Aufbau · Fortgeschrittene", "level": "Stufe 2",
          "summary": "3D-Druck für Cosplay — vom Modell zum lackierten Teil.",
          "agenda": ["Modellieren", "Drucken", "Lackieren"] }
      ]
    },
    {
      "slug": "blender",
      "name": "Blender",
      "formats": [
        { "slug": "blender-crashkurs", "title": "Crashkurs", "level": "2 Stunden Hands-on",
          "summary": "", "agenda": [] }
      ]
    },
    {
      "slug": "cosplay-fotografie",
      "name": "Cosplay-Fotografie",
      "formats": [
        { "slug": "cosplay-foto-1", "title": "Einstieg", "level": "Stufe 1",
          "summary": "Ausrüstung, Belichtung und die ersten guten Bilder.",
          "agenda": ["Kamera & Basics", "Belichtung", "Bildgestaltung", "Licht & Praxis"] },
        { "slug": "cosplay-foto-2", "title": "Fortgeschritten", "level": "Stufe 2",
          "summary": "Volle manuelle Kontrolle und Licht, das du selbst formst.",
          "agenda": ["Manuell & Objektive", "Licht formen", "Blitz entfesselt"] },
        { "slug": "cosplay-foto-3", "title": "Experte", "level": "Stufe 3",
          "summary": "Konzept, Mehrlicht-Setups und Shootings vor Ort.",
          "agenda": ["Konzept & Licht", "On-Location High-End", "HSS & ND-Filter"] }
      ]
    }
  ]
}
```

Die Agenda-Einträge der drei Cosplay-Stufen und die Aufbau-Zeile müssen mit der
Skript-Ausgabe übereinstimmen — vergleiche Zeile für Zeile, bevor du committest.

- [ ] **Step 3: Commit**

```bash
git add scripts/extract-workshops.mjs data/workshops.json
git commit -m "feat(workshops): extract workshop content from the decks

Content comes from the four .pptx decks. The two Keynote files cannot be read
this way, so their formats ship with empty summaries — a visible gap rather
than invented copy."
```

---

### Task 4: Workshop-Abschnitt auf der Startseite

**Files:**
- Create: `components/TheWorkshops.vue`

- [ ] **Step 1: Komponente schreiben**

```vue
<template>
  <section id="workshops" class="bg-gray-200/40 py-16">
    <div class="mx-auto max-w-6xl px-4">
      <h2 class="font-display text-3xl font-bold tracking-tight text-ink">Workshops</h2>
      <p class="mt-2 max-w-xl font-sans text-gray">
        Drei Reihen, aufeinander aufbauend. Du steigst da ein, wo du stehst.
      </p>

      <div class="mt-8 space-y-4">
        <article v-for="fam in families" :key="fam.slug" class="wb-frame bg-paper p-5">
          <h3 class="font-display text-xl font-bold text-ink">{{ fam.name }}</h3>
          <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="f in fam.formats" :key="f.slug" class="wb-frame bg-paper p-4">
              <!-- Not every deck names a level. An empty badge would be worse
                   than none, so it only renders when the data says something. -->
              <span v-if="f.level"
                    class="wb-frame inline-block bg-brand px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-widest text-ink">
                {{ f.level }}
              </span>
              <h4 class="mt-2 font-display text-base font-bold text-ink">{{ f.title }}</h4>
              <p v-if="f.summary" class="mt-1 font-sans text-sm text-ink/75">{{ f.summary }}</p>
              <ul v-if="f.agenda.length" class="mt-2 list-disc pl-5 font-sans text-xs text-ink/75">
                <li v-for="a in f.agenda" :key="a">{{ a }}</li>
              </ul>
            </div>
          </div>
        </article>
      </div>

      <p class="mt-6 font-sans text-sm text-gray">
        Termine und Konditionen auf Anfrage —
        <NuxtLink :to="siteLinks.contact" class="text-brand underline">schreib uns kurz</NuxtLink>,
        was du vorhast.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { siteLinks } from '~/utils/siteLinks'
import data from '~/data/workshops.json'

const families = data.families
</script>
```

- [ ] **Step 2: Commit**

```bash
git add components/TheWorkshops.vue
git commit -m "feat(workshops): add the workshops section

Three series with their levels, so a visitor can see where to start. Duration
and price are deliberately absent — they are not known and are not invented."
```

---

### Task 5: Übersichtsseite und Einbindung

**Files:**
- Create: `pages/workshops.vue`
- Modify: `pages/index.vue`, `utils/siteLinks.ts`

- [ ] **Step 1: `utils/siteLinks.ts` um den Workshop-Pfad ergänzen**

Ergänze `workshops: '/workshops'` und ersetze in `TheHero.vue` das Ziel der
Workshops-Karte durch `siteLinks.workshops` — der Zwischenstand, der auf das
Kontaktformular zeigte, ist damit abgelöst.

- [ ] **Step 2: `pages/workshops.vue` anlegen**

```vue
<template>
  <div>
    <section class="bg-paper py-16">
      <div class="mx-auto max-w-6xl px-4">
        <h1 class="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Workshops
        </h1>
        <p class="mt-4 max-w-xl font-sans text-lg text-gray">
          Was wir zeigen, machen wir selbst — die Beispiele stammen aus unserer
          eigenen Werkstatt.
        </p>
      </div>
    </section>
    <TheWorkshops />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Workshops — 3D Print Shop Harm' })
</script>
```

Achtung: `TheWorkshops` bringt bereits ein `<h2>` mit. Auf dieser Seite ist das
`<h1>` die Seitenüberschrift — es darf nur eines geben.

- [ ] **Step 3: Startseite ergänzen**

In `pages/index.vue` nach `<TheEtsyShop />` einfügen:

```html
      <TheWorkshops />
      <TheConventions />
```

- [ ] **Step 4: Prüfen**

```bash
npm test && npm run build
(PORT=5099 node .output/server/index.mjs >/tmp/nitro.log 2>&1 &)
sleep 5
for u in / /workshops; do printf "%-12s %s\n" "$u" "$(curl -sS -o /dev/null -w '%{http_code}' http://127.0.0.1:5099$u)"; done
curl -fsS http://127.0.0.1:5099/ | grep -c "Wo ihr uns trefft"
curl -fsS http://127.0.0.1:5099/workshops | grep -oE "<h1[^>]*>" | wc -l
curl -fsS http://127.0.0.1:5099/ | grep -oE "<h1[^>]*>" | wc -l
pkill -f "index.mjs"
```

Erwartung: beide Seiten `200`, der Con-Abschnitt einmal vorhanden, und **genau
ein `<h1>` je Seite**.

- [ ] **Step 5: Commit**

```bash
git add pages/workshops.vue pages/index.vue utils/siteLinks.ts components/TheHero.vue
git commit -m "feat(workshops): add the overview page and wire both sections in

The hero's workshops card now points at the real section instead of the contact
form — the interim target from part 1 is no longer needed."
```

---

### Task 6: Abnahme

**Files:** keine

- [ ] **Step 1: Vollständiger Durchlauf**

`npm test` (12 bestanden), `npm run build`, und
`ls .output/public/_nuxt/ | grep -cE "\.(js|css)$"` größer 0.

- [ ] **Step 2: Im Browser messen, nicht vermuten**

Bei 1280 px und 390 px ansehen. Konkret prüfen:
- Der Con-Abschnitt zeigt den Leerzustand, nicht eine leere Fläche
- Die Workshop-Karten kippen beim Hovern, und **nicht** bei aktiviertem
  „Bewegung reduzieren"
- Der Untertitel-Text auf den getönten Karten hat mindestens 4,5:1 Kontrast
- Tastaturnavigation durch die Workshop-Links zeigt den Fokusring aus Teil 1

- [ ] **Step 3: Branch pushen**

```bash
git push
```

Kein Deploy — der Branch hängt nicht an der Pipeline.

---

## Nicht in diesem Plan

- **Ausräumen der Startseite** (Portfolio → `/auftragsdruck`, Über uns →
  `/werkstatt`, Preisrechner, FAQ, Testimonials) — eigener Plan, weil dafür
  zwei neue Unterseiten entstehen müssen
- **Katalog-Schaufenster** — braucht zuerst die Entscheidung, ob die statische
  Datei oder die Vue-Seite die Grundlage wird (Spec §5)
- **Workshop-Detailseiten** je Format — eigenes Spec, und dafür fehlen noch die
  PDF-Exporte der beiden Keynote-Dateien
