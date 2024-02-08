<template>
  <div v-if="loading === 'waiting'" class="container">
    <div class="section section--top">
      <div class="img-container">
        <div class="wrapper-img">
          <NuxtImg v-if="picture" class="image-fit" :src="picture" />
          <div v-else class="upload-state-container">
            <font-awesome-icon
              icon="fa fa-spinner"
              class="fa-pulse fa-lg"
              aria-hidden="true"
            />
          </div>
        </div>
        <label class="btn btn--add-img">
          <input type="file" @change="handleFileUpload" />
          <span class="span--add-img">+</span>
        </label>
      </div>
      <div>
        <button class="button cancel-btn" @click="cancel">Cancelar</button>
        <button class="button" :disabled="!validForm" @click="save">
          Guardar
        </button>
      </div>
    </div>
    <div class="section">
      <div class="label">Nombre de usuario *</div>
      <div class="name-input-container">
        <input
          class="nickname-input"
          v-model="nickname"
          type="text"
          :placeholder="user.nickname ?? ''"
          :maxlength="nicknameMaxLenght"
          @input="checkName"
          autocomplete="off"
        />
        <font-awesome-icon
          v-if="icon"
          :icon="icon"
          :class="iconClass"
          aria-hidden="true"
        />
      </div>
    </div>
    <div class="section">
      <div class="label">Fecha de nacimiento *</div>
      <div class="date">
        <select class="date-select" v-model="selectedDay">
          <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
        </select>
        <select class="date-select" v-model="selectedMonth">
          <option
            v-for="month in months"
            :key="month.value"
            :value="month.value"
          >
            {{ month.name }}
          </option>
        </select>
        <select class="date-select" v-model="selectedYear">
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
    </div>
    <div class="section">
      <div class="label">Descripción</div>
      <Textarea
        v-model="description"
        :maxlength="descriptionMaxLenght"
        rows="1"
        autocomplete="off"
        autoResize
      />
    </div>
  </div>
  <div v-else-if="loading === 'loading'" class="state-container">
    <font-awesome-icon
      icon="fa fa-spinner"
      class="fa-pulse fa-lg"
      aria-hidden="true"
    />
  </div>
  <div v-else-if="loading === 'error'" class="state-container">
    Vaya! Parece que algo falló. Error: {{ apiError }}
  </div>
</template>

<script setup>
import { useAuth } from "~/composables/useAuth";
import { useBlobStore } from "~/store/blob.js";
import { useLoginStore } from "~/store/login.js";
import { useProfileStore } from "~/store/profile.js";

// Constantes
const nicknameMinLenght = 4;
const nicknameMaxLenght = 15;
const descriptionMaxLenght = 500;

// Select de fechas
const currentYear = new Date().getFullYear();

const selectedDay = ref(null);
const selectedMonth = ref(null);
const selectedYear = ref(null);

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { name: "Enero", value: 1 },
  { name: "Febrero", value: 2 },
  { name: "Marzo", value: 3 },
  { name: "Abril", value: 4 },
  { name: "Mayo", value: 5 },
  { name: "Junio", value: 6 },
  { name: "Julio", value: 7 },
  { name: "Agosto", value: 8 },
  { name: "Septiembre", value: 9 },
  { name: "Octubre", value: 10 },
  { name: "Noviembre", value: 11 },
  { name: "Diciembre", value: 12 },
];
const years = Array.from({ length: currentYear - 1899 }, (_, i) => i + 1900);

const birthDate = computed(() => {
  if (!validBirthDate.value) return null;

  return `${selectedDay.value}/${selectedMonth.value}/${selectedYear.value}`;
});

// Auth0
const { user, isAuthenticated, isLoading } = useAuth();

