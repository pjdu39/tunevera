<template>
  <div v-if="isEditing">
    <div class="form-container">
      <RecipeUpload
        :recipe="recipeToEdit"
        @reload="handleReload"
        @exit="handleExit"
      />
    </div>
  </div>
  <div v-else class="recipe-container">
    <div
      v-if="
        getRecipeState.loading === 'loading' ||
        getRecipeState.loading === 'waiting'
      "
      class="spinner"
    >
      <div class="loading-container">
        <font-awesome-icon
          icon="fa fa-circle-notch"
          class="fa-spin fa-lg"
          aria-hidden="true"
        />
      </div>
    </div>
    <div v-if="getRecipeState.loading === 'error'">
      <div class="state-container">
        <font-awesome-icon icon="fa fa-triangle-exclamation" class="error" />
        <div>Parece que hubo un error al cargar la receta. Por favor vuelva a intentarlo más tarde.</div>
      </div>
    </div>
    <div v-else-if="getRecipeState.loading === 'loaded'" class="recipe">
      <div v-if="recipeData.selfRecipe" class="options-container">
        <button class="options-btn" @click="showOptions">
          <font-awesome-icon
            icon="fa fa-ellipsis-vertical"
            class="fa-lg"
            aria-hidden="true"
          />
        </button>
      </div>
      <div class="top-section">
        <div class="img-wrapper">
          <NuxtImg :src="recipeData.pictureUrl" class="image-fit" />
          <div class="right-blur"></div>
          <div class="bottom-blur"></div>
        </div>
        <div class="general-info">
          <div class="general-info-top-mobile-wrapper">
            <div class="general-info-top">
              <div class="recipe-title">{{ recipeData.title }}</div>
              <div class="signature-container">
                <NuxtLink
                  class="signature"
                  :to="`/perfil?id=${recipeData.user.id}`"
                >
                  <div class="signature-name">
                    <b>@{{ recipeData.user.name }}</b>
                  </div>
                  <div class="sign-img-wrapper">
                    <NuxtImg
                      :src="recipeData.user.pictureUrl"
                      class="image-fit"
                    />
                  </div>
                </NuxtLink>
              </div>
            </div>
            <div class="properties">
              <!-- TODO: Poner condiciones, ahora es solo un ejemplo -->
              <div class="badge--vegan" :hidden="veggie === ''">
                {{ veggie }}
              </div>
            </div>
          </div>
          <div class="general-info-bottom">
            <div class="general-info-left">
              <div class="description">
                {{ recipeData.description }}
              </div>
              <div class="interaction-container">
                <div class="like">
                  <button class="interaction-icon" @click="clickLike">
                    <font-awesome-icon
                      :icon="like ? 'fas fa-heart' : 'far fa-heart'"
                      :class="computedLikeClass"
                      aria-hidden="true"
                    />
                  </button>
                  <div class="num-likes">
                    {{ recipeData.likes + localLike }}
                  </div>
                </div>
                <div class="share" :hidden="!canShare">
                  <button class="interaction-icon" @click="shareContent">
                    <font-awesome-icon icon="fa fa-share" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
            <div class="general-info-right">
              <div class="icon-info-container">
                {{ recipeData.servings }}
                <font-awesome-icon
                  icon="fa fa-utensils"
                  class="icon-info"
                  aria-hidden="true"
                />
              </div>
              <div class="icon-info-container">
                {{ recipeData.time }}'
                <font-awesome-icon
                  icon="fa fa-clock"
                  class="icon-info"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tags-section">
        <div
          v-for="(tag, index) in recipeData.tags"
          :key="index"
          class="badge--tag"
        >
          <!-- Convertimos el objeto etiqueta a una cadena JSON y lo codificamos para URL -->
          <nuxt-link
            :to="`/buscar?tag=${encodeURIComponent(JSON.stringify(tag))}`"
            class="tag-text"
            >#{{ tag.text }}</nuxt-link
          >
        </div>
      </div>
      <div class="description--mobile">
        {{ recipeData.description }}
      </div>
      <div class="middle-section">
        <div class="ingredients-container">
          <div class="middle-section-title">Ingredientes:</div>
          <div
            class="ingredient"
            v-for="(ingredient, index) in recipeData.ingredients"
            :key="index"
          >
            -
            {{ semanticTransformation(ingredient) }}
          </div>
        </div>
        <div class="steps-container">
          <div class="middle-section-title">Pasos:</div>
          <div
            class="step"
            v-for="(step, index) in recipeData.steps"
            :key="index"
          >
            <div class="">
              <b>{{ index + 1 }}.</b> {{ step.text }}
            </div>
          </div>
        </div>
      </div>
      <div class="comments-section">
        <!-- TODO: Redireccionar (o similar) al intentar comentar sin estar logeado. -->
        <Textarea
          v-model="comment"
          class="add-comment-txt-area"
          placeholder="Añade un comentario..."
          autoResize
          rows="1"
          @focus="showSendComment = true"
        />
        <div v-if="showSendComment" class="send-comment-container">
          <button class="cancel-comment" @click="cancelComment">
            Cancelar
          </button>
          <button
            class="send-comment"
            :disabled="!canSend"
            @click="sendComment"
          >
            Enviar
          </button>
        </div>
        <div v-else class="comment-space"></div>
        <div class="title-comments">Comentarios</div>
        <div
          v-for="(cmt, index) in fetchCommentsState.data"
          :key="index"
          class="comments-box"
        >
          <div class="comment-container">
            <NuxtLink
              class="comment-signature"
              :to="`/perfil?id=${cmt.user.id}`"
            >
              <div class="c-sign-img-wrapper">
                <NuxtImg :src="cmt.user.pictureUrl" class="image-fit" />
              </div>
              <div class="c-sign-name">@{{ cmt.user.name }}</div>
            </NuxtLink>
            <div class="comment">
              {{ cmt.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import RecipeUpload from "~/components/Uploads/RecipeUpload.vue";
import { PostTypes } from "~/enums/PostTypes";
import { useAuth } from "/composables/useAuth";
import { useBlobStore } from "~/store/blob.js";
import { useModalStore } from "~/store/modal.js";
import { useRecipeStore } from "~/store/recipe.js"; // TODO: Ahora los comentarios y likes están aquí, pero hay que moverlo a stores independientes.
import { useUploadsStore } from "~/store/uploads.js";

// Proteción de acciones con login
const { guard, setToken } = useAuth();

// Acceso al store
const store = useRecipeStore();
const getRecipeState = computed(() => store.getRecipeState);
const recipeData = computed(() => getRecipeState.value.data);

// Carga datos
const route = useRoute();
const id = route.query.id;

const fetchRecipe = async () => {
  await store.fetchRecipe(id);
};
const fetchComments = () => {
  store.fetchComments(id, 10);
};

onMounted(async () => {
  await setToken();
  fetchRecipe();
  fetchComments();
});

const veggie = computed(() => {
  if (!recipeData.value.ingredients) return "";

  if (!recipeData.value.ingredients.some((x) => !x.vegan)) return "Vegano";
  if (!recipeData.value.ingredients.some((x) => !x.vegetarian))
    return "Vegetariano";
  return "";
});

// Manejo de Likes
const likeTimeout = ref(false);
const localLike = ref(0);
const like = computed({
  get: () => store.getRecipeState.liked,
  set: (value) => store.updateLikeState(value),
});
const clickLike = async () => {
  const hasAccess = await guard(url.pathname + url.search);
  if (!hasAccess) return;

  if (!likeTimeout.value) {
    likeTimeout.value = true;

    like.value = !like.value;
    store.like(recipeData.value.id);

    // Esto se encarga de que suba o baje un like de manera coherente en local al pulsar el botón.
    const initialLikeState = recipeData.value.liked;
    const direction = initialLikeState ? -1 : 0;
    localLike.value = like.value ? direction + 1 : direction;

    setTimeout(() => {
      likeTimeout.value = false;
    }, 1000);
  }
};
const computedLikeClass = computed(() => {
  if (likeTimeout.value) {
    return (like.value ? "fa-beat " : "") + (like.value ? "liked" : "unliked");
  } else {
    return like.value ? "liked" : "unliked";
  }
});

// Manejo semántico de singluar/plural, etc.
const semanticTransformation = (ingredient) => {
  const singular = ingredient.text.singular;
  const plural = ingredient.text.plural ?? ingredient.text.singular;

  const singularUnit = !ingredient.unit ? null : ingredient.unit.singular;
  // const pluralUnit = !ingredient.unit ? null : ingredient.unit.plural ?? ingredient.unit.singular;
  const abbreviationUnit = !ingredient.unit
    ? null
    : ingredient.unit.abbreviation ??
      ingredient.unit.plural ??
      ingredient.unit.singular;

  let semanticIngredient;
  let semanticUnit;

  // Ingrediente
  if (singularUnit === "al gusto") {
    semanticIngredient = plural;
  } else if (ingredient.amount > 1) {
    semanticIngredient = plural;
  } else {
    semanticIngredient = singular;
  }

  // Unidad
  if (singularUnit === "al gusto" || singularUnit === "unidad") {
    semanticUnit = "";
  }
  else if (ingredient.amount === 1) {
    semanticUnit = singularUnit;
  }
  else {
    semanticUnit = abbreviationUnit;
  }

  // Componer la oración
  let result = "";

  if (ingredient.amount) result = `${ingredient.amount}`;
  if (ingredient.amount && semanticUnit) result += ` ${semanticUnit} de`;
  result += ` ${semanticIngredient}`;

  if (singularUnit === "al gusto") result += ` ${singularUnit}`;

  // Eliminar espacios innecesarios y capitalizar
  result = result.trim();
  result = result.charAt(0).toUpperCase() + result.slice(1);

  return result
};

// SEO
const url = useRequestURL();
const currentUrl = url.href;

const { $fetchApi } = useNuxtApp();
// TODO: Actualmente se hacen dos llamadas, una para los metadatos en SSR y otra para cargar la página en sí en el
//      onMounted(), intentar usar solo una. En caso de no poder, se puede crear un endpoint adicional más ligero
//      para la información de los metadatos.
//      Nota * : insistir en la primera solución, debería existir una forma compacta de utilizar la misma llamada para nutrir
//      la página con los datos de la hidratación.
const { data: recipe } = await useAsyncData("recipeData", () => {
  return $fetchApi(`GetRecipe?IdRecipe=${id}`);
});

// Metadatos en la cabecera para enriquecer la publicación al compartirla
const pageTitle = computed(() => (recipe.value ? recipe.value.title : ""));
const pageAuthor = computed(() => (recipe.value ? recipe.value.user.name : ""));
const pageImage = computed(() => (recipe.value ? recipe.value.pictureUrl : ""));
// const pageDate = computed(() => (recipe.value ? recipe.value.creationDate : ""));
const pageDescription = computed(() =>
  recipe.value ? recipe.value.description : ""
);
const pageTime = computed(() => (recipe.value ? recipe.value.time : ""));
const pageServings = computed(() => (recipe.value ? recipe.value.servings : ""));
const pageSemanticIngredients = computed(() => {
  if (recipe.value) {
    let ingredients = [];
    recipe.value.ingredients.forEach(ingredient => {
      ingredients.push(semanticTransformation(ingredient))
    });
    return ingredients;
  }
  
  return []
});
const pageSteps = computed(() => {
  if (recipe.value) {
    let steps = [];
    recipe.value.steps.forEach(step => {
      steps.push({ "@type": "HowToStep", "text": step.text })
    });
    return steps;
  }
  
  return []
});

const recipeSchema = {
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": pageTitle.value,
  "author": {
    "@type": "Person",
    "name": `@${pageAuthor.value}`
  },
  "image": pageImage.value,
  "datePublished": "2023-01-15", // TODO: Recibir este valor de la api
  "description": pageDescription.value,
  "prepTime": pageTime.value,
  "cookTime": pageTime.value,
  "recipeYield": pageServings.value,
  "recipeIngredient": pageSemanticIngredients.value,
  "recipeInstructions": pageSteps.value
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(recipeSchema),
      json: true
    }
  ]
})

