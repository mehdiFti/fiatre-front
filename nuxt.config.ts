import postcssRTLCSS from 'postcss-rtlcss';
import {vite as vidstack} from 'vidstack/plugins';

export default defineNuxtConfig({
  devtools: {enabled: true},
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    'nuxt-icons',
    [
      '@vee-validate/nuxt',
      {
        autoImports: true,
        componentNames: {
          Form: 'VeeForm',
          Field: 'VeeField',
          FieldArray: 'VeeFieldArray',
          ErrorMessage: 'VeeErrorMessage',
        },
      },
    ],
  ],
  vite: {
    plugins: [
      vidstack(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/common/utilities.scss";',
        },
      },
      postcss: {
        plugins: [postcssRTLCSS()],
      },
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag.startsWith('media-'),
    },
  },
});
