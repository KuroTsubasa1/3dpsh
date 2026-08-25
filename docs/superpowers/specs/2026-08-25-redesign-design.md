# Redesign 3dps.space — Designdokument

**Stand:** 2026-08-25 · **Status:** zur Abnahme

Dieses Dokument beschreibt das Redesign der Startseite und der bestehenden
Unterseiten. Die Vortrags- und Workshop-Unterseiten sind **nicht** Teil dieses
Specs; sie bekommen ein eigenes, nachdem dieses umgesetzt ist. Die Navigation
wird hier aber schon so angelegt, dass sie Platz dafür hat.

## 1. Ausgangslage

Die Seite wirkt wie eine Agenturvorlage: dunkle Navileiste, vollflächiger
grüner Verlauf, zentrierte Inter-Bold-Headline, austauschbarer Claim. Zehn
Abschnitte auf der Startseite, alle gleich gewichtet. Die Texte behaupten
Qualität, ohne sie zu belegen („Innovation trifft Präzision", „modernste
Technologie", „schnelle Lieferzeiten").

Das Geschäft dahinter sieht anders aus als die Seite:

| Bereich | Realität | Was die Seite leisten kann |
| --- | --- | --- |
| Conventions | größter Fokus, dort wird verkauft | vorbereiten und nachfassen — verkaufen kann sie dort nicht |
| Onlinehandel | soll ausgebaut werden | **ist selbst der Kanal** |
| Schulungen | sollen ausgebaut werden | **ist selbst der Kanal** |
| Auftragsarbeiten | kleiner Teil, gern genommen | sichtbar halten, nicht in den Vordergrund |

Daraus folgt die Gewichtung: Shop und Workshops bekommen die großen Auftritte,
Auftragsdruck bleibt ein klarer, aber kleinerer Weg, und ein eigener Block
„Wo ihr uns trefft" bedient den größten Kanal.

## 2. Gestalterische Richtung: „Werkbank"

Verspielt über **Form**, nicht über Farbe. Die Seite soll gebaut aussehen, nicht
gerendert.

- Dicke Konturen (2,5–3 px) in `#20201f` um Karten, Buttons und Objekte
- Harter, versetzter Schatten (`4px 4px 0`) statt weicher Streuschatten
- Karten kippen beim Hovern leicht (−1,2°) und rücken 2 px heraus
- Objekte sind CSS-Formen und **echte Produktfotos** — es gibt keine
  gezeichneten Illustrationen und keinen Illustrator
- Schrift: **Space Grotesk** (700/500) für Überschriften und Buttons,
  **Inter** (400/500/600) für Fließtext

### Farben — ausschließlich Bestandstokens

Bewusste Entscheidung gegen zusätzliche Buntfarben. Die Palette ist die
vorhandene:

| Token | Wert | Einsatz |
| --- | --- | --- |
| `--color-brand` | `#6aaa43` | Leitfarbe, Buttons, Links |
| `--color-brand-light` | `#7bc04f` | zweite Grünstufe, Workshops |
| `--color-brand-dark` | `#5a9236` | Hover, Tiefenkanten |
| `--color-ink` | `#20201f` | Konturen, Text, Schatten |
| `--color-gray` | `#727271` | Sekundärtext |
| `--color-gray-200` | `#e6e6e6` | Flächen dritter Ordnung (Auftragsdruck) |
| `--color-paper` | `#FBFBF7` | Seitengrund |

Die drei Säulen unterscheiden sich über Grünstufe und Form, nicht über eigene
Farben. **Bekanntes Risiko:** über sieben Abschnitte hinweg kann das monoton
wirken. Gegenmittel sind Flächenwechsel (Papier / Weiß / Dunkel) und
Formvariation. Wenn sich das in der Umsetzung als zu eng erweist, ist die
nächstkleinere Eskalation eine einzelne warme Signalfarbe — nicht mehrere.

## 3. Filament-Spool

Eine Spule unten links am Viewport, die beim Scrollen Filament nach rechts
zieht. Prototyp ist gebaut und abgenommen.

- **Position:** fest am Viewport, unten links, 92 px
- **Verhalten:** Fortschritt `p = scrollTop / (scrollHeight − innerHeight)`,
  begrenzt auf 0…1. Spule dreht `p × 900°`, der Strang wächst von links nach
  rechts, mit leichtem Durchhang (quadratische Bézier, max. 16 px), am Kopf ein
  Druckkopf-Symbol