useServerHeadSafe({
  title: pageTitle,
  meta: [
    // Primary Meta Tags
    { hid: "title", name: "title", content: pageTitle },
    { hid: "description", name: "description", content: pageDescription },

    // Open Graph / Facebook Meta Tags
    { hid: "og:type", property: "og:type", content: "website" },
    { hid: "og:url", property: "og:url", content: currentUrl },
    { hid: "og:title", property: "og:title", content: pageTitle },
    {
      hid: "og:description",
      property: "og:description",
      content: pageDescription,
    },
    { hid: "og:image", property: "og:image", content: pageImage },

    // Twitter Meta Tags
    {
      hid: "twitter:card",
      property: "twitter:card",
      content: "summary_large_image",
    },
    { hid: "twitter:url", property: "twitter:url", content: currentUrl },
    { hid: "twitter:title", property: "twitter:title", content: pageTitle },
    {
      hid: "twitter:description",
      property: "twitter:description",
      content: pageDescription,
    },
    { hid: "twitter:image", property: "twitter:image", content: pageImage },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(recipeSchema),
      json: true // Esto asegura que Nuxt maneje correctamente el escape de caracteres
    }
  ]
});

// Compartir la receta
const shareData = ref({
  title: "Cookbook",
  text: "Mira esta receta en Cookbook!",
  url: currentUrl,
});
const shareContent = () => {
  if (navigator.share) {
    navigator
      .share(shareData.value)
      .then()
      .catch((error) => console.error("Error al compartir:", error));
  } else {
    console.error("Web Share API no está soportada en este navegador.");
  }
};
const canShare = computed(() => navigator.canShare(shareData.value));

