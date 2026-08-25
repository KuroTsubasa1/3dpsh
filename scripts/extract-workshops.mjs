// One-off extraction of workshop content from the .pptx decks in Vorträge/.
// A .pptx is a zip of XML; slide text sits in <a:t> elements. The two Keynote
// files in that folder are not readable this way — they are listed in the
// output with empty agendas so the gap is visible rather than silent.
//
// Vorträge/ is git-ignored as of the workshops redesign branch: this script
// reads it locally and is meant to run once. On a fresh clone it will fail
// because the folder does not exist — that is intended. data/workshops.json,
// hand-written from this script's output, is the maintained source from here
// on; this script is not part of the build.
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
  // Some decks put "ÜBER UNS" content on slide 2 instead of an agenda —
  // print slides 3-5 too so the real agenda can be found by hand.
  for (const s of [3, 4, 5]) {
    let text
    try {
      text = slideText(`${DIR}/${d}`, s)
    } catch {
      break
    }
    console.log(`  slide ${s}:     `, text.slice(0, 20).join(' | '))
  }
}
