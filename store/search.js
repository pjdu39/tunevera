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
        
        // Recipes
        async fetchRecipes(text, veggie, ingredients, tags, customFilters) {
            const { $fetchApi } = useNuxtApp();
            this.fetchRecipesLoading('loading');
            
            try {
                const buildApiUrl = (base, params) => {
                    const query = Object.keys(params)
                      .filter(key => params[key] !== undefined && params[key] !== null && params[key] !== '' && (Array.isArray(params[key]) ? params[key].length : true)) // Filtra parámetros vacíos, undefined o con arrays vacíos
                      .map(key => {
                        const value = Array.isArray(params[key]) ? params[key].join(',') : params[key];
                        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
                      })
                      .join('&');
                  
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
        async fetchUsers(filter) {
            const { $fetchApi } = useNuxtApp();
            this.fetchUsersLoading('loading');
            try {
                const data = await $fetchApi(`SearchUsers${filter ? `?filter=${encodeURIComponent(filter)}` : ''}`);

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
            this.fetchUsersLoading('loading');
        },
    }
});
