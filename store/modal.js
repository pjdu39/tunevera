import { defineStore } from 'pinia';
import { useUploadsStore } from "~/store/uploads.js";

export const useModalStore = defineStore({
    id: 'modalStore',
    state: () => ({
        postOptionsModalState: {
            isOpen: false,
            loading: false,
            title: null,
            type: null,
            deleteFunc: null,
            composePostFunc: null
        },
    }),
    actions: {
        openModal(payload) {
            this.postOptionsModalState.loading = false;
            this.postOptionsModalState.title = payload.title;
            this.postOptionsModalState.type = payload.type;
            this.postOptionsModalState.isOpen = true;
        },
        closeModal() {
            this.postOptionsModalState.isOpen = false;
            this.postOptionsModalState.loading = false;
            this.postOptionsModalState.title = null;
            this.postOptionsModalState.type = null;

            // Se limpian las funciones
            this.postOptionsModalState.deleteFunc = null
            this.postOptionsModalState.composePostFunc = null
        },
        setLoading(payload) {
            this.postOptionsModalState.loading = payload;
        },

        // Asigno las funciones que cada componente necesite ejecutar
        setDeteleFunc(func) {
            this.postOptionsModalState.deleteFunc = func
        },
        setComposePostFunc(func) {
            this.postOptionsModalState.composePostFunc = func
        },

        async deletePost() {
            await this.postOptionsModalState.deleteFunc()
        },

        async composePost() {
            await this.postOptionsModalState.composePostFunc()
        }
    }
});