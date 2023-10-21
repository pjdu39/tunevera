import { defineStore } from 'pinia';

export const useRecipeStore = defineStore({
    id: 'recipeStore',
    state: () => ({
        getRecipeState: {
            data: null,
            loading: 'waiting',
            error: null
        }
    }),
    actions: {
        setRecipeData(payload) {
            this.getRecipeState.data = payload;
        },
        setRecipeLoading(payload) {
            this.getRecipeState.loading = payload;
        },
        setRecipeError(payload) {
            this.getRecipeState.error = payload;
        },
        async fetchRecipeData(id) {
            const apiUrl = useRuntimeConfig().public.apiUrl;

            this.setRecipeLoading('loading');
            try {
                const httpResponse = await fetch(`${ apiUrl }GetRecipe?IdRecipe=${ id }`);

                if (!httpResponse.ok) throw new Error(`Error ${ httpResponse.statusText } en el fetch`);
                
                const response = await httpResponse.json();

                this.setRecipeData(response);
                this.setRecipeLoading('loaded');
                this.setRecipeError(null);
            }
            catch(error) {
                this.setRecipeData(null);
                this.setRecipeLoading('waiting');
                this.setRecipeError(error.message);
            }
        }
    }
});
