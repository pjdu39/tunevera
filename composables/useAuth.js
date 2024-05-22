// composables/useAuth.js
import { onMounted, ref } from 'vue';
import { useAuth0, authGuard } from '@auth0/auth0-vue';
import { useLoginStore } from "~/store/login.js";

export function useAuth() {
  const auth0 = ref(null);
  const store = useLoginStore();

  if (process.client) {
    auth0.value = useAuth0();
  }

  const login = () => {
    if (auth0.value) {
      let returnToUrl = window.location.origin;
      returnToUrl += '/perfil';
      
      auth0.value.loginWithRedirect({
        authorizationParams: {
          redirect_uri: returnToUrl
        }
      });
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

  const logoutAndRedirectToLogin = () => {
    if (auth0.value) {
      removeToken();

      let returnToUrl = window.location.origin;
      returnToUrl += '/perfil';

      auth0.value.logout({
        logoutParams: { 
          returnTo: returnToUrl 
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
            /* audience: 'https://cookbook-api.com',
            scope: 'openid profile email update:users update:users_app_metadata update:current_user_metadata' */
          });

          document.cookie = `tokenBearer=${token};path=/;`;
        } catch (error) {
          console.error("Error al obtener el token en la función setToken():", error);
        }
    }
  };

  const removeToken = async () => {
    document.cookie = 'tokenBearer=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  const guard = async (path) => {
    // TODO: Tratar de marcar el token con fecha y hora y ejecutar setToken solo cuando se sospeche que ha expirado.
    await setToken();

    // Esta comprobación parece redundante (ya que el propio authGuard comprueba si se está logeado), pero sirve para evitar el return que finalizaría la función,
    //  al mismo tiempo que permite ejecutar el authGuard (de ser necesario) antes de comprobar el estado de registro de la store.
    if (!isAuthenticated.value) {
      return authGuard(path);
    }

    // Si está autenticado en auth0 pero no ha completado el registro.    
    if (isAuthenticated.value && !store.signUpCompleted) {
      // Redirecciona a Perfil, quien automáticamente debería detectar que no hay id de usuario y mostrar por tanto el formulario de registro
      const router = useRouter();
      router.push("/perfil");
    }
    

    
  }


  return {
    login,
    user,
    isAuthenticated,
    isLoading,
    doLogout,
    logoutAndRedirectToLogin,
    redirectCallback,
    setToken,
    guard
  };
}