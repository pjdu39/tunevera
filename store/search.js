import { defineStore } from 'pinia';

export const useSearchStore = defineStore({
    id: 'searchStore',
    state: () => ({
        searchRecipesState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        searchUsersState: {
            data: null,
            loading: 'waiting',
            error: null
        }
    }),
    actions: {
        // Recipes
        /* fetchCommentsData(payload) {
            this.fetchCommentsState.data = payload;
        },
        fetchCommentsLoading(payload) {
            this.fetchCommentsState.loading = payload;
        },
        fetchCommentsError(payload) {
            this.fetchCommentsState.error = payload;
        }, */

        // Users
        fetchUsersData(payload) {
            this.searchUsersState.data = payload;
        },
        fetchUsersLoading(payload) {
            this.searchUsersState.loading = payload;
        },
        fetchUsersError(payload) {
            this.searchUsersState.error = payload;
        },
        
        // Recipes
        /*
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
        */

        // Users
        async fetchUsers(filter) {
            const { $fetchApi } = useNuxtApp();
            this.fetchUsersLoading('loading');
            try {
                const data = !filter ? await $fetchApi('SearchUsers') : await $fetchApi(`SearchUsers?filter=${ filter }`);

                this.fetchUsersData(data);
                this.fetchUsersLoading('loaded');
                this.fetchUsersError(null);
            }
            catch(error) {
                this.fetchUsersData(null);
                this.fetchUsersLoading('error');
                this.fetchUsersError(error.message);
            }
        },

        setFetchUsersLoading() {
            this.fetchUsersLoading('loading');
        }
    }
});
