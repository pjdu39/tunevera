// plugins/auth0.js
import { createAuth0 } from '@auth0/auth0-vue';

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        const { authProviderDomain, authProviderClientId, authProviderRedirectUri, authProviderAudience } = useRuntimeConfig().public;

        const auth0 = createAuth0({
            domain: authProviderDomain,
            clientId: authProviderClientId,
            authorizationParams: {
              redirect_uri: authProviderRedirectUri,
              audience: authProviderAudience,
              useRefreshTokens: true,
              scope: 'openid profile email update:current_user_metadata'
            },
            // TODO: Revisar esto por si es lo que me está generando redirecciones indeseadas
            /*
            onRedirectCallback: appState => {
                nuxtApp.$router.push(
                    appState && appState.returnTo ? appState.rppeturnTo : window.location.pathname
                );
            }
                */
        })

        nuxtApp.vueApp.use(auth0);
    }
});