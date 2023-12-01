<template>
  <div class="profile">
    <div
      v-if="profileLoading === 'waiting' || profileLoading === 'loading'"
      class="top"
    >
      <div class="state-container">
        <font-awesome-icon
          icon="fa fa-spinner"
          class="fa-pulse fa-lg loading"
          aria-hidden="true"
        />
      </div>
    </div>
    <div v-else-if="profileLoading === 'error'" class="top">
      <div class="state-container">
        <font-awesome-icon icon="fa fa-triangle-exclamation" class="error" />
        <div>{{ profileError }}</div>
      </div>
    </div>
    <div v-else-if="profileLoading === 'loaded'">
      <div class="top">
        <div class="profile-info">
          <div class="info-summary-section">
            <div class="picture-cotainer">
              <div class="picture-wrapper">
                <NuxtImg class="profile-picture" :src="profile.pictureUrl" />
              </div>
            </div>
            <div class="info-summary">
              <div class="summary-item">
                <div class="s-i-num">{{ profile.numPosts }}</div>
                <div class="s-i-text">Publicaciones</div>
              </div>
              <div class="summary-item">
                <div class="s-i-num">{{ profile.numFollowers }}</div>
                <div class="s-i-text">Seguidores</div>
              </div>
              <div class="summary-item">
                <div class="s-i-num">{{ profile.numFollowing }}</div>
                <div class="s-i-text">Siguiendo</div>
              </div>
            </div>
          </div>
          <div class="info-detail">
            <div class="i-d-name">{{ profile.name }}</div>
            <div class="i-d-description">{{ profile.description }}</div>
          </div>
        </div>
        <div v-if="selfProfile" class="own-notifications-container">
          <button class="own-notifications" @click="console.log(id)">
            <font-awesome-icon
              icon="fa fa-bell"
              class="fa-lg"
              aria-hidden="true"
            />
          </button>
        </div>
        <div v-else-if="!selfProfile" class="follow-container">
          <FollowButton :id="id" />
        </div>
        <!--
        <div class="side-menu">
          <button class="side-menu-button">
            <font-awesome-icon icon="fa fa-utensils" aria-hidden="true" />
          </button>
          <button class="side-menu-button">
            <font-awesome-icon icon="fa fa-book" aria-hidden="true" />
          </button>
          <button class="side-menu-button">
            <font-awesome-icon icon="fa fa-chart-simple" aria-hidden="true" />
          </button>
        </div>
        -->
      </div>
      <div class="profile-content">
        <div
          v-if="recipesLoading === 'waiting' || recipesLoading === 'loading'"
        >
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
        <!--
        <div class="p-recipe">
          <NuxtImg
            src="https://img.taste.com.au/EwM4aecP/taste/2007/05/how-to-deep-fry-108893-1-139501-1.jpeg"
            class="image"
          />
        </div>
        <div class="p-recipe">
          <NuxtImg
            src="https://images.pexels.com/photos/15564188/pexels-photo-15564188/free-photo-of-pancakes-with-berries-and-marple-syrup.jpeg?auto=compress&cs=tinysrgb&w=1600"
            class="image"
          />
        </div>
        <div class="p-recipe">
          <NuxtImg
            src="https://img.delicious.com.au/G-2mxbOh/w1200/del/2022/08/parmesan-crumbed-chicken-schnitzel-fried-eggs-and-apple-cabbage-slaw-173352-2.jpg"
            class="image"
          />
        </div>
        <div class="p-recipe">
          <NuxtImg
            src="https://images.immediate.co.uk/production/volatile/sites/30/2014/01/Top-10-foods-to-try-in-Morocco-e1f2400.jpg?resize=768,574"
            class="image"
          />
        </div>
        <div class="p-recipe">
          <NuxtImg
            src="https://api.vip.foodnetwork.ca/wp-content/uploads/2022/01/FNC_OGImage_Taiwanese-Beef-Noodle-Soup.jpg"
            class="image"
          />
        </div>
        <div class="p-recipe">
          <NuxtImg
            src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaWNpb3VzJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
            class="image"
          />
        </div>
        <div class="p-recipe">
          <NuxtImg
            src="https://img.freepik.com/premium-photo/two-sandwiches-made-slice-meat-cheese-tomatoes-toasted-bread-wooden-table_244366-394.jpg"
            class="image"
          />
        </div>
        <div class="p-recipe">
          <NuxtImg
            src="https://media.istockphoto.com/id/1141120666/photo/healhy-breakfast-toast-with-avocado-egg.webp?b=1&s=170667a&w=0&k=20&c=empvrMxDuC1F3uVrUSaBHLh9xC9rhuY78yTJnQaUS-w="
            class="image"
          />
        </div>
        <div class="p-recipe">
          <NuxtImg
            src="https://images.unsplash.com/photo-1515041761709-f9fc96e04cd3?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZvb2QlMjBvbiUyMHBsYXRlfGVufDB8fDB8fHww"
            class="image"
          />
        </div>
        -->
      </div>
    </div>
  </div>
