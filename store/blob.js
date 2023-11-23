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
        uploadState: {
            data: null,
            loading: 'waiting',
            error: null
        },
        // TODO: Moverlo a un sitio privado, probablemente variables de entorno
        containerName: 'cookbook-images-container',
        accountName: 'cookbookblobstoragedev',
    }),
    actions: {
        // Sas token
        setSasTokenData(payload) {
            this.getSasTokenState.data = payload;
        },
        setSasTokenLoading(payload) {
            this.getSasTokenState.loading = payload;
        },
        setSasTokenError(payload) {
            this.getSasTokenState.error = payload;
        },

        // Upload img
        setUploadData(payload) {
            this.uploadState.data = payload;
        },
        setUploadLoading(payload) {
            this.uploadState.loading = payload;
        },
        setUploadError(payload) {
            this.uploadState.error = payload;
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
            this.setUploadLoading('loading');

            await this.fetchSasToken();
            
            if (!this.getSasTokenState.data) {
                this.setUploadLoading('error');
                this.setUploadError(this.getSasTokenState.error); // Muestra el error del sas token porque es ahí donde ha fallado
                return;
            }

            /* TODO: Esto está comentado porque no he encontrado una forma eficiente de detectar tokens caducados. Darle una vuelta para
                evitar generar el token cada vez que se quiere subir una imagen. No es crítico, dado que el uso normal no es subir varias
                imágenes por receta. Si no acabo implementando esa comprobación, hay que reducir drásticamente la duración del token, ahora
                está en 10 minutos. 

            if (!this.getSasTokenState.data) {
                await this.fetchSasToken();
            }
            */

            const blobServiceClient = new BlobServiceClient(
                `https://${this.accountName}.blob.core.windows.net?${this.getSasTokenState.data.token}`
            );
            const containerClient = blobServiceClient.getContainerClient(this.containerName);
            const blockBlobClient = containerClient.getBlockBlobClient(file.name);

            try {
                await blockBlobClient.uploadData(file);
                // console.log('Archivo subido correctamente');

                const blobUrl = blockBlobClient.url;

                this.setUploadData(blobUrl);
                this.setUploadLoading('loaded');
                this.setUploadError(null);
            }
            catch (error) {
                this.setUploadData(null);
                this.setUploadLoading('error');
                this.setUploadError(error.message);
                // console.error('Error al subir el archivo:', error);
            }
        },
    }
});
