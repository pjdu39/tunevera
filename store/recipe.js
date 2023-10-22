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
        async fetchRecipe(id) {
            const apiUrl = useRuntimeConfig().public.apiUrl;

            this.setRecipeLoading('loading');
            try {
                const httpResponse = await fetch(`${ apiUrl }GetRecipe?IdRecipe=${ id }`);

                if (!httpResponse.ok) throw new Error(`Error ${ httpResponse.statusText } en el fetch`);
                
                const data = await httpResponse.json();

                this.setRecipeData(data);
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
