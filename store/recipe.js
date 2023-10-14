import { defineStore } from 'pinia';

export const useRecipeStore = defineStore({
    id: 'recipeStore',
    state: () => ({
        data: null,
        loading: 'waiting',
        error: null
    }),
    actions: {
        setData(payload) {
            this.data = payload;
        },
        setLoading(payload) {
            this.loading = payload;
        },
        setError(payload) {
            this.error = payload;
        },
        async fetchData(id) {
            this.setLoading('loading');
            try {
                const response = await this.$axios.get(`https://localhost:7069/GetRecipe?IdRecipe=${ id }`);
                this.setData(response.data);
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
});
