<template>
  <div class="section">
    <div class="title-container">
      <div class="label label--title">Tema</div>
      <div class="option-input-wrapper">
        <input
          class="title-input"
          placeholder="¿Sobre qué quieres hablar?"
          v-model="postDiscussionData.title"
          :maxlength="titleMaxLenght"
          trim
        />
      </div>
    </div>
  </div>
  <div class="section">
    <div class="description-container">
      <div class="label label--title">Cuerpo</div>
      <div class="option-input-wrapper">
        <input
          class="description-input"
          placeholder="Cuerpo de texto (opcional)"
          v-model="postDiscussionData.description"
          :maxlength="descriptionMaxLenght"
          trim
        />
      </div>
    </div>
  </div>
  <div>
    <button
      class="btn btn--publicar"
      @click="uploadDiscussion"
      :disabled="!validDiscussion"
    >
      <span>Publicar</span>
      <font-awesome-icon
        v-if="newDiscussionState.loading === 'loading'"
        icon="fa fa-spinner"
        class="fa-pulse fa-lg"
        aria-hidden="true"
      />
    </button>
  </div>
  <div v-if="newDiscussionState.loading === 'error'">Error</div>
</template>

<script setup>
import { ref } from "vue";
import { useUploadsStore } from "~/store/uploads";

// Constantes
const titleMaxLenght = 60;
const descriptionMaxLenght = 520;

// Definición de la propiedad reactiva para los datos de la discusión
const postDiscussionData = ref({
  title: "",
  description: "",
});

// Usando la store
const store = useUploadsStore();

// Computed para el estado de la nueva discusión
const newDiscussionState = computed(() => store.newDiscussionState);

// Subir discusión
const uploadDiscussion = () => {
  if (!validDiscussion) return;

  store.postDiscussion(postDiscussionData.value);
};
// Redirección tras guardar
const router = useRouter();
watch(
  () => newDiscussionState.value.loading,
  (newValue) => {
    if (newValue === "loaded") {
      router.push(`/`);
    }
  }
);

// Validaciones
const validTitle = computed(() => {
  if (
    postDiscussionData.value.title &&
    postDiscussionData.value.title.length <= titleMaxLenght
  )
    return true;

  return false;
});
const validDescription = computed(() => {
  if (
    postDiscussionData.value.title.length <= descriptionMaxLenght
  )
    return true;

  return false;
});
const validDiscussion = computed(() => {
  if (validTitle.value && validDescription)
    return true;

    return false
});
</script>

<style scoped lang="scss">
input {
  width: 100%;
  margin-top: 15px;
  border: none;
  border-bottom: 1px solid $color-dark;
  border-radius: 0;
  background-color: $color-background;
}
input:focus {
  border: none;
  outline: none !important;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  border-bottom: 2px solid $color-dark;
}
textarea {
  width: 90%;
  margin-top: 5px;
  border: none;
  border-bottom: 1px solid $color-dark;
  border-radius: 0;
  background-color: $color-background;
  resize: none;
}
textarea:focus {
  border: none;
  outline: none !important;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  border-bottom: 2px solid $color-dark;
}
select {
  margin-top: 5px;
  border: none;
  border-bottom: 1px solid $color-dark;
  border-radius: 0;
  background-color: $color-background;
}
select:focus {
  border: none;
  outline: none !important;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  border-bottom: 2px solid $color-dark;
}
.section {
  margin-bottom: 40px;
}
.title-container {
  width: 50%;
}
.label {
  font-size: 130%;
  font-family: $font-headers;
}
.label--title {
  font-size: 150%;
}
.option-input-wrapper {
  height: 35px;
}
.title-input {
}
.description-container {
  width: calc(100% - 5rem);
}
.description-input {
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $color-primary;
  border-radius: 50%;
  color: white;
  padding: 0;
}
.btn:disabled {
  background-color: $color-soft-grey;
}
.btn--publicar {
  display: flex;
  gap: 10px;
  padding: 1px 8px 2px 8px;
  border-radius: 6px;
}

@media (max-width: 600px) {
  input {
    width: 100%;
    font-size: 80%;
  }
  .title-container {
    width: 95%;
  }
  .label {
    font-size: 105%;
  }
  .option-input-wrapper {
    height: 25px;
  }
  .description-container {
    width: 95%;
  }
}
</style>