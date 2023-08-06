export const state = () => ({
    data: null,
    loading: 'waiting',
    error: null
});

export const mutations = {
    setData(state, payload) {
        state.data = payload
    },
    setLoading(state, payload) {
        state.loading = payload
    },
    setError(state, payload) {
        state.error = payload
    }
}

export const actions = {
    async fetchData({ commit }, numElements) {
        commit('setLoading', 'loading');
        try {
            const response = await this.$axios.get(`https://localhost:7069/GetBoardElements?NumElements=${ numElements }`);
            commit('setLoading', 'loaded');
            commit('setData', response.data);
            commit('setError', null);
        }
        catch(error) {
            commit('setData', null);
            commit('setLoading', 'waiting');
            commit('setError', error.message);
        }
    }
}