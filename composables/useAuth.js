// composables/useAuth.js
import { onMounted, ref } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

export function useAuth() {
  const auth0 = ref(null);

  onMounted(() => {
    if (process.client) {
      auth0.value = useAuth0();
    }
  });

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
      auth0.value.logout({
        logoutParams: { 
          returnTo: window.location.origin 
        }
      });
    }
  };

  const redirectCallback = () => {
    if (auth0.value) {
      auth0.value.handleRedirectCallback();
    }
  };

  return {
    login,
    user,
    isAuthenticated,
    isLoading,
    doLogout,
    redirectCallback
  };
}