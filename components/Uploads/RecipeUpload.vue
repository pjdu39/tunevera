<template>
  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
    <div class="my-cropper-modal">
      <ImageCropper
        :selectedImage="selectedImage"
        @cropComplete="handleCropComplete"
      />
    </div>
  </div>
  <div class="section section--top">
    <div class="img-container">
      <div class="wrapper-img">
        <div v-if="cropLoading" class="loading-container">
          <font-awesome-icon
            icon="fa fa-circle-notch"
            class="fa-spin fa-lg"
            aria-hidden="true"
          />
        </div>
        <NuxtImg v-else :class="nuxtImgClass" :src="nuxtImgSrc" />
      </div>
      <div class="btn btn--add-img" @click="triggerFileInput">
        <font-awesome-icon
          icon="fa-solid fa-plus"
          class="fa-lg"
          aria-hidden="true"
        />
      </div>
      <!-- Input de archivo oculto -->
      <input
        type="file"
        ref="fileInput"
        @change="handleImageSelect"
        accept="image/*"
        style="display: none"
      />
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
                <font-awesome-icon
                  icon="fa-solid fa-minus"
                  class="fa-lg"
                  aria-hidden="true"
                />
              </button>
              <input
                type="number"
                class="interactive-input"
                placeholder=""
                v-model="postRecipeData.time"
                min="0"
                :max="maxTime"
                autocomplete="off"
                @input="validateTime"
                @keydown="preventNonNumeric"
              />
              <!-- TODO: Bug. Pasos para reproducirlo: poner números en el input, seleccionarlo todo, pulsar cualquier letra (salvo la "e") -->
              <button class="btn btn--i-btn" @click="sumTime(5)">
                <font-awesome-icon
                  icon="fa-solid fa-plus"
                  class="fa-lg"
                  aria-hidden="true"
                />
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
                <font-awesome-icon
                  icon="fa-solid fa-minus"
                  class="fa-lg"
                  aria-hidden="true"
                />
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
                <font-awesome-icon
                  icon="fa-solid fa-plus"
                  class="fa-lg"
                  aria-hidden="true"
                />
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
          <font-awesome-icon
            icon="fa-solid fa-plus"
            class="fa-lg"
            aria-hidden="true"
          />
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
      <font-awesome-icon
        icon="fa-solid fa-plus"
        class="fa-lg"
        aria-hidden="true"
      />
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
        <font-awesome-icon
          icon="fa-solid fa-plus"
          class="fa-lg"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
  <div>
    <div class="publish-container">
      <div
        v-if="!isEditing"
        @mouseover="hoverInfo(true)"
        @mouseleave="hoverInfo(false)"
      >
        <button
          class="btn btn--publish"
          @click="uploadRecipe"
          :disabled="!validForm"
        >
          <span>Publicar</span>
          <font-awesome-icon
            v-if="
              newRecipeState.loading === 'loading' ||
              uploadState.loading === 'loading'
            "
            icon="fa fa-spinner"
            class="fa-pulse fa-lg"
            aria-hidden="true"
          />
        </button>
      </div>
      <div v-else @mouseover="hoverInfo(true)" @mouseleave="hoverInfo(false)">
        <button
          class="btn btn--save-changes"
          @click="editRecipe"
          :disabled="!validForm"
        >
          <span>Guardar</span>
          <font-awesome-icon
            v-if="
              editRecipeState.loading === 'loading' ||
              uploadState.loading === 'loading'
            "
            icon="fa fa-spinner"
            class="fa-pulse fa-lg"
            aria-hidden="true"
          />
        </button>
      </div>
      <div
        class="info-container"
        :hidden="validForm"
        @mouseover="hoverInfo(true)"
        @mouseleave="hoverInfo(false)"
      >
        <div v-if="showMessages" class="messages-container">
          <div class="title-msg">La receta debe tener:</div>
          <div :class="'msg ' + validTitleClass">
            <font-awesome-icon
              :icon="'fa ' + validTitleIcon"
              aria-hidden="true"
            />
            Título
          </div>
          <div :class="'msg ' + validPictureUrlClass">
            <font-awesome-icon
              :icon="'fa ' + validPictureUrlIcon"
              aria-hidden="true"
            />
            Foto
          </div>
          <div :class="'msg ' + validTimeClass">
            <font-awesome-icon
              :icon="'fa ' + validTimeIcon"
              aria-hidden="true"
            />
            Tiempo de preparación
          </div>
          <div :class="'msg ' + validServingsClass">
            <font-awesome-icon
              :icon="'fa ' + validServingsIcon"
              aria-hidden="true"
            />
            Número de raciones
          </div>
          <div :class="'msg ' + validRecipeIngredientsClass">
            <font-awesome-icon
              :icon="'fa ' + validRecipeIngredientsIcon"
              aria-hidden="true"
            />
            Al menos un ingrediente
          </div>
          <div
            :class="'msg ' + duplicateIngredientClass"
            :hidden="!duplicateIngredient"
          >
            <font-awesome-icon
              :icon="'fa ' + duplicateIngredientIcon"
              aria-hidden="true"
            />
            No puede haber ingredientes duplicados
          </div>
          <div :class="'msg ' + validStepsClass">
            <font-awesome-icon
              :icon="'fa ' + validStepsIcon"
              aria-hidden="true"
            />
            Al menos un paso
          </div>
          <!--
          <div v-for="(msg, index) in messages" :key="index" class="msg">
            <font-awesome-icon icon="fa fa-times" aria-hidden="true" /> {{ msg }}
          </div>
          -->
        </div>
        <div class="info-container-icon" v-else>
          <!--
          <font-awesome-icon
            icon="fa fa-circle-info"
            class="fa fa-lg"
            aria-hidden="true"
          />
          -->
        </div>
      </div>
      <button v-if="isEditing" class="btn btn--cancel" @click="cancel">
        Cancelar
      </button>
    </div>
  </div>
  <div v-if="newRecipeState.loading === 'error'">
    <!-- TODO: Hacer que esto aparezca solo en desarrollo -->
    <div>Mostrar este mensaje de error al administrador del sistema.</div>
    <div>{{ newRecipeState.error }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useBlobStore } from "~/store/blob.js";
