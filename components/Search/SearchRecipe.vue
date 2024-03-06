<template>
  <div class="component">
    <div class="basic-options-container">
      <input
        class="main-search-input"
        v-model="filter"
        type="text"
        placeholder="Buscar receta..."
        @input="searchUser"
      />
      <button :class="'vegan-button' + checked(vegan)" @click="checkVegan()">
        <div>Vegano</div>
        <font-awesome-icon
          v-if="vegan"
          icon="fa fa-check"
          class="check-icon"
          aria-hidden="true"
        />
      </button>
      <button
        :class="'vegan-button' + checked(vegetarian)"
        @click="checkVegetarian()"
      >
        <div>Vegetariano</div>
        <font-awesome-icon
          v-if="vegetarian"
          icon="fa fa-check"
          class="check-icon"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
  <button class="advanced-options-dropdown" @click="clickAdvanced()">
    <div>Avanzado</div>
    <font-awesome-icon
      icon="fa fa-angle-down"
      class="dropdown-icon"
      aria-hidden="true"
    />
  </button>
  <div v-if="showAdvanced" class="advanced-options-container">
    <TabView content-class="mt-3" class="search-tool-container">
      <TabPanel header="INGREDIENTES">
        <input
          class="advanced-search-input"
          type="text"
          placeholder="Buscar por ingredientes..."
        />
        <div class="sugestions-container">
          <div class="badge">Ternera</div>
          <div class="badge">Pollo</div>
          <div class="badge">Apio</div>
        </div>
      </TabPanel>
      <TabPanel header="TAGS">
        <input
          class="advanced-search-input"
          type="text"
          placeholder="Buscar por etiquetas..."
        />
        <div class="sugestions-container">
          <div class="badge">Healthy</div>
          <div class="badge">Navidad</div>
        </div>
      </TabPanel>
    </TabView>
    <div class="applied-filters-container">
      <div class="ingredients-filter">
        <div>- Aguacate</div>
        <div>- Harina</div>
        <div>- Pan rallado</div>
        <div>- Arroz</div>
        <div>- Aceite de oliva virgen extra de la primera presión</div>
        <div>- Agua</div>
        <div>- Pepinillos</div>
      </div>
      <div class="tags-filter">
        <div>- Cena</div>
        <div>- Rapido</div>
        <div>- PocosIngredientes</div>
      </div>
    </div>
  </div>
  <div class="sugested-filters-section">
    <button class="sugested-filter">Últimos 30 días</button>
    <button class="sugested-filter">Más votados</button>
    <button class="sugested-filter">Estrellas Michelin</button>
  </div>
  <div class="results-container">
    <div class="grid-results">
      <div v-for="(recipe, index) in recipes" :key="index" class="p-recipe">
        <NuxtLink class="recipe-post" :to="`/receta?id=${recipe.id}`">
          <NuxtImg :src="recipe.pictureUrl" class="image" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const recipes = [
  {
    id: 1,
    pictureUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHrrGhsBvHnCVH_Y3qzlOniw-OFlUObPLZcg&usqp=CAU",
  },
  {
    id: 2,
    pictureUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHrrGhsBvHnCVH_Y3qzlOniw-OFlUObPLZcg&usqp=CAU",
  },
  {
    id: 3,
    pictureUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHrrGhsBvHnCVH_Y3qzlOniw-OFlUObPLZcg&usqp=CAU",
  },
  {
    id: 4,
    pictureUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHrrGhsBvHnCVH_Y3qzlOniw-OFlUObPLZcg&usqp=CAU",
  },
  {
    id: 5,
    pictureUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHrrGhsBvHnCVH_Y3qzlOniw-OFlUObPLZcg&usqp=CAU",
  },
];

// Filtros veggie
const vegan = ref(false);
const vegetarian = ref(false);

const checked = (item) => (item ? " vegan-button--selected" : "");

const checkVegan = () => {
  vegan.value = !vegan.value;
  vegetarian.value = false;
};
const checkVegetarian = () => {
  vegetarian.value = !vegetarian.value;
  vegan.value = false;
};

// Opciones avanzadas
const showAdvanced = ref(false);
const clickAdvanced = () => (showAdvanced.value = !showAdvanced.value);
</script>

<style lang="scss" scoped>
input {
  width: 40%;
  padding: 4px 4px 4px 10px;
  border: 1px solid $color-dark;
  border-radius: 5px;
  background-color: $color-background;
}
/*
input:focus {
  border: none;
  outline: none !important;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  border: 2px solid $color-dark;
}
*/
input:disabled {
  border-color: $color-soft-grey;
}

.component {
  height: 60px;
}
.basic-options-container {
  display: flex;
  margin-bottom: 90px;
}
.main-search-input {
  display: block;
}
.vegan-button {
  display: flex;
  width: 70px;
  color: $color-soft-grey;
  background-color: transparent;
  border: none;
  margin-left: 30px;
}
.vegan-button--selected {
  color: rgb(99, 218, 99);
  font-weight: 500;
}
.vegan-button:hover {
  // text-decoration: underline;
}
.check-icon {
  margin: 3px 0 0 6px;
}
.advanced-options-dropdown {
  display: flex;
  padding: 0 8px 1px 10px;
  color: white;
  background-color: $color-soft-grey;
  border: none;
  border-radius: 9px;
  line-height: 16px;
  font-size: 90%;
}
.dropdown-icon {
  margin: 3px 0 0 6px;
}
.advanced-options-container {
  display: flex;
  margin-top: 20px;
  font-size: 80%;
}
.search-tool-container {
  width: 50%;
}
.advanced-search-input {
  width: calc(100% - 90px);
}
.sugestions-container {
  padding: 10px 0;
}
.badge {
  padding: 2px 7px 4px 7px;
  margin-right: 7px;
  line-height: 100%;
  border-radius: 5px;
  color: white;
  background-color: $color-primary;
}
.applied-filters-container {
  display: flex;
  width: 50%;
}
.ingredients-filter {
  height: auto;
  width: 50%;
  border-left: 1px solid $color-dark;
  padding: 0 5px 0 10px;
}
.tags-filter {
  height: auto;
  width: 50%;
  border-left: 1px solid $color-dark;
  padding: 0 5px 0 10px;
}
.results-container {
  height: auto;
  width: 100%;
}
.sugested-filters-section {
  display: flex;
  margin-top: 45px;
  margin-bottom: 8px;
  font-size: 90%;
}
.sugested-filter {
  margin: 0 40px 0 0;
  background: transparent;
  border: none;
}
.sugested-filter:hover {
  text-decoration: underline;
}
.grid-results {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* grid-auto-rows: 1fr; /* Altura de fila como una fracción del contenedor */
  gap: 3px;
  min-height: 15rem;
}
.p-recipe {
  position: relative;
  // border: 1px solid black;
  border-radius: 5px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
}
.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

// Estilos de primevue

/* Aumenta la especificidad para el título de las pestañas */
:deep(.p-tabview-title) {
  font-size: 70%;
}
/* Aumenta la especificidad para el contenedor de las pestañas */
:deep(.p-tabview-nav) {
  padding: 0;
}
:deep(.p-tabview-nav-link) {
  padding: 0 20px;
  margin: 0;
}
/* Aumentar la especificidad para el contenido */
:deep(.p-tabview-panels) {
  padding: 0 20px;
  margin: 0;
}
</style>