- **Zustandsanzeige:** „N % gedruckt" als Pille neben der Spule
- **Reduzierte Bewegung:** bei `prefers-reduced-motion: reduce` keine Drehung,
  kein Wachstum — der Strang steht durchgezogen. Scrollgekoppelte Bewegung löst
  bei empfindlichen Menschen Übelkeit aus; das ist kein optionaler Feinschliff
- **Unter 768 px:** kein Spool, nur eine 3 px hohe Fortschrittslinie am unteren
  Rand. Auf dem Telefon ist unten links kein freier Platz
- **Kollision mit dem Cookie-Banner:** `CookieConsent.vue` sitzt ebenfalls unten.
  Solange der Banner offen ist, wird der Spool ausgeblendet
- **Umsetzung:** eigene Komponente `FilamentProgress.vue`, ein
  `scroll`-Listener (passiv) plus `requestAnimationFrame`, kein Fremdpaket

## 4. Startseite: Struktur X („Verteiler")

Von zehn Abschnitten auf sieben. Tiefe wandert auf Unterseiten.

1. **Hero mit drei Wegen** — eine Aussage, darunter Shop / Workshops / Auftrag
   als drei anklickbare Karten
2. **Neu im Katalog** — 6–8 Motive quer durch die Fandoms, Button ins Schaufenster
3. **Workshops** — die drei Formate, nächster Termin, Anfrage-Button
4. **Wo ihr uns trefft** — nächste Conventions mit Datum und Ort
5. **Auftragsdruck, kompakt** — drei Sätze, Link auf die Unterseite mit Preisrechner
6. **Werkstatt** — kurz, mit echtem Foto
7. **Kontakt** — Formular, Terminhinweis (der Hinweis auf Terminabsprache bleibt), Karte

### Revision vom 2026-08-25 (nachmittags)

Nach dem ersten Blick auf die gebaute Startseite: der Eindruck war „leerer und
weniger Infos". Die Diagnose des Betreibers dazu war präziser als die
Beobachtung — nicht *weniger* Inhalt, sondern **weniger Füllmaterial und mehr
echte Information**. Daraus folgen drei Änderungen an dieser Struktur:

1. **Zwei neue Abschnitte werden vorgezogen** und bekommen eigenes Gewicht:
   die **Workshop-Übersicht** und der **Con-Kalender**. Beide liefern Angaben,
   die es auf der Seite noch nie gab
2. **Zusätzlich ausgeräumt** werden Portfolio-Galerie (→ `/auftragsdruck`) und
   Über uns / Werkstatt (→ `/werkstatt`)
3. **Bleiben** entgegen dem ursprünglichen Plan: der Intro-Abschnitt „Warum 3D
   Print Shop Harm?" (Text wird neu geschrieben, Abschnitt bleibt) und die
   Leistungen

Startseite danach: Hero → Warum → Katalog-Teaser → **Workshops** →
**Wo ihr uns trefft** → Leistungen → Kontakt.

### Was von der Startseite verschwindet

- **Preisrechner** → `/auftragsdruck`. Ein Werkzeug für Entschlossene, kein
  Argument für Unentschlossene
- **FAQ** → als Aufklapper ans Ende der jeweils passenden Unterseite
- **Testimonials** → aufgelöst; einzelne Zitate dorthin, wo sie etwas belegen
  (das Ersatzteil-Zitat zum Auftragsdruck)
- **Etsy-Sektion** → geht im Katalog-Schaufenster auf

### Seitenbaum

```
/                     Startseite
/katalog              Schaufenster nach Fandom, mit Etsy-Links
/workshops            Übersicht (Detailseiten: eigenes Spec)
/auftragsdruck        inkl. Preisrechner und Referenzen
/werkstatt            über euch
/kontakt
/impressum  /datenschutz
```

**Was aus den heutigen Seiten wird:**

- `/coaster-catalog` → `/katalog`. Der alte Pfad bekommt eine **301-Weiterleitung**
  (Nitro `routeRules`), sonst laufen bestehende Links und Suchtreffer ins Leere
