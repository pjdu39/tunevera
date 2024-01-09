// composables/useAuth.js
import { onMounted, ref } from 'vue';
import { useAuth0, authGuard } from '@auth0/auth0-vue';

export function useAuth() {
  const auth0 = ref(null);

  if (process.client) {
    auth0.value = useAuth0();
  }

  const login = () => {
    if (auth0.value) {
      auth0.value.loginWithRedirect();
    }
  };

  const user = computed(() => auth0.value?.user);
  const isAuthenticated = computed(() => auth0.value?.isAuthenticated);
  const isLoading = computed(() => auth0.value?.isLoading);

  const doLogout = () => {
    if (auth0.value) {
      removeToken();
      auth0.value.logout({
        logoutParams: { 
          returnTo: window.location.origin 
        }
      });
    }
  };

  const redirectCallback = async () => {
    if (auth0.value) {
      auth0.value.handleRedirectCallback();
      await setToken()
    }
  };

  const setToken = async () => {
    if (auth0.value) {
        try {
          const token = await auth0.value.getAccessTokenSilently({
            audience: 'https://cookbook-api.com'
          });

          document.cookie = `tokenBearer=${token};path=/;`;
        } catch (error) {
          console.error("Error al obtener el token:", error);
        }
    }
  };

  const removeToken = async () => {
    document.cookie = 'tokenBearer=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  const guard = (path) => {
    return authGuard(path);
  }


  return {
    login,
    user,
    isAuthenticated,
    isLoading,
    doLogout,
    redirectCallback,
    setToken,
    guard
  };
}