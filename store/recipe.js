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
            const { $fetchApi } = useNuxtApp();
            this.setRecipeLoading('loading');
            try {
                const data = await $fetchApi(`GetRecipe?IdRecipe=${ id }`);

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
