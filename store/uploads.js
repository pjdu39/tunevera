export const state = () => ({
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
});

export const mutations = {
    // Recipe
    setRecipeData(state, payload) {
        state.newRecipeState.data = payload
    },
    setRecipeLoading(state, payload) {
        state.newRecipeState.loading = payload
    },
    setRecipeError(state, payload) {
        state.newRecipeState.error = payload
    },

    // Poll
    setPollData(state, payload) {
        state.newPollState.data = payload
    },
    setPollLoading(state, payload) {
        state.newPollState.loading = payload
    },
    setPollError(state, payload) {
        state.newPollState.error = payload
    },

    // Discussion
    setDiscussionData(state, payload) {
        state.newDiscussionState.data = payload
    },
    setDiscussionLoading(state, payload) {
        state.newDiscussionState.loading = payload
    },
    setDiscussionError(state, payload) {
        state.newDiscussionState.error = payload
    },

    // Units
    setUnitsData(state, payload) {
        state.getUnitsState.data = payload
    },
    setUnitsLoading(state, payload) {
        state.getUnitsState.loading = payload
    },
    setUnitsError(state, payload) {
        state.getUnitsState.error = payload
    },
}

export const actions = {
    async postRecipe({ commit }, recipe) {
        commit('setRecipeLoading', 'loading');
        try {
            const response = await this.$axios.post('https://localhost:7069/NewRecipe', recipe);
            commit('setRecipeData', response.data);
            commit('setRecipeLoading', 'loaded');
            commit('setRecipeError', null);
        }
        catch(error) {
            commit('setRecipeData', null);
            commit('setRecipeLoading', 'error');
            commit('setRecipeError', error.message);
        }
    },

    async postPoll({ commit }, poll) {
        commit('setPollLoading', 'loading');
        try {
            const response = await this.$axios.post('https://localhost:7069/NewPoll', poll);
            commit('setPollData', response.data);
            commit('setPollLoading', 'loaded');
            commit('setPollError', null);
            console.log('loaded')
        }
        catch(error) {
            commit('setPollData', null);
            commit('setPollLoading', 'error');
            commit('setPollError', error.message);
        }
    },

    async postDiscussion({ commit }, discussion) {
        commit('setDiscussionLoading', 'loading');
        try {
            const response = await this.$axios.post('https://localhost:7069/NewDiscussion', discussion);
            commit('setDiscussionData', response.data);
            commit('setDiscussionLoading', 'loaded');
            commit('setDiscussionError', null);
            console.log('loaded')
        }
        catch(error) {
            commit('setDiscussionData', null);
            commit('setDiscussionLoading', 'error');
            commit('setDiscussionError', error.message);
        }
    },
    
    async fetchUnits({ commit }) {
        commit('setUnitsLoading', 'loading');
        try {
            const response = await this.$axios.get(`https://localhost:7069/GetUnits`);
            commit('setUnitsData', response.data);
            commit('setUnitsLoading', 'loaded');
            commit('setUnitsError', null);
        }
        catch(error) {
            commit('setUnitsData', null);
            commit('setUnitsLoading', 'error');
            commit('setUnitsError', error.message);
        }
    }
}