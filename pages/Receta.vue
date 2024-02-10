<template>
  <div class="recipe">
    <div
      v-if="
        getRecipeState.loading === 'loading' ||
        getRecipeState.loading === 'waiting'
      "
      class="spinner"
    >
      <font-awesome-icon
        icon="fa-solid fa-spinner"
        class="fa-spin-pulse fa-lg"
        aria-hidden="true"
      />
    </div>
    <div v-if="getRecipeState.loading === 'error'">
      <div class="state-container">
        <font-awesome-icon icon="fa fa-triangle-exclamation" class="error" />
        <div>Error hardcodeado</div>
      </div>
    </div>
    <div v-else-if="getRecipeState.loading === 'loaded'">
      <div class="top-section">
        <div class="img-wrapper">
          <NuxtImg :src="recipeData.pictureUrl" class="image-fit" />
        </div>
        <div class="general-info">
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
            <div class="badge--vegan" :hidden="veggie === ''">{{ veggie }}</div>
          </div>
          <div class="general-info-bottom">
            <div class="general-info-left">
              <div class="description">
                {{ recipeData.description }}
              </div>
              <div class="interaction-container">
                <button class="interaction-icon" @click="clickLike">
                  <font-awesome-icon
                    :icon="like ? 'fas fa-heart' : 'far fa-heart'"
                    :class="cumputedLikeClass"
                    aria-hidden="true"
                  />
                </button>
                <div class="num-likes">
                  {{ recipeData.likes + localLike }}
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
          class="badge--tag"
          v-for="(item, index) in recipeData.tags"
          :key="index"
        >
          #{{ item }}
        </div>
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
            {{
              ingredient.amount + " " + ingredient.unit + " " + ingredient.text
            }}
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
import { useRecipeStore } from "~/store/recipe.js"; // TODO: Ahora los comentarios y likes están aquí, pero hay que moverlo a stores independientes.

// Acceso al store
const store = useRecipeStore();
const getRecipeState = computed(() => store.getRecipeState);
const recipeData = computed(() => getRecipeState.value.data);

// Manejo de Likes
const likeTimeout = ref(false);
const localLike = ref(0);
const like = computed({
  get: () => store.getRecipeState.liked,
  set: (value) => store.updateLikeState(value),
});
const clickLike = () => {
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
const cumputedLikeClass = computed(() => {
  if (likeTimeout.value) {
    return (like.value ? "fa-beat " : "") + (like.value ? "liked" : "unliked");
  } else {
    return like.value ? "liked" : "unliked";
  }
});

// Manejo de comentarios
const comment = ref(null);
const fetchCommentsState = computed(() => store.fetchCommentsState);
const showSendComment = ref(false);
const canSend = computed(() => comment.value ?? null);
const cancelComment = () => {
  showSendComment.value = false;
  comment.value = null;
};
const sendComment = () => {
  store.comment(id, comment.value);
  cancelComment();
};

// Carga datos
const route = useRoute();
const id = route.query.id;

const fetchRecipe = () => {
  store.fetchRecipe(id);
};
const fetchComments = () => {
  store.fetchComments(id, 10);
};

onMounted(() => {
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
.recipe {
  margin: auto;
  width: 65rem;
}
.top-section {
  display: flex;
  height: 25rem;
  width: 100%;
}
.img-wrapper {
  position: relative;
  height: 100%;
  width: 25rem;
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
.general-info-top {
  display: flex;
  height: auto;
}
.recipe-title {
  max-width: 380px;
  font-size: 210%;
}
.signature-container {
  position: relative;
  display: flex;
  align-items: center;
  flex-grow: 1;
}
.signature {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: right;
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
}
.interaction-container {
  display: flex;
  line-height: 100%;
  font-size: 140%;
  margin: 0 1rem 0 0;
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
.general-info-right {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 10%;
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
  padding: 2px 7px 4px 7px;
  line-height: 100%;
  border-radius: 5px;
  color: white;
  background-color: $color-primary;
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
  /* border-bottom: 2px solid $color-dark; */
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
</style>