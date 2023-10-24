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
            const apiUrl = useRuntimeConfig().public.apiUrl;
            
            this.setLoading('loading');
            try {
                const httpResponse = await fetch(`${ apiUrl }GetBoardElements?NumElements=${ numElements }`);

                if (!httpResponse.ok) throw new Error(`Error ${ httpResponse.statusText } en el fetch`);
                
                const data = await httpResponse.json();
                
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