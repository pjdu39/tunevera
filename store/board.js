import { defineStore } from 'pinia';

// TODO: Agrupar data, loading y error del state en un objeto como en el resto de stores.
export const useBoardStore = defineStore({
    id: 'board',
    state: () => ({
        data: null,
        loading: 'waiting',
        error: null
    }),
    actions: {
        setData(payload) {
            this.data = payload
        },
        setLoading(payload) {
            this.loading = payload
        },
        setError(payload) {
            this.error = payload
        },
        async fetchBoardElements(numElements) {
            const { $fetchApi } = useNuxtApp();
            this.setLoading('loading');
            try {
                const data = await $fetchApi(`GetBoardElements?NumElements=${ numElements }`);

                this.setData(data);
                this.setLoading('loaded');
                this.setError(null);
            }
            catch(error) {
                this.setData(null);
                this.setLoading('waiting');
                this.setError(error.message);
            }
        }
    }
})