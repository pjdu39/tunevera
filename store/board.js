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
            this.setLoading('loading');
            try {
                const response = await this.$axios.get(`${this.$config.apiUrl}GetBoardElements?NumElements=${ numElements }`);
                this.setLoading('loaded');
                this.setData(response.data);
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