import { useUploadsStore } from "~/store/uploads.js";
import { useImageManager } from '~/composables/useImageManager';
import { v4 as uuidv4 } from "uuid";

const props = defineProps({
  recipe: Object,
});

// Constantes
const titleMaxLenght = 60;
const descriptionMaxLenght = 450;
const tagMaxLenght = 30;
const maxTime = 999;
const maxServings = 50;
const ingredientMaxLenght = 70; // Ampliable hasta 100.
const maxAmount = 9999.99;
const stepMaxLenght = 450;

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

onMounted(async () => {
  await uploadsStore.fetchUnits();

  if (props.recipe) {
    postRecipeData.value = {
      title: props.recipe.title,
      description: props.recipe.description,
      tags: props.recipe.tags.map((x) => x),
      time: props.recipe.time,
      servings: props.recipe.servings,
      pictureUrl: props.recipe.pictureUrl,
      recipeIngredients: props.recipe.recipeIngredients.map((x) => ({ ...x })),
      steps: props.recipe.steps.map((x) => x.text),
    };

    finalBlob.value = await fetchImageAsBlob(postRecipeData.value.pictureUrl);
  }
});

// Init computed properties.
const uploadsStore = useUploadsStore();
const getUnitsState = computed(() => uploadsStore.getUnitsState);

// Recorte de imágenes
const fileInput = ref(null);
const isModalOpen = ref(false);
const selectedImage = ref("");
let originalFileExtension = "";
const finalBlob = ref("");

const closeModal = () => {
  isModalOpen.value = false;
};

// Disparar el input de archivo oculto
const triggerFileInput = () => {
  fileInput.value.click();
};

const handleImageSelect = (event) => {
  const file = event.target.files[0];
  if (!file) {
    console.log("No se seleccionó ningún archivo");
    return;
  }

  // Extraer y almacenar la extensión del archivo original
  // originalFileExtension = getFileExtension(file.name);

  const reader = new FileReader();
  reader.onload = (e) => {
    selectedImage.value = e.target.result; // Guarda la imagen seleccionada para pasarla al modal
    isModalOpen.value = true; // Abre el modal para el recorte
    // Importante: resetear el input para evitar el problema de abrirlo dos veces
    event.target.value = "";
  };
  reader.readAsDataURL(file);
};

