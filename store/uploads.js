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
    /*
    data: null,
    loading: 'waiting',
    error: null */
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
    }
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
        }
        catch(error) {
            commit('setPollData', null);
            commit('setPollLoading', 'error');
            commit('setPollError', error.message);
        }
    },
}