</template>

<script setup>
import FollowButton from "~/components/Profile/FollowButton.vue";
import { useProfileStore } from "~/store/profile.js";

definePageMeta({
  middleware: "auth",
});
onMounted(() => {
  fetchProfileData();
  fetchRecipesData();
});

// Parámetros por query string
const route = useRoute();
const id = computed(() => route.query.id || null);

// Acceso a api
// Propiedades coputadas
const profileStore = useProfileStore();
// Profile
const profile = computed(() => profileStore.getProfileInfoState.data);
const profileLoading = computed(() => profileStore.getProfileInfoState.loading);
const profileError = computed(() => profileStore.getProfileInfoState.error);
const selfProfile = computed(() => {
  if (!id) return true;
  return profileStore.getProfileInfoState.data.selfProfile;
});
// Recipes
const recipes = computed(() => profileStore.getRecipesState.data);
const recipesLoading = computed(() => profileStore.getRecipesState.loading);
const recipesError = computed(() => profileStore.getRecipesState.error);

// Métodos de llamadas
const fetchProfileData = () => {
  profileStore.fetchProfileInfo(id.value);
};
const fetchRecipesData = () => {
  profileStore.fetchRecipes(id.value);
};

// Refresco del perfil al ir de uno ajeno al propio
watch(id, (newVal, oldVal) => {
  // TODO: Cuando tenga en navbar para cambiar entre recetas, discusiones y encuestas, ponerlo en recetas cuando pase por este watch.
  fetchProfileData();
  fetchRecipesData();
});
</script>

<style scoped lang="scss">
.profile {
  margin: auto;
  width: 44rem;
  background-color: $color-background;
  border-radius: 5px;
}
.top {
  display: flex;
  height: 12rem; // Provisional
}
.profile-info {
  width: 90%;
}
.info-summary-section {
  display: flex;
  height: 50%;
}
.picture-cotainer {
  height: 100%;
  aspect-ratio: 1/1;
}
.picture-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
}
.profile-picture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.info-summary {
  display: flex;
  justify-content: space-evenly;
  height: 100%;
  flex-grow: 1;
}
.summary-item {
  height: 100%;
  width: 5rem;
  text-align: center;
}
.s-i-num {
  font-size: 150%;
  font-weight: bold;
}
.s-i-text {
  font-size: 90%;
}
.info-detail {
  height: 50%;
  font-size: 90%;
}
.i-d-name {
  font-weight: bold;
  margin: 5px 0;
}
.i-d-description {
}
.own-notifications-container {
  margin-top: 8px;
}
.own-notifications {
  font-size: 140%;
  background-color: transparent;
  color: $color-primary;
  border: none;
}
.follow-container {
  display: flex;
  align-items: flex-start;
  margin-top: 8px;
}

/*
.side-menu {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 17px;
  align-items: center;
  width: 10%;
}
.side-menu-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.7rem; // Provisional
  width: 2.7rem; // Provisional
  border-radius: 50%;
  background-color: $color-primary;
}
*/
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
  // TODO: Considerar mover a clases globales
  color: $color-primary;
  font-size: 200%; // Se acumula sobre el font-size: 200%; del contenedor
}

@media (max-width: 800px) {
  .profile {
    margin: auto;
    width: 80%;
  }
}
</style>