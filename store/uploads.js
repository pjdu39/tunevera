import { defineStore } from 'pinia';

export const useUploadsStore = defineStore({
    id: 'mainStore',
    state: () => ({
        newRecipeState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        newPollState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        newDiscussionState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        getUnitsState: {
            data: null,
            loading: 'waiting',
            error: null
        },
    }),
    actions: {
        // Mutations for Recipe
        setRecipeData(payload) {
            this.newRecipeState.data = payload;
        },
        setRecipeLoading(payload) {
            this.newRecipeState.loading = payload;
        },
        setRecipeError(payload) {
            this.newRecipeState.error = payload;
        },

        // Mutations for Poll
        setPollData(payload) {
            this.newPollState.data = payload;
        },
        setPollLoading(payload) {
            this.newPollState.loading = payload;
        },
        setPollError(payload) {
            this.newPollState.error = payload;
        },

        // Mutations for Discussion
        setDiscussionData(payload) {
            this.newDiscussionState.data = payload;
        },
        setDiscussionLoading(payload) {
            this.newDiscussionState.loading = payload;
        },
        setDiscussionError(payload) {
            this.newDiscussionState.error = payload;
        },

        // Mutations for Units
        setUnitsData(payload) {
            this.getUnitsState.data = payload;
        },
        setUnitsLoading(payload) {
            this.getUnitsState.loading = payload;
        },
        setUnitsError(payload) {
            this.getUnitsState.error = payload;
        },

        // Actions
        async postRecipe(recipe) {
            const apiUrl = useRuntimeConfig().public.apiUrl;
            this.setRecipeLoading('loading');
            try {
                const httpResponse = await fetch(`${ apiUrl }NewRecipe`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(recipe)
                });

                if (!httpResponse.ok) throw new Error(`HTTP error! status: ${httpResponse.status}`);

                const data = await httpResponse.json();

                this.setRecipeData(data);
                this.setRecipeLoading('loaded');
                this.setRecipeError(null);
            }
            catch(error) {
                this.setRecipeData(null);
                this.setRecipeLoading('error');
                this.setRecipeError(error.message);
            }
        },

        async postPoll(poll) {
            const apiUrl = useRuntimeConfig().public.apiUrl;
            this.setPollLoading('loading');
            try {
                const httpResponse = await fetch(`${ apiUrl }NewPoll`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(poll)
                });

                if (!httpResponse.ok) throw new Error(`HTTP error! status: ${httpResponse.status}`);

                const data = await httpResponse.json();

                this.setPollData(data);
                this.setPollLoading('loaded');
                this.setPollError(null);
            }
            catch(error) {
                this.setPollData(null);
                this.setPollLoading('error');
                this.setPollError(error.message);
            }
        },

        async postDiscussion(discussion) {
            const apiUrl = useRuntimeConfig().public.apiUrl;
            this.setDiscussionLoading('loading');
            try {
                const httpResponse = await fetch(`${ apiUrl }NewDiscussion`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(discussion)
                });

                if (!httpResponse.ok) throw new Error(`HTTP error! status: ${httpResponse.status}`);

                const data = await httpResponse.json();

                this.setDiscussionData(data);
                this.setDiscussionLoading('loaded');
                this.setDiscussionError(null);
            }
            catch(error) {
                this.setDiscussionData(null);
                this.setDiscussionLoading('error');
                this.setDiscussionError(error.message);
            }
        },

        async fetchUnits() {
            const apiUrl = useRuntimeConfig().public.apiUrl;
            this.setUnitsLoading('loading');
            try {
                const httpResponse = await fetch(`${ apiUrl }GetUnits`);

                if (!httpResponse.ok) throw new Error(`Error ${ httpResponse.statusText } en el fetch`);
                
                const data = await httpResponse.json();
                
                this.setUnitsData(data);
                this.setUnitsLoading('loaded');
                this.setUnitsError(null);
            }
            catch(error) {
                this.setUnitsData(null);
                this.setUnitsLoading('error');
                this.setUnitsError(error.message);
            }
        }
    }
});
