<template>
    <div class="callback-container">
      <!-- Muestra algún tipo de mensaje de carga o animación -->
      <p>Logging you in...</p>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useAuth0 } from '@auth0/auth0-vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const { handleRedirectCallback } = useAuth0();
  
  onMounted(async () => {
    try {
      // Manejar la respuesta de Auth0 y extraer el código de la URL
      await handleRedirectCallback();
      // Redirigir al usuario a su destino final, como su perfil o la página de inicio
      router.push('/profile');
    } catch (e) {
      console.error(e);
      // Manejar el error, posiblemente redirigir al usuario a una página de error
      router.push('/error');
    }
  });
  </script>