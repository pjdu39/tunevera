<template>
  <div class="container">
    <div class="section">
      <div class="option">
        <div class="option-title">Eliminar cuenta</div>
        <div class="option-wrapper">
          <button class="option-btn-delete" @click="openModal">
            Eliminar Cuenta
          </button>
          <div class="option-description">
            Elimina tu cuenta y todas las publicaciones asociadas de forma
            permanente.
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal-container">
      <div v-if="deleteLoading === 'loading'">
        <div class="loading-container">
          <font-awesome-icon
            icon="fa fa-circle-notch"
            class="fa-spin fa-lg"
            aria-hidden="true"
          />
        </div>
      </div>
      <div v-if="deleteLoading === 'loaded'">
        <div class="success-icon-container">
          <font-awesome-icon
            icon="fa fa-circle-check"
            class="fa fa-lg"
            aria-hidden="true"
          />
        </div>
        <div class="msg">Su cuenta ha sido eliminada correctamente.</div>
        <div class="group-btn-container">
          <button class="btn btn--cancel" @click="exit">Volver</button>
        </div>
      </div>
      <div v-if="deleteLoading === 'error'">
        <div class="error-icon-container">
          <font-awesome-icon
            icon="fa fa-circle-xmark"
            class="fa fa-lg"
            aria-hidden="true"
          />
        </div>
        <div class="msg">
          Parece que ha habido un error, por favor inténtelo más tarde o póngase
          en contacto con el administrador del sistema.
        </div>
        <div class="group-btn-container">
          <button class="btn btn--cancel" @click="exit">Volver</button>
        </div>
      </div>
      <div v-else-if="deleteLoading === 'waiting'">
        <div class="danger-icon-wrapper">
          <font-awesome-icon
            icon="fa-solid fa-triangle-exclamation"
            class="fa-lg"
            aria-hidden="true"
          />
        </div>
        <div class="modal-title">
          ¿Está seguro de que desea eliminar su cuenta por completo?
        </div>
        <div v-if="!showInput" class="group-btn-container">
          <button class="btn btn--confirm" @click="continueToDelete">
            Continuar
          </button>
          <button class="btn btn--cancel" @click="closeModal">Atrás</button>
        </div>
        <div v-else>
          <div class="msg">
            Por favor escriba "Deseo borrar mi cuenta" a continuación para
            confirmar la eliminación.
          </div>
          <input
            v-model="confirmationMsg"
            class="confirmation-input"
            type="text"
          />
          <div class="group-btn-container">
            <button
              class="btn btn--confirm"
              :disabled="!canDelete"
              @click="deleteAccount"
            >
              Eliminar
            </button>
            <button class="btn btn--cancel" @click="closeModal">Atrás</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "~/composables/useAuth";
import { useProfileStore } from "~/store/profile.js";

useHead({
  meta: [{ name: "robots", content: "noindex" }],
});

// Protección de ruta con login
const { guard, setToken, logoutAndRedirectTo } = useAuth();
const route = useRoute();

onMounted(async () => {
  await setToken();
  await guard(route.path);
});

const profileStore = useProfileStore();
const deleteSuccess = computed(() => profileStore.getDeleteAccountState.data);
const deleteLoading = computed(
  () => profileStore.getDeleteAccountState.loading
);
const deleteError = computed(() => profileStore.getDeleteAccountState.error);

const deleteAccount = async () => {
  await profileStore.deleteAccount();
};

// Modal
const isModalOpen = ref(false);
const openModal = () => {
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
  showInput.value = false;
  confirmationMsg.value = null;
};

const showInput = ref(false);
const continueToDelete = () => {
  showInput.value = true;
};

const confirmationMsg = ref(null);

const canDelete = computed(
  () => confirmationMsg.value === "Deseo borrar mi cuenta"
);

// Finaliza y cierra la página
const exit = () => {
  if (deleteSuccess.value) {
    logoutAndRedirectTo("/");
  } else {
    closeModal();
    profileStore.resetDeleteAccountState();
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 51rem;
}
.section {
  padding: 40px 20px;
  border-top: 1px solid rgb(216, 216, 216);
}
.option {
  display: flex;
}
.option-title {
  width: 35%;
  font-weight: bold;
}
.option-wrapper {
  width: 65%;
}
.option-btn {
}
.option-btn-delete {
  padding: 0px 8px;
  margin-bottom: 10px;
  background-color: white;
  border: 1px solid $color-red;
  color: $color-red;
  border-radius: 5px;
  font-weight: 600;
}
.option-btn-delete:hover {
  background-color: $color-red;
  color: white;
}
.option-btn:hover {
  text-decoration: underline;
}
.option-description {
}

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
.modal-container {
  display: flex;
  flex-direction: column;
  width: 500px;
  // min-height: 300px;
  padding: 25px 30px;
  background-color: $color-background;
  border-radius: 10px;

  // Provisional
  height: auto;
}
.danger-icon-wrapper {
  font-size: 290%;
  text-align: center;
  color: $color-primary;
  margin-bottom: 20px;
}
.modal-title {
  margin-bottom: 30px;
  font-weight: bold;
}
.msg {
  margin: 30px 0;
  font-size: 80%;
}
.confirmation-input {
  width: 100%;
  margin-bottom: 30px;
  font-size: 80%;
}
.group-btn-container {
  display: flex;
  justify-content: space-around;
}
.btn {
  background-color: transparent;
  border: 1px solid black;
  min-width: 140px;
}
.btn--cancel {
}
.btn--cancel:hover {
  font-weight: bold;
}
.btn--confirm {
  color: $color-red;
  border: 1px solid $color-red;
  font-weight: bold;
}
.btn--confirm:hover {
  color: white;
  background-color: $color-red;
  border: none;
}
.btn--confirm:disabled {
  color: $color-soft-grey;
  border: 1px solid $color-soft-grey;
  font-weight: 200;
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
.success-icon-container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  height: 70px;
  width: 100%;
  font-size: 220%;
  color: $color-vegan;
}
.error-icon-container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  height: 70px;
  width: 100%;
  font-size: 220%;
  color: $color-red;
}
@media (max-width: 600px) {
  .container {
    width: 95%;
  }
  .option-title {
    display: none;
  }
  .option-wrapper {
    width: 95%;
  }
  .modal-container {
    width: 95%;
  }
}
</style>