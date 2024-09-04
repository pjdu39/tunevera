// TODO: Borrar. 
//      El problema con tener una store dedicada al SEO es que este normalmente 
//      requiere trabajar en el lado de servidor, donde no tengo la store disponible.


/*
import { defineStore } from 'pinia';

export const useSEOStore = defineStore({
    id: 'SEOStore',
    state: () => ({
        getSitemapIdsState: {
            data: null,
            loading: 'waiting',
            error: null
        },
    }),
    actions: {
        // Sitemap Ids
        fetchSitemapIdsData(payload) {
            this.getSitemapIdsState.data = payload;
        },
        fetchSitemapIdsLoading(payload) {
            this.getSitemapIdsState.loading = payload;
        },
        fetchSitemapIdsError(payload) {
            this.getSitemapIdsState.error = payload;
        },

        // Sitemap Ids
        async fetchSitemapIds() {
            const { $fetchApi } = useNuxtApp();
            this.fetchSitemapIdsLoading('loading');
            try {
                const data = await $fetchApi(`GetSitemapIds`);

                this.fetchSitemapIdsData(data);
                this.fetchSitemapIdsLoading('loaded');
                this.fetchSitemapIdsError(null);
            }
            catch(error) {
                this.fetchSitemapIdsData(null);
                this.fetchSitemapIdsLoading('error');
                this.fetchSitemapIdsError(error.message);
            }
        },
    }
});
*/