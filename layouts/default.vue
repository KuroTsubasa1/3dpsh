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
