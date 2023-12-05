<template>
  <div v-if="newPollState.loading === 'waiting'">
    <div class="section">
      <div class="question-container">
        <div class="title-box">
          <div class="label label--title">Pregunta</div>
          <input v-model="postPollData.title" class="input--title" />
        </div>
      </div>
    </div>
    <div class="section">
      <div class="label label--title">Opciones</div>
      <div
        class="options"
        v-for="(option, index) in postPollData.options"
        :key="index"
      >
        <div class="option-input-wrapper">
          <!-- TODO: Poner un límite bajo de caracteres -->
          <input
            class="option-input"
            placeholder="Añadir opción"
            v-model="postPollData.options[index]"
            trim
          />
        </div>
        <button class="btn btn--delete" @click="deleteOption(index)">
          <font-awesome-icon icon="fa fa-trash-can" aria-hidden="true" />
        </button>
      </div>
      <div>
        <button
          class="btn btn--add-option"
          @click="addOption"
          :disabled="!canAddOption"
        >
          <font-awesome-icon
            icon="fa fa-plus"
            class="fa-lg add-icon"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
    <div>
      <button class="" @click="uploadPoll" :disabled="!formCompleted">
        <span class="">Subir</span>
      </button>
    </div>
  </div>

  <!-------------------------------------------------------------------------------------------->

  <!--
  <div v-if="newPollState.loading === 'waiting'">
    <div class="section">
      <h5>Pregunta</h5>
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
              placeholder="¿Qué quieres preguntar?"
              v-model="postPollData.title"
              trim
            ></BFormInput>
          </BFormGroup>
        </b-col>
      </b-row>
    </div>
    <div class="section">
      <h6>Opciones</h6>
      <div>
        <BListGroupItem
          class="input-container"
          v-for="(option, index) in postPollData.options"
          :key="index"
        >
          <b-row>
            <b-col class="col-md-11">
              <BFormGroup
                id="fieldset-literal"
                class=""
                label-for="input-literal"
              >
                <BFormInput
                  id="input-literal"
                  class="input input-literal"
                  placeholder="Escribir opción..."
                  v-model="postPollData.options[index]"
                  trim
                ></BFormInput>
              </BFormGroup>
            </b-col>
            <b-col class="col-md-1">
              <button
                class="base-btn base-btn--quitar"
                @click="EliminaRespuesta(option)"
              >
                <font-awesome-icon icon="fa fa-times" aria-hidden="true" />
              </button>
            </b-col>
          </b-row>
        </BListGroupItem>
      </div>
      <div>
        <button
          class="base-btn base-btn--anadir"
          @click="OtraRespuesta()"
          :disabled="!PuedeAnadirRespuesta"
        >
          <font-awesome-icon
            icon="fa fa-plus"
            class="fa-lg"
            aria-hidden="true"
          />
        </button>
      </div>
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

  <div v-else-if="newPollState.loading === 'loading'" class="spinner">
    <font-awesome-icon
      icon="fa fa-spinner"
      class="fa-pulse fa-lg"
      aria-hidden="true"
    />
  </div>
  <div v-else-if="newPollState.loading === 'loaded'">Encuesta publicada.</div>
  <div v-else-if="newPollState.loading === 'error'">Error</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUploadsStore } from "~/store/uploads.js";

// Definiendo las propiedades reactivas
const postPollData = ref({
  title: "",
  options: [""],
});

// Utilizando la store
const store = useUploadsStore();

// Computed para el estado de la encuesta
const newPollState = computed(() => store.newPollState);

// Computed para verificar si se puede añadir otra respuesta
const canAddOption = computed(() => {
  return postPollData.value.options.every((x) => x);
});

// Manejo de formmulario
const addOption = () => {
  if (canAddOption.value) {
    postPollData.value.options.push("");
  }
};
const deleteOption = (index) => {
  postPollData.value.options.splice(index, 1);
};

// Subir encuesta
const titleCompleted = computed(() =>
  postPollData.value.title ? true : false
);
const optionsCompletes = computed(() =>
  postPollData.value.options.filter((x) => x).length >= 2 ? true : false
);
const formCompleted = computed(() => {
  if (titleCompleted.value && optionsCompletes.value) {
    return true;
  }

  return false;
});
const cleanEmptyForms = () => {
  if (!canAddOption.value) {
    if (postPollData.value.options.length > 1) {
      postPollData.value.options.splice(
        postPollData.value.options.length - 1,
        1
      );
    }
  }
};

const uploadPoll = () => {
  cleanEmptyForms();

  if (!formCompleted) return;

  store.postPoll(postPollData.value);
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
  /*
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  */
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
.question-container {
  width: calc(100% - 5rem);
}
.label {
  font-size: 130%;
}
.label--title {
  font-size: 150%;
}
.options {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.option-input-wrapper {
  width: calc(50%);
}
.option-input {
  width: calc(100% - 2rem);
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
.btn--delete {
  width: 30px;
  height: 30px;
  line-height: 30px; /* Ajusta a la altura del botón. Depende del transform del span para que el texto lo aplique. */
  font-size: 110%;
  font-weight: bold;
  background-color: #df6666;
}
.btn--add-option {
  width: 30px;
  height: 30px;
  line-height: 20px; /* Ajusta a la altura del botón. Depende del transform del span para que el texto lo aplique. */
  font-size: 150%;
  font-weight: bold;
}
.add-icon {
  font-size: 70%;
}

/* TODO: BOrrar. Legacy ------------------------------------------------------------------------------------------ */
.input {
  border: none;
  background-color: #f2f4f5;
  border-radius: 0.7rem;
  box-shadow: 2px 2px 3px 1px #55555525 inset,
    -1.3px -1.3px 9px 2px rgb(255, 255, 255) inset;
}
.title-container {
  width: 100%;
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
.base-btn--img {
  text-align: center;
  width: 4rem;
}
.base-btn--anadir {
  width: 2.5rem;
}
.base-btn--quitar {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 2rem;
  padding: 0.37rem 0.35rem 0.4rem 0.4rem;
  box-shadow: 1px 1px 4px 0px #252b31;
  color: #eaedee;
  background-color: #d34545;
}
.base-btn--aceptar {
  margin-top: 4rem;
  width: 100%;
}
.subir-imagen {
  text-align: center;
}
.subir-imagen:hover {
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