<template>
  <div class="section section--top">
    <div class="img-container">
      <div class="wrapper-img">
        <NuxtImg
          v-if="uploadState.loading === 'waiting'"
          class="image-fit image-empty"
          src="https://cookbookblobstoragedev.blob.core.windows.net/cookbook-images-container/no-recipe-image.png"
        />
        <!-- https://www.svgrepo.com/show/4029/picture.svg -->
        <div
          v-else-if="uploadState.loading === 'loading'"
          class="upload-state-container"
        >
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
        <div
          v-else-if="uploadState.loading === 'error'"
          class="upload-state-container"
        >
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
        <input
          v-model="postRecipeData.title"
          class="input--title"
          :maxlength="titleMaxLenght"
        />
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
                :max="maxTime"
                autocomplete="off"
                v-click-outside="roundTime"
                @input="validateTime"
                @keydown="preventNonNumeric"
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
              <button class="btn btn--i-btn" @click="sumServing(-1)">
                <span class="span--i-btn">-</span>
              </button>
              <input
                type="number"
                class="interactive-input"
                placeholder=""
                v-model="postRecipeData.servings"
                min="0"
                :max="maxServings"
                autocomplete="off"
                @input="validateServings"
                @keydown="preventNonNumeric"
              />
              <button class="btn btn--i-btn" @click="sumServing(1)">
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
      :maxlength="descriptionMaxLenght"
      rows="1"
      autoResize
    />
  </div>
  <div class="section section--tags">
    <div class="tag-input-container">
      <div class="label">Tags</div>
      <div class="tag-input-wrapper">
        <input v-model="tag" class="input--tag" :maxlength="tagMaxLenght" />
        <button
          class="btn btn--add-tag"
          :disabled="!canAddTag"
          @click="addTag(tag)"
        >
          <span class="span--add-tag-btn">+</span>
        </button>
      </div>
    </div>
    <div class="selected-tags-container">
      <div
        class="badge--tag"
        v-for="(item, index) in postRecipeData.tags"
        :key="index"
      >
        <div class="tag-text">#{{ item }}</div>
        <button class="btn btn--remove-tag" @click="removeTag(index)">
          <font-awesome-icon icon="fa fa-delete-left" class="" />
        </button>
      </div>
    </div>
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
          :maxlength="ingredientMaxLenght"
          autocomplete="off"
          trim
        />
      </div>
      <div class="amount-input-wrapper">
        <input
          class="shorted-input"
          type="number"
          v-model.number="recipeIngredient.amount"
          :max="maxAmount"
          :disabled="!makeSense(index)"
          @input="validateAmount(index)"
          @keydown="preventNonDecimal"
        />
      </div>
      <div class="units-input-wrapper">
        <BFormSelect
          class="shorted-input"
          v-model="recipeIngredient.idUnit"
          :options="getUnitsState.data"
          @change="updateAmount(index)"
        ></BFormSelect>
      </div>
      <div class="delete-button-wrapper">
        <button
          class="btn btn--delete"
          @click="deleteIngredient(recipeIngredient)"
        >
          <span class="span--btn-delete">
            <font-awesome-icon icon="fa fa-trash-can" aria-hidden="true" />
          </span>
        </button>
      </div>
    </div>
    <button
      class="btn btn--i-btn"
      @click="addIngredient()"
      :disabled="!canAddIngredient"
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
        <button class="btn btn--delete" @click="deleteStep(step)">
          <span class="span--btn-delete">
            <font-awesome-icon icon="fa fa-trash-can" aria-hidden="true" />
          </span>
        </button>
      </div>
    </div>
    <div>
      <button class="btn btn--i-btn" @click="addStep()" :disabled="!canAddStep">
        <span class="span--i-btn">+</span>
      </button>
    </div>
  </div>
  <div>
    <button
      class="btn btn--publicar"
      @click="uploadRecipe"
      :disabled="!validForm"
    >
      <span>Publicar</span>
      <font-awesome-icon
        v-if="newRecipeState.loading === 'loading'"
        icon="fa fa-spinner"
        class="fa-pulse fa-lg"
        aria-hidden="true"
      />
    </button>
  </div>
  <div v-if="newRecipeState.loading === 'error'">
    <div>Mostrar este mensaje a Pablo.</div>
    <div>Ups, parece que algo falló. {{ newRecipeState.error }}</div>
  </div>
  <!--
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
    <button>Reintentar</button>
  </div>
  -->
