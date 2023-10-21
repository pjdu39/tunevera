import { defineStore } from 'pinia';

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
        async fetchData(numElements) {
            const apiUrl = useRuntimeConfig().public.apiUrl;
            
            this.setLoading('loading');
            try {
                const httpResponse = await fetch(`${ apiUrl }GetBoardElements?NumElements=${ numElements }`);

                if (!httpResponse.ok) throw new Error(`Error ${ httpResponse.statusText } en el fetch`);
                
                const response = await httpResponse.json();
                
                this.setData(response);
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