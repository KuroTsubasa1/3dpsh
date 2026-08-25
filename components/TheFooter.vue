<template>
  <footer class="wb-edge-t bg-ink pb-28 pt-12 text-paper">
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
        <h2 class="font-display text-sm font-bold uppercase tracking-wider">Wo du uns findest</h2>
        <ul class="mt-3 space-y-2 font-sans text-sm text-gray-200">
          <li><a class="hover:text-brand-light" href="https://www.etsy.com/de-en/shop/3DPrintShopHarm" target="_blank" rel="noopener noreferrer">Etsy-Shop</a></li>
          <li><a class="hover:text-brand-light" href="https://www.instagram.com/3d.print.shop.harm" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a class="hover:text-brand-light" href="https://www.facebook.com/profile.php?id=61551244577763" target="_blank" rel="noopener noreferrer">Facebook</a></li>
        </ul>
      </div>

      <div>
        <h2 class="font-display text-sm font-bold uppercase tracking-wider">Seite</h2>
        <ul class="mt-3 space-y-2 font-sans text-sm text-gray-200">
          <li><NuxtLink class="hover:text-brand-light" :to="siteLinks.catalog">Katalog</NuxtLink></li>
        </ul>
      </div>
    </div>

    <!-- Legal block, supplied verbatim by the owner. Do not reword: the wording
         and the cited sections are the operator's own legal statement. -->
    <div class="mx-auto mt-10 max-w-6xl border-t border-gray px-4 pt-6 font-sans text-xs leading-relaxed text-gray-200">
      <p>
        © {{ new Date().getFullYear() }} 3D Print Shop Harm. Alle Rechte vorbehalten. |
        <NuxtLink class="hover:text-brand-light" to="/impressum">Impressum</NuxtLink>
      </p>
      <p class="mt-3">
        Angaben gemäß § 3 DDG: 3D Print Shop Harm | Lasse Harm | Verantwortlich für den
        Inhalt nach § 3 DDG
      </p>
      <p class="mt-1">
        Steuernummer: 651 942 37704 | Gemäß § 19 UStG wird als Kleinunternehmen keine
        Umsatzsteuer erhoben und entsprechend nicht ausgewiesen.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { siteLinks } from '~/utils/siteLinks'
</script>