// Datos y llamadas de registro
const loginStore = useLoginStore();
const signUpState = computed(() => loginStore.signUpState);
const profileStore = useProfileStore();
const editProfileState = computed(() => profileStore.editProfileState);
const nickname = ref(null);
const description = ref(null);
const picture = computed(() => {
  if (uploadState.value.loading === "loaded") return uploadState.value.data;
  if (props.isEditing && props.profileInfo) return props.profileInfo.pictureUrl;
  if (user.value.picture) return user.value.picture;
  else return null;
});
const save = async () => {
  if (!validForm) return;

  patchAuth0User();

  await wait(() => patchAuth0UserState.value.data);

  if (!patchAuth0UserState.value.data) return;

  if (props.isEditing) {
    const body = {};

    if (nickname.value) body.nickname = nickname.value;
    if (birthDate.value) body.birthDate = birthDate.value;
    if (description.value) body.description = description.value;
    // if (description.value) body.description = description.value;

    profileStore.editProfile(body);
  } else {
    const userData = {
      nickname: nickname.value,
      email: user.value.email,
      birthDate: birthDate.value,
      description: description.value,
      /* location: location.value, */
      pictureUrl: uploadState.value.data ?? user.value.picture,
    };

    loginStore.signUp(userData);
  }
};
const patchAuth0UserState = computed(() => loginStore.patchAuth0UserState);
const patchAuth0User = () => {
  if (!validForm) return;

  const body = {
    user_metadata: {},
  };

  body.user_metadata.nickname = nickname.value;
  body.user_metadata.birthDate = birthDate.value;

  if (uploadState.value.data)
    body.user_metadata.picture = uploadState.value.data;
  if (description.value) body.user_metadata.description = description.value;

  loginStore.patchAuth0User(user.value.sub, body);
};

// Validaciones
// TODO: Propiedades computadas que validen la integridad de los datos: Lenght de los textos, campo obligatorios, fechas válidas, etc.
const validNickname = computed(
  () =>
    nickname.value &&
    nickname.value.length >= nicknameMinLenght &&
    nickname.value.length <= nicknameMaxLenght
);
const validBirthDate = computed(() => {
  if (!selectedYear.value || !selectedMonth.value || !selectedDay.value)
    return false;

  return (
    selectedYear.value &&
    selectedMonth.value &&
    selectedDay.value &&
    selectedYear.value < 2100 &&
    selectedYear.value >= 1900 &&
    selectedMonth.value <= 12 &&
    selectedMonth.value >= 1 &&
    selectedDay.value <= 31 &&
    selectedDay.value >= 1
  );
});
const validDescription = computed(() => {
  if (!description.value) return true;
  return description.value.length <= descriptionMaxLenght ? true : false;
});
const validForm = computed(() =>
  (check.value === 'valid' || check.value === 'waiting') &&
  validBirthDate.value &&
  validDescription.value &&
  user.value
    ? true
    : false
);

// Validación de nombre de usuario
const checkValidNameState = computed(() => profileStore.getCheckValidNameState);

let inputTimer = null;
const oldNickname = ref("");

const checkName = (event) => {
  const newValue = event.target.value;

  if (validInput(newValue)) {
    oldNickname.value = newValue; // Actualizar el valor antiguo si el nuevo valor es válido
    nickname.value = newValue;

    clearTimeout(inputTimer);
    profileStore.setCheckValidNameLoading("loading");
    inputTimer = setTimeout(() => {
      profileStore.checkValidName(nickname.value);
    }, 500);
  } else {
    nickname.value = oldNickname.value; // Revertir al valor antiguo si el nuevo valor no es válido
  }
};

const validInput = (value) => {
  const patron = /^[a-zA-Z0-9_]*$/;
  return patron.test(value);
};

// Manejo para subida de imágenes
const blobStore = useBlobStore();
const uploadState = computed(() => blobStore.uploadState);
const getFileExtension = (filename) => {
  return filename
    .slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
    .toLowerCase();
};
const handleFileUpload = async (event) => {
  const originalFile = event.target.files[0];
  if (!originalFile) {
    console.error("No se seleccionó ningún archivo");
    return;
  }

  const newFileName = `u-${user.value.sub}.${getFileExtension(
    originalFile.name
  )}`;

  const newFile = new File([originalFile], newFileName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });

  await blobStore.uploadFileAndGetUrl(newFile);

  event.target.value = "";
};

const check = computed(() => {
  if (checkValidNameState.value.loading === "waiting") return "waiting";
  if (checkValidNameState.value.loading === "loading") return "loading";
  if (
    checkValidNameState.value.loading === "loaded" &&
    !checkValidNameState.value.data
  )
    return "invalid";
  if (
    checkValidNameState.value.loading === "loaded" &&
    checkValidNameState.value.error
  )
    return "invalid";
  if (!validNickname.value) return "invalid";
  if (
    checkValidNameState.value.loading === "loaded" &&
    checkValidNameState.value.data
  )
    return "valid";
  return "";
});

