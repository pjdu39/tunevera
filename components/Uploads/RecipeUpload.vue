<template>
  <div v-if="newRecipeState.loading === 'waiting'">
    <div class="section section--top">
      <div class="img-container">
        <div class="wrapper-img">
          <NuxtImg
            v-if="uploadState.loading === 'waiting'"
            class="image-fit"
            src="https://cdn.icon-icons.com/icons2/2570/PNG/512/image_icon_153794.png"
          />
          <!-- https://www.svgrepo.com/show/4029/picture.svg -->
          <div v-else-if="uploadState.loading === 'loading'" class="upload-state-container">
            <font-awesome-icon
              icon="fa fa-spinner"
              class="fa-pulse fa-lg"
              aria-hidden="true"
            />
          </div>
          <NuxtImg
            v-else-if="uploadState.loading === 'loaded'"
            class="image-fit"
            :src="uploadState.data"
          />
          <div v-else-if="uploadState.loading === 'error'" class="upload-state-container">
            <font-awesome-icon icon="fa fa-triangle-exclamation" class="error" />
            <div>{{ uploadState.error }}</div>
          </div>
        </div>
        <label class="btn btn--add-img">
          <input type="file" @change="handleFileUpload" />
          <span class="span--add-img">+</span>
        </label>
      </div>
      <div class="right-container">
        <div class="title-box">
          <div class="label label--title">Título</div>
          <input v-model="postRecipeData.title" class="input--title" />
        </div>
        <div class="interactive-inputs-container">
          <div class="container-fraction">
            <div class="interactive-input-box">
              <div class="interactive-input-box-top">
                <font-awesome-icon
                  icon="fa-solid fa-clock"
                  class="fa-lg"
                  aria-hidden="true"
                />
              </div>
              <div class="interactive-input-box-bottom">
                <button class="btn btn--i-btn" @click="sumTime(-5)">
                  <span class="span--i-btn">-</span>
                </button>
                <input
                  type="number"
                  class="interactive-input"
                  placeholder=""
                  v-model="postRecipeData.time"
                  min="0"
                  autocomplete="off"
                  v-click-outside="roundTime"
                  @keydown="preventE"
                />
                <!-- TODO: Bug. Pasos para reproducirlo: poner números en el input, seleccionarlo todo, pulsar cualquier letra (salvo la "e") -->
                <button class="btn btn--i-btn" @click="sumTime(5)">
                  <span class="span--i-btn">+</span>
                </button>
              </div>
            </div>
          </div>
          <div class="container-fraction">
            <div class="interactive-input-box">
              <div class="interactive-input-box-top">
                <font-awesome-icon
                  icon="fa-solid fa-utensils"
                  class="fa-lg"
                  aria-hidden="true"
                />
              </div>
              <div class="interactive-input-box-bottom">
                <button class="btn btn--i-btn">
                  <span class="span--i-btn">-</span>
                </button>
                <input type="number" class="interactive-input" />
                <button class="btn btn--i-btn">
                  <span class="span--i-btn">+</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section section--description">
      <div class="label">Descripción</div>
      <Textarea
        v-model="postRecipeData.description"
        maxlength="430"
        rows="1"
        autoResize
      />
    </div>
    <div class="section section--ingredients">
      <div class="ing-titles-container">
        <div class="label ingredient-space">Ingredientes</div>
        <div class="label amount-space">Cantidad</div>
        <div class="label units-space">Unidades</div>
      </div>
      <div
        v-for="(recipeIngredient, index) in postRecipeData.recipeIngredients"
        :key="index"
        class="ing-inputs-container"
      >
        <div class="ingredient-input-wrapper">
          <input
            class="shorted-input"
            v-model="recipeIngredient.text"
            @input="pointTo(index)"
            @keydown="handleKeydown"
            autocomplete="off"
            trim
          />
          <div class="">
            <div
              v-if="showDropdown && index === currentInput"
              class=""
              v-click-outside="onClickOutside"
            >
              <div
                v-for="(s, i) in suggestions"
                :key="s"
                :class="{ highlighted: i === highlightedIndex }"
                @click="selectSuggestion(s)"
              >
                {{ s }}
              </div>
            </div>
          </div>
        </div>
        <div class="amount-input-wrapper">
          <input
            class="shorted-input"
            type="number"
            v-model="recipeIngredient.amount"
            trim
            @keydown="preventE"
          />
        </div>
        <div class="units-input-wrapper">
          <BFormSelect
            class="shorted-input"
            v-model="recipeIngredient.idUnit"
            :options="getUnitsState.data"
          ></BFormSelect>
        </div>
        <div class="delete-button-wrapper">
          <button
            class="btn btn--delete"
            @click="EliminaIngrediente(recipeIngredient)"
          >
            <span class="span--btn-delete">
              <font-awesome-icon icon="fa fa-trash-can" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
      <button
        class="btn btn--i-btn"
        @click="OtroIngrediente()"
        :disabled="!PuedeAnadirIngrediente"
      >
        <span class="span--i-btn">+</span>
      </button>
    </div>
    <div class="section section--steps">
      <div class="label">Pasos</div>
      <div
        class="step-input-container"
        v-for="(step, index) in postRecipeData.steps"
        :key="index"
      >
        <div class="step-textarea-wrapper">
          <Textarea
            class="shorted-input"
            maxlength="430"
            rows="1"
            autoResize
            v-model="postRecipeData.steps[index]"
            trim
          ></Textarea>
        </div>
        <div class="delete-button-wrapper">
          <button class="btn btn--delete" @click="EliminaPaso(step)">
            <span class="span--btn-delete">
              <font-awesome-icon icon="fa fa-trash-can" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
      <div>
        <button
          class="btn btn--i-btn"
          @click="OtroPaso()"
          :disabled="!PuedeAnadirPaso"
        >
          <span class="span--i-btn">+</span>
        </button>
      </div>
    </div>
  </div>
  <div v-else-if="newRecipeState.loading === 'loading'" class="spinner">
    <font-awesome-icon
      icon="fa fa-spinner"
      class="fa-pulse fa-lg"
      aria-hidden="true"
    />
  </div>
  <div v-else-if="newRecipeState.loading === 'loaded'">
    Wow! Eso tiene buena pinta! Se ha añadido a tus recetas
  </div>
  <div v-else-if="newRecipeState.loading === 'error'">
    Ups, parece que algo falló. {{ newRecipeState.error }}
    <BButton>Reintentar</BButton>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useBlobStore } from "~/store/blob.js";
