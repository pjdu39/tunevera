import { defineStore } from 'pinia';

export const useLoginStore = defineStore({
    id: 'loginStore',
    state: () => ({
        signUpState: {
            data: null,
            loading: 'waiting',
            error: null
        }
    }),
    actions: {
        // User
        setSignUpData(payload) {
            this.signUpState.data = payload;
        },
        setSignUpLoading(payload) {
            this.signUpState.loading = payload;
        },
        setSignUpError(payload) {
            this.signUpState.error = payload;
        },

        async signUp(userData) {
            const { $fetchApi } = useNuxtApp();
            this.setSignUpLoading('loading');
            try {
                const data = await $fetchApi("SignUp", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData)
                });

                this.setSignUpData(data);
                this.setSignUpLoading('loaded');
                this.setSignUpError(null);
            }
            catch(error) {
                this.setSignUpData(null);
                this.setSignUpLoading('error');
                this.setSignUpError(error.message);
            }
        }
    }
});