const handleCropComplete = async (croppedBlob) => {
  isModalOpen.value = false;

  // selectedImage.value = null;

  try {
    // Tamaño de la imagen antes del redimensionamiento
    // console.log(`Tamaño de la imagen original: ${croppedBlob.size} bytes`);

    // Redimensionar la imagen si es necesario
    cropLoading.value = true
    finalBlob.value = await resizeImage(croppedBlob);
    console.log(`Tipo de archivo después de la conversión/redimensionamiento: ${finalBlob.value.type}`);
    cropLoading.value = false

    if (isEditing.value) imageHasChanged.value = true;

    // Tamaño de la imagen después del redimensionamiento
    // console.log(`Tamaño de la imagen redimensionada: ${finalBlob.value.size} bytes`);
  } catch (error) {
    console.error("Error al procesar la imagen:", error);
  }
};

const { blobStorageAccountName, blobStorageContainerName } =
  useRuntimeConfig().public;
const nuxtImgSrc = computed(() => {
  if (finalBlob.value) return URL.createObjectURL(finalBlob.value);
  else
    return `https://${blobStorageAccountName}.blob.core.windows.net/${blobStorageContainerName}/no-recipe-image.png`;
});
const nuxtImgClass = computed(() => {
  if (finalBlob.value) return "image-fit";
  else return "image-fit image-empty";
});

const cropLoading = ref(false);
const { resizeImage } = useImageManager();


// Manejo para subida de imágenes
const blobStore = useBlobStore();
const uploadState = computed(() => blobStore.uploadState);

const createUUID = () => {
  return uuidv4();
};
const getExtensionFromMimeType = (mimeType) => {
  // Divide el mimeType por '/' y retorna la segunda parte, que es el subtipo
  return mimeType.split('/')[1];
};
const getFileExtension = (filename) => {
  return filename
    .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
    .toLowerCase();
};
const handleFileUpload = async (blob, extension) => {
  console.log(`Subiendo archivo tipo: ${blob.type}`);
  const newFileName = `r-${createUUID()}.${extension}`;

  const newFile = new File([blob], newFileName, {
    type: blob.type,
    lastModified: new Date(),
  });

  await blobStore.uploadFileAndGetUrl(newFile);
};

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

// Evita que se envíen strings vacíos
watchEffect(() => {
  postRecipeData.value.recipeIngredients.forEach((ingredient, index) => {
    if (ingredient.amount === '') {
      postRecipeData.value.recipeIngredients[index].amount = null;
    }
  });
});

// Time
const convertTimeToInt = () => {
  if (!postRecipeData.value.time) postRecipeData.value.time = 0;
  postRecipeData.value.time = parseInt(postRecipeData.value.time);
};
const roundTime = () => {
  /* De momento no llamo esto en ningún sitio. La idea era redondear a múltiplos de 5 siempre que se clicke fuera del input,
    pero por ahora voy a permitir que el usuario ponga el tiempo exacto que quiera. v-click-outside="roundTime"*/

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
const validPictureUrl = computed(() => (finalBlob.value ? true : false));
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
const duplicateIngredient = computed(() => {
  const elements = new Set();
  for (const item of postRecipeData.value.recipeIngredients) {
    if (elements.has(item.text)) {
      return true;
    }
    elements.add(item.text);
  }
  return false;
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
    !duplicateIngredient.value &&
    validSteps.value
  ) {
    return true;
  }

  return false;
});

// Composición de los mensajes guía para completar el formulario.
const showMessages = ref(false);

