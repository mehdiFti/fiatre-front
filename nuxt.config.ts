import postcssRTLCSS from 'postcss-rtlcss';
import {vite as vidstack} from 'vidstack/plugins';
import path from 'path';

export default defineNuxtConfig({

  sourcemap: {server: true, client: true},
  
  devtools: {enabled: true},
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    'nuxt-icons',
    '@vueuse/nuxt',
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
    'nuxt-lazy-load'
  ],

  lazyLoad: {
    // These are the default values
    images: true,
    videos: false,
    audios: false,
    iframes: false,
    native: false,
    directiveOnly: false,
    
    // Default image must be in the public folder
    // defaultImage: '/images/default-image.jpg',
  
    // To remove class set value to false
    loadingClass: 'isLoading',
    loadedClass: 'isLoaded',
    appendClass: 'lazyLoad',
    
    observerConfig: {
      // See IntersectionObserver documentation
    }
  },

  vite: {

    esbuild: {
      drop: ["console"],
  },
    plugins: [
      vidstack(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/common/utilities.scss";',
          verbose: true,
          quietDeps: true,
        },
      },
      postcss: {
        plugins: [postcssRTLCSS()],
      },
    },
    server: {
      hmr: true,
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag.startsWith('media-'),
    },
  },

  alias: {
    '@': path.resolve(__dirname, './')
  },

  compatibilityDate: '2024-09-04',
});