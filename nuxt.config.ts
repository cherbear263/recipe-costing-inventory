// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss', '@nuxtjs/supabase',
    'nuxt-icon',
    '@pinia/nuxt',
  ],
  pinia: {
    autoImports: [
      // automatically imports 'defineStore'
      'defineStore',
      ['defineStore', 'definePiniaStore']
    ]
  }

})