const icon = computed(() => {
  if (check.value === "waiting") return null;
  if (check.value === "loading") return "fa fa-spinner";
  if (check.value === "valid") return "fa-regular fa-circle-check";
  if (check.value === "invalid") return "fa-regular fa-circle-xmark";
  return null;
});
const iconClass = computed(() => {
  if (check.value === "waiting") return "";
  if (check.value === "loading") return "fa-pulse fa-lg";
  if (check.value === "valid") return "fa-lg valid";
  if (check.value === "invalid") return "fa-lg invalid";
  return "";
});

const validationMsg = computed(() => "Este nombre no está disponible");

// Manejo conjunto de estados.
const loading = computed(() => {
  if (patchAuth0UserState.value.loading === "loading") return "loading";

  return props.isEditing
    ? editProfileState.value.loading
    : signUpState.value.loading;
});
const apiError = computed(() =>
  props.isEditing ? editProfileState.value.error : signUpState.value.error
);

// Salir del formulario
const emit = defineEmits(["exit"]);

const cancel = () => {
  emit("exit");
};

const props = defineProps({
  isEditing: Boolean,
  profileInfo: Object,
});

// Redirección tras guardar
watch(loading, (newValue) => {
  if (newValue === "loaded") {
    window.location.reload();
  }
});

// Relleno inicial de campos.
onMounted(() => {
  if (!props.profileInfo) return;

  nickname.value = props.profileInfo.name ?? null;
  oldNickname.value = props.profileInfo.name ?? null;

  if (props.profileInfo.birthdate) {
    const parts = props.profileInfo.birthdate.split("/");
    if (parts.length === 3) {
      selectedDay.value = parseInt(parts[0], 10);
      selectedMonth.value = parseInt(parts[1], 10);
      selectedYear.value = parseInt(parts[2], 10);
    }
  }

  description.value = props.profileInfo.description ?? null;
});

// Tools
// TODO: Moverlo a un composable reutilizable
const wait = async (conditionFunc, checkInterval = 500, timeout = 5000) => {
  let startTime = Date.now();

  while (!conditionFunc()) {
    if (Date.now() - startTime > timeout) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, checkInterval));
  }
};
</script>

<style scoped lang="scss">
input {
  width: calc(100% - 425px);
  margin-top: 15px;
  border: none;
  border-bottom: 1px solid $color-dark;
  border-radius: 0;
  background-color: $color-background;
  margin-right: 0;
  margin-left: 0;
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
  width: calc(100% - 180px);
  margin-top: 5px;
  padding-left: 2px;
  padding-bottom: 1px;
  padding: 13px 2px 1px 2px;
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

.state-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 12rem; // Provisional
  width: 100%;
  font-size: 200%;
}

.container {
  display: flex;
  flex-direction: column;
  padding: 30px;
  border: 3px solid $color-dark;
}
.section {
  min-height: 70px;
  margin-bottom: 40px;
}
.section--top {
  display: flex;
  justify-content: space-between;
}
.img-container {
  position: relative;
  width: 12rem;
  height: 12rem;
}
.wrapper-img {
  position: relative;
  height: 92%;
  width: 92%;
  overflow: hidden;
  border: 1px solid $color-dark;
  border-radius: 500px;
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
.btn:disabled {
  background-color: $color-soft-grey;
}
.span--add-img {
  transform: translateY(-13%);
}
.btn--add-img {
  position: absolute;
  right: 15px;
  bottom: 15px;
  width: 50px;
  height: 50px;
  line-height: 50px; /* Ajusta a la altura del botón. Depende del transform del span para que el texto lo aplique. */
  font-size: 300%;
  font-weight: bold;
}
.label {
  font-weight: 600;
  font-size: 110%;
}
.name-input-container {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}
.valid {
  color: rgb(0, 192, 0);
}
.invalid {
  color: red;
}
.date {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  min-height: 35px;
  margin-top: 10px;
  margin-right: 0;
  margin-left: 0;
}
.date-select {
  display: inline-block;
  padding-right: 23px;
  margin-right: 10px;
}
.button {
  width: 120px;
  height: 30px;
  margin: 10px 10px 0 0;
  border: none;
  border-radius: 20px;
  background-color: $color-primary;
  color: white;
}
.button:disabled {
  background-color: $color-soft-grey;
}
.cancel-btn {
  color: $color-dark;
  border-radius: 40px;
  background-color: transparent;
}
.cancel-btn:hover {
  text-decoration: underline;
}
</style>