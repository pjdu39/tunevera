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
            const apiUrl = useRuntimeConfig().public.apiUrl;

            this.setLoading('loading');
            try {
                const httpResponse = await fetch(`${ apiUrl }GetRecipe?IdRecipe=${ id }`);

                if (!httpResponse.ok) throw new Error(`Error ${ httpResponse.statusText } en el fetch`);
                
                const response = await httpResponse.json();
                console.log(response)

                this.setData(response);
                this.setLoading('loaded');
                this.setError(null);
            }
            catch(error) {
                this.setData(null);
                this.setLoading('waiting');
                this.setError(error.message);
                console.log(error)
            }
        }
    }
});
