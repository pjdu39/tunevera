import { defineStore } from 'pinia';

export const useProfileStore = defineStore({
    id: 'profileStore',
    state: () => ({
        getProfileInfoState: {
            data: null,
            loading: 'waiting',
            error: null
        }
    }),
    actions: {
        setProfileInfoData(payload) {
            this.getProfileInfoState.data = payload;
        },
        setProfileInfoLoading(payload) {
            this.getProfileInfoState.loading = payload;
        },
        setProfileInfoError(payload) {
            this.getProfileInfoState.error = payload;
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
        }
    }
});
