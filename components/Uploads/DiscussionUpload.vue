<template>
  <div class="section">
    <div class="title-container">
      <div class="label label--title">Tema</div>
      <div class="option-input-wrapper">
        <input
          class="title-input"
          placeholder="¿Sobre qué quieres hablar?"
          v-model="postThreadData.title"
          :maxlength="titleMaxLenght"
          trim
        />
      </div>
    </div>
  </div>
  <div class="section">
    <div class="description-container">
      <div class="label label--title">Cuerpo</div>
      <div>
        <Textarea
          class="description-input"
          placeholder="Cuerpo de texto (opcional)"
          v-model="postThreadData.description"
          :maxlength="descriptionMaxLenght"
          rows="1"
          autoResize
        />
      </div>
    </div>
  </div>
  <div class="publish-container">
    <button
      v-if="!isEditing"
      class="btn btn--publish"
      @click="uploadDiscussion"
      :disabled="!validForm"
    >
      <span>Publicar</span>
      <font-awesome-icon
        v-if="newDiscussionState.loading === 'loading'"
        icon="fa fa-spinner"
        class="fa-pulse fa-lg"
        aria-hidden="true"
      />
    </button>
    <button
      v-else
      class="btn btn--save-changes"
      @click="editThread"
      :disabled="!validForm"
    >
      <span>Guardar</span>
      <font-awesome-icon
        v-if="
          editThreadState.loading === 'loading'
        "
        icon="fa fa-spinner"
        class="fa-pulse fa-lg"
        aria-hidden="true"
      />
    </button>
    <button v-if="isEditing" class="btn btn--cancel" @click="cancel">
      Cancelar
    </button>
  </div>
  <div v-if="newDiscussionState.loading === 'error'">Error</div>
</template>

<script setup>
import { ref } from "vue";
import { useUploadsStore } from "~/store/uploads";

const props = defineProps({
  thread: Object,
});

// Constantes
const titleMaxLenght = 60;
const descriptionMaxLenght = 520;

// Definición de la propiedad reactiva para los datos de la discusión
const postThreadData = ref({
  title: "",
  description: "",
});

onMounted(async () => {
  if (props.thread) {
    postThreadData.value = {
      title: props.thread.title,
      description: props.thread.description
    };
  }
});

// Usando la store
const store = useUploadsStore();

// Computed para el estado de la nueva discusión
const newDiscussionState = computed(() => store.newDiscussionState);

// Subir discusión
const uploadDiscussion = () => {
  if (!validForm) return;

  store.postDiscussion(postThreadData.value);
};
// Redirección tras guardar
const router = useRouter();
watch(
  () => newDiscussionState.value.loading,
  (newValue) => {
    if (newValue === "loaded") {
      router.push(`/`);
    }
  }
);

// Validaciones
const validTitle = computed(() => {
  if (
    postThreadData.value.title &&
    postThreadData.value.title.length <= titleMaxLenght
  )
    return true;

  return false;
});
const validDescription = computed(() => {
  if (postThreadData.value.title.length <= descriptionMaxLenght)
    return true;

  return false;
});
const validForm = computed(() => {
  if (validTitle.value && validDescription) return true;

  return false;
});

// Manejo de edición de hilos
const editThreadState = computed(() => store.editThreadState);

const isEditing = computed(() => (props.thread ? true : false));

const putThreadData = ref({});

const composePutData = () => {
  putThreadData.value["id"] = props.thread.id;
  putThreadData.value["idUser"] = props.thread.idUser;

  console.l

  if (props.thread.title !== postThreadData.value.title)
    putThreadData.value["title"] = postThreadData.value.title;
  if (props.thread.description !== postThreadData.value.description)
    putThreadData.value["description"] = postThreadData.value.description;

  // console.log(putThreadData.value)
};

const editThread = async () => {
  if (!validForm) return;

  composePutData();

  await store.putThread(putThreadData.value);

  if (store.editThreadState.data) reload();
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
.section {
  margin-bottom: 40px;
}
.title-container {
  width: 50%;
}
.label {
  font-size: 130%;
  font-family: $font-headers;
}
.label--title {
  margin-bottom: 5px;
  font-size: 150%;
}
.option-input-wrapper {
  height: 35px;
}
.title-input {
}
.description-container {
  width: calc(100% - 5rem);
}
.description-input {
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

@media (max-width: 600px) {
  input {
    width: 100%;
    font-size: 80%;
  }
  textarea {
    width: 100%;
    font-size: 80%;
  }

  .title-container {
    width: 95%;
  }
  .label {
    font-size: 105%;
  }
  .option-input-wrapper {
    height: 25px;
  }
  .description-container {
    width: 95%;
  }
}
</style>