- `/portfolio` → geht als Referenzteil in `/auftragsdruck` auf; die sechs Fotos
  belegen dort, was sie belegen sollen. Ebenfalls 301
- `/impressum` bleibt unverändert
- `/datenschutz` **existiert heute nicht.** Das ist eine bestehende rechtliche
  Lücke, kein Redesign-Thema — die Seite lädt Google Fonts und eine Google-Maps-
  Karte, beides ohne Datenschutzerklärung. Der Text muss von dir oder einem
  Generator kommen; ich lege nur die Seite an (siehe §9)

## 5. Katalog als Schaufenster

Etsy bleibt die Kasse; der Katalog wird die durchsuchbare Übersicht und
verlinkt pro Motiv dorthin.

**Ausgangslage — korrigiert am 2026-08-25:** Die Route `/coaster-catalog` wird
von einer **statischen Datei** `public/coaster-catalog/index.html` beschattet,
lokal wie live (das ausgelieferte HTML trägt `lang="en"` und kein `__NUXT__`).
`pages/coaster-catalog.vue` — 484 Zeilen mit 379 hartcodierten Bildpfaden — ist
damit **nie erreichbar gewesen**. Teil 2 muss zuerst entscheiden, was von beidem
die Grundlage wird und was gelöscht gehört; ohne diese Entscheidung würde am
falschen Artefakt gearbeitet.

In beiden Fällen gilt: es gibt keine Artikeldaten. Keine Titel, keine Preise,
keine Links — die Dateinamen sind Hashes wie `2024-12-29_1601b6dd67ad7.jpg`.

**Datei** `data/coasters.json`:

```json
{
  "fandoms": [
    { "slug": "one-piece", "name": "One Piece", "etsyUrl": "https://…" }
  ],
  "items": [
    { "id": "one-piece-001",
      "file": "one piece/2024-12-29_1601b6dd67ad7.jpg",
      "fandom": "one-piece",
      "title": "",
      "etsyUrl": "" }
  ]
}
```

**Verhalten bei unvollständigen Daten** — der Kern dieser Entscheidung:

