<template>
  <!-- Decorative: hidden from assistive tech. The percentage is rendered as
       text anyway, so it stays meaningful if it ever is announced. -->
  <div v-if="!hidden" class="fil" aria-hidden="true">
    <div class="fil-spool">
      <svg viewBox="0 0 92 92">
        <g :transform="`rotate(${progress * 900} 46 46)`">
          <circle cx="46" cy="46" r="40" fill="var(--color-paper)" stroke="var(--color-ink)" stroke-width="5" />
          <circle cx="46" cy="46" r="27" fill="var(--color-brand)" stroke="var(--color-ink)" stroke-width="4" />
          <circle cx="46" cy="46" r="9" fill="var(--color-paper)" stroke="var(--color-ink)" stroke-width="4" />
          <g stroke="var(--color-ink)" stroke-width="3" stroke-linecap="round">
            <line x1="46" y1="19" x2="46" y2="28" /><line x1="46" y1="64" x2="46" y2="73" />
            <line x1="19" y1="46" x2="28" y2="46" /><line x1="64" y1="46" x2="73" y2="46" />
          </g>
        </g>
      </svg>
    </div>

    <div v-if="!reduceMotion" class="fil-readout">{{ Math.round(progress * 100) }} % gedruckt</div>

    <div class="fil-track">
      <svg viewBox="0 0 1000 96" preserveAspectRatio="none">
        <path :d="railPath" fill="none" stroke="var(--color-gray-200)" stroke-width="2"
              stroke-dasharray="2 8" stroke-linecap="round" />
        <path :d="strandPath" fill="none" stroke="var(--color-brand)" stroke-width="5" stroke-linecap="round" />
        <g :transform="`translate(${headX} 62)`">
          <rect x="-13" y="-30" width="26" height="26" rx="4" fill="var(--color-paper)" stroke="var(--color-ink)" stroke-width="4" />
          <path d="M -7 -4 L 7 -4 L 0 6 Z" fill="var(--color-brand)" stroke="var(--color-ink)" stroke-width="3.5" stroke-linejoin="round" />
        </g>
      </svg>
    </div>

    <!-- Below 768px the SVG track is hidden in favour of this flat bar: the
         5-unit-tall strand rendered at 6px high with preserveAspectRatio
         "none" was well under a pixel and the print head just looked
         distorted. -->
    <div class="fil-bar" :style="{ width: `${progress * 100}%` }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { scrollProgress } from '~/utils/scrollProgress'

const X0 = 0
const X1 = 1000
const Y = 62

const progress = ref(0)
const hidden = ref(false)
const reduceMotion = ref(false)
let ticking = false
let observer: MutationObserver | null = null
let motionQuery: MediaQueryList | null = null

const headX = computed(() => X0 + (X1 - X0) * progress.value)
const railPath = `M ${X0} ${Y} L ${X1} ${Y}`

// A slight sag so the strand does not read as a ruler.
const strandPath = computed(() => {
  const x = headX.value
  const midX = X0 + (x - X0) / 2
  const sag = Y + Math.min(16, (x - X0) * 0.035)
  return `M ${X0} ${Y} Q ${midX} ${sag} ${x} ${Y}`
})

function update() {
  ticking = false
  if (reduceMotion.value) { progress.value = 1; return }
  const el = document.scrollingElement || document.documentElement
  progress.value = scrollProgress(el.scrollTop, el.scrollHeight, window.innerHeight)
}

function onScroll() {
  if (!ticking) { ticking = true; requestAnimationFrame(update) }
}

// The cookie banner occupies the same bottom edge. While it is open the spool
// steps aside — two stacked bars would bury the page content. The banner uses
// v-if, so it is removed from (and re-added to) the DOM rather than merely
// hidden; a MutationObserver keeps this in sync instead of a single check.
function syncBannerCollision() {
  hidden.value = !!document.querySelector('.cookie-consent')
}

// Keeps reduceMotion in sync if the visitor flips the OS setting mid-visit,
// rather than only reading it once at mount.
function onMotionChange(event: MediaQueryListEvent) {
  reduceMotion.value = event.matches
  update()
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduceMotion.value = motionQuery.matches
  motionQuery.addEventListener('change', onMotionChange)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  syncBannerCollision()
  const root = document.getElementById('app') ?? document.body
  observer = new MutationObserver(syncBannerCollision)
  observer.observe(root, { childList: true })
  update()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  motionQuery?.removeEventListener('change', onMotionChange)
  observer?.disconnect()
})
</script>

<style scoped>
.fil-track {
  position: fixed; left: 110px; right: 0; bottom: 0; height: 96px;
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

.fil-bar {
  display: none;
  position: fixed; left: 0; right: 0; bottom: 0; height: 3px;
  background: var(--color-brand); pointer-events: none; z-index: 40;
}

/* No free space bottom-left on a phone: a thin flat progress bar only, no
   spool, no readout, and no squashed SVG track. */
@media (max-width: 767px) {
  .fil-spool, .fil-readout, .fil-track { display: none; }
  .fil-bar { display: block; }
}
</style>
