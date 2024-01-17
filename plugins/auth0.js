// plugins/auth0.js
import { createAuth0 } from '@auth0/auth0-vue';

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        nuxtApp.vueApp.use(createAuth0({
            domain: "dev-7x0hetr3bl3hslrx.eu.auth0.com", // TODO: Usar variables de entorno
            clientId: "8fMvHWwsTJGlfgOiyBYyVb4KjzcWISBL", // TODO: Usar variables de entorno
            authorizationParams: {
              redirect_uri: 'http://localhost:3000/callback',
              audience: 'https://dev-7x0hetr3bl3hslrx.eu.auth0.com/api/v2/', // TODO: Usar variables de entorno
              scope: 'openid profile email update:current_user_metadata'
            },
            onRedirectCallback: appState => {
                nuxtApp.$router.push(
                    appState && appState.returnTo ? appState.returnTo : window.location.pathname
                );
            }
        }));
    }
});