import { useUploadsStore } from "~/store/uploads.js";
import vClickOutside from "v-click-outside";
// import { blob } from "stream/consumers";

onMounted(() => {
  uploadsStore.fetchUnits();
});

// Nombres y directivas
const name = "RecipeUpload";
const directives = { clickOutside: vClickOutside.directive };

// Data
const image = ref(null);
const postRecipeData = ref({
  title: "",
  description: "",
  time: 0,
  servings: 0,
  recipeIngredients: [{ text: null, amount: null, idUnit: null }],
  steps: [""],
  tags: [],
});
const img = ref(null);
const tiempo = ref(0);
const unidadesDummy = [
  { value: 1, text: "unidades" },
  { value: 2, text: "kg" },
  { value: 3, text: "gr" },
  { value: 4, text: "L" },
  { value: 5, text: "ml" },
  { value: 6, text: "cucharadas" },
  { value: 7, text: "cucharaditas" },
  { value: 8, text: "tazas" },
  { value: 9, text: "tacitas" },
  { value: 10, text: "libras" },
  { value: 11, text: "onzas" },
];
const currentIngSearch = ref(null);
const ingredientSuggestionsDummy = [
  { value: 1, text: "patata" },
  { value: 2, text: "pera" },
  { value: 3, text: "sal" },
];
const currentInput = ref(0);
const highlightedIndex = ref(-1);
const showDropdown = ref(false);

// Computed properties.
const getUnitsState = computed(() => uploadsStore.getUnitsState);
const PuedeAnadirIngrediente = computed(() => {
  let result = true;
  postRecipeData.value.recipeIngredients.forEach((x) => {
    if (!x.text) result = false;
  });
  return result;
});
const PuedeAnadirPaso = computed(() => {
  let result = true;
  postRecipeData.value.steps.forEach((x) => {
    if (!x) result = false;
  });
  return result;
});
const suggestions = computed(() => {
  return ingredientSuggestionsDummy
    .map((s) => s.text)
    .filter((s) => s.includes(currentIngSearch.value));
});

// Manejo para subida de imágenes
const blobStore = useBlobStore();
const uploadState = computed(() => blobStore.uploadState);

const handleFileUpload = async (event) => {
  img.value = event.target.files[0];
  if (!img.value) {
    console.log("No se seleccionó ningún archivo");
    return;
  }

  await blobStore.uploadFileAndGetUrl(img.value);

  event.target.value = "";
};

// Subir receta
const uploadsStore = useUploadsStore();
const newRecipeState = computed(() => uploadsStore.newRecipeState);
const postRecipe = () => {
  uploadsStore.postRecipe(postRecipeData.value);
};

