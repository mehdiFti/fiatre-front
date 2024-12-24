import Vue3Toastify, { toast, type ToastContainerOptions } from 'vue3-toastify';
/*rtl:begin:ignore*/
import 'vue3-toastify/dist/index.css';
/*rtl:end:ignore*/
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 3000,
    position: toast.POSITION.BOTTOM_CENTER,
    theme: 'colored',
    clearOnUrlChange: true,
    rtl: false,
    toastStyle: {
      fontSize: '14px',
      fontFamily: 'inherit'
    }
  } as ToastContainerOptions);

  return {
    provide: {
      toast,
    },
  };
});
