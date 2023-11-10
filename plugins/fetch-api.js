export default defineNuxtPlugin((nuxtApp) => {

    return {
        provide: {
            fetchApi: async (endpoint, options = {}) => {
                const apiUrl = useRuntimeConfig().public.apiUrl;
                const token = useCookie("tokenBearer").value;
                console.log(token)
                const headers = {
                    "Authorization": `Bearer ${ token }`,
                    ...options.headers, // Esto permite cabeceras adicionales específicas de la solicitud
                };

                const url = new URL(endpoint, apiUrl);

                const response = await fetch(url, { ...options, headers });

                if (!response.ok) throw new Error(`La respuesta del fetch no es OK: ${response.statusText}`);

                return response.json();
            }
        }
    }
});