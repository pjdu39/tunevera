import { defineStore } from 'pinia';

export const usePollStore = defineStore({
    id: 'pollStore',
    state: () => ({
        answerState: {
            data: null,
            loading: 'waiting',
            error: null
        },
    }),
    actions: {
        setAnswerData(payload) {
            this.answerState.data = payload;
        },
        setAnswerLoading(payload) {
            this.answerState.loading = payload;
        },
        setAnswerError(payload) {
            this.answerState.error = payload;
        },

        async vote(idPost, idAnswer) {
            const { $fetchApi } = useNuxtApp();
            this.setAnswerLoading('loading');
            try {
                const data = await $fetchApi("VoteAnswer", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ IdPost: idPost, IdAnswer: idAnswer })
                });

                this.setAnswerData(data);
                this.setAnswerLoading('loaded');
                this.setAnswerError(null);
            }
            catch(error) {
                this.setAnswerData(null);
                this.setAnswerLoading('error');
                this.setAnswerError(error.message);
            }
        }
    }
});