// Manejo de comentarios
const comment = ref(null);
const fetchCommentsState = computed(() => store.fetchCommentsState);
const showSendComment = ref(false);
const canSend = computed(() => comment.value ?? null);
const cancelComment = () => {
  showSendComment.value = false;
  comment.value = null;
};
const sendComment = async () => {
  const hasAccess = await guard(url.pathname + url.search);
  if (!hasAccess) return;

  store.comment(id, comment.value);
  cancelComment();
};

// Variables de control para decidir si se está editando
const isEditing = ref(false);
const recipeToEdit = ref({});

const composeRecipeToEdit = async () => {
  const hasAccess = await guard(url.pathname + url.search);
  if (!hasAccess) return;

  isEditing.value = true;

  recipeToEdit.value = {
    id: id,
    idUser: recipeData.value.user.id,
    title: recipeData.value.title,
    description: recipeData.value.description,
    tags: recipeData.value.tags.map((x) => x.text),
    time: recipeData.value.time,
    servings: recipeData.value.servings,
    pictureUrl: recipeData.value.pictureUrl,
    recipeIngredients: recipeData.value.ingredients.map((x) => {
      const ingredient = {
        text: x.text.singular,
        amount: x.amount ?? null,
        idUnit: x.unit?.id ?? null,
      };
      return ingredient;
    }),
    steps: recipeData.value.steps,
  };
};

