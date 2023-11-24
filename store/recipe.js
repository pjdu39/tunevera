import { defineStore } from 'pinia';

export const useRecipeStore = defineStore({
    id: 'recipeStore',
    state: () => ({
        getRecipeState: {
            data: null,
            loading: 'waiting',
            error: null,
            liked: false // Considerar moverlo al data de likeState. No estoy seguro de si compensa
        },
        likeState: {
            data: null,
            loading: 'waiting',
            error: null
        }
    }),
    actions: {
        // Get recipe
        setRecipeData(payload) {
            this.getRecipeState.data = payload;
        },
        setRecipeLoading(payload) {
            this.getRecipeState.loading = payload;
        },
        setRecipeError(payload) {
            this.getRecipeState.error = payload;
        },

        // Give like/dislike
        likeData(payload) {
            this.likeState.data = payload;
        },
        likeLoading(payload) {
            this.likeState.loading = payload;
        },
        likeError(payload) {
            this.likeState.error = payload;
        },

        // Manejo local de estados
        setRecipeLike(payload) {
            this.getRecipeState.liked = payload;
        },
        async fetchRecipe(id) {
            const { $fetchApi } = useNuxtApp();
            this.setRecipeLoading('loading');
            try {
                const data = await $fetchApi(`GetRecipe?IdRecipe=${ id }`);

                this.setRecipeData(data);
                this.setRecipeLike(data.liked);
                this.setRecipeLoading('loaded');
                this.setRecipeError(null);
            }
            catch(error) {
                this.setRecipeData(null);
                this.setRecipeLoading('error');
                this.setRecipeLike(false);
                this.setRecipeError(error.message);
            }
        },
        async like(id) {
            const { $fetchApi } = useNuxtApp();
            this.likeLoading('loading');
            try {
                const data = await $fetchApi("like", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ IdPost: id })
                });

                this.likeData(data);
                this.likeLoading('loaded');
                this.likeError(null);
            }
            catch(error) {
                this.likeData(null);
                this.likeLoading('error');
                this.likeError(error.message);
            }
        },
        updateLikeState(newValue) {
            this.setRecipeLike(newValue);
        }
    }
});
