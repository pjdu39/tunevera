import { useCookie, useNuxtApp } from '#app'

export default defineNuxtRouteMiddleware(() => {
  const nuxtApp = useNuxtApp();
  let token;

  if (process.server) {
    // console.log("Estoy en el lado del servidor")

    // Acceder al objeto de solicitud en SSR.
    const req = nuxtApp.ssrContext.req;
    token = useCookie(req, 'tokenBearer');
  }
  else if (process.client) {
    // console.log("Estoy en el lado del cliente")

    // Leer la cookie desde el cliente.
    token = document.cookie.split(';').find(c => c.trim().startsWith('tokenBearer='));
    if (token) {
      token = token.split('=')[1];
    }
  }

  if (!token) {
    return navigateTo('/login');
  }

  // TODO: Añadir lógica que evite que se pueda ir a rutas protegidas si el usuario no ha completado el registro.
})

