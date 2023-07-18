// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    [
      "@nuxtjs/google-fonts", 
      {
        families: {
          'Roboto': [400, 500, 600],
        }
      },
    ],
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "nuxt-icon",
    "nuxt-lodash",
  ],
  css: [
    "~/assets/css/main.css"
  ]
})
