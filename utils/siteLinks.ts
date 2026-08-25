/**
 * Central destinations for the links repeated across TheHeader.vue,
 * TheHero.vue and TheFooter.vue. Keeping them here means a rename only has
 * to happen once instead of being an easy miss across three files.
 *
 * Later parts of this redesign rename `catalog` from /coaster-catalog to
 * /katalog.
 */
export const siteLinks = {
  catalog: '/coaster-catalog',
  services: '/#services',
  contact: '/#contact',
  workshops: '/workshops'
}