// Manejo del formulario
const OtroIngrediente = () => {
  if (PuedeAnadirIngrediente.value) {
    postRecipeData.value.recipeIngredients.push({
      text: null,
      amount: null,
      idUnit: null,
    });
  }
};
const OtroPaso = () => {
  if (PuedeAnadirPaso.value) {
    postRecipeData.value.steps.push("");
  }
};
const EliminaIngrediente = (ingredient) => {
  if (postRecipeData.value.recipeIngredients.length <= 1) return;
  const index = postRecipeData.value.recipeIngredients.indexOf(ingredient);
  if (index > -1) {
    postRecipeData.value.recipeIngredients.splice(index, 1);
  }
};
const EliminaPaso = (step) => {
  if (postRecipeData.value.steps.length <= 1) return;

  const index = postRecipeData.value.steps.indexOf(step);
  if (index > -1) {
    postRecipeData.value.steps.splice(index, 1);
  }
};
const preventE = (event) => {
  if (event.keyCode === 69) {
    event.preventDefault();
  }
};
const Resolve = () => {
  if (!PuedeAnadirIngrediente.value) {
    if (postRecipeData.value.recipeIngredients.length > 1)
      postRecipeData.value.recipeIngredients.splice(
        postRecipeData.value.recipeIngredients.length - 1,
        1
      );
  }
  if (!PuedeAnadirPaso.value) {
    if (postRecipeData.value.steps.length > 1)
      postRecipeData.value.steps.splice(
        postRecipeData.value.steps.length - 1,
        1
      );
  }
};
const convertTimeToInt = () => {
  if (!postRecipeData.value.time) postRecipeData.value.time = 0;
  postRecipeData.value.time = parseInt(postRecipeData.value.time);
};
const roundTime = () => {
  convertTimeToInt();

  if (postRecipeData.value.time < 0) postRecipeData.value.time = 0;
  if (postRecipeData.value.time > 999) postRecipeData.value.time = 995;

  postRecipeData.value.time =
    postRecipeData.value.time - (postRecipeData.value.time % 5);
};
const sumTime = (n) => {
  convertTimeToInt();

  if (postRecipeData.value.time === 0 && n < 0) return;

  if (postRecipeData.value.time < 0) {
    postRecipeData.value.time = 0;
    return;
  }

  const diff = postRecipeData.value.time % n;

  if (n >= 0) {
    postRecipeData.value.time += n - diff;
  } else if (diff === 0) {
    postRecipeData.value.time += n;
  } else {
    postRecipeData.value.time -= diff;
  }
};
const Aceptar = () => {
  Resolve();

  // TODO: Validaciones de contenido sobre postRecipeData
  postRecipe();
};

// Experimentos de sugerencias de ingredientes. Considerar una solución alternativa y borrarlo
const pointTo = (index) => {
  highlightedIndex.value = -1;
  showDropdown.value = true;
  currentInput.value = index;
  currentIngSearch.value = postRecipeData.value.recipeIngredients[index].text;
  // TODO: LLamada a la api
};
const selectSuggestion = (suggestion) => {
  postRecipeData.value.recipeIngredients[currentInput.value].text = suggestion;
  showDropdown.value = false;
};
const handleKeydown = (event) => {
  switch (event.key) {
    case "ArrowDown":
      if (highlightedIndex.value < suggestions.value.length - 1) {
        highlightedIndex.value++;
      }
      break;
    case "ArrowUp":
      if (highlightedIndex.value > 0) {
        highlightedIndex.value--;
      }
      break;
    case "Enter":
      if (highlightedIndex.value >= 0) {
        selectSuggestion(suggestions.value[highlightedIndex.value]);
      }
      break;
  }
};

