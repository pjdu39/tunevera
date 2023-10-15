import type { NuxtConfig } from '@nuxt/types'
/*
import { defineNuxtConfig } from 'nuxt/config'
import { BootstrapVueNext } from 'bootstrap-vue-next';
*/

import { Environment, GlobalSettings } from "./store/envSettings";

const appEnv: Environment  = process.env.NODE_ENV as Environment

const config: NuxtConfig = {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  
  // Manejo de entornos en tiempo de ejecución. Se hace así desde la nuxt 2.13
  /*
  env: {
    API_URL: GlobalSettings[appEnv].apiUrl,
    PORT: GlobalSettings[appEnv].port,
    HOST: GlobalSettings[appEnv].host || 'localhost'
  },
  */
  runtimeConfig: {
    // KEYs...
    public: {
      env: appEnv,
      apiUrl: GlobalSettings[appEnv].apiUrl,
      port: GlobalSettings[appEnv].port
    }
    
  },
  server: {
    port: GlobalSettings[appEnv].port || 3000,
    host: GlobalSettings[appEnv].host || 'localhost',
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
    // SCSS file in the project
    "~/assets/scss/styles.scss",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "bootstrap/dist/css/bootstrap.min.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/fontawesome.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/style-resources",
    "@nuxt/typescript-build"
  ],

  styleResources: {
    scss: ["~/assets/scss/styles.scss"],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@bootstrap-vue-next/nuxt",
    "@pinia/nuxt"
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};

export default config;