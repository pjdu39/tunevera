<template>
  <div v-if="newPollState.loading === 'waiting'">
    <div class="section">
      <div class="question-container">
        <div class="title-box">
          <div class="label label--title">Pregunta</div>
          <input v-model="postPollData.title" :maxlength="titleMaxLenght" />
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
            :maxlength="optionTextMaxLenght"
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
          :hidden="maxOptionsReched"
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
      <button
        class="btn btn--publicar"
        @click="uploadPoll"
        :disabled="!validPoll"
      >
        <span>Publicar</span>
        <font-awesome-icon
          v-if="newPollState.loading === 'loading'"
          icon="fa fa-spinner"
          class="fa-pulse fa-lg"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
  <div v-if="newPollState.loading === 'error'">
    <div>Mostrar este mensaje a Pablo.</div>
    <div>Ups, parece que algo falló. {{ newPollState.error }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUploadsStore } from "~/store/uploads.js";

// Constantes
const titleMaxLenght = 60;
const optionTextMaxLenght = 60;
const maxOptions = 4;

// Definiendo las propiedades reactivas
const postPollData = ref({
  title: "",
  options: [""],
});

// Utilizando la store
const store = useUploadsStore();

// Computed para el estado de la encuesta
const newPollState = computed(() => store.newPollState);

// Manejo de formmulario
const maxOptionsReched = computed(() => {
  if (postPollData.value.options.length >= maxOptions)
    return true

  return false
})
const canAddOption = computed(() => {
  if (maxOptionsReched.value) return
  return postPollData.value.options.every((x) => x);
});
const addOption = () => {
  if (canAddOption.value) {
    postPollData.value.options.push("");
  }
};
const deleteOption = (index) => {
  if (postPollData.value.options.length === 1) {
    postPollData.value.options[0] = ''
    return
  }
  postPollData.value.options.splice(index, 1);
};

// Subir encuesta
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

  if (!validPoll) return;

  store.postPoll(postPollData.value);
};
// Redirección tras guardar
const router = useRouter();
watch(
  () => newPollState.value.loading,
  (newValue) => {
    console.log(newValue);
    if (newValue === "loaded") {
      console.log(newPollState.value.data);
      router.push(`/`);
    }
  }
);

// Validaciones
const validTitle = computed(() => {
  if (
    postPollData.value.title &&
    postPollData.value.title.length <= titleMaxLenght
  )
    return true;

  return false
});
const validNumOptions = computed(() =>  {
  if (
    postPollData.value.options.length >= 2 &&
    postPollData.value.options.length <= maxOptions
  )
    return true

  return false
});
const validOptions = computed(() =>  {
  if (
    !postPollData.value.options.some(x => !x || x.trim() === '') &&
    !postPollData.value.options.some(x => x.length >= optionTextMaxLenght)
  )
    return true

  return false
});
const validPoll = computed(() => {
  if (
    validTitle.value &&
    validNumOptions.value &&
    validOptions.value
  )
    return true
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
.btn:disabled {
  background-color: $color-soft-grey;
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
.btn--publicar {
  display: flex;
  gap: 10px;
  padding: 1px 8px 2px 8px;
  border-radius: 6px;
}
</style>