import type { NuxtConfig } from '@nuxt/types'
import dotenv from 'dotenv';
/*
import { defineNuxtConfig } from 'nuxt/config'
import { BootstrapVueNext } from 'bootstrap-vue-next';
*/

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

const config: NuxtConfig = {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,
  
  runtimeConfig: {
    // Private area
    public: {
      apiUrl: process.env.API_URL,
      env: envFile,
      port: process.env.PORT,
      authProviderDomain: process.env.AUTH_PROVIDER_DOMAIN,
      authProviderClientId: process.env.AUTH_PROVIDER_CLIENT_ID,
      authProviderRedirectUri: process.env.AUTH_PROVIDER_REDIRECT_URI,
      authProviderAudience: process.env.AUTH_PROVIDER_AUDIENCE,
    }
  },
  // TODO: Revisar si el contenido de "Server" está haciendo algo actualmente
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "tunevera",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/scss/styles.scss",
    "~/assets/scss/global.scss",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "bootstrap/dist/css/bootstrap.min.css",
    "primevue/resources/themes/bootstrap4-light-blue/theme.css"
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variables.scss" as *; @use "@/assets/scss/buttons.scss" as *;',
        },
      },
    },
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/auth0.js",
    "~/plugins/fontawesome.js",
    "~/plugins/fetch-api.js",
    "~/plugins/v-click-outside.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/style-resources",
    "@nuxt/typescript-build"
  ],

  styleResources: {
    scss: [
      "~/assets/scss/styles.scss",
      "~/assets/scss/global.scss"
    ],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@bootstrap-vue-next/nuxt",
    "@pinia/nuxt",
    "nuxt-primevue",
    "@nuxt/image"
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  primevue: {
    options: {
      ripple: true
    },
    theme: "aria-light-teal"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
    '@fortawesome/vue-fontawesome',
    '@fortawesome/fontawesome-svg-core',
    '@fortawesome/free-solid-svg-icons',
    '@fortawesome/free-regular-svg-icons',
    '@fortawesome/free-brands-svg-icons'
]},

  devtools: { enabled: true },
};

export default config;