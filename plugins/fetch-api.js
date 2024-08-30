export default defineNuxtPlugin((nuxtApp) => {

    return {
        provide: {
            fetchApi: async (endpoint, options = {}, customBaseUrl = null) => {
                const apiUrl = customBaseUrl || useRuntimeConfig().public.apiUrl;
                const token = useCookie("tokenBearer").value;
                
                const headers = {
                    "Authorization": `Bearer ${ token }`,
                    ...options.headers, // Esto permite cabeceras adicionales específicas de la solicitud
                };

                const url = new URL(endpoint, apiUrl);

                const response = await fetch(url, { ...options, headers });
                
                let responseBody;

                try {
                    responseBody = await response.text(); // Primero intenta leer el cuerpo como texto
                    if (!response.ok) {
                        throw new Error(`La respuesta del fetch no es OK: ${response.statusText} (Estado: ${response.status}). Cuerpo de la respuesta: ${responseBody}`);
                    }
                } catch (error) {
                    // console.log(error)
                    // Manejo del error al leer el cuerpo de la respuesta
                    throw new Error(`Error al leer el cuerpo de la respuesta: ${error}`);
                }

                try {
                    // Intenta parsear el texto a JSON
                    return JSON.parse(responseBody);
                } catch (e) {
                    console.error(e);
                    throw new Error(`Error al parsear el cuerpo de la respuesta a JSON: ${e}`);
                }
            }
        }
    }
});