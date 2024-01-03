<template>
  <div v-if="signUpState.loading === 'waiting'" class="container">
    <label for="">Formulario para completar registro</label>
    <input
      class="row nickname-input"
      v-model="nickname"
      maxlength="30"
      autocomplete="off"
    />
    <div class="date">
      <input
        class="row date-input"
        v-model="day"
        maxlength="30"
        autocomplete="off"
      />
      <input
        class="row date-input"
        v-model="month"
        maxlength="30"
        autocomplete="off"
      />
      <input
        class="row date-input"
        v-model="year"
        maxlength="30"
        autocomplete="off"
      />
    </div>
    <input
      class="row description-input"
      v-model="description"
      maxlength="30"
      autocomplete="off"
    />
    <button class="button" @click="signUp">Aceptar</button>
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
import { useLoginStore } from "~/store/login.js";

const loginStore = useLoginStore();

const signUpState = computed(() => loginStore.signUpState);

const signUp = () => {
  const userData = {
    nickname: nickname.value,
    email: 'pepito@gmail.com',
    birthDate: `${day.value}/${month.value}/${year.value}`,
    description: description.value,
    location: location.value,
    pictureUrl: pictureUrl.value,
  };

  loginStore.signUp(userData);
};

const nickname = ref(null);
const year = ref(null);
const month = ref(null);
const day = ref(null);
const description = ref(null);
const location = ref(null);
const pictureUrl = ref(null);
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

.container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 3px solid $color-dark;
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
.row {
  margin-top: 45px;
}
.button {
  width: 50%;
  margin-top: 50px;
}
</style>