const handleExit = () => {
  isEditing.value = false;
  closeModal();
};
const handleReload = () => {
  fetchRecipe();
  closeModal();
  isEditing.value = false;
};

// Borrado
const router = useRouter();
const uploadsStore = useUploadsStore();
const getDeleteState = computed(() => uploadsStore.deleteRecipeState);

const blobStore = useBlobStore();
const getDeleteBlobState = computed(() => blobStore.deleteState);

const deleteRecipe = async () => {
  const hasAccess = await guard(url.pathname + url.search);
  if (!hasAccess) return;

  await uploadsStore.deleteRecipe(id, recipeData.value.user.id);

  if (getDeleteState.value.data && getDeleteState.value.loading !== "error") {
    const fileName = extractBlobNameFromUrl(recipeData.value.pictureUrl);

    await blobStore.deleteBlob(fileName);
  }

  // Si todo ha ido bien...
  router.push("/Perfil");
};

const extractBlobNameFromUrl = (blobUrl) => {
  const urlParts = blobUrl.split("/");
  return urlParts[urlParts.length - 1];
};

// Control del modal
const modalStore = useModalStore();
const closeModal = () => {
  modalStore.closeModal();
}
const showOptions = () => {
  modalStore.openModal({ title: recipeData.value.title, type: PostTypes.RECIPE })
  modalStore.setDeteleFunc(deleteRecipe)
  modalStore.setComposePostFunc(composeRecipeToEdit)
}

watchEffect(() => {
  if (getDeleteState.value.loading === 'loading')
    modalStore.setLoading(true);
  else
    modalStore.setLoading(false);
})
</script>
  
