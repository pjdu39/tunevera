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
        deleteState: {
            data: null,
            loading: 'waiting',
            error: null
        },
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

        // Delete img
        setDeleteData(payload) {
            this.deleteState.data = payload;
        },
        setDeleteLoading(payload) {
            this.deleteState.loading = payload;
        },
        setDeleteError(payload) {
            this.deleteState.error = payload;
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
            const { blobStorageAccountName, blobStorageContainerName } = useRuntimeConfig().public;

            this.setUploadLoading('loading');

            await this.fetchSasToken();
            
            if (!this.getSasTokenState.data) {
                this.setUploadLoading('error');
                this.setUploadError(this.getSasTokenState.error); // Muestra el error del sas token porque es ahí donde ha fallado
                return;
            }

            const blobServiceClient = new BlobServiceClient(
                `https://${blobStorageAccountName}.blob.core.windows.net?${this.getSasTokenState.data.token}`
            );
            const containerClient = blobServiceClient.getContainerClient(blobStorageContainerName);
            const blockBlobClient = containerClient.getBlockBlobClient(file.name);

            try {
                await blockBlobClient.uploadData(file);

                // Construye la URL pública con el SAS
                // const blobUrl = blockBlobClient.url;

                // Construye la URL pública sin el SAS
                const blobUrl = `https://${blobStorageAccountName}.blob.core.windows.net/${blobStorageContainerName}/${file.name}`;


                this.setUploadData(blobUrl);
                this.setUploadLoading('loaded');
                this.setUploadError(null);
            }
            catch (error) {
                this.setUploadData(null);
                this.setUploadLoading('error');
                this.setUploadError(error.message);
            }
        },

        async deleteBlob(blobName) {
            const { blobStorageAccountName, blobStorageContainerName } = useRuntimeConfig().public;
            
            this.setDeleteLoading('loading');
        
            await this.fetchSasToken();
        
            if (!this.getSasTokenState.data) {
                this.setDeleteLoading('error');
                this.setDeleteError(this.getSasTokenState.error);
                return;
            }
        
            const blobServiceClient = new BlobServiceClient(
                `https://${blobStorageAccountName}.blob.core.windows.net?${this.getSasTokenState.data.token}`
            );
            const containerClient = blobServiceClient.getContainerClient(blobStorageContainerName);
            const blobClient = containerClient.getBlobClient(blobName);
        
            try {
                const result = await blobClient.delete();
                console.log(result)
                this.setDeleteData(result);
                this.setDeleteLoading('loaded');
                this.setDeleteError(null);
            } catch (error) {
                this.setDeleteData(null);
                this.setDeleteLoading('error');
                this.setDeleteError(error.message);
            }
        },

        flush() {
            this.setUploadData(null);
            this.setUploadLoading('waiting');
            this.setUploadError(null);
        },
    }
});
