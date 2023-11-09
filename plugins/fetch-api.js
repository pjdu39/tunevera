export default defineNuxtPlugin((nuxtApp) => {
    const { publicRuntimeConfig } = useRuntimeConfig();

    return {
        provide: {
            fetchApi: async (endpoint, options = {}) => {
                const baseUrl = publicRuntimeConfig.apiUrl
                const token = useCookie("tokenBearer");
                const headers = {
                    "Authorization": `Bearer ${ token }`,
                    ...options.headers, // Esto permite cabeceras adicionales específicas de la solicitud
                };

                const url = new URL(endpoint, baseUrl);

                const response = await fetch(url, { ...options, headers });

                if (!response.ok) throw new Error(`La respuesta del fetch no es OK: ${response.statusText}`);

                return response.json();
            }
        }
    }
});