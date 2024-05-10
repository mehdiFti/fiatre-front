// https://nuxt.com/docs/api/configuration/nuxt-config
import postcssRTLCSS from 'postcss-rtlcss';
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', "@nuxt/image"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "assets/scss/common/utilities";',
        },
      },
      postcss: {
        plugins: [postcssRTLCSS()],
      },
    },
  },
})