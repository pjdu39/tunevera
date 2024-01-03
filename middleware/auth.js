import { useCookie, useNuxtApp } from '#app'
import { useAuth } from '~/composables/useAuth';

export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated, setToken } = useAuth();
  await isAuthenticated.value;
  let token;

  if (!isAuthenticated.value) {
    return navigateTo('/login');
  }

  // Lado de Servidor
  if (process.server) {
    const nuxtApp = useNuxtApp();
    const req = nuxtApp.ssrContext.req;
    token = useCookie(req, 'tokenBearer');
  }
  // Lado de Cliente
  else if (process.client) {
    token = document.cookie.split(';').find(c => c.trim().startsWith('tokenBearer='));
    if (token) {
      token = token.split('=')[1];
    }
  }

  if (!token) {
    await setToken();

    // Vuelve a comprobar si el token está ahora disponible
    token = document.cookie.split(';').find(c => c.trim().startsWith('tokenBearer='));
    
    console.log('El token ahora es: ' + token)

    if (!token) {
      // Si todavía no hay token, redirige a la página de login
      return navigateTo('/login');
    }
  }

  // TODO: Añadir lógica que evite que se pueda ir a rutas protegidas si el usuario no ha completado el registro.
})

