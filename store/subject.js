import { defineStore } from 'pinia';

export const useSubjectStore = defineStore({
    id: 'subjectStore',
    state: () => ({
        getSubjectState: {
            data: null,
            loading: 'waiting',
            error: null,
            liked: false
        }
    }),
    actions: {
        // Get subject
        setSubjectData(payload) {
            this.getSubjectState.data = payload;
        },
        setSubjectLoading(payload) {
            this.getSubjectState.loading = payload;
        },
        setSubjectError(payload) {
            this.getSubjectState.error = payload;
        },

        // Subject
        async fetchSubject(id) {
            const { $fetchApi } = useNuxtApp();
            this.setSubjectLoading('loading');
            try {
                const data = await $fetchApi(`GetSubject?Id=${ id }`);

                this.setSubjectData(data);
                // this.setSubjectLike(data.liked);
                this.setSubjectLoading('loaded');
                this.setSubjectError(null);
            }
            catch(error) {
                this.setSubjectData(null);
                this.setSubjectLoading('error');
                // this.setSubjectLike(false);
                this.setSubjectError(error.message);
            }
        }
    }
});
