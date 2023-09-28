// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  },
  modules: [
    '@nuxtjs/tailwindcss', 
    '@nuxtjs/supabase',
    'nuxt-icon',
    '@pinia/nuxt',
  ],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/'],
    }
  },
  pinia: {
    autoImports: [
      // automatically imports 'defineStore'
      'defineStore',
      ['defineStore', 'definePiniaStore']
    ]
  }

})
