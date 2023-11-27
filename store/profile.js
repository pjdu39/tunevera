import { defineStore } from 'pinia';

export const useProfileStore = defineStore({
    id: 'profileStore',
    state: () => ({
        getProfileInfoState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        getRecipesState: {
            data: null,
            loading: 'waiting',
            error: null
        }
    }),
    actions: {
        // User
        setProfileInfoData(payload) {
            this.getProfileInfoState.data = payload;
        },
        setProfileInfoLoading(payload) {
            this.getProfileInfoState.loading = payload;
        },
        setProfileInfoError(payload) {
            this.getProfileInfoState.error = payload;
        },

        // Recipes
        setRecipesData(payload) {
            this.getRecipesState.data = payload;
        },
        setRecipesLoading(payload) {
            this.getRecipesState.loading = payload;
        },
        setRecipesError(payload) {
            this.getRecipesState.error = payload;
        },

        async fetchProfileInfo(id) {
            const { $fetchApi } = useNuxtApp();
            this.setProfileInfoLoading('loading');
            try {
                const data = await $fetchApi(`GetProfileInfo?IdUser=${ id }`);

                this.setProfileInfoData(data);
                this.setProfileInfoLoading('loaded');
                this.setProfileInfoError(null);
            }
            catch(error) {
                this.setProfileInfoData(null);
                this.setProfileInfoLoading('error');
                this.setProfileInfoError(error.message);
            }
        },

        async fetchRecipes(idUser) {
            const { $fetchApi } = useNuxtApp();
            this.setRecipesLoading('loading');
            try {
                const data = await $fetchApi(`GetRecipesByUser?IdUser=${ idUser }`);

                this.setRecipesData(data);
                this.setRecipesLoading('loaded');
                this.setRecipesError(null);
            }
            catch(error) {
                this.setRecipesData(null);
                this.setRecipesLoading('error');
                this.setRecipesError(error.message);
            }
        }
    }
});
