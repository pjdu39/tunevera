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
        editRecipeState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        deleteRecipeState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        editThreadState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        deleteThreadState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        deletePollState: {
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

        // Mutations for Edit Recipe
        setEditRecipeData(payload) {
            this.editRecipeState.data = payload;
        },
        setEditRecipeLoading(payload) {
            this.editRecipeState.loading = payload;
        },
        setEditRecipeError(payload) {
            this.editRecipeState.error = payload;
        },

        // Mutations for Delete Recipe
        setDeleteRecipeData(payload) {
            this.deleteRecipeState.data = payload;
        },
        setDeleteRecipeLoading(payload) {
            this.deleteRecipeState.loading = payload;
        },
        setDeleteRecipeError(payload) {
            this.deleteRecipeState.error = payload;
        },

        // Mutations for Edit Thread
        setEditThreadData(payload) {
            this.editThreadState.data = payload;
        },
        setEditThreadLoading(payload) {
            this.editThreadState.loading = payload;
        },
        setEditThreadError(payload) {
            this.editThreadState.error = payload;
        },

        // Mutations for Delete Thread
        setDeleteThreadData(payload) {
            this.deleteThreadState.data = payload;
        },
        setDeleteThreadLoading(payload) {
            this.deleteThreadState.loading = payload;
        },
        setDeleteThreadError(payload) {
            this.deleteThreadState.error = payload;
        },

        // Mutations for Delete Poll
        setDeletePollData(payload) {
            this.deletePollState.data = payload;
        },
        setDeletePollLoading(payload) {
            this.deletePollState.loading = payload;
        },
        setDeletePollError(payload) {
            this.deletePollState.error = payload;
        },

        // Actions
        async postRecipe(recipe) {
            const { $fetchApi } = useNuxtApp();
            this.setRecipeLoading('loading');
            try {
                const data = await $fetchApi("NewRecipe", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(recipe)
                });

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
            const { $fetchApi } = useNuxtApp();
            this.setPollLoading('loading');
            try {
                const data = await $fetchApi("NewPoll", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(poll)
                });

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
            const { $fetchApi } = useNuxtApp();
            this.setDiscussionLoading('loading');
            try {
                const data = await $fetchApi("NewDiscussion", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(discussion)
                });

                console.log(data);

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
            const { $fetchApi } = useNuxtApp();
            this.setUnitsLoading('loading');
            try {
                const data = await $fetchApi("GetUnits");
                
                this.setUnitsData(data);
                this.setUnitsLoading('loaded');
                this.setUnitsError(null);
            }
            catch(error) {
                this.setUnitsData(null);
                this.setUnitsLoading('error');
                this.setUnitsError(error.message);
            }
        },
        
        async putRecipe(changes) {
            const { $fetchApi } = useNuxtApp();
            this.setEditRecipeLoading('loading');
            try {
                const data = await $fetchApi("EditRecipe", {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(changes)
                });

                this.setEditRecipeData(data);
                this.setEditRecipeLoading('loaded');
                this.setEditRecipeError(null);
            }
            catch(error) {
                this.setEditRecipeData(null);
                this.setEditRecipeLoading('error');
                this.setEditRecipeError(error.message);
            }
        },
        
        async deleteRecipe(id, idUser) {
            const { $fetchApi } = useNuxtApp();
            this.setDeleteRecipeLoading('loading');
            try {
                const data = await $fetchApi(`DeleteRecipe?Id=${ id }&IdUser=${ idUser }`, { method: 'DELETE' });

                this.setDeleteRecipeData(data);
                this.setDeleteRecipeLoading('loaded');
                this.setDeleteRecipeError(null);
            }
            catch(error) {
                this.setDeleteRecipeData(null);
                this.setDeleteRecipeLoading('error');
                this.setDeleteRecipeError(error.message);
            }
        },
        
        async putThread(changes) {
            const { $fetchApi } = useNuxtApp();
            this.setEditThreadLoading('loading');
            try {
                const data = await $fetchApi("EditThread", {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(changes)
                });

                this.setEditThreadData(data);
                this.setEditThreadLoading('loaded');
                this.setEditThreadError(null);
            }
            catch(error) {
                this.setEditThreadData(null);
                this.setEditThreadLoading('error');
                this.setEditThreadError(error.message);
            }
        },
        
        async deleteThread(id, idUser) {
            const { $fetchApi } = useNuxtApp();
            this.setDeleteThreadLoading('loading');
            try {
                const data = await $fetchApi(`DeleteThread?Id=${ id }&IdUser=${ idUser }`, { method: 'DELETE' });

                this.setDeleteThreadData(data);
                this.setDeleteThreadLoading('loaded');
                this.setDeleteThreadError(null);
            }
            catch(error) {
                this.setDeleteThreadData(null);
                this.setDeleteThreadLoading('error');
                this.setDeleteThreadError(error.message);
            }
        },
        
        async deletePoll(id, idUser) {
            const { $fetchApi } = useNuxtApp();
            this.setDeletePollLoading('loading');
            try {
                const data = await $fetchApi(`DeletePoll?Id=${ id }&IdUser=${ idUser }`, { method: 'DELETE' });

                this.setDeletePollData(data);
                this.setDeletePollLoading('loaded');
                this.setDeletePollError(null);
            }
            catch(error) {
                this.setDeletePollData(null);
                this.setDeletePollLoading('error');
                this.setDeletePollError(error.message);
            }
        },
    }
});
