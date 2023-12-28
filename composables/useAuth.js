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

  return { login };
}