<style scoped lang="scss">
button {
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
}
textarea {
  resize: none;
}
textarea:focus {
  border: none;
  outline: none !important;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  border-bottom: 3px solid $color-dark;
}
.form-container {
  margin: auto;
  margin-bottom: 200px;
  padding: 35px 30px;
  width: 55rem;
  border: 3px solid $color-dark;
  border-radius: 5px;
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
.recipe-container {
  margin: auto;
  width: 70rem;
}
.recipe {
  position: relative;
}
.options-container {
  position: absolute;
  right: -40px;
  top: 20px;
  font-size: 140%;
}
.options-btn {
  width: 30px;
}
.top-section {
  display: flex;
  height: 500px;
  width: 100%;
}
.img-wrapper {
  position: relative;
  height: 100%;
  width: 500px;
  overflow: hidden;
  border: 1px solid $color_dark;
  border-radius: 5px;
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
.general-info {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: min-content;
  flex-grow: 1;
  padding: 1rem;
  border-right: 1px solid $color-dark;
}
.general-info-top-mobile-wrapper {
}
.general-info-top {
  display: flex;
  height: auto;
  justify-content: space-between;
}
.recipe-title {
  max-width: 380px;
  font-size: 190%;
  font-family: $font-headers;
}
.signature-container {
  position: relative;
  display: flex;
  align-items: center;
}
.signature {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: right;
  top: 0;
  right: 0;
  font-style: italic;
}
.signature:hover {
  text-decoration: underline;
}
.signature-name {
  margin-right: 7px;
}
.sign-img-wrapper {
  position: relative;
  max-height: 50px;
  min-height: 48px;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 50%;
}
.properties {
}
.badge--vegan {
  width: min-content;
  padding: 1px 7px 4px 7px;
  line-height: 100%;
  border-radius: 5px;
  color: white;
  background-color: $color-vegan;
}
.general-info-bottom {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  margin-top: 1rem;
}
.general-info-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
}
.description {
  display: block;
}
.description--mobile {
  display: none;
}
.interaction-container {
  display: flex;
  line-height: 100%;
  font-size: 140%;
  margin: 0 1rem 0 0;
}
.like {
  display: flex;
}
.interaction-icon {
  text-align: center;
  margin: 0 5px;
}
.interaction-icon--clicked {
  color: $color-primary;
}
.unliked {
}
.liked {
  color: $color-primary;
}
.num-likes {
  font-size: 90%;
}
.share {
  display: none;
}
.general-info-right {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 20%;
}
.icon-info-container {
  margin-top: 5px;
  font-size: 130%;
  color: #868686;
}
.icon-info {
  aspect-ratio: 1 / 1;
}
.tags-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  height: 6rem;
}
.badge--tag {
}
.tag-text {
  padding: 2px 7px 4px 7px;
  line-height: 100%;
  border-radius: 5px;
  color: white;
  background-color: $color-primary;
  transition: font-size 0.15s ease;
}
.tag-text:hover {
  text-decoration: underline;
  font-weight: 600;
  font-size: 110%;
}
.middle-section {
  display: flex;
  width: 100%;
  margin-top: 40px;
}
.ingredients-container {
  height: fit-content;
  min-width: 21rem;
  border-right: 1px solid $color-dark;
}
.middle-section-title {
  margin-bottom: 1rem;
  font-size: 150%;
  text-decoration: underline;
  font-family: $font-headers;
}
.ingredient {
  margin-left: 5px;
  margin-bottom: 12px;
}
.steps-container {
  height: fit-content;
  padding: 0 2rem;
}
.step {
  margin-bottom: 25px;
}
.comments-section {
  width: 100%;
}
.add-comment-txt-area {
  width: 90%;
  margin-top: 4rem;
  border: none;
  border-bottom: 1px solid $color-dark;
  border-radius: 0;
  background-color: $color-background;
}
.send-comment-container {
  display: flex;
  justify-content: flex-end;
  padding: 5px 0;
  min-height: 40px;
}
.send-comment {
  margin-right: 10%;
  padding: 5px 14px;
  background-color: $color-primary;
  color: white;
  border-radius: 40px;
}
.send-comment:disabled {
  background-color: $color-soft-grey;
}
.cancel-comment {
  margin-right: 15px;
  padding: 5px 14px;
  color: $color-dark;
  border-radius: 40px;
}
.cancel-comment:hover {
  text-decoration: underline;
  /*
  background-color: rgb(204, 204, 204);
  color: white;
  */
}
.comment-space {
  min-height: 45px;
}
.title-comments {
  margin-top: 30px;
  font-size: 150%;
  font-family: $font-headers;
}
.comment-container {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
.comment-signature {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: left;
  left: 0;
  font-style: italic;
}
.comment-signature:hover {
  text-decoration: underline;
}
.c-sign-img-wrapper {
  position: relative;
  height: 40px;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 10px;
}
.c-sign-name {
  font-size: 80%;
  font-weight: bold;
}
.comment {
  font-size: 90%;
  margin: 37px 0 0 45px;
}

@media (max-width: 1100px) {
  .form-container {
    margin: auto;
    width: 80%;
  }
  .recipe-container {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .form-container {
    margin: auto;
    width: 95%;
    border: none;
  }
  .loading-modal {
    width: 95%;
  }
  .delete-confirmation-container {
    max-width: 95%;
  }
  .delete-confirmation-msg > :nth-child(2) {
    font-size: 80%;
  }
  .recipe-container {
    width: 100%;
    font-size: 85%;
  }
  .options-container {
    position: absolute;
    right: auto;
    left: 10px;
    color: white;
    font-size: 180%;
    z-index: 1;
  }
  .top-section {
    position: relative;
    display: block;
    aspect-ratio: 1/1;
    height: auto;
    margin-bottom: 15px;
  }
  .img-wrapper {
    width: 100%;
  }
  .right-blur {
    position: absolute;
    right: 0;
    top: 0;
    width: 15%;
    height: 100%; // Al 100% le resto el height de bottom-blur para no superponer dos difuminados.
    background: linear-gradient(to left, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
  }
  .bottom-blur {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 35%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  }
  .general-info {
    top: 0;
    left: 0;
    position: absolute;
    color: white;
    width: 100%;
  }
  .general-info-top-mobile-wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    bottom: 20px;
  }
  .general-info-top {
    flex-direction: column;
  }
  .recipe-title {
    max-width: 280px;
    line-height: 110%;
    margin-bottom: 6px;
  }
  .signature {
    position: static;
  }
  .sign-img-wrapper {
    display: none;
  }
  .general-info-left {
    width: 85%;
  }
  .interaction-container {
    position: absolute;
    right: 10px;
    top: 170px;
    flex-direction: column;
    font-size: 230%;
    margin: 0;
    gap: 20px;
  }
  .like {
    flex-direction: column;
  }
  .liked {
    color: white !important;
  }
  .num-likes {
    text-align: center;
    font-size: 80%;
    line-height: 80%;
  }
  .share {
    display: block;
  }
  .properties {
  }
  .badge--vegan {
    padding: 2px 11px;
    margin-top: 7px;
    background-color: #79d366;
    font-weight: 600;
  }
  .general-info-right {
    width: 25%;
  }
  .icon-info-container {
    font-size: 120%;
    color: white;
  }
  .description {
    display: none;
  }
  .description--mobile {
    display: block;
    padding: 0 20px;
    margin-bottom: 30px;
  }
  .tags-section {
    display: block;
    height: auto;
    width: 100%;
    padding: 0 10px;
    margin-bottom: 30px;
  }
  .badge--tag {
    align-items: center;
    background-color: $color-primary;
    border-radius: 5px;
    color: #fff;
    display: inline-flex;
    gap: 10px;
    line-height: 100%;
    margin: 0 8px 4px 0;
    padding: 2px 7px 4px;
  }
  .tag-text {
    padding: 0;
    line-height: 13px;
  }
  .middle-section {
    flex-direction: column;
    margin-top: 0;
  }
  .ingredients-container {
    width: 100%;
    border: none;
    padding: 0 20px;
    margin-bottom: 30px;
  }
  .steps-container {
    width: 100%;
    padding: 0 20px;
  }
  .comments-section {
    padding: 0 15px;
  }
  .title-comments {
    margin-top: 15px;
  }
  .c-sign-img-wrapper {
    height: 30px;
  }
  .c-sign-name {
    font-size: 90%;
  }
  .comment {
    margin: 33px 0 0 35px;
  }
}
</style>