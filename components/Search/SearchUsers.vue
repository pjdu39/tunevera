<template>
  <div class="component">
    <input
      class="search-input"
      v-model="filter"
      type="text"
      placeholder="Buscar usuario..."
      @input="searchUser"
    />
    <font-awesome-icon
      v-if="searchUsersState.loading === 'loading'"
      icon="fa fa-spinner"
      class="fa-pulse fa-lg"
      aria-hidden="true"
    />
    <div
      v-else-if="searchUsersState.loading === 'loaded'"
      v-for="(user, index) in users"
      :key="index"
      class="results-container"
    >
      <NuxtLink class="result" :to="`/perfil?id=${user.id}`">
        <div class="result-img-wrapper">
          <NuxtImg :src="user.pictureUrl" class="image-fit" />
        </div>
        <div class="result-name">{{ user.name }}</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useSearchStore } from "~/store/search.js";

// Acceso al store
const store = useSearchStore();

const searchUsersState = computed(() => store.searchUsersState);
const users = computed(() => searchUsersState.value.data);

const filter = ref(null);

let inputTimer = null;
const oldFilter = ref("");

const searchUser = (event) => {
  const newValue = event.target.value;

  if (validInput(newValue)) {
    oldFilter.value = newValue; // Actualizar el valor antiguo si el nuevo valor es válido
    filter.value = newValue;

    clearTimeout(inputTimer);
    store.setFetchUsersLoading();
    inputTimer = setTimeout(() => {
      store.fetchUsers(filter.value);
    }, 500);
  } else {
    filter.value = oldFilter.value; // Revertir al valor antiguo si el nuevo valor no es válido
  }
};

const validInput = (value) => {
  const patron = /^[a-zA-Z0-9_]*$/;
  return patron.test(value);
};

onMounted(() => {
  store.fetchUsers(filter.value);
});
</script>

<style lang="scss" scoped>
input {
  width: calc(100% - 380px);
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

.component {
  height: auto;
}
.search-input {
  display: block;
  margin-bottom: 25px;
}
.results-container {
}
.result {
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: left;
  left: 0;
  // font-style: italic;
}
.result:hover {
  text-decoration: underline;
}
.result-img-wrapper {
  position: relative;
  height: 28px;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 10px;
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
.result-name {
  /*
  font-size: 90%;
  font-weight: bold;
  */
}
</style>