</template>

<script setup>
import { ref, computed } from "vue";
import { useBlobStore } from "~/store/blob.js";
import { useUploadsStore } from "~/store/uploads.js";
import { v4 as uuidv4 } from "uuid";
import vClickOutside from "v-click-outside";

const { guard } = useAuth();

// Constantes
const titleMaxLenght = 60;
const descriptionMaxLenght = 450;
const tagMaxLenght = 30;
const maxTime = 999;
const maxServings = 50;
const ingredientMaxLenght = 70; // Ampliable hasta 100.
const maxAmount = 9999.99;
const stepMaxLenght = 450;

// Protección de ruta con login
const route = useRoute();

onMounted(async () => {
  await guard(route.path);
  uploadsStore.fetchUnits();
});

// Nombres y directivas
const name = "RecipeUpload";
const directives = { clickOutside: vClickOutside.directive };

// Init computed properties.
const uploadsStore = useUploadsStore();
const getUnitsState = computed(() => uploadsStore.getUnitsState);

// Manejo para subida de imágenes
//const img = ref(null);
const blobStore = useBlobStore();
const uploadState = computed(() => blobStore.uploadState);

const createUUID = () => {
  return uuidv4();
};
const getFileExtension = (filename) => {
  return filename
    .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
    .toLowerCase();
};
const handleFileUpload = async (event) => {
  const originalFile = event.target.files[0];
  if (!originalFile) {
    console.log("No se seleccionó ningún archivo");
    return;
  }

  const newFileName = `r-${createUUID()}.${getFileExtension(
    originalFile.name
  )}`;

  const newFile = new File([originalFile], newFileName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });

  await blobStore.uploadFileAndGetUrl(newFile);

  event.target.value = "";
};

// Data
const postRecipeData = ref({
  title: "",
  description: "",
  tags: [],
  time: 0,
  servings: 0,
  pictureUrl: null,
  recipeIngredients: [{ text: "", amount: null, idUnit: null }],
  steps: [""],
});

// Manejo del formulario
const canAddIngredient = computed(() => {
  let result = true;
  postRecipeData.value.recipeIngredients.forEach((x) => {
    if (!x.text) result = false;
  });
  return result;
});
const canAddStep = computed(() => {
  let result = true;
  postRecipeData.value.steps.forEach((x) => {
    if (!x) result = false;
  });
  return result;
});
const addIngredient = () => {
  if (canAddIngredient.value) {
    postRecipeData.value.recipeIngredients.push({
      text: "",
      amount: null,
      idUnit: null,
    });
  }
};
const addStep = () => {
  if (canAddStep.value) {
    postRecipeData.value.steps.push("");
  }
};
const deleteIngredient = (ingredient) => {
  const index = postRecipeData.value.recipeIngredients.indexOf(ingredient);

  if (postRecipeData.value.recipeIngredients.length === 1) {
    const empty = { text: null, amount: null, idUnit: null };
    postRecipeData.value.recipeIngredients.splice(index, 1, empty);
  } else {
    postRecipeData.value.recipeIngredients.splice(index, 1);
  }
};
const deleteStep = (step) => {
  const index = postRecipeData.value.steps.indexOf(step);

  if (postRecipeData.value.steps.length === 1) {
    postRecipeData.value.steps.splice(index, 1, "");
  } else {
    postRecipeData.value.steps.splice(index, 1);
  }
};
const preventNonNumeric = (event) => {
  // Permite la tecla de borrar y la tecla de tabulación
  if (event.keyCode === 8 || event.keyCode === 9) return;

  const char = String.fromCharCode(event.keyCode);

  // Verifica si el carácter no es un dígito numérico
  if (/\D/.test(char) && !event.ctrlKey && !event.metaKey) {
    event.preventDefault();
  }
};
const preventNonDecimal = (event) => {
  // Permite la tecla de borrar, tabulación, puntos y comas
  if (
    event.keyCode === 8 ||
    event.keyCode === 9 ||
    event.keyCode === 188 ||
    event.keyCode === 190
  )
    return;

  const char = String.fromCharCode(event.keyCode);

  // Verifica si el carácter no es un dígito numérico
  if (/\D/.test(char) && !event.ctrlKey && !event.metaKey) {
    event.preventDefault();
  }
};
// Time
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

  validateTime();
};
const validateTime = () => {
  if (postRecipeData.value.time > maxTime) postRecipeData.value.time = maxTime;

  if (postRecipeData.value.time < 0) postRecipeData.value.time = 0;
};
// Servings
const convertServingsToInt = () => {
  if (!postRecipeData.value.servings) postRecipeData.value.servings = 0;
  postRecipeData.value.servings = parseInt(postRecipeData.value.servings);
};
const sumServing = (n) => {
  convertServingsToInt();

  if (postRecipeData.value.servings === 0 && n < 0) return;

  if (postRecipeData.value.servings < 0) {
    postRecipeData.value.servings = 0;
    return;
  }

  postRecipeData.value.servings += n;

  validateServings();
};
const validateServings = () => {
  if (postRecipeData.value.servings > maxServings)
    postRecipeData.value.servings = maxServings;

  if (postRecipeData.value.servings < 0) postRecipeData.value.servings = 0;
};

