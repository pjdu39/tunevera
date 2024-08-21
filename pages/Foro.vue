<template>
  <PostOptionsModal
    v-if="showOptionsModal"
    :loading="getDeleteState.loading === 'loading'"
    :title="threadData.title"
    type="D"
    @delete="deleteThread"
    @compose-post-to-edit="composeThreadToEdit"
    @close="closeModal"
  />
  <div v-if="isEditing">
    <div class="form-container">
      <DiscussionUpload
        :thread="threadToEdit"
        @reload="handleReload"
        @exit="handleExit"
      />
    </div>
  </div>
  <div v-else class="container">
    <div
      v-if="
        getThreadState.loading === 'loading' ||
        getThreadState.loading === 'waiting'
      "
      class="spinner"
    >
      <font-awesome-icon
        icon="fa-solid fa-spinner"
        class="fa-spin-pulse fa-lg"
        aria-hidden="true"
      />
    </div>
    <div v-if="getThreadState.loading === 'error'">
      <div class="state-container">
        <font-awesome-icon icon="fa fa-triangle-exclamation" class="error" />
        <div>Error hardcodeado en cliente</div>
      </div>
    </div>
    <div v-else-if="getThreadState.loading === 'loaded'">
      <div class="post">
        <div v-if="threadData.selfPost" class="options-container">
          <button class="options-btn" @click="showOptions">
            <font-awesome-icon
              icon="fa fa-ellipsis-vertical"
              class="fa-lg"
              aria-hidden="true"
            />
          </button>
        </div>
        <div class="signature-container">
          <NuxtLink
            :to="`/perfil?id=${getThreadState.data.user.id}`"
            class="signature"
          >
            <div class="sign-img-wrapper">
              <NuxtImg
                :src="getThreadState.data.user.pictureUrl"
                class="image-fit"
              />
            </div>
            <div class="signature-name">
              <b>@{{ getThreadState.data.user.name }}</b>
            </div>
          </NuxtLink>
        </div>
        <div class="title">{{ getThreadState.data.title }}</div>
        <div class="content">{{ getThreadState.data.description }}</div>
      </div>

      <div class="comments-section">
        <div class="send-comment-container">
          <div class="label-comment">Responder</div>

          <!-- TODO: Redireccionar (o similar) al intentar comentar sin estar logeado. -->
          <Textarea
            v-model="comment"
            class="add-comment-txt-area"
            placeholder="Añade una respuesta..."
            autoResize
            rows="1"
            @focus="showSendComment = true"
          />

          <div v-if="showSendComment" class="send-comment-buttons-container">
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
          <div class="blur"></div>
        </div>
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
import DiscussionUpload from "~/components/Uploads/DiscussionUpload.vue";
import PostOptionsModal from "~/components/Modals/PostOptionsModal.vue";
import { useAuth } from "~/composables/useAuth";
import { useSubjectStore } from "~/store/subject.js";
import { useCommentStore } from "~/store/comment.js";
import { useUploadsStore } from "~/store/uploads.js";

// Proteción de acciones con login
const { guard } = useAuth();

// Acceso al store
const subjectStore = useSubjectStore();
const commentStore = useCommentStore();

// Manejo de la publicación
const getThreadState = computed(() => subjectStore.getSubjectState);
const threadData = computed(() => getThreadState.value.data);

// Manejo de comentarios
const comment = ref(null);
const fetchCommentsState = computed(() => commentStore.fetchCommentsState);
const showSendComment = ref(false);
const canSend = computed(() => comment.value ?? null);
const cancelComment = () => {
  showSendComment.value = false;
  comment.value = null;
};
const sendComment = async () => {
  const hasAccess = await guard(route.path);
  if (!hasAccess) return;

  commentStore.comment(id, comment.value);
  cancelComment();
};

// Carga datos
const route = useRoute();
const id = route.query.id;

const fetchThread = () => {
  subjectStore.fetchSubject(id);
};
const fetchComments = () => {
  commentStore.fetchComments(id, 10);
};

onMounted(() => {
  fetchThread();
  fetchComments();
});

// Variables de control para decidir si se está editando
const isEditing = ref(false);
const threadToEdit = ref({});
const url = useRequestURL();

const composeThreadToEdit = async () => {
  const hasAccess = await guard(url.pathname + url.search);
  if (!hasAccess) return;

  isEditing.value = true;

  threadToEdit.value = {
    id: id,
    idUser: threadData.value.user.id,
    title: threadData.value.title,
    description: threadData.value.description,
  };
};

// Borrado
const router = useRouter();
const uploadsStore = useUploadsStore();
const getDeleteState = computed(() => uploadsStore.deleteThreadState);

const deleteThread = async () => {
  const hasAccess = await guard(url.pathname + url.search);
  if (!hasAccess) return;

  await uploadsStore.deleteThread(id, threadData.value.user.id);

  // Si todo ha ido bien...
  router.push("/Perfil");
};

const handleExit = () => {
  isEditing.value = false;
  closeModal();
};
const handleReload = () => {
  fetchThread();
  closeModal();
  isEditing.value = false;
};

// Control del modal
const showOptionsModal = computed(() => {
  return getThreadState.value.loading === "loaded" && openOptionsModal.value;
});
const openOptionsModal = ref(false);
const closeModal = () => (openOptionsModal.value = false);
const showOptions = () => (openOptionsModal.value = true);
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

.form-container {
  margin: auto;
  margin-bottom: 200px;
  padding: 35px 30px;
  width: 55rem;
  border: 3px solid $color-dark;
  border-radius: 5px;
}
.container {
  margin: auto;
  width: 51rem;
}
.options-container {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 140%;
  z-index: 1;
}
.options-btn {
  width: 30px;
}
.post {
  position: relative;
  margin: auto;
  padding: 20px 20px 35px 20px;
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
  margin-bottom: 30px;
  font-size: 140%;
  font-family: $font-headers;
}
.comments-section {
  position: relative;
  width: 100%;
}
.send-comment-container {
  position: sticky;
  top: 30px;
  margin-bottom: 50px;
  background-color: $color-background;
  z-index: 10;
}
.blur {
  height: 50px; /* Altura del efecto de desvanecimiento */
  width: 100%;
  background-image: linear-gradient(
    to bottom,
    $color-background,
    rgba($color-background, 0)
  );
  position: absolute;
  left: 0;
}
.add-comment-txt-area {
  width: 95%;
  margin-top: 25px;
  border: none;
  border-bottom: 1px solid $color-dark;
  border-radius: 0;
  background-color: $color-background;
}
.send-comment-buttons-container {
  display: flex;
  justify-content: flex-end;
  padding: 5px 0 10px 0;
  min-height: 40px;
}
.send-comment {
  margin-right: 5%;
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
  min-height: 49px;
}
.label-comment {
  padding-top: 40px;
  font-size: 140%;
  font-family: $font-headers;
}
.comment-container {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
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
  font-size: 90%;
  font-weight: bold;
}
.comment {
  font-size: 100%;
  margin: 37px 0 0 45px;
}

@media (max-width: 600px) {
  .form-container {
    margin: auto;
    width: 95%;
    border: none;
  }
  .container {
    width: 98%;
    font-size: 82%;
    padding: 0;
  }
  .title {
    // font-size: 140%;
  }
  .comments-section {
    padding: 0 15px;
  }
}
</style>