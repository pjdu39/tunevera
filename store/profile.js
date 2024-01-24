import { defineStore } from 'pinia';

export const useProfileStore = defineStore({
    id: 'profileStore',
    state: () => ({
        getProfileInfoState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        editProfileState: {
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

        // Edit Profile
        setEditProfileData(payload) {
            this.editProfileState.data = payload;
        },
        setEditProfileLoading(payload) {
            this.editProfileState.loading = payload;
        },
        setEditProfileError(payload) {
            this.editProfileState.error = payload;
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

        async editProfile(body) {
            const { $fetchApi } = useNuxtApp();
            this.setEditProfileLoading('loading');
            try {
                const data = await $fetchApi('EditProfile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });

                this.setEditProfileData(data);
                this.setEditProfileLoading('loaded');
                this.setEditProfileError(null);
            }
            catch(error) {
                this.setEditProfileData(null);
                this.setEditProfileLoading('error');
                this.setEditProfileError(error.message);
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
