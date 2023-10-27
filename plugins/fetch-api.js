export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            fetchApi: async (endpoint, options = {}) => {
                const baseUrl = "https://localhost:44322/" // Sustituir por variable de entorno
                const token = localStorage.getItem("tokenBearer");
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