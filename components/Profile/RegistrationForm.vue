<template>
  <div v-if="signUpState.loading === 'waiting'" class="container">
    <div class="section section--top">
      <div class="img-container">
        <div class="wrapper-img">
          <NuxtImg
            v-if="imageUrl"
            class="image-fit"
            :src="imageUrl"
          />
          <NuxtImg
            v-else-if="user.picture"
            class="image-fit"
            :src="user.picture"
          />
          <div
            v-else
            class="upload-state-container"
          >
            <font-awesome-icon
              icon="fa fa-spinner"
              class="fa-pulse fa-lg"
              aria-hidden="true"
            />
          </div>
        </div>
        <label class="btn btn--add-img">
          <input type="file" @change="handleFileChange" />
          <span class="span--add-img">+</span>
        </label>
      </div>
      <button class="button" @click="signUp">Guardar</button>
    </div>
    <div class="section">
      <div class="label">Nombre de usuario *</div>
      <input
        class="nickname-input"
        v-model="nickname"
        :placeholder="user.nickname ?? ''"
        maxlength="30"
        autocomplete="off"
      />
    </div>
    <div class="section">
      <div class="label">Fecha de nacimiento *</div>
      <div class="date">
        <input
          class="date-input"
          v-model="day"
          placeholder="día"
          min="1"
          max="31"
          autocomplete="off"
        />
        <input
          class="date-input"
          v-model="month"
          placeholder="mes"
          min="1"
          max="12"
          autocomplete="off"
        />
        <input
          class="date-input"
          v-model="year"
          placeholder="año"
          min="1900"
          max="2100"
          autocomplete="off"
        />
      </div>
    </div>
    <div class="section">
      <div class="label">Descripción</div>
      <Textarea
        v-model="description"
        maxlength="30"
        rows="1"
        autocomplete="off"
        autoResize
      />
    </div>
  </div>
  <div v-else-if="signUpState.loading === 'loading'">procesando...</div>
  <div v-else-if="signUpState.loading === 'loaded'">
    registro completado con éxito
  </div>
  <div v-else-if="signUpState.loading === 'error'">
    Vaya! Parece que algo falló. Error: {{ signUpState.error }}
  </div>
</template>

<script setup>
import { useAuth } from "~/composables/useAuth";
import { useLoginStore } from "~/store/login.js";

// Auth0
const { user, isAuthenticated, isLoading } = useAuth();

// Datos y llamadas de registro
const loginStore = useLoginStore();
const signUpState = computed(() => loginStore.signUpState);
const signUp = async () => {
  console.log('Entro en el signUp')
  const auth0Response = await patchAuth0User();

  console.log(auth0Response)
  if(!auth0Response) return

  const userData = {
    nickname: nickname.value,
    email: user.value.email,
    birthDate: `${day.value}/${month.value}/${year.value}`,
    description: description.value,
    location: location.value,
    pictureUrl: user.value.picture,
  };

  loginStore.signUp(userData);
};
const nickname = ref(null);
const year = ref(null);
const month = ref(null);
const day = ref(null);
const description = ref(null);
const location = ref(null);
const imageFile = ref(null);

const imageUrl = computed(() => {
  return imageFile.value ? URL.createObjectURL(imageFile.value) : null;
});

const patchAuth0UserState = computed(() => loginStore.patchAuth0UserState);
const patchAuth0User = () => {
  if (!user.value) return

  console.log(user)

  let parts = user.value.sub.split('|');
  let userId = parts[1];

  const body = {};

  if (nickname.value) body.nickname = nickname.value;
  if (imageFile.value) body.picture = imageFile.value;
  // if (year.value && month.value && day.value) body.birthDate = `${day.value}/${month.value}/${year.value}`;

  loginStore.patchAuth0User(userId, body);
}

// Validaciones
// TODO: Propiedades computadas que validen la integridad de los datos: Lenght de los textos, campo obligatorios, fechas válidas, etc.

// Manejo para subida de imágenes
const handleFileChange = async (event) => {
  console.log(event.target.files[0])
  const file  = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    imageFile.value = file;
  } else {
    imageFile.value = null;
  }
};

</script>

<style scoped lang="scss">
input {
  width: calc(100% - 180px);
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

.container {
  display: flex;
  flex-direction: column;
  padding: 30px;
  border: 3px solid $color-dark;
}
.section {
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
.date {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-right: 0;
  margin-left: 0;
}
.date-input {
  width: 60px;
}
.button {
  width: 130px;
  height: 30px;
  margin: 10px 15px 0 0;
  border: none;
  border-radius: 20px;
  background-color: $color-primary;
  color: white;
}
</style>