import { defineStore } from 'pinia';

export const useCommentStore = defineStore({
    id: 'commentStore',
    state: () => ({
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
