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