// Tags
const tag = ref(null);
const canAddTag = computed(() => {
  if (!tag.value) return false;
  if (postRecipeData.value.tags.length >= 5) return false;

  return true;
});
const addTag = (item) => {
  if (item === null) return;
  if (postRecipeData.value.tags.includes(item)) return;

  postRecipeData.value.tags.push(item);

  tag.value = null;
};
const removeTag = (index) => {
  if (index !== -1) postRecipeData.value.tags.splice(index, 1);
};

// Amount
const makeSense = (index) => {
  if (!getUnitsState.value.data) return true;
  const unit = getUnitsState.value.data.find(
    (x) => x.text === "al gusto"
  ).value;

  if (!postRecipeData.value.recipeIngredients[index]) return true;
  if (postRecipeData.value.recipeIngredients[index].idUnit === unit)
    return false;

  return true;
};
const updateAmount = (index) => {
  if (!makeSense(index)) {
    postRecipeData.value.recipeIngredients[index].amount = null;
  }
};
const validateAmount = (index) => {
  // Se maneja con una copia por temas de reactividad de vue en arrays. El método splice es reactivo.
  let ingredient = postRecipeData.value.recipeIngredients[index];

  // Convertir a string para facilitar la comprobación de los decimales
  let amountStr = ingredient.amount.toString();

  // Comprobar si hay más de un decimal
  if (amountStr.includes(".")) {
    let parts = amountStr.split(".");
    if (parts[1].length > 1) {
      // Si hay más de un decimal, truncar
      ingredient.amount = parseFloat(parts[0] + "." + parts[1].charAt(0));
    }
  }

  if (ingredient.amount > maxAmount) {
    ingredient = { ...ingredient, amount: maxAmount };
  } else if (ingredient.amount < 0) {
    ingredient = { ...ingredient, amount: 0 };
  }

  postRecipeData.value.recipeIngredients.splice(index, 1, ingredient);
};

