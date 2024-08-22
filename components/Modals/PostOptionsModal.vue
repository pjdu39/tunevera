<template>
  <div
      v-if="modalState === PostModalStates.OPTIONS"
      class="modal-overlay"
      @click.self="closeModal"
    >
      <div class="modal-options-container">
        <button class="option" @click="composePostToEdit(), closeModal()">
          <div class="option-icon-wrapper">
            <font-awesome-icon
              icon="fa fa-pencil"
              class="fa-lg"
              aria-hidden="true"
            />
          </div>
          <div>Editar</div>
        </button>
        <button
          class="option option--danger"
          @click="showDeleteConfirmation"
        >
          <div class="option-icon-wrapper">
            <font-awesome-icon
              icon="fa-regular fa-circle-xmark"
              class="fa-lg"
              aria-hidden="true"
            />
          </div>
          <div>Eliminar</div>
        </button>
      </div>
    </div>
    <div
      v-else-if="modalState === PostModalStates.DELETE_CONFIRMATION"
      class="modal-overlay"
      @click.self="closeModal"
    >
      <div
        v-if="loading"
        class="loading-modal"
      >
        <div class="loading-container">
          <font-awesome-icon
            icon="fa fa-circle-notch"
            class="fa-spin fa-lg"
            aria-hidden="true"
          />
        </div>
      </div>
      <div v-else class="delete-confirmation-container">
        <div class="danger-icon-wrapper">
          <font-awesome-icon
            icon="fa-solid fa-triangle-exclamation"
            class="fa-lg"
            aria-hidden="true"
          />
        </div>
        <div class="delete-confirmation-msg">
          <div>
            {{ confirmationMsg }}
          </div>
          <div>(Esta acción es irreversible.)</div>
        </div>
        <div class="delete-confirmation-btn-area">
          <button
            class="option option--danger option--delete"
            @click="deletePost"
          >
            <div>Sí</div>
          </button>
          <button class="option option--delete" @click="closeModal">
            <div>No</div>
          </button>
        </div>
      </div>
    </div>
</template>

<script setup>
import { PostModalStates } from "~/enums/PostModalStates";
import { PostTypes } from "~/enums/PostTypes";
import { useAuth } from "/composables/useAuth";
import { useModalStore } from "~/store/modal.js";

// Proteción de acciones con login
const { guard } = useAuth();

const url = useRequestURL();

const modalStore = useModalStore();
const storeModalState = computed(() => modalStore.postOptionsModalState)
const loading = computed(() => storeModalState.value.loading)
const title = computed(() => storeModalState.value.title)
const type = computed(() => storeModalState.value.type)

// Control
const modalState = ref(PostModalStates.OPTIONS);
const showDeleteConfirmation = async () => {
  const hasAccess = await guard(url.pathname + url.search);
  if (!hasAccess) return;

  modalState.value = PostModalStates.DELETE_CONFIRMATION;
};

// Elementos personalizados para cada tipo de publicación
const confirmationMsg = computed(() => {
  if(type.value === PostTypes.RECIPE) return `¿Seguro que desea borrar la receta de ${ title.value }?`
  if(type.value === PostTypes.POLL) return `¿Seguro que desea borrar la encuesta?`
  if(type.value === PostTypes.THREAD) return `¿Seguro que desea borrar este hilo?`
})

// Ejecuto las funciones previamente inyectadas
const deletePost = async () => {
  await modalStore.deletePost()
  closeModal()
};
const composePostToEdit = async () => {
  await modalStore.composePost()
};
const closeModal = () => {
  modalStore.closeModal();
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 130%;
  z-index: 60;
}
.modal-options-container {
  display: flex;
  flex-direction: column;
  padding: 25px 30px;
  background-color: $color-background;
  border-radius: 10px;

  // Provisional
  width: auto;
  height: auto;
}
.option {
  display: flex;
  align-items: center;

  min-height: 50px;
  min-width: 200px;
  padding: 0 38px 0 33px;
  margin: 10px 0;
  white-space: nowrap;
  width: 100%;
  text-align: start;
  background-color: $color-background;
  border: 1px solid grey;
  border-radius: 10px;
}
.option:hover {
  background-color: $color-soft-grey;
}
.option--danger {
}
.option--danger:hover {
  color: white;
  border-color: white;
  background-color: $color-red;
}
.option-icon-wrapper {
  display: flex;
  justify-content: center;
  min-width: 25px;
  margin-right: 15px;
}
.loading-modal {
  padding: 25px 30px;
  background-color: $color-background;
  border-radius: 10px;
  width: 500px;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  height: 200px;
  width: 100%;
  font-size: 200%;
  color: $color-primary;
}
.delete-confirmation-container {
  padding: 25px 30px;
  background-color: $color-background;
  border-radius: 10px;
  max-width: 500px;
}
.danger-icon-wrapper {
  font-size: 220%;
  text-align: center;
  color: $color-primary;
  margin-bottom: 20px;
}
.delete-confirmation-msg {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-weight: bold;
  margin-bottom: 45px;
}
.delete-confirmation-msg > :nth-child(2) {
  font-weight: 100;
  font-size: 90%;
}
.delete-confirmation-btn-area {
  display: flex;
  gap: 30px;
}
.option--delete {
  justify-content: center;
  min-width: auto;
}
</style>