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
                }, `https://${authProviderDomain}`); // TODO: Pasar a variables de entorno

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
    }
});
