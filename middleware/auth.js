/*
import { useCookie, useNuxtApp } from '#app'
import { useAuth } from '~/composables/useAuth';

export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated, setToken } = useAuth();
  await isAuthenticated.value;
  let token;

  console.log('Estoy pasando por el middleware')

  if (!isAuthenticated.value) {
    console.log('No estoy autenticado')
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
*/

// TODO: Estoy revisando la utilidad de esto y parece obsoleto. Comprobar si se llama en algún sitio y borrarlo si no es así.
//        Actualmente la forma de hacerlo es llamar al guard del composable que se encarga de la autenticación en el onMounted.
import { authGuard } from "@auth0/auth0-vue";

export default function (context) {
  console.log(context)
  return authGuard(context.path);
}