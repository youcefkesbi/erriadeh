<template>
  <div class="relative overflow-hidden bg-slate-950 text-slate-100">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/25 blur-3xl"></div>
      <div class="absolute top-32 -right-20 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl"></div>
      <div class="absolute bottom-0 -left-16 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"></div>
    </div>

    <main class="relative z-10 mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
      <slot />
    </main>
  </div>
</template>
