<template>
  <div class="profile-content">
    <div v-if="recipesLoading === 'waiting' || recipesLoading === 'loading'">
      Cargando...
    </div>
    <div v-else-if="recipesLoading === 'error'">{{ recipesError }}</div>
    <div
      v-else-if="recipesLoading === 'loaded'"
      v-for="(recipe, index) in recipes"
      :key="index"
      class="p-recipe"
    >
      <NuxtLink class="recipe-post" :to="`/receta?id=${recipe.id}`">
        <NuxtImg :src="recipe.pictureUrl" class="image" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useProfileStore } from "~/store/profile.js";

const props = defineProps({
  id: Number,
});

onMounted(() => {
  fetchRecipesData();
});

const profileStore = useProfileStore();

const recipes = computed(() => profileStore.getRecipesState.data);
const recipesLoading = computed(() => profileStore.getRecipesState.loading);
const recipesError = computed(() => profileStore.getRecipesState.error);

const fetchRecipesData = () => {
  profileStore.fetchRecipes(props.id);
};

// Refresco del perfil al ir de uno ajeno al propio
watch(props, (newVal, oldVal) => {
  fetchRecipesData();
});
</script>

<style scoped lang="scss">
.profile-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-auto-rows: 1fr; /* Altura de fila como una fracción del contenedor */
  gap: 3px;
  min-height: 15rem;
}
.p-recipe {
  position: relative;
  border: 1px solid black;
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
</style>