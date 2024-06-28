import path from 'path';
import { defineStore } from 'pinia';

export const useLoginStore = defineStore({
    id: 'loginStore',
    state: () => ({
        signUpState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        patchAuth0UserState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        checkSignUpState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        redirectInfo: {
            lastRoute: null,
            lastData: {}
        }
    }),
    actions: {
        // Registro en bbdd propia
        setSignUpData(payload) {
            this.signUpState.data = payload;
        },
        setSignUpLoading(payload) {
            this.signUpState.loading = payload;
        },
        setSignUpError(payload) {
            this.signUpState.error = payload;
        },

        // Modificar datos del usuario en Auth0
        patchAuth0UserData(payload) {
            this.patchAuth0UserState.data = payload;
        },
        patchAuth0UserLoading(payload) {
            this.patchAuth0UserState.loading = payload;
        },
        patchAuth0UserError(payload) {
            this.patchAuth0UserState.error = payload;
        },
        
        // Comprueba si se ha completado el registro
        setCheckSignUpData(payload) {
            this.checkSignUpState.data = payload;
        },
        setCheckSignUpLoading(payload) {
            this.checkSignUpState.loading = payload;
        },
        setCheckSignUpError(payload) {
            this.checkSignUpState.error = payload;
        },

        // Guarda información para la redirección tras el login o refresco de tokens
        async setLastRoute(payload) {
            // console.log('this.redirectInfo.lastRoute era: ' + this.redirectInfo.lastRoute)
            if (payload.toLowerCase() === '/callback') return
            this.redirectInfo.lastRoute = payload
            // console.log('this.redirectInfo.lastRoute ahora es: ' + this.redirectInfo.lastRoute)
        },
        setLastData(payload) {
            this.redirectInfo.lastData = payload
        },

        async signUp(userData) {
            const { $fetchApi } = useNuxtApp();
            this.setSignUpLoading('loading');
            try {
                const data = await $fetchApi("SignUp", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData)
                });

                this.setSignUpData(data);
                this.setSignUpLoading('loaded');
                this.setSignUpError(null);
            }
            catch(error) {
                this.setSignUpData(null);
                this.setSignUpLoading('error');
                this.setSignUpError(error.message);
            }
        },

        async patchAuth0User(id, auth0UserData) {
            const { $fetchApi } = useNuxtApp();
            const { authProviderDomain } = useRuntimeConfig().public;

            this.patchAuth0UserLoading('loading');
            try {
                const data = await $fetchApi(`api/v2/users/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(auth0UserData)
                }, `https://${authProviderDomain}`);

                this.patchAuth0UserData(data);
                this.patchAuth0UserLoading('loaded');
                this.patchAuth0UserError(null);
            }
            catch(error) {
                this.patchAuth0UserData(null);
                this.patchAuth0UserLoading('error');
                this.patchAuth0UserError(error.message);
            }
        },

        async checkSignUp() {
            const { $fetchApi } = useNuxtApp();
            this.setCheckSignUpLoading('loading');
            try {
                const data = await $fetchApi('CheckSignUp');

                this.setCheckSignUpData(data);
                this.setCheckSignUpLoading('loaded');
                this.setCheckSignUpError(null);
            }
            catch(error) {
                this.setCheckSignUpData(null);
                this.setCheckSignUpLoading('error');
                this.setCheckSignUpError(error.message);
            }
        }
    }
});
