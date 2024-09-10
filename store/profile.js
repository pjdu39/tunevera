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
        getCheckValidNameState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        getRecipesState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        getCommunityState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        getDeleteAccountState: {
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

        // Check valid name
        setCheckValidNameData(payload) {
            this.getCheckValidNameState.data = payload;
        },
        setCheckValidNameLoading(payload) {
            this.getCheckValidNameState.loading = payload;
        },
        setCheckValidNameError(payload) {
            this.getCheckValidNameState.error = payload;
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

        // Community
        setCommunityData(payload) {
            this.getCommunityState.data = payload;
        },
        setCommunityLoading(payload) {
            this.getCommunityState.loading = payload;
        },
        setCommunityError(payload) {
            this.getCommunityState.error = payload;
        },

        // Delete Account
        setDeleteAccountData(payload) {
            this.getDeleteAccountState.data = payload;
        },
        setDeleteAccountLoading(payload) {
            this.getDeleteAccountState.loading = payload;
        },
        setDeleteAccountError(payload) {
            this.getDeleteAccountState.error = payload;
        },
        resetDeleteAccountState() {
            this.getDeleteAccountState.data = null
            this.getDeleteAccountState.loading = 'waiting';
            this.getDeleteAccountState.error = null;
        },

        async fetchProfileInfo(id) {
            const { $fetchApi } = useNuxtApp();
            this.setProfileInfoLoading('loading');
            try {
                const data = await $fetchApi(`GetProfileInfo?IdUser=${ id }`);

                /*
                if (data && data.pictureUrl) {
                    const timestamp = Date.now();
                    data.pictureUrl = `${data.pictureUrl}?v=${timestamp}`;
                }
                */

                console.log(data.pictureUrl)

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

        async checkValidName(name) {
            const { $fetchApi } = useNuxtApp();
            this.setCheckValidNameLoading('loading');
            try {
                const data = await $fetchApi(`CheckValidName?Name=${ name }`);

                this.setCheckValidNameData(data);
                this.setCheckValidNameLoading('loaded');
                this.setCheckValidNameError(null);
            }
            catch(error) {
                this.setCheckValidNameData(null);
                this.setCheckValidNameLoading('error');
                this.setCheckValidNameError(error.message);
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
        },

        async fetchCommunity(idUser) {
            const { $fetchApi } = useNuxtApp();
            this.setCommunityLoading('loading');
            try {
                const data = await $fetchApi(`GetCommunityByUser?IdUser=${ idUser }`);

                this.setCommunityData(data);
                this.setCommunityLoading('loaded');
                this.setCommunityError(null);
            }
            catch(error) {
                this.setCommunityData(null);
                this.setCommunityLoading('error');
                this.setCommunityError(error.message);
            }
        },
        
        async deleteAccount() {
            const { $fetchApi } = useNuxtApp();
            this.setDeleteAccountLoading('loading');
            try {
                const data = await $fetchApi(`DeleteAccount`, { method: 'DELETE' });

                this.setDeleteAccountData(data);
                this.setDeleteAccountLoading('loaded');
                this.setDeleteAccountError(null);
            }
            catch(error) {
                this.setDeleteAccountData(null);
                this.setDeleteAccountLoading('error');
                this.setDeleteAccountError(error.message);
            }
        },
    }
});
