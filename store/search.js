import { defineStore } from 'pinia';

export const useSearchStore = defineStore({
    id: 'searchStore',
    state: () => ({
        searchRecipesState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        searchUsersState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        getIngredientsState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        getTagsState: {
            data: null,
            loading: 'waiting',
            error: null
        }
    }),
    actions: {
        // Recipes
        fetchRecipesData(payload) {
            this.searchRecipesState.data = payload;
        },
        fetchRecipesLoading(payload) {
            this.searchRecipesState.loading = payload;
        },
        fetchRecipesError(payload) {
            this.searchRecipesState.error = payload;
        },

        // Users
        fetchUsersData(payload) {
            this.searchUsersState.data = payload;
        },
        fetchUsersLoading(payload) {
            this.searchUsersState.loading = payload;
        },
        fetchUsersError(payload) {
            this.searchUsersState.error = payload;
        },

        // Sugerencias
        fetchIngredientsData(payload) {
            this.getIngredientsState.data = payload;
        },
        fetchIngredientsLoading(payload) {
            this.getIngredientsState.loading = payload;
        },
        fetchIngredientsError(payload) {
            this.getIngredientsState.error = payload;
        },
        
        fetchTagsData(payload) {
            this.getTagsState.data = payload;
        },
        fetchTagsLoading(payload) {
            this.getTagsState.loading = payload;
        },
        fetchTagsError(payload) {
            this.getTagsState.error = payload;
        },
        
        // Recipes
        async fetchRecipes(text, veggie, ingredients, tags, customFilters) {
            const { $fetchApi } = useNuxtApp();
            this.fetchRecipesLoading('loading');
            
            try {
                const buildApiUrl = (base, params) => {
                    let queryParts = [];
                    
                    Object.keys(params).forEach(key => {
                        const value = params[key];
                        if (value !== undefined && value !== null && value !== '') {
                        if (Array.isArray(value)) {
                            // Para cada valor en el array, añade key=value al array queryParts
                            value.forEach(item => {
                            queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
                            });
                        } else {
                            // Para valores no array, solo añade key=value al array queryParts
                            queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
                        }
                        }
                    });

                    const query = queryParts.join('&');
                    return `${base}?${query}`;
                }

                const apiUrl = buildApiUrl('SearchRecipes', { text, veggie, ingredients, tags, customFilters });

                const data = await $fetchApi(apiUrl);

                this.fetchRecipesData(data);
                this.fetchRecipesLoading('loaded');
                this.fetchRecipesError(null);
            }
            catch(error) {
                this.fetchRecipesData(null);
                this.fetchRecipesLoading('error');
                this.fetchRecipesError(error.message);
            }
        },

        setFetchRecipesLoading() {
            this.fetchRecipesLoading('loading');
        },

        // Users
        async fetchUsers(body) {
            const { $fetchApi } = useNuxtApp();
            this.fetchUsersLoading('loading');
            try {                
                const data = await $fetchApi('SearchUsers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });

                this.fetchUsersData(data);
                this.fetchUsersLoading('loaded');
                this.fetchUsersError(null);
            }
            catch(error) {
                this.fetchUsersData(null);
                this.fetchUsersLoading('error');
                this.fetchUsersError(error.message);
            }
        },

        setFetchUsersLoading() {
            this.fetchUsersLoading('loading');
        },

        // Sugerencias
        async fetchIngredients(num, filter) {
            const { $fetchApi } = useNuxtApp();
            this.fetchIngredientsLoading('loading');
            try {
                const data = await $fetchApi(`GetIngredients?num=${encodeURIComponent(num)}${filter ? `&filter=${encodeURIComponent(filter)}` : ''}`);

                this.fetchIngredientsData(data);
                this.fetchIngredientsLoading('loaded');
                this.fetchIngredientsError(null);
            }
            catch(error) {
                this.fetchIngredientsData(null);
                this.fetchIngredientsLoading('error');
                this.fetchIngredientsError(error.message);
            }
        },

        setFetchIngredientsLoading() {
            this.fetchIngredientsLoading('loading');
        },

        clearIngredients() {
            this.fetchIngredientsData(null);
            this.fetchIngredientsLoading('waiting');
            this.fetchIngredientsError(null);
        },
        
        async fetchTags(num, filter) {
            const { $fetchApi } = useNuxtApp();
            this.fetchTagsLoading('loading');
            try {
                const data = await $fetchApi(`GetTags?num=${encodeURIComponent(num)}${filter ? `&filter=${encodeURIComponent(filter)}` : ''}`);

                this.fetchTagsData(data);
                this.fetchTagsLoading('loaded');
                this.fetchTagsError(null);
            }
            catch(error) {
                this.fetchTagsData(null);
                this.fetchTagsLoading('error');
                this.fetchTagsError(error.message);
            }
        },

        setFetchTagsLoading() {
            this.fetchTagsLoading('loading');
        },

        clearTags() {
            this.fetchTagsData(null);
            this.fetchTagsLoading('waiting');
            this.fetchTagsError(null);
        },
    }
});
