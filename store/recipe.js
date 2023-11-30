import { defineStore } from 'pinia';

export const useRecipeStore = defineStore({
    id: 'recipeStore',
    state: () => ({
        getRecipeState: {
            data: null,
            loading: 'waiting',
            error: null,
            liked: false
        },
        likeState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        postCommentState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        fetchCommentsState: {
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

        // Comments
        fetchCommentsData(payload) {
            this.fetchCommentsState.data = payload;
        },
        fetchCommentsLoading(payload) {
            this.fetchCommentsState.loading = payload;
        },
        fetchCommentsError(payload) {
            this.fetchCommentsState.error = payload;
        },
        commentData(payload) {
            this.postCommentState.data = payload;
        },
        commentLoading(payload) {
            this.postCommentState.loading = payload;
        },
        commentError(payload) {
            this.postCommentState.error = payload;
        },
        addCommentData(payload) {
            if (this.fetchCommentsState.data) this.fetchCommentsState.data.unshift(payload);
        },

        // Manejo local de estados
        setRecipeLike(payload) {
            this.getRecipeState.liked = payload;
        },

        // Recipe
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

        // Likes
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
        },
        
        // Comments
        async fetchComments(idPost, numElements) {
            const { $fetchApi } = useNuxtApp();
            this.fetchCommentsLoading('loading');
            try {
                const data = await $fetchApi(`GetComments?IdPost=${ idPost }&NumElements=${ numElements }`);

                this.fetchCommentsData(data);
                this.fetchCommentsLoading('loaded');
                this.fetchCommentsError(null);
            }
            catch(error) {
                this.fetchCommentsData(null);
                this.fetchCommentsLoading('error');
                this.fetchCommentsError(error.message);
            }
        },
        async comment(idPost, text) {
            const { $fetchApi } = useNuxtApp();
            this.commentLoading('loading');
            try {
                const data = await $fetchApi("comment", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ IdPost: idPost, Text: text })
                });

                this.commentData(data);

                // Añade el comentario al array en local
                this.addCommentData(data);

                this.commentLoading('loaded');
                this.commentError(null);
            }
            catch(error) {
                this.commentData(null);
                this.commentLoading('error');
                this.commentError(error.message);
            }
        }
    }
});