// Cosas del "clickoutside"
const onClickOutside = (event) => {
  console.log("im clicking outside!");
  showDropdown.value = false;
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
input[type="file"] {
  display: none;
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
  /*
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  */
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
  /*
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  */
  border-bottom: 2px solid $color-dark;
}

.section {
  margin-bottom: 40px;
}
.section--top {
  display: flex;
  height: 16rem;
}
.img-container {
  position: relative;
  width: 16rem;
}
.wrapper-img {
  position: relative;
  height: 92%;
  width: 92%;
  overflow: hidden;
  border: 1px solid $color-dark;
  border-radius: 5px;

  /* Solo para maquetar */
  /* border: 1px solid black; */
}
.image-fit {
  /* TODO: Considerar mover esto clases globales. Lo que cambia es el wrapper, no la clase de la imagen en sí. */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
.span--add-img {
  transform: translateY(-13%);
}
.btn--add-img {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50px;
  height: 50px;
  line-height: 50px; /* Ajusta a la altura del botón. Depende del transform del span para que el texto lo aplique. */
  font-size: 300%;
  font-weight: bold;
}
.right-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  padding: 0 2rem;
}
.title-box {
  height: 55%;
}
.label {
  font-size: 130%;
}
.label--title {
  font-size: 150%;
}
.input--title {
  font-size: 130%;
}
.interactive-inputs-container {
  display: flex;
}
.container-fraction {
  width: 50%;
}
.interactive-input-box {
  display: flex;
  flex-direction: column;
  width: min-content;
}
.interactive-input-box-top {
  margin-bottom: 10px;
  text-align: center;
  font-size: 150%;
  color: grey;
}
.interactive-input-box-bottom {
  display: flex;
}
.span--i-btn {
  transform: translateY(-16%);
}
.btn--i-btn {
  width: 30px;
  height: 30px;
  line-height: 20px; /* Ajusta a la altura del botón. Depende del transform del span para que el texto lo aplique. */
  font-size: 150%;
  font-weight: bold;
}
.interactive-input {
  width: 40px;
  margin: 0 12px;
  text-align: center;
}
.section--description {
}
.section--ingredients {
}
.ing-titles-container {
  display: flex;
}
.ingredient-space {
  width: 45%;
}
.amount-space {
  width: 15%;
}
.units-space {
  width: 25%;
}
.ing-inputs-container {
  display: flex;
  align-items: center;
  height: 40px; // Mantener! Fijo la altura para que los estilos que arrastra el select no la modifique al desplegar sus opciones.
  margin-bottom: 20px;
}
.ingredient-input-wrapper {
  width: 45%;
}
.amount-input-wrapper {
  width: 15%;
}
.units-input-wrapper {
  width: 25%;
}
.delete-button-wrapper {
  display: flex;
  align-items: center;
  width: 15%;
}
.span--btn-delete {
  transform: translateY(-2%);
}
.btn--delete {
  width: 30px;
  height: 30px;
  line-height: 30px; /* Ajusta a la altura del botón. Depende del transform del span para que el texto lo aplique. */
  font-size: 110%;
  font-weight: bold;
  background-color: #df6666;
}
.shorted-input {
  width: calc(100% - 2rem);
}
.section--steps {
}
.step-input-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.step-textarea-wrapper {
  flex-grow: 1;
}
.step-textarea {
}

/* TODO: Borrar. Legacy. ------------------------------------------------------------------------------------------*/
.input {
}
.title-container {
  width: 100%;
}
.time-container {
  margin-top: 1rem;
}
.time-input {
  display: inline-block;
  text-align: center;
  width: 3.2rem;
  padding: 0 0.8rem 0 0.8rem;
  margin-right: 0.25rem;
}
.time-btn {
  font-size: 130%;
  padding: 0rem;
  margin: 0 0.3rem 0.25rem 0.3rem;
  height: 2.1rem;
  width: 2.1rem;
  border-radius: 1rem;
  color: #252b31;
  background-color: #f2f4f5;
  border: 1px solid rgba(249, 249, 249);
  box-shadow: 5px 5px 3px -1px #252b310a, -4px -4px 4px -2px rgb(255, 255, 255),
    -10px -10px 30px -80px #252b31 inset;
}
/* Sobreescribo la clase btn de bootstrapvue, pero solo cuando anida a mi clase.
   Tomar de referencia para evitar sobreescribir masivamente como hice en custom.scss */
.btn.time-btn:active {
  color: #252b31;
  background-color: #f2f4f5;
  border: 1px solid rgba(249, 249, 249);
  box-shadow: 5px 5px 2px -1px #252b310a inset,
    -4px -4px 4px -2px rgb(255, 255, 255) inset !important;
}
.time-btn-content {
  margin: -0.3rem 0 0 0;
  font-weight: bold;
}
.input-title {
  font-size: 110%;
}
.dropdown-container {
  position: relative;
}
.dropdown-ingredients {
  position: absolute;
  background-color: white;
  padding: 1rem 0 1rem 1rem;
  width: 100%;
  z-index: 10;
}
.highlighted {
  background-color: #007bff;
  color: white;
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
/* base-btn--aceptar es para los botones "Atrás" y "Aceptar que voy a quitar" */
.base-btn--aceptar {
  margin-top: 4rem;
  width: 100%;
}
.subir-imagen {
  text-align: center;
}
.input-container--paso {
  width: 100%;
}
.textarea::-webkit-scrollbar {
  display: none;
}
.spinner {
  text-align: center;
  font-size: 180%;
}
.upload-state-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 180%;
  height: 100%;
}
.error {
  color: $color-primary;
  font-size: 200%; // Se acumula sobre el font-size: 200%; del contenedor
}
.section-box {
  margin-bottom: 30rem;
}
</style>