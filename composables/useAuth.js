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

  const login = async () => {
    if (auth0.value) {
      // let returnToUrl = window.location.origin;
      // returnToUrl += '/perfil';
      
      // TODO: El bug raro del callback lo corté de raíz eliminando la opción de login con facebook.
      //      En caso de volver a ponerlo, probar a meter esto en un try catch. https://github.com/auth0/nextjs-auth0/issues/413
      
      /*
      await auth0.value.loginWithRedirect({
        authorizationParams: {
          redirect_uri: returnToUrl
        }
      });
      */

      await auth0.value.loginWithRedirect({
        appState: {
          target: '/perfil'
        }
      });
      
      
      // await auth0.value.login();
    }
  };

  const user = computed(() => auth0.value?.user);
  const isAuthenticated = computed(() => auth0.value?.isAuthenticated);
  const isLoading = computed(() => auth0.value?.isLoading);

  /*
  const getTokenFromCookie = () => {
    const tokenCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('tokenBearer='));
    return tokenCookie ? decodeURIComponent(tokenCookie.split('=')[1]) : null;
  };

  const isTokenValid = () => {
    const token = getTokenFromCookie();
    if (!token) return false;
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // tiempo en segundos
    console.log('Expiración en segundos:' + decoded.exp)
    console.log('CurrentTime:' + currentTime)
    return decoded.exp > currentTime;
  };
  */

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
      try {
        // await auth0.value.handleRedirectCallback();
        
        // await setToken();
      } catch (error) {
        // console.error("Error durante el proceso de redirección y establecimiento del token:", error);
      }
    }
  };

  const setToken = async () => {
    if (auth0.value) {
        try {
          const token = await auth0.value.getAccessTokenSilently();

          document.cookie = `tokenBearer=${token};path=/;`;
        } catch (error) {
          console.error("Error al obtener el token silencioso en la función setToken():", error);
        }
    }
  };

  const removeToken = async () => {
    document.cookie = 'tokenBearer=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  // El retorno booleano sirve para indicar a las funciones que llaman al guard si deben continuar ejecutando código.
  const guard = async (path) => {
    if (!isAuthenticated.value) {
      return await login();
    }

    // await setToken();

    // Esta comprobación parece redundante (ya que el propio authGuard comprueba si se está logeado), pero sirve para evitar el return que finalizaría la función,
    //  al mismo tiempo que permite ejecutar el authGuard (de ser necesario) antes de comprobar el estado de registro de la store.
    if (!isAuthenticated.value) {
      // return authGuard(path);
    }

    // Si está autenticado en auth0 pero no ha completado el registro.    
    if (isAuthenticated.value && !store.signUpCompleted) {
      // Redirecciona a Perfil, quien automáticamente debería detectar que no hay id de usuario y mostrar por tanto el formulario de registro
      const router = useRouter();
      if (path !== "/perfil") router.push("/perfil");
      // router.push("/perfil");
      return false;
    }

    return true;
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