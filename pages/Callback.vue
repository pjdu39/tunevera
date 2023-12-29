<template>
  <div class="callback-container">
    <!-- Muestra algún tipo de mensaje de carga o animación -->
    <p>Logging you in...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuth } from "~/composables/useAuth";
import { useRouter } from 'vue-router';

const router = useRouter();
const { redirectCallback } = useAuth();

onMounted(async () => {
  try {
    // Manejar la respuesta de Auth0 y extraer el código de la URL
    await redirectCallback();
    // Redirigir al usuario a su destino final, como su perfil o la página de inicio
    router.push('/');
  } catch (e) {
    console.error(e);
    // Manejar el error, posiblemente redirigir al usuario a una página de error
    router.push('/error');
  }
});
</script>