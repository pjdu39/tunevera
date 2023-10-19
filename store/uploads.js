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
            this.setRecipeLoading('loading');
            try {
                const response = await this.$axios.post('https://localhost:7069/NewRecipe', recipe);
                this.setRecipeData(response.data);
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
            this.setPollLoading('loading');
            try {
                const response = await this.$axios.post('https://localhost:7069/NewPoll', poll);
                this.setPollData(response.data);
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
            this.setDiscussionLoading('loading');
            try {
                const response = await this.$axios.post('https://localhost:7069/NewDiscussion', discussion);
                this.setDiscussionData(response.data);
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
            this.setUnitsLoading('loading');
            try {
                const response = await this.$axios.get(`https://localhost:7069/GetUnits`);
                this.setUnitsData(response.data);
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
