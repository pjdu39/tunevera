import { defineStore } from 'pinia';
import { BlobServiceClient } from '@azure/storage-blob';

export const useBlobStore = defineStore({
    id: 'blobStore',
    state: () => ({
        getSasTokenState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        // Meter y usar el estado de uploadFileAndGetUrl
        // TODO: Moverlo a un sitio provado, probablemente variables de entorno
        containerName: 'cookbook-images-container',
        accountName: 'cookbookblobstoragedev',
    }),
    actions: {
        setSasTokenData(payload) {
            this.getSasTokenState.data = payload;
        },
        setSasTokenLoading(payload) {
            this.getSasTokenState.loading = payload;
        },
        setSasTokenError(payload) {
            this.getSasTokenState.error = payload;
        },
        async fetchSasToken() {
            const { $fetchApi } = useNuxtApp();
            this.setSasTokenLoading('loading');
            try {
                const data = await $fetchApi('get-sas-token');

                this.setSasTokenData(data);
                this.setSasTokenLoading('loaded');
                this.setSasTokenError(null);
            }
            catch(error) {
                this.setSasTokenData(null);
                this.setSasTokenLoading('error');
                this.setSasTokenError(error.message);
            }
        },

        async uploadFileAndGetUrl(file) {
            if (!this.getSasTokenState.data) {
                await this.fetchSasToken();
                // console.log('getSasTokenState.data es: ' + this.getSasTokenState.data)
            }
            if (!this.getSasTokenState.data) {
                // console.error('No se pudo obtener el SAS Token');
                return;
            }

            const blobServiceClient = new BlobServiceClient(
                `https://${this.accountName}.blob.core.windows.net?${this.getSasTokenState.data.token}`
            );
            const containerClient = blobServiceClient.getContainerClient(this.containerName);
            const blockBlobClient = containerClient.getBlockBlobClient(file.name);

            try {
                await blockBlobClient.uploadData(file);
                console.log('Archivo subido correctamente');

                // Obtener y retornar la URL del archivo subido
                const blobUrl = blockBlobClient.url;
                return blobUrl;
            }
            catch (error) {
                console.error('Error al subir el archivo:', error);
                // Aquí puedes manejar el error, como actualizar el estado de la tienda o notificar al usuario
            }
        },
    }
});
