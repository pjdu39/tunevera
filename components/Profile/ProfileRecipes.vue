<template>
  <div class="profile-content">
    <div v-if="recipesLoading === 'waiting' || recipesLoading === 'loading'" class="loading-container">
      <font-awesome-icon
        icon="fa fa-circle-notch"
        class="fa-spin fa-lg"
        aria-hidden="true"
      />
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
.loading-container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  height: 200px;
  width: 100%;
  font-size: 200%;
  color: $color-primary;
}
.profile-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-auto-rows: 1fr; /* Altura de fila como una fracción del contenedor */
  gap: 3px;
  min-height: 15rem;
}
.p-recipe {
  position: relative;
  // border: 1px solid black;
  border-radius: 3px;
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

@media (max-width: 600px) {
  .profile-content {
    gap: 1px;
    min-height: 15rem;
  }
  .p-recipe {
    // border: none;
    border-radius: 0;
  }
}
</style>