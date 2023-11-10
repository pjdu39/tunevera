<template>
  <div v-if="loading === 'waiting'">
    <div class="container">
      <div class="login-card">
        <BFormGroup
          id="fieldset-email"
          class="email-container"
          label="Email"
          label-for="input-email"
        >
          <BFormInput
            id="input-email"
            class="email-input"
            v-model="email"
            autocomplete="off"
            trim
          ></BFormInput>
        </BFormGroup>
        <BButton class="login-button" @click="fetchFakeLoginToken()">
          Login
        </BButton>
      </div>
    </div>
  </div>

  <div v-else-if="loading === 'loading'" class="">
    <div class="state-container">
      <font-awesome-icon
        icon="fa fa-spinner"
        class="fa-pulse fa-lg loading"
        aria-hidden="true"
      />
    </div>
  </div>
  <div v-else-if="loading === 'error'" class="">
    <div class="state-container">
      <font-awesome-icon icon="fa fa-triangle-exclamation" class="error" />
      <div>{{ error }}</div>
    </div>
  </div>
</template>
  
<script setup>
import { useRouter } from "vue-router";
import { useFakeStore } from "~/store/fake.js";

definePageMeta({
  layout: "empty",
});

// Estado reactivo
const email = ref(null);

// Acceso a la store
const fakeStore = useFakeStore();

// Propiedades computadas
const loading = computed(() => fakeStore.getFakeLoginTokenState.loading);
const error = computed(() => fakeStore.getFakeLoginTokenState.error);

// Métodos
const fetchFakeLoginToken = () => fakeStore.fetchFakeLoginToken(email.value);

// Enrutador para redireccionar
const router = useRouter();

// Observar la propiedad y redirigir si es necesario
watch(loading, (newValue) => {
  if (newValue === "loaded") {
    console.log("entro en el watch");
    router.push("/Perfil");
  }
});
</script>
  
<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
}
.login-card {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 4rem;
  padding: 0 2rem;
  width: 25rem;
  height: 15rem;
  border: 3px solid $color-dark;
  border-radius: 5px;
}
.email-container {
  width: 100%;
}
.login-button {
  width: 100%;
  border-radius: 3rem;
  background-color: $color-primary;
  border: 1px solid $color-primary;
}
.token {
  max-width: 18rem;
  overflow-wrap: break-word;
}
.email-input {
  border: 1px solid $color-dark;
  border-radius: 5px;
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
.loading {
}
.error {
  color: $color-primary;
  font-size: 200%; // Se acumula sobre el font-size: 200%; del contenedor
}
</style>