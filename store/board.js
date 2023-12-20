import { defineStore } from 'pinia';

// TODO: Agrupar data, loading y error del state en un objeto como en el resto de stores.
export const useBoardStore = defineStore({
    id: 'board',
    state: () => ({
        data: [],
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
        nextPage() {
            this.page++;
        },
        async fetchBoardElements(numElements, page) {
            const { $fetchApi } = useNuxtApp();
            this.setLoading('loading');
            try {
                const data = await $fetchApi(`GetBoardElements?NumElements=${ numElements }&Page=${ page }`);

                this.setData(data);
                this.setLoading('loaded');
                this.setError(null);
                console.log(page)
            }
            catch(error) {
                this.setData([]);
                this.setLoading('error');
                this.setError(error.message);
            }
        }
    }
})