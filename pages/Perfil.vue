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
    <div v-else-if="profileLoading === 'loaded' && !profile.id">
      <RegistrationForm />
    </div>
    <div v-else-if="profileLoading === 'loaded' && profile.id">
      <div class="top">
        <div class="profile-info">
          <div class="info-summary-section">
            <div class="picture-cotainer">
              <div class="picture-wrapper">
                <NuxtImg v-if="profile.pictureUrl" class="profile-picture" :src="profile.pictureUrl" />
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
          <FollowButton :data="followButtonData" />
        </div>
      </div>
      <TabView content-class="mt-3" class="profile-tab">
        <TabPanel header="RECETAS">
          <ProfileRecipes :id="id" />
        </TabPanel>
        <TabPanel header="ENCUESTAS">
          <ProfilePolls />
        </TabPanel>
        <TabPanel header="ARTICULOS">
          <ProfileDiscussion />
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script setup>
import ProfileRecipes from "~/components/Profile/ProfileRecipes.vue";
import ProfilePolls from "~/components/Profile/ProfilePolls.vue";
import ProfileDiscussion from "~/components/Profile/ProfileDiscussion.vue";
import RegistrationForm from "~/components/Profile/RegistrationForm.vue";
import FollowButton from "~/components/Profile/FollowButton.vue";
import { useProfileStore } from "~/store/profile.js";
import { useAuth } from '~/composables/useAuth';

/*
definePageMeta({
  middleware: "auth",
});
*/

const { guard } = useAuth();

// Parámetros por query string
const route = useRoute();
const id = computed(() => route.query.id || null);

onMounted(() => {
  guard(route.path);
  fetchProfileData();
});

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
const followButtonData = computed(() => {
  return { id: id, follow: profile.value.follow }
});

// Métodos de llamadas
const fetchProfileData = () => {
  profileStore.fetchProfileInfo(id.value);
};

// Refresco del perfil al ir de uno ajeno al propio
watch(id, (newVal, oldVal) => {
  // TODO: Cuando tenga el navbar para cambiar entre recetas, discusiones y encuestas, ponerlo en recetas cuando pase por este watch.
  fetchProfileData();
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
.profile-tab{
  width: 100%;
}
/* Aumentar la especificidad para el ul */
:deep(ul.p-tabview-nav) {
  padding: 0;
}

/* Aumentar la especificidad para los li */
:deep(ul.p-tabview-nav > li) {
  display: block;
  width: 100%;
}

:deep(ul.p-tabview-nav > li.p-tabview-selected) {
  text-decoration: underline;
}

/* Aumentar la especificidad para los enlaces */
:deep(ul.p-tabview-nav > li > a) {
  place-content: center;
  border: none;
}
/* Aumentar la especificidad para el contenido */
:deep(.p-tabview-panels) {
  padding: 0;
}

:deep(ul.p-tabview-nav > li.p-tabview-ink-bar) {
  display: none;
}

// display: block; en los li 

// place-content: center; en el contenido del la pestaña en sí, es decir, en el a dentro del li

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