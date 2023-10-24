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
        async fetchFakeLoginToken(idUser) {
            const apiUrl = useRuntimeConfig().public.apiUrl;

            this.setLoginTokenLoading('loading');
            try {
                const httpResponse = await fetch(`${ apiUrl }FakeLogin?IdUser=${ idUser }`);

                if (!httpResponse.ok) throw new Error(`Error ${ httpResponse.statusText } en el fetch`);
                console.log(httpResponse)
                const data = await httpResponse.json();

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
