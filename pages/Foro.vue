<template>
  <div class="container">
    <div
      v-if="
        getSubjectState.loading === 'loading' ||
        getSubjectState.loading === 'waiting'
      "
      class="spinner"
    >
      <font-awesome-icon
        icon="fa-solid fa-spinner"
        class="fa-spin-pulse fa-lg"
        aria-hidden="true"
      />
    </div>
    <div v-if="getSubjectState.loading === 'error'">
      <div class="state-container">
        <font-awesome-icon icon="fa fa-triangle-exclamation" class="error" />
        <div>Error hardcodeado</div>
      </div>
    </div>
    <div v-else-if="getSubjectState.loading === 'loaded'">
      <div class="post">
        <div class="signature-container">
          <NuxtLink
            :to="`/perfil?id=${getSubjectState.data.user.id}`"
            class="signature"
          >
            <div class="sign-img-wrapper">
              <NuxtImg
                :src="getSubjectState.data.user.pictureUrl"
                class="image-fit"
              />
            </div>
            <div class="signature-name">
              <b>@{{ getSubjectState.data.user.name }}</b>
            </div>
          </NuxtLink>
        </div>
        <div class="title">{{ getSubjectState.data.title }}</div>
        <div class="content">{{ getSubjectState.data.description }}</div>
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
import { useSubjectStore } from "~/store/subject.js";
import { useCommentStore } from "~/store/comment.js";
import Signature from "~/components/Post/Signature.vue";

// Acceso al store
const subjectStore = useSubjectStore();
const commentStore = useCommentStore();

// Manejo de la publicación
const getSubjectState = computed(() => subjectStore.getSubjectState);
const subjectData = computed(() => getSubjectState.value.data);

// Manejo de comentarios
const comment = ref(null);
const fetchCommentsState = computed(() => commentStore.fetchCommentsState);
const showSendComment = ref(false);
const canSend = computed(() => comment.value ?? null);
const cancelComment = () => {
  showSendComment.value = false;
  comment.value = null;
};
const sendComment = () => {
  commentStore.comment(id, comment.value);
  cancelComment();
};

// Carga datos
const route = useRoute();
const id = route.query.id;

const fetchSubject = () => {
  subjectStore.fetchSubject(id);
};
const fetchComments = () => {
  commentStore.fetchComments(id, 10);
};

onMounted(() => {
  fetchSubject();
  fetchComments();
});
</script>

<style lang="scss" scoped>
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

.container {
  margin: auto;
  width: 51rem;
}
.post {
  margin: auto;
  padding: 7px 12px;
  border: 2px solid $color-dark;
  border-radius: 5px;
}
.signature-container {
  height: 60px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: left;
  flex-grow: 1;
  margin-bottom: 15px;
}
.signature {
  position: absolute;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: left;
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
.image-fit {
  /* TODO: Considerar mover esto clases globales. Lo que cambia es el wrapper, no la clase de la imagen en sí. */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.title {
  font-size: 120%;
  font-style: italic;
  margin-bottom: 30px;
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