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

                console.log(apiUrl)

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
                const data = !filter ? await $fetchApi('SearchUsers') : await $fetchApi(`SearchUsers?filter=${ filter }`);

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
        }
    }
});
