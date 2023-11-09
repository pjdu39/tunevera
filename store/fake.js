import { defineStore } from 'pinia';

export const useFakeStore = defineStore({
    id: 'fakeStore',
    state: () => ({
        getFakeLoginTokenState: {
            data: null,
            loading: 'waiting',
            error: null
        }
    }),
    actions: {
        setLoginTokenData(payload) {
            this.getFakeLoginTokenState.data = payload;
        },
        setLoginTokenLoading(payload) {
            this.getFakeLoginTokenState.loading = payload;
        },
        setLoginTokenError(payload) {
            this.getFakeLoginTokenState.error = payload;
        },
        async fetchFakeLoginToken(email) {
            const apiUrl = useRuntimeConfig().public.apiUrl;

            this.setLoginTokenLoading('loading');
            try {
                const httpResponse = await fetch(`${ apiUrl }FakeLogin?Email=${ email }`);

                if (!httpResponse.ok) throw new Error(`Error ${ httpResponse.statusText } en el fetch`);
                
                const data = await httpResponse.json();
                
                // localStorage.setItem('tokenBearer', data.token);

                // Establecer una cookie segura en lugar de usar localStorage
                // document.cookie = `tokenBearer=${data.token};path=/;max-age=3600;Secure;SameSite=Lax`;
                document.cookie = `tokenBearer=${data.token};path=/;`;

                this.setLoginTokenData(data);
                this.setLoginTokenLoading('loaded');
                this.setLoginTokenError(null);
            }
            catch(error) {
                this.setLoginTokenData(null);
                this.setLoginTokenLoading('waiting');
                this.setLoginTokenError(error.message);
            }
        }
    }
});