- `title` leer → es wird die generierte Nummer angezeigt („One Piece 001")
- `etsyUrl` leer → **kein toter Button**, stattdessen der Hinweis „auf
  Conventions erhältlich" und, sofern gepflegt, der Etsy-Link des Fandoms
- Bild in `public/coaster-images/`, aber nicht in der Datei → erscheint trotzdem,
  als unvollständiger Eintrag. Kein Motiv verschwindet, weil Daten fehlen

**Werkzeug** `scripts/sync-coasters.mjs`: liest `public/coaster-images/`, ergänzt
fehlende Einträge, **überschreibt niemals gepflegte Felder**, meldet verwaiste
Einträge. Damit fängst du nicht bei null an und kannst schrittweise füllen.

## 5b. Workshops und Conventions

### Workshop-Übersicht

Quelle sind die sechs Präsentationen im Ordner `Vorträge/`. Drei Reihen:

| Reihe | Formate | Datenlage |
| --- | --- | --- |
| 3D-Druck | Einsteiger · Aufbau (Fortgeschrittene) | Aufbau vollständig (35 Folien); Einsteiger ist eine Keynote-Datei — **kein Text extrahierbar** |
| Blender | Crashkurs, 2 h Hands-on | Keynote — nur Titel und Dauer aus dem Dateinamen |
| Cosplay-Fotografie | Stufe 1 Einstieg · Stufe 2 Fortgeschritten · Stufe 3 Experte | vollständig, je 15–16 Folien mit Agenda |

`data/workshops.json` wird aus den `.pptx` erzeugt und danach von Hand gepflegt.
Felder: `slug`, `family`, `title`, `level`, `summary`, `agenda[]`.

**Dauer und Preis stehen nicht drin.** Sie sind nicht bekannt und werden nicht
erfunden; bis der Betreiber sie liefert, zeigt die Übersicht „Termine und
Konditionen auf Anfrage" mit Link ins Kontaktformular.

**Offen:** für „3D-Druck Einsteiger" und „Blender-Crashkurs" fehlen PDF- oder
PPTX-Exporte. Ohne sie erscheinen beide mit Titel und Stufe, aber ohne
Beschreibung.

### Con-Kalender

`data/conventions.json`, vom Betreiber gepflegt. Felder: `name`, `from`, `to`,
`city`, `venue`, `stand`, `url`.

- Vergangene Termine werden automatisch ausgeblendet, sortiert nach Startdatum
- **Leerzustand ist Teil der Spezifikation, nicht ein Nachgedanke:** stehen
  keine Termine an, erscheint „Die Termine für die nächste Saison stehen noch
  nicht fest. Schreib uns, wenn du wissen willst, wo wir als Nächstes sind."
  Der Kalender ist der einzige Abschnitt der Seite, der von selbst leer laufen
  kann — ohne diesen Fall stünde im Winter eine Überschrift über einer leeren
  Fläche

### Belegbare Zahlen aus den Präsentationen

Aus dem Aufbau-Workshop, für die Textarbeit gegen Floskeln:

- FDM: robuste Teile aus PLA, PETG und TPU **bis 400 × 400 × 450 mm**
- Resin: feine Details und glatte Oberflächen **bis 130 × 80 × 150 mm**

## 6. Textstimme

- **Anrede: durchgängig „du"** — auch im Auftragsdruck. Eine Seite, die vorne
  duzt und hinten siezt, wirkt wie zwei Firmen
- **Zahlen statt Superlative:** Schichthöhe, Druckdauer, Material — nicht
  „höchste Qualität"
- **Keine Behauptung ohne Beleg:** „schnelle Lieferzeiten" wird eine Zahl oder
  entfällt
- **Sagen, was es kostet und wie lange es dauert**

Beispiel für den Ton (Werkstatt-Abschnitt, Fakten noch offen — siehe §9):

> In Eutin stehen [N] Drucker, die meiste Zeit laufen sie für Untersetzer, die
> wir auf Conventions verkaufen. Dazwischen drucken wir Ersatzteile für Leute,
> deren Maschine sonst stillsteht — [Beispiel]. Wenn du wissen willst, wie das
> geht: dafür gibt es die Workshops.

## 7. Technische Umsetzung

**Fundament:** Tailwind v4 über `@tailwindcss/vite`. Nuxt 3.21.11 und Vite 6.4.3
tragen das direkt, kein PostCSS nötig. Eine Datei `assets/css/app.css` mit
`@import "tailwindcss"` und einem `@theme`-Block, der die Tokens aus §2 trägt —
zusätzlich Konturstärke, Schattenversatz und Kippwinkel als Tokens, damit die
Werkbank-Eigenheiten nicht in jeder Komponente neu erfunden werden.

**Vorgehen: Fundament wie Tailwind-Migration, Ausrollen schrittweise.** Tailwind
läuft neben dem bestehenden CSS. Jede Sektion wird einzeln umgestellt und
deployt, statt die Seite wochenlang halb umgebaut liegen zu lassen.

Reihenfolge:

1. Tailwind + Tokens, parallel zu `modern.css`
2. Layout: Header, Footer, `FilamentProgress`
3. Hero mit den drei Wegen
4. Sektion für Sektion (Katalog-Teaser → Workshops → Conventions →
   Auftragsdruck → Werkstatt → Kontakt)
5. Unterseiten
6. `modern.css` löschen

### Kaskaden-Falle für Teil 2 und 3 (ergänzt am 2026-08-25)

Tailwind v4 legt alles in Kaskadenschichten. **Ungeschichtetes CSS schlägt jede
Schicht, unabhängig von Spezifität.** Das hat in Teil 1 zwei Tage Arbeit gekostet
und trifft die folgenden Teile genauso:

1. `assets/css/app.css` deklariert die Reihenfolge
   `theme, base, legacy, components, utilities` und importiert Tailwind in drei
   Teilen, damit `modern.css` (in `layer(legacy)`) **über** dem Preflight, aber
   **unter** den Utilities liegt. Eine handgeschriebene `@layer`-Anweisung allein
   genügt nicht — sie wird beim Build verworfen, die physische Reihenfolge der
   Importe entscheidet
2. **Namenskollisionen:** `modern.css` besitzt Klassennamen, die Tailwind
   ebenfalls als Utility kennt. `.container` ging so still an Tailwind über und
   machte 14 Sektionen randlos; zurückgeholt per `@utility container`.
   `modern.css:688–698` definiert außerdem `.mt-1`…`.mb-5` mit abweichenden
   Werten — dieselbe Falle, derzeit von keinem Template benutzt. **Vor jeder
   Sektionsmigration nach weiteren Überschneidungen greppen, nicht danach**
3. **Vue-`<style scoped>`-Blöcke sind ungeschichtet** und schlagen daher jede
   Tailwind-Schicht, auch Utilities. **20 Komponenten** tragen noch einen. Wer
   eine Sektion auf Utilities umstellt und den scoped-Block stehen lässt, sieht
   eine Utility, die scheinbar wirkungslos ist — und weder Build noch Test noch
   Diff-Review zeigen es. Das Löschen des scoped-Blocks gehört in denselben
   Schritt wie die Migration, nicht in einen Folgeschritt

**Aufräumen unterwegs:**

- `assets/css/styles.css` (870 Zeilen) wird in `nuxt.config.ts` nirgends
  eingebunden — toter Code, entfällt
- Von 28 Komponenten sind elf im Einsatz. Verwaiste (`TheCard`, `TheGrid`,
  `grid-card`, `ImageWithLoader` und die Kleinschreib-Dubletten von Header,
  Footer, Hero) werden **einzeln geprüft** und dann gelöscht
- Die 379 Bildpfade verschwinden aus `coaster-catalog.vue` in `data/coasters.json`

## 8. Verifikation

Das Projekt hat **keine Testinfrastruktur**. Für Farben und Abstände wären
Unit-Tests auch Theater. Deshalb gestaffelt:

- **Pro Schritt:** `npm run build`, danach Screenshots in zwei Breiten (390 px,
  1280 px) zum Vergleich
- **Echte Tests dort, wo Logik ist:** vitest für die Zuordnung
  `data/coasters.json` → Katalog, mit Fällen für fehlenden Titel, fehlenden
  Etsy-Link und Bild-ohne-Eintrag. Nach TDD: Test zuerst
- **Deploy:** die bestehende Pipeline mit ihrem Smoke-Test gegen
  `127.0.0.1:5001` und `https://3dps.space/`
- **Bewegung:** Prüfung mit gesetztem `prefers-reduced-motion`, nicht nur im
  Normalfall

## 9. Offene Punkte

Diese müssen von dir kommen; ich erfinde sie nicht.

1. **Fakten über euch:** seit wann, wer „wir" ist, Anzahl und Art der Drucker,
   auf welchen Conventions ihr seid, eine echte Auftragsgeschichte, die erzählt
   werden darf. Bis dahin bleiben die Stellen im Text als Lücken markiert
2. **Convention-Termine** brauchen eine Datenquelle, die du pflegst — analog zu
   `data/coasters.json` eine `data/conventions.json`
3. **Werkstattfoto** hängt an einer externen Pocketbase-URL
   (`pocket.lasseharm.space`). Fällt die aus, fehlt das Bild. Vorschlag: ins
   Repo unter `public/`
4. **Abhängigkeits-Drift:** `@nuxt/devtools` steht im Arbeitsbaum auf `^3.4.2`
   statt `^2.4.1`, das Lockfile ist neu geschrieben (−7762/+6159). Nicht von
   mir, nicht committet. Vor dem ersten Umbau klären: übernehmen oder verwerfen
5. **Vorträge-Ordner:** 60 MB `.pptx`/`.key` liegen untracked im Repo. Sie
   gehören nicht in git — Ablage klären, bevor das Workshop-Spec beginnt
6. **Datenschutzerklärung:** Text fehlt vollständig. Die Seite bindet Google
   Fonts und eine Google-Maps-Karte ein, überträgt also Besucher-IPs an Dritte.
   Das ist unabhängig vom Redesign schon jetzt ein Problem; das Redesign ist nur
   die Gelegenheit, es zu beheben. Inhalt kommt von dir

## 10. Nicht in diesem Spec

- **Workshop-Detailseiten** aus den Präsentationen — eigenes Spec im Anschluss.
  Für die beiden `.key`-Dateien werden PDF- oder PPTX-Exporte gebraucht; aus
  Keynote-Dateien ist Text praktisch nicht extrahierbar (Bilder schon)
- **Eigener Shop mit Kasse** — Warenkorb, Zahlung, Versand, Widerruf, Steuer.
  Eigenes Projekt; dieses Redesign bereitet nur den Weg