// Subir receta
// TODO: Añadir lógica de validación más allá de si el input está vacío o no.
const newRecipeState = computed(() => uploadsStore.newRecipeState);
const validTitle = computed(() =>
  postRecipeData.value.title &&
  postRecipeData.value.title.length <= titleMaxLenght
    ? true
    : false
);
const validDescription = computed(() =>
  postRecipeData.value.description.length <= descriptionMaxLenght ? true : false
);
const validTime = computed(() =>
  postRecipeData.value.time && postRecipeData.value.time <= maxTime
    ? true
    : false
);
const validServings = computed(() =>
  postRecipeData.value.servings && postRecipeData.value.servings <= maxServings
    ? true
    : false
);
const validPictureUrl = computed(() =>
  // TODO: Cuando se le asignen nombres a la imagen, comprobar que el nombre es correcto y coincide con el id de la pulicación
  uploadState.value.data ? true : false
);
const validRecipeIngredients = computed(() => {
  if (postRecipeData.value.recipeIngredients.length === 0) return false;
  if (
    postRecipeData.value.recipeIngredients.length === 1 &&
    !postRecipeData.value.recipeIngredients[0].text
  )
    return false;
  if (
    postRecipeData.value.recipeIngredients.some(
      (x) => x.text.length > ingredientMaxLenght
    )
  )
    return false;
  if (postRecipeData.value.recipeIngredients.some((x) => x.amount > maxAmount))
    return false;

  return true;
});
const validSteps = computed(() => {
  if (postRecipeData.value.steps.length === 0) return false;
  if (postRecipeData.value.steps.length === 1 && !postRecipeData.value.steps[0])
    return false;
  if (postRecipeData.value.steps.some((x) => x.length > stepMaxLenght))
    return false;
  return true;
});
const validForm = computed(() => {
  if (
    validTitle.value &&
    validDescription.value &&
    validTime.value &&
    validServings.value &&
    validPictureUrl.value &&
    validRecipeIngredients.value &&
    validSteps.value
  ) {
    return true;
  }

  return false;
});
// TODO: Revisar estos "if" tan feos.
const cleanEmptyForms = () => {
  if (!canAddIngredient.value) {
    if (postRecipeData.value.recipeIngredients.length > 1)
      postRecipeData.value.recipeIngredients.splice(
        postRecipeData.value.recipeIngredients.length - 1,
        1
      );
  }
  if (!canAddStep.value) {
    if (postRecipeData.value.steps.length > 1)
      postRecipeData.value.steps.splice(
        postRecipeData.value.steps.length - 1,
        1
      );
  }
};
const uploadRecipe = () => {
  cleanEmptyForms();

  if (!validForm) return;

  postRecipeData.value.pictureUrl = uploadState.value.data;

  uploadsStore.postRecipe(postRecipeData.value);
};
// Redirección tras guardar
const router = useRouter();
watch(
  () => newRecipeState.value.loading,
  (newValue) => {
    console.log(newValue);
    if (newValue === "loaded") {
      console.log(newRecipeState.value.data);
      router.push(`/receta?id=${newRecipeState.value.data}`);
    }
  }
);

// Desmontaje
onUnmounted(() => {
  blobStore.flush();
});

// Cosas del "clickoutside"
const onClickOutside = (event) => {
  console.log("im clicking outside!");
  showDropdown.value = false;
};
</script>

<style scoped lang="scss">
input {
  width: calc(100% - 80px);
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
input:disabled {
  border-color: $color-soft-grey;
}
input[type="file"] {
  display: none;
}
textarea {
  width: calc(100% - 80px);
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
.section--top {
  display: flex;
  height: auto;
}
.img-container {
  position: relative;
  width: 16rem;
  height: 16rem;
}
.wrapper-img {
  position: relative;
  height: 92%;
  width: 92%;
  overflow: hidden;
  border: 1px solid $color-dark;
  border-radius: 5px;
}
.image-fit {
  /* TODO: Considerar mover esto clases globales. Lo que cambia es el wrapper, no la clase de la imagen en sí. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  */
  object-fit: cover;
}
.image-empty {
  width: 600px;
  height: auto;
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
  padding: 0 0 0 2rem;
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
.tag-input-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}
.input--tag {
  max-width: 350px;
}
.span--add-tag-btn {
  transform: translateY(-16%);
}
.btn--add-tag {
  width: 30px;
  height: 30px;
  line-height: 20px; /* Ajusta a la altura del botón. Depende del transform del span para que el texto lo aplique. */
  font-size: 150%;
  font-weight: bold;
}
.selected-tags-container {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}
.badge--tag {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 2px 7px 4px 7px;
  line-height: 100%;
  border-radius: 5px;
  color: white;
  background-color: $color-primary;
  font-weight: bold;
}
.btn--remove-tag {
  height: 13px;
  width: 13px;
  margin-top: 2px;
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
.section--tags {
}
.tag-input-container {
  min-height: 85px;
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
.btn--publicar {
  display: flex;
  gap: 10px;
  padding: 1px 8px 2px 8px;
  border-radius: 6px;
}

@media (max-width: 850px) {
  .section--top {
    flex-direction: column;
  }
  .right-container {
    padding: 0;
  }
  .title-box {
    margin-bottom: 40px;
  }
}

@media (max-width: 600px) {
  input {
    width: 95%;
  }
  textarea {
    width: 95%;
  }
  .img-container {
    width: auto;
    height: auto;
    aspect-ratio: 1/1;
  }
}

// TODO: Revisar. Esto estaba en la parte legacy pero creo que se está usando.
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
</style>