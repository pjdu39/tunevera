export default defineNuxtPlugin((nuxtApp) => {

    return {
        provide: {
            fetchApi: async (endpoint, options = {}) => {
                const apiUrl = useRuntimeConfig().public.apiUrl;
                const token = useCookie("tokenBearer").value;
                
                const headers = {
                    "Authorization": `Bearer ${ token }`,
                    ...options.headers, // Esto permite cabeceras adicionales específicas de la solicitud
                };

                const url = new URL(endpoint, apiUrl);

                const response = await fetch(url, { ...options, headers });

                if (!response.ok) throw new Error(`La respuesta del fetch no es OK: ${response.statusText}`);

                
                try {
                    return response.json();
                }
                catch(e) {
                    console.error(e);
                    return response;
                }
            }
        }
    }
});