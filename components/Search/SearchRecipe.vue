<template>
  <div class="top">
    <div class="basic-options-container">
      <input
        class="main-search-input"
        v-model="text"
        type="text"
        placeholder="Buscar receta..."
        @input="searchRecipes"
      />
      <div class="flex vegan-options">
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
  </div>
  <div class="flex">
    <button class="advanced-options-dropdown" @click="clickAdvanced()">
      <div>Avanzado</div>
      <font-awesome-icon
        :icon="'fa ' + angleIcon"
        class="dropdown-icon"
        aria-hidden="true"
      />
    </button>
    <div v-if="numFilters && !showAdvanced" class="filters-applied-count">
      {{ numFilters }}
    </div>
  </div>
  <div v-if="showAdvanced" class="advanced-options-container">
    <TabView
      :activeIndex="activeTab"
      content-class="mt-3"
      class="search-tool-container"
    >
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
          <font-awesome-icon
            icon="fa fa-circle-notch"
            class="fa-spin fa-lg board-loading-icon"
            aria-hidden="true"
          />
        </div>
        <div
          v-else-if="getIngredientsState.loading === 'loaded'"
          class="sugestions-container"
        >
          <button
            v-for="(ingredient, index) in getIngredientsState.data"
            :key="index"
            class="myBadge"
            @click="addIngredientFilter(ingredient)"
          >
            {{ ingredient.text }}
          </button>
        </div>
        <div
          v-else-if="getIngredientsState.loading === 'error'"
          class="sugestions-container"
        >
          {{ getIngredientsState.error }}
        </div>
      </TabPanel>
      <TabPanel header="TAGS">
        <input
          class="advanced-search-input"
          v-model="tagText"
          type="text"
          placeholder="Buscar por etiquetas..."
          @input="getTags"
        />
        <div
          v-if="getTagsState.loading === 'loading'"
          class="sugestions-container"
        >
          <font-awesome-icon
            icon="fa fa-circle-notch"
            class="fa-spin fa-lg board-loading-icon"
            aria-hidden="true"
          />
        </div>
        <div
          v-else-if="getTagsState.loading === 'loaded'"
          class="sugestions-container"
        >
          <button
            v-for="(tag, index) in getTagsState.data"
            :key="index"
            class="myBadge"
            @click="addTagFilter(tag)"
          >
            {{ tag.text }}
          </button>
        </div>
        <div
          v-else-if="getTagsState.loading === 'error'"
          class="sugestions-container"
        >
          {{ getTagsState.error }}
        </div>
      </TabPanel>
    </TabView>
    <div class="applied-filters-container">
      <div v-if="ingredients.length > 0" class="ingredients-filters-container">
        <div class="filter-title">Ingredientes filtrados</div>
        <div class="ingredients-filter">
          <div
            v-for="(ingredient, index) in ingredients"
            :key="index"
            class="filter-element"
            :class="{ 'animate-highlight': animatingIngredientIndex === index }"
          >
            <div class="filter-element-text">{{ ingredient.text }}</div>
            <button class="btn btn--delete" @click="dropIngredient(index)">
              <span class="span--btn-delete">
                <font-awesome-icon icon="fa fa-times" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div v-if="tags.length > 0" class="tags-filters-container">
        <div class="filter-title">Etiquetas filtradas</div>
        <div class="tags-filter">
          <div
            v-for="(tag, index) in tags"
            :key="index"
            class="filter-element"
            :class="{ 'animate-highlight': animatingTagIndex === index }"
          >
            <div class="filter-element-text">{{ tag.text }}</div>
            <button class="btn btn--delete" @click="dropTag(index)">
              <span class="span--btn-delete">
                <font-awesome-icon icon="fa fa-times" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sugested-filters-section">
    <button class="sugested-filter" @click="clickCustom('L')">
      Últimos 30 días
    </button>
    <button class="sugested-filter" @click="clickCustom('V')">
      Más votados
    </button>
    <button class="sugested-filter" @click="clickCustom('M')">
      Estrellas Michelin
    </button>
  </div>
  <div class="results-container">
    
    <div
      class="grid-results"
    >
      <div v-for="(recipe, index) in recipes" :key="index" class="p-recipe">
        <NuxtLink class="recipe-link" :to="`/receta?id=${recipe.id}`">
          <div class="recipe-info">
            <div class="recipe-info-title">{{ recipe.title }}</div>
            <div class="recipe-info-detail">
              <div class="recipe-info-detail-item">
                <div>{{ recipe.likes }}</div>
                <div>
                  <font-awesome-icon
                    icon="far fa-heart"
                    class="item-icon"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div class="recipe-info-detail-item">
                <div>{{ recipe.time }}</div>
                <div>
                  <font-awesome-icon
                    icon="far fa-clock"
                    class="item-icon"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
          <NuxtImg :src="recipe.pictureUrl" class="image" />
          <div class="top-blur"></div>
          <div class="bottom-blur"></div>
        </NuxtLink>
      </div>
    </div>
    <div ref="observerElement"></div>
    <div v-if="loadingMoreElements" class="icon-container">
        <font-awesome-icon
          icon="fa fa-circle-notch"
          class="fa-spin fa-lg"
          aria-hidden="true"
        />
    </div>
    <!--
    <div
      v-else-if="searchRecipesState.loading === 'error'"
      class="grid-results"
    >
      {{ searchRecipesState.error }}
    </div>
    -->
  </div>
