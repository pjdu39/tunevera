<template>
  <div class="component">
    <div class="basic-options-container">
      <input
        class="main-search-input"
        v-model="text"
        type="text"
        placeholder="Buscar receta..."
        @input="searchRecipes"
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
          v-model="ingredientText"
          type="text"
          placeholder="Buscar por ingredientes..."
          @input="getIngredients"
        />
        <div
          v-if="getIngredientsState.loading === 'loading'"
          class="sugestions-container"
        >
          Cargando...
        </div>
        <div
          v-else-if="getIngredientsState.loading === 'loaded'"
          class="sugestions-container"
        >
          <button
            v-for="(ingredient, index) in getIngredientsState.data"
            :key="index"
            class="myBadge"
          >
            {{ ingredient.text }}
          </button>
        </div>
        <div
          v-else-if="getIngredientsState.loading === 'error'"
          class="sugestions-container"
        >
          Cargando...
        </div>
      </TabPanel>
      <TabPanel header="TAGS">
        <input
          class="advanced-search-input"
          type="text"
          placeholder="Buscar por etiquetas..."
        />
        <div class="sugestions-container">
          <div class="myBadge">Healthy</div>
          <div class="myBadge">Navidad</div>
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
    <div v-if="searchRecipesState.loading === 'loading'" class="grid-results">
      Cargando...
    </div>
    <div
      v-else-if="searchRecipesState.loading === 'loaded'"
      class="grid-results"
    >
      <div v-for="(recipe, index) in recipes" :key="index" class="p-recipe">
        <NuxtLink class="recipe-post" :to="`/receta?id=${recipe.id}`">
          <NuxtImg :src="recipe.pictureUrl" class="image" />
        </NuxtLink>
      </div>
    </div>
    <div
      v-else-if="searchRecipesState.loading === 'error'"
      class="grid-results"
    >
      {{ searchRecipesState.error }}
    </div>
  </div>
</template>

<script setup>
import { useSearchStore } from "~/store/search.js";

// Acceso a la Store
const store = useSearchStore();

const searchRecipesState = computed(() => store.searchRecipesState);
const recipes = computed(() => searchRecipesState.value.data);

const fetchRecipes = () =>
  store.fetchRecipes(
    text.value,
    veggie.value,
    ingredients.value,
    tags.value,
    customFilters.value
  );

let inputTimer = null;

const searchRecipes = () => {
  clearTimeout(inputTimer);
  store.setFetchRecipesLoading();
  inputTimer = setTimeout(() => {
    fetchRecipes();
  }, 500);
};

onMounted(() => {
  fetchRecipes();
});

// Parámetros
const text = ref("");
const veggie = computed(() => {
  if (vegan.value) return "V";
  else if (vegetarian.value) return "T";
  else return null;
});
const ingredients = ref([]);
const tags = ref([]);
const customFilters = ref(null);

// Filtros veggie
const vegan = ref(false);
const vegetarian = ref(false);

const checked = (item) => (item ? " vegan-button--selected" : "");

const checkVegan = () => {
  vegetarian.value = false;
  vegan.value = !vegan.value;

  fetchRecipes();
};
const checkVegetarian = () => {
  vegan.value = false;
  vegetarian.value = !vegetarian.value;

  fetchRecipes();
};

// Opciones avanzadas
const showAdvanced = ref(false);
const clickAdvanced = () => (showAdvanced.value = !showAdvanced.value);

// Buscar ingredientes
const getIngredientsState = computed(() => store.getIngredientsState);

let inputTimerIng = null;

const getIngredients = () => {
  clearTimeout(inputTimerIng);
  store.setFetchIngredientsLoading();
  inputTimerIng = setTimeout(() => {
    store.fetchIngredients(5, ingredientText.value);
  }, 500);
};

const ingredientText = ref(null);
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
  margin: 4px 0 0 6px;
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
.myBadge {
  padding: 2px 7px 4px 7px;
  margin-right: 7px;
  font-size: 90%;
  font-weight: 600;
  line-height: 110%;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: $color-primary;
}
.myBadge:hover {
  text-decoration: underline;
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