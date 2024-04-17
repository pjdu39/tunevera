// plugins/v-click-outside.js
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.directive('click-outside', {
      mounted(el, binding) {
        el.clickOutsideEvent = function(event) {
          // Verifica si el clic fue fuera del elemento y si la función handler está definida
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.addEventListener('click', el.clickOutsideEvent);
      },
      beforeUnmount(el) {
        // Elimina el listener cuando el componente que usa la directiva es destruido
        document.removeEventListener('click', el.clickOutsideEvent);
      }
    });
  });
  