</template>

<script setup>
import { useSearchStore } from "~/store/search.js";

const props = defineProps({
  tag: Object,
});

// Acceso a la Store
const store = useSearchStore();

const loadingMoreElements = computed(() => {
  return searchRecipesState.value.loading === 'loading' && hasMore.value
})

const searchRecipesState = computed(() => store.searchRecipesState);
const recipes = ref([]);
const page = ref(0);
const hasMore = ref(true);
const observerElement = ref(null);
let observer;

const fetchRecipes = async () => {
  if (!hasMore.value) return;
  page.value += 1;
  await store.fetchRecipes({
    text: text.value,
    veggie: veggie.value,
    ingredients: ingredients.value.map((x) => x.value),
    tags: tags.value.map((x) => x.value),
    customFilters: customFilters.value,
    numElements: 12,
    page: page.value
    });
    
  if (searchRecipesState.value.loading === "loaded" && !searchRecipesState.value.error) {
    if (searchRecipesState.value.data.length > 0) {
      recipes.value = [...recipes.value, ...searchRecipesState.value.data];
    } else {
      hasMore.value = false; // No hay más recetas disponibles
    }
  }
};

onMounted(() => {
  if (props.tag && store) {
    showAdvanced.value = true;
    activeTab.value = 1;
    tags.value.push(props.tag);
  }

  // fetchRecipes();

  observer = new IntersectionObserver(
    async (entries) => {
      if (entries[0].isIntersecting && hasMore.value) {
        await fetchRecipes();
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }
  );

  if (observerElement.value) {
    observer.observe(observerElement.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

let inputTimer = null;

const searchRecipes = () => {
  clearTimeout(inputTimer);
  store.setFetchRecipesLoading();
  recipes.value = []; // Reiniciar el array de recetas
  inputTimer = setTimeout(() => {
    page.value = 0;
    hasMore.value = true;
    fetchRecipes();
  }, 500);
};

const activeTab = ref(0);

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

  searchRecipes();
};
const checkVegetarian = () => {
  vegan.value = false;
  vegetarian.value = !vegetarian.value;

  searchRecipes();
};

// Opciones avanzadas
const showAdvanced = ref(false);
const angleIcon = ref("fa-angle-down");
const clickAdvanced = () => {
  showAdvanced.value = !showAdvanced.value;
  angleIcon.value = showAdvanced.value ? "fa-angle-down" : "fa-angle-down";
};

const numFilters = computed(() => {
  return ingredients.value.length + tags.value.length;
});

// Buscar ingredientes
const getIngredientsState = computed(() => store.getIngredientsState);

let inputTimerIng = null;

const ingredientText = ref(null);

const getIngredients = () => {
  clearTimeout(inputTimerIng);

  if (!ingredientText.value) {
    store.clearIngredients();
    return;
  }

  store.setFetchIngredientsLoading();
  inputTimerIng = setTimeout(() => {
    store.fetchIngredients(5, ingredientText.value);
  }, 500);
};

const addIngredientFilter = (ingredient) => {
  const isIngredientPresent = ingredients.value.some(
    (item) => item.text === ingredient.text
  );

  if (!isIngredientPresent) {
    ingredients.value.push(ingredient);
    searchRecipes();
  } else triggerIngredientAnimation(ingredient);
};

const dropIngredient = (index) => {
  ingredients.value.splice(index, 1);
  searchRecipes();
};

const animatingIngredientIndex = ref(-1); // Inicialmente, ningún elemento está siendo animado

const triggerIngredientAnimation = (ingredient) => {
  const index = ingredients.value.findIndex(
    (item) => item.text === ingredient.text
  );
  if (index !== -1) {
    animatingIngredientIndex.value = index;
    // Inicia la animación añadiendo una clase mediante v-bind:class
    setTimeout(() => {
      animatingIngredientIndex.value = -1; // Resetea después de la animación
    }, 1000);
  }
};

// Buscar tag
const getTagsState = computed(() => store.getTagsState);

let inputTimerTag = null;

const tagText = ref(null);

const getTags = () => {
  clearTimeout(inputTimerTag);

  if (!tagText.value) {
    store.clearTags();
    return;
  }

  store.setFetchTagsLoading();
  inputTimerTag = setTimeout(() => {
    store.fetchTags(5, tagText.value);
  }, 500);
};

const addTagFilter = (tag) => {
  const isTagPresent = tags.value.some((item) => item.text === tag.text);

  if (!isTagPresent) {
    tags.value.push(tag);
    searchRecipes();
  } else triggerTagAnimation(tag);
};

const dropTag = (index) => {
  tags.value.splice(index, 1);
  searchRecipes();
};

const animatingTagIndex = ref(-1); // Inicialmente, ningún elemento está siendo animado

const triggerTagAnimation = (tag) => {
  const index = tags.value.findIndex((item) => item.text === tag.text);
  if (index !== -1) {
    animatingTagIndex.value = index;
    // Inicia la animación añadiendo una clase mediante v-bind:class
    setTimeout(() => {
      animatingTagIndex.value = -1; // Resetea después de la animación
    }, 1000);
  }
};

// Filtros persnalizados
const clickCustom = (value) => {
  customFilters.value = value;
  searchRecipes();
};
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

.top {
  height: 55px;
}
.basic-options-container {
  display: flex;
}
.main-search-input {
  display: block;
}
.vegan-options {
  display: flex;
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
  padding: 0 10px 1px 0px;
  height: 19px;
  background-color: transparent;
  border: none;
  border-radius: 9px;
  line-height: 16px;
  font-size: 90%;
}
.advanced-options-dropdown:hover {
  text-decoration: underline;
}
.filters-applied-count {
  padding: 0 5px;
  margin-left: 5px;
  min-width: 19px;
  background-color: $color-red;
  color: white;
  border-radius: 20px;
  text-align: center;
  line-height: 18px;
  font-size: 75%;
  font-weight: bold;
}
.dropdown-icon {
  margin: 3px 0 0 6px;
}
.advanced-options-container {
  display: flex;
  // min-height: 134px;
  margin: 20px 0 0 0;
  font-size: 80%;
}
.search-tool-container {
  width: 45%;
}
.advanced-search-input {
  width: calc(100% - 30px);
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
  width: 55%;
  margin-top: 20px;
}
.ingredients-filters-container {
  width: 50%;
}
.tags-filters-container {
  width: 50%;
}
.filter-title {
  line-height: 10px;
  margin-bottom: 20px;
  font-size: 130%;
  font-family: $font-headers;
}
.ingredients-filter {
  width: auto;
  min-height: 100px;
  height: min-content;
  border-left: 1px solid $color-dark;
  padding: 0 5px 0 5px;
}
.filter-element {
  display: flex;
  width: 100%;
  padding: 0 5px 2px 10px;
  margin-bottom: 4px;
  text-align: start;
  border: none;
  border-radius: 20px;
  background-color: transparent;
  line-height: 19px;
}
.filter-element > *:last-child {
  margin-left: auto;
}
.filter-element:hover {
  background-color: rgb(238, 235, 221);
}
@keyframes highlight {
  from {
    background-color: $color-soft-grey;
  }
  to {
    background-color: transparent;
  }
}

.animate-highlight {
  animation: highlight 1s ease-out;
}
.filter-elemet-text {
  display: inline;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $color-primary;
  border-radius: 200px;
  color: white;
  padding: 0;
}
.btn:disabled {
  background-color: $color-soft-grey;
}
.span--btn-delete {
  transform: translateY(-2%);
}
.btn--delete {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  font-size: 110%;
  font-weight: bold;
  color: #df6666;
  background-color: transparent;
}
.tags-filter {
  width: auto;
  min-height: 100px;
  height: min-content;
  border-left: 1px solid $color-dark;
  padding: 0 5px 0 10px;
}
.results-container {
  height: auto;
  width: 100%;
  margin-top: 30px;
}
.sugested-filters-section {
  display: flex;
  margin-top: 45px;
  margin-bottom: 8px;
  font-size: 90%;

  // Lo quito temporalmente
  display: none;
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
  //min-height: 15rem;
}
.icon-container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  height: 200px;
  width: 100%;
  font-size: 200%;
  color: $color-primary;
}
.board-loading-icon {
  color: $color-soft-grey;
}
.p-recipe {
  position: relative;
  // border: 1px solid black;
  border-radius: 5px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
}
.recipe-link .recipe-info {
  display: none;
}
.recipe-link:hover .recipe-info {
  display: block;
}
.recipe-info {
  position: relative;
  width: 100%;
  height: 100%;
  color: white;
  z-index: 2;
}
.recipe-info-title {
  position: absolute;
  top: 0;
  padding: 3px 9px;
  font-family: $font-headers;
  font-size: 110%;
  letter-spacing: 1px;
}
.recipe-info-detail {
  display: flex;
  position: absolute;
  bottom: 0;
  padding: 0 9px;

  /*
  top: 50%;
  transform: translateY(-50%);
  */
}
.recipe-info-detail-item {
  display: flex;
  padding: 0 13px 3px 0;
}
.item-icon {
  margin-left: 5px;
}
.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.top-blur {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 25%; // Al 100% le resto el height de bottom-blur para no superponer dos difuminados.
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
}
.bottom-blur {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 25%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
}
.recipe-link .top-blur {
  display: none;
}
.recipe-link:hover .top-blur {
  display: block;
}
.recipe-link .bottom-blur {
  display: none;
}
.recipe-link:hover .bottom-blur {
  display: block;
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
  font-family: $font-primary;
}
@media (max-width: 600px) {
  input {
    width: 100%;
  }
  .top {
    height: auto;
  }
  .basic-options-container {
    flex-direction: column;
  }
  .main-search-input {
    // width: 100%;
  }
  .advanced-search-input {
    width: 100%;
  }
  .vegan-options {
    margin: 20px 0;
  }
  .vegan-button {
    margin-left: 0;
    margin-right: 30px;

    border: 1px solid;
    border-radius: 8px;
    width: auto;
  }
  .advanced-options-container {
    flex-direction: column;
  }
  .search-tool-container {
    width: 100%;
  }
  .applied-filters-container {
    padding-left: 10px;
    width: 100%;
  }
  .ingredients-filter {
    min-height: max-content;
  }
  .tag-filter {
    min-height: max-content;
  }
  .sugestions-container {
  }
  .grid-results {
    grid-template-columns: repeat(2, 1fr);
    /* grid-auto-rows: 1fr; /* Altura de fila como una fracción del contenedor */
    gap: 3px;
    min-height: 15rem;
  }
  .recipe-link .recipe-info {
    display: block; /* Siempre visible en dispositivos móviles */
  }
  .recipe-link .top-blur {
    display: block;
  }
  .recipe-link .bottom-blur {
    display: block;
  }
}
</style>