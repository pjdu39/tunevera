import { defineStore } from 'pinia';

export const useBlobStore = defineStore({
    id: 'blobStore',
    state: () => ({
        getSasTokenState: {
            data: null,
            loading: 'waiting',
            error: null
        }
    }),
    actions: {
        setSasTokenData(payload) {
            this.getSasTokenState.data = payload;
        },
        setSasTokenLoading(payload) {
            this.getSasTokenState.loading = payload;
        },
        setSasTokenError(payload) {
            this.getSasTokenState.error = payload;
        },
        async fetchSasToken() {
            const { $fetchApi } = useNuxtApp();
            this.setSasTokenLoading('loading');
            try {
                const data = await $fetchApi('get-sas-token');

                console.log(data)

                this.setSasTokenData(data);
                this.setSasTokenLoading('loaded');
                this.setSasTokenError(null);
            }
            catch(error) {
                this.setSasTokenData(null);
                this.setSasTokenLoading('error');
                this.setSasTokenError(error.message);
            }
        }
    }
});
