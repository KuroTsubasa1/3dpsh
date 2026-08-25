/**
 * Central destinations for the three links repeated across TheHeader.vue,
 * TheHero.vue and TheFooter.vue. Keeping them here means a rename only has
 * to happen once instead of being an easy miss across three files.
 *
 * Later parts of this redesign rename `catalog` from /coaster-catalog to
 * /katalog, and add a dedicated `workshops` destination once that section
 * exists (today the "Workshops" card in TheHero.vue points at `contact`
 * instead, since there is nowhere else for it to go yet).
 */
export const siteLinks = {
  catalog: '/coaster-catalog',
  services: '/#services',
  contact: '/#contact'
}
