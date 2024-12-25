import Vue3Toastify, { toast, type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const customStyles = `
  @media (max-width: 500px) {
    .Toastify__toast-container {
      width: 90% !important; /* Adjust width for mobile devices */
      max-width: 320px; /* Optional: Limit the maximum width */
      left: 50% !important; /* Center horizontally */
      transform: translateX(-10%) !important; /* Ensure proper centering */
    }

    .Toastify__toast {
      font-size: 14px !important; /* Ensure consistent font size */
    }
  }
`;

const style = document.createElement('style');
style.textContent = customStyles;
document.head.appendChild(style);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 3000,
    position: toast.POSITION.BOTTOM_CENTER,
    theme: 'colored',
    clearOnUrlChange: true,
    rtl: false,
    toastStyle: {
      fontSize: '14px',
      fontFamily: 'inherit',
    },
  } as ToastContainerOptions);

  return {
    provide: {
      toast,
    },
  };
});
