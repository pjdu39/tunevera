<template>
  <div v-if="newDiscussionState.loading === 'waiting'">
    <div class="section">
      <div class="title-container">
        <div class="label label--title">Tema</div>
        <input
          class="title-input"
          placeholder="¿Sobre qué quieres hablar?"
          v-model="postDiscussionData.title"
          trim
        />
      </div>
    </div>
    <div class="section">
      <div class="description-container">
        <div class="label label--title">Cuerpo</div>
        <input
          class="description-input"
          placeholder="Cuerpo de texto (opcional)"
          v-model="postDiscussionData.description"
          trim
        />
      </div>
    </div>
    <div>
      <button class="" @click="uploadDiscussion" :disabled="!formCompleted">
        <span class="">Subir</span>
      </button>
    </div>
  </div>

  <!-- TODO: Borrar. Legacy -->
  <!--
  <div v-if="newDiscussionState.loading === 'waiting'">
    <div class="section">
      <h5>Tema</h5>
      <b-row>
        <b-col class="col-md-11">
          <BFormGroup
            id="fieldset-title"
            class="input-container title-container"
            label-for="input-title"
          >
            <BFormInput
              id="input-title"
              class="input input-title"
              placeholder="¿Sobre qué quieres hablar?"
              v-model="postDiscussionData.title"
              trim
            ></BFormInput>
          </BFormGroup>
        </b-col>
      </b-row>
    </div>
    <div class="section">
      <h6>Cuerpo</h6>
      <b-row>
        <b-col class="col-md-11">
          <BFormGroup
            id="fieldset-cuerpo"
            class="form-group-cuerpo"
            label-for="input-cuerpo"
          >
            <BFormTextarea
              id="input-cuerpo"
              class="input textarea-cuerpo"
              placeholder="Cuerpo de texto (opcional)"
              v-model="postDiscussionData.description"
              trim
            ></BFormTextarea>
          </BFormGroup>
        </b-col>
      </b-row>
    </div>
    <div class="section-end">
      <b-row>
        <b-col class="col-md-6">
          <button class="base-btn base-btn--aceptar" @click="Atras()">
            Atrás
          </button>
        </b-col>
        <b-col class="col-md-6">
          <button class="base-btn base-btn--aceptar" @click="Aceptar()">
            Aceptar
          </button>
        </b-col>
      </b-row>
    </div>
  </div>
-->

  <div v-else-if="newDiscussionState.loading === 'loading'" class="spinner">
    <font-awesome-icon
      icon="fa fa-spinner"
      class="fa-pulse fa-lg"
      aria-hidden="true"
    />
  </div>
  <div v-else-if="newDiscussionState.loading === 'loaded'">
    Artículo publicado con éxito.
  </div>
  <div v-else-if="newDiscussionState.loading === 'error'">Error</div>
</template>

<script setup>
import { ref } from "vue";
import { useUploadsStore } from "~/store/uploads";

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
const titleCompleted = computed(() =>
  postDiscussionData.value.title ? true : false
);
const descriptionCompleted = computed(() =>
  postDiscussionData.value.description ? true : false
);
const formCompleted = computed(() => {
  if (titleCompleted.value && descriptionCompleted.value) {
    return true;
  }

  return false;
});
const uploadDiscussion = () => {
  if (!formCompleted) return;

  store.postDiscussion(postDiscussionData.value);
};
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
  width: 50%
}
.label {
  font-size: 130%;
}
.label--title {
  font-size: 150%;
}
.title-input {
}
.description-container {
  width: calc(100% - 5rem);
}
.description-input {
}

/* TODO: Borrar. Legacy -------------------------------------------------------------------- */
.input {
  border: none;
  background-color: #f2f4f5;
  border-radius: 0.7rem;
  box-shadow: 2px 2px 3px 1px #55555525 inset,
    -1.3px -1.3px 9px 2px rgb(255, 255, 255) inset;
}
.input-title {
  font-size: 110%;
}
.base-btn {
  padding: 0.4rem 0.5rem 0.4rem 0.4rem;
  margin-right: 0rem;
  margin-bottom: 1rem;

  background-color: $color-primary;
  /* TODO: Invertir los inset tratando de conseguir el mismo resultado. Con los inset simulando los bordes queda fatal al pulsar los botones */
  box-shadow: 1px 1px 6px -3px #575757, -1px -1px 1px 0.5px #70340071 inset,
    -1px -1px 6px 1.5px rgb(255, 255, 255),
    0.4px 0.4px 1px 0.5px rgb(255, 216, 165) inset;
  color: #eaedee;
  border-radius: 0.9rem;
  border-style: none;
}
.base-btn:hover {
  color: #ffffff;
}
.base-btn:active {
  color: #ffffff;
  box-shadow: -1px -1px 6px -3px #575757, 1px 1px 1px 0.5px #70340041 inset,
    1px 1px 6px 1.5px rgb(255, 255, 255),
    -0.4px -0.4px 1px 0.5px rgb(255, 216, 165) inset;
}
.base-btn--aceptar {
  margin-top: 4rem;
  width: 100%;
}
input[type="file"] {
  display: none;
}
.textarea::-webkit-scrollbar {
  display: none;
}
.textarea-cuerpo {
  height: 7rem;
}
.spinner {
  text-align: center;
  font-size: 180%;
}
</style>