const hoverInfo = (hover) => {
  if (hover) {
    showMessages.value = true;
  } else {
    setTimeout(() => {
      showMessages.value = false;
    }, 250);
  }
};
// Clases
const validTitleClass = computed(() => {
  return validTitle.value === true ? "msg--success" : "msg--error";
});
const validPictureUrlClass = computed(() => {
  return validPictureUrl.value === true ? "msg--success" : "msg--error";
});
const validTimeClass = computed(() => {
  return validTime.value === true ? "msg--success" : "msg--error";
});
const validServingsClass = computed(() => {
  return validServings.value === true ? "msg--success" : "msg--error";
});
const validRecipeIngredientsClass = computed(() => {
  return validRecipeIngredients.value === true ? "msg--success" : "msg--error";
});
const duplicateIngredientClass = computed(() => {
  return !duplicateIngredient.value ? "msg--success" : "msg--error";
});
const validStepsClass = computed(() => {
  return validSteps.value === true ? "msg--success" : "msg--error";
});
// Iconos
const validTitleIcon = computed(() => {
  return validTitle.value === true ? "fa-check" : "fa-times";
});
const validPictureUrlIcon = computed(() => {
  return validPictureUrl.value === true ? "fa-check" : "fa-times";
});
const validTimeIcon = computed(() => {
  return validTime.value === true ? "fa-check" : "fa-times";
});
const validServingsIcon = computed(() => {
  return validServings.value === true ? "fa-check" : "fa-times";
});
const validRecipeIngredientsIcon = computed(() => {
  return validRecipeIngredients.value === true ? "fa-check" : "fa-times";
});
const duplicateIngredientIcon = computed(() => {
  return !duplicateIngredient.value ? "fa-check" : "fa-times";
});
const validStepsIcon = computed(() => {
  return validSteps.value === true ? "fa-check" : "fa-times";
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
const uploadRecipe = async () => {
  cleanEmptyForms();

  if (!validForm) return;

  // TODO: hacer aquí la subida de imagen y esperar al respuesta OK del servidor para continuar
  const fileExtension = getExtensionFromMimeType(finalBlob.value.type);
  await handleFileUpload(finalBlob.value, fileExtension);

  if (uploadState.value.error) {
    console.error("Error al subir la imagen:", uploadState.value.error);
    return;
  }

  postRecipeData.value.pictureUrl = uploadState.value.data;

  await uploadsStore.postRecipe(postRecipeData.value);

  // Si todo va bien, refresca la página.
  if (uploadsStore.editRecipeState.data) router.go(0);
};

// Redirección tras guardar
const router = useRouter();
watch(
  () => newRecipeState.value.loading,
  (newValue) => {
    if (newValue === "loaded") {
      router.push(`/receta?id=${newRecipeState.value.data}`);
    }
  }
);

// Desmontaje
onUnmounted(() => {
  blobStore.flush();
});

// Manejo de edición de recetas
const editRecipeState = computed(() => uploadsStore.editRecipeState);

const isEditing = computed(() => (props.recipe ? true : false));

const putRecipeData = ref({});

const composePutData = () => {
  putRecipeData.value["id"] = props.recipe.id;
  putRecipeData.value["idUser"] = props.recipe.idUser;

  if (props.recipe.title !== postRecipeData.value.title)
    putRecipeData.value["title"] = postRecipeData.value.title;
  if (props.recipe.description !== postRecipeData.value.description)
    putRecipeData.value["description"] = postRecipeData.value.description;
  if (props.recipe.time !== postRecipeData.value.time)
    putRecipeData.value["time"] = postRecipeData.value.time;
  if (props.recipe.servings !== postRecipeData.value.servings)
    putRecipeData.value["servings"] = postRecipeData.value.servings;

  // Si cambia en número total de pasos, se envían todos, si no, solo envía quellos que han cambiado.
  if (props.recipe.steps.length !== postRecipeData.value.steps.length) {
    putRecipeData.value["replaceAllSteps"] = true;
    putRecipeData.value["steps"] = [];

    putRecipeData.value["steps"] = postRecipeData.value.steps.map(
      (step, index) => {
        return { text: step, stepNumber: index + 1 };
      }
    );
  } else {
    putRecipeData.value["replaceAllSteps"] = false;
    putRecipeData.value["steps"] = [];

    props.recipe.steps.forEach((step, index) => {
      if (step.text !== postRecipeData.value.steps[index]) {
        putRecipeData.value["steps"].push({
          text: postRecipeData.value.steps[index],
          stepNumber: step.stepNumber,
        });
      }
    });
  }

  // Si existe cualquier cambio en los ingredientes, se envían todos.
  let anyIngredientChange = false;

  if (
    props.recipe.recipeIngredients.length !==
    postRecipeData.value.recipeIngredients.length
  ) {
    anyIngredientChange = true;
  } else {
    props.recipe.recipeIngredients.forEach((recipeIngredient, index) => {
      if (
        recipeIngredient.text !==
          postRecipeData.value.recipeIngredients[index].text ||
        recipeIngredient.amount !==
          postRecipeData.value.recipeIngredients[index].amount ||
        recipeIngredient.idUnit !==
          postRecipeData.value.recipeIngredients[index].idUnit
      ) {
        anyIngredientChange = true;
      }
    });
  }

  if (anyIngredientChange) {
    putRecipeData.value["recipeIngredients"] = [
      ...postRecipeData.value.recipeIngredients,
    ];
  } else putRecipeData.value["recipeIngredients"] = [];

  // Si existe cualquier cambio en los tags, se envían todos.
  if (props.recipe.tags.length !== postRecipeData.value.tags.length) {
    putRecipeData.value["tags"] = [...postRecipeData.value.tags];
  } else {
    putRecipeData.value["tags"] = [];
    for (let i = 0; i < props.recipe.tags.length; i++) {
      if (props.recipe.tags[i] !== postRecipeData.value.tags[i]) {
        putRecipeData.value["tags"] = [...postRecipeData.value.tags];
        break;
      }
    }
  }

  // console.log(putRecipeData.value)
};

const imageHasChanged = ref(false);

const fetchImageAsBlob = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const imageBlob = await response.blob();
    return imageBlob;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

const handleFileEdit = async (blob) => {
  const fileName = postRecipeData.value.pictureUrl.split("/").pop();

  const updatedFile = new File([blob], fileName, {
    type: blob.type,
    lastModified: new Date(),
  });

  await blobStore.uploadFileAndGetUrl(updatedFile);
};

const editRecipe = async () => {
  cleanEmptyForms();

  if (!validForm) return;

  if (imageHasChanged.value) await handleFileEdit(finalBlob.value);

  if (uploadState.value.error) {
    console.error("Error al editar la imagen:", uploadState.value.error);
    return;
  }

  composePutData();

  await uploadsStore.putRecipe(putRecipeData.value);

  if (uploadsStore.editRecipeState.data) reload();
};

const emit = defineEmits(["exit", "reload"]);
const cancel = () => {
  emit("exit");
};
const reload = () => {
  emit("reload");
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
  margin-top: 15px;
  padding: 2px 0 3px 0;
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
  z-index: 60;
}
.my-cropper-modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: $color-background;
  padding: 5px 20px 18px 20px;
  border-radius: 10px;
  /* Ajusta el tamaño según necesites */
  width: auto;
  height: auto;
  max-height: 800px;
  overflow-y: auto;
  position: relative;
  z-index: 61;
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
  display: flex;
  justify-content: center;
  align-items: center;
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
.image-fit {
  /* TODO: Considerar mover esto clases globales. Lo que cambia es el wrapper (de dimensiones por ejemplo), no la clase de la imagen en sí. */

  min-width: 100%;
  min-height: 100%;
  object-fit: contain;
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
/*
Esto deja de ser necesario al pasar a icono en vez de un "+" de texto.
.span--add-img {
  transform: translateY(-13%);
}
*/
.btn--add-img {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50px;
  height: 50px;
  line-height: 50px; /* Ajusta a la altura del botón. Depende del transform del span para que el texto lo aplique. */
  font-size: 180%;
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
  font-family: $font-headers;
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
/*
.span--add-tag-btn {
  transform: translateY(-16%);
}
*/
.btn--add-tag {
  width: 30px;
  height: 30px;
  line-height: 20px; /* Ajusta a la altura del botón. Depende del transform del span para que el texto lo aplique. */
  font-size: 100%;
  font-weight: bold;
}
.selected-tags-container {
  // display: flex;
  // gap: 10px;
  margin-top: 15px;
}
.badge--tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 2px 7px 4px 7px;
  margin: 0 8px 4px 0;
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
/*
.span--i-btn {
  transform: translateY(-13%);
}
*/
.btn--i-btn {
  width: 30px;
  height: 30px;
  line-height: 20px; /* Ajusta a la altura del botón. Depende del transform del span para que el texto lo aplique. */
  font-size: 90%;
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
.publish-container {
  position: relative;
  display: flex;
  gap: 20px;
  max-height: 29px;
  transition: max-height 0.25s ease-out;
  overflow: hidden;
}
.publish-container:hover {
  max-height: 500px;
  transition: max-height 0.25s ease-in;
}
.btn--publish {
  display: flex;
  gap: 10px;
  padding: 1px 8px 2px 8px;
  height: 29px;
  border-radius: 6px;
}
.btn--save-changes {
  display: flex;
  gap: 10px;
  padding: 2px 12px 3px 12px;
  height: 29px;
  border-radius: 6px;
  font-weight: 600;
}
.btn--save-changes:hover {
  text-decoration: underline;
}
.btn--cancel {
  position: absolute;
  height: 29px;
  right: 95px;
  padding: 2px 12px 3px 12px;
  border-radius: 6px;
  background-color: transparent;
  color: $color-dark;
}
.btn--cancel:hover {
  text-decoration: underline;
}
.info-container {
}
.messages-container {
  padding: 1px 5px 5px 5px;
  border: 2px solid $color-soft-grey;
  border-radius: 6px;
}
.title-msg {
  border-bottom: 1px solid $color-soft-grey;
  padding: 0px 13px 0px 10px;
  margin-bottom: 3px;
  font-size: 90%;
  font-weight: bold;
  line-height: 35px;
}
.msg {
  padding: 0px 13px 0px 10px;
  font-size: 90%;
  line-height: 29px;
}
.msg--success {
  /* color: #79d366; */
  color: #37d417;
}
.msg--error {
  color: $color-red;
}

.info-container-icon {
  line-height: 29px;
  color: $color-primary;
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
  .ingredient-space {
    width: 40%;
  }
  .amount-space {
    width: 21%;
  }
  .units-space {
    width: 32%;
  }
  .ingredient-input-wrapper {
    width: 40%;
  }
  .amount-input-wrapper {
    width: 21%;
  }
  .units-input-wrapper {
    width: 32%;
  }
}

@media (max-width: 600px) {
  input {
    width: 95%;
    font-size: 80%;
  }
  textarea {
    width: 95%;
    font-size: 80%;
  }
  select {
    font-size: 80%;
  }
  .img-container {
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
  }
  .wrapper-img {
    width: calc(100% - 25px);
    height: calc(100% - 25px);
  }
  .input--title {
    font-size: 110%;
  }
  .interactive-inputs-container {
    justify-content: space-around;
    align-items: center;
    gap: 25px;
  }
  .container-fraction {
    width: auto;
  }
  .label {
    font-size: 105%;
  }
  .shorted-input {
    width: calc(100% - 1rem);
  }
  .selected-tags-container {
    font-size: 80%;
  }
  .form-select {
    // --bs-form-select-bg-img: none;
    background-position: right 0px center; /* Ajusta el valor '10px' para desplazar horizontalmente */
    background-size: 10px; /* Esto controla el tamaño de la flechita */
    padding: 0 15px 3px 0;
    margin-top: 15px;
  }
  .delete-button-wrapper {
    // display: none; // TODO: Sustituír esto por un comportamiento móvil de deslizar para borrar.
    position: absolute;
    right: 0;
    width: 12%;
  }
  .btn--delete {
    width: 25px;
    height: 25px;
    line-height: 0;
    font-size: 95%;
  }
  .step-textarea-wrapper {
    flex-grow: 0;
    width: calc(100% - 1rem);
  }
  .publish-container {
    flex-direction: column;
    gap: 5px;
    max-height: 70px;
  }
  .btn--publish {
    width: 100px;
  }
  .btn--save-changes {
    width: 100px;
  }
  .btn--cancel {
    right: 10px;
  }
}

// TODO: Revisar. Esto estaba en la parte legacy pero creo que se está usando.
.error {
  color: $color-primary;
  font-size: 200%; // Se acumula sobre el font-size: 200%; del contenedor
}
</style>