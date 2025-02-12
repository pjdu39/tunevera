<template>
  <div v-if="!loginLoading" class="profile">
    <div
      v-if="profileLoading === 'waiting' || profileLoading === 'loading'"
      class="loading-container"
    >
      <font-awesome-icon
        icon="fa fa-circle-notch"
        class="fa-spin fa-lg"
        aria-hidden="true"
      />
    </div>
    <div v-else-if="profileLoading === 'error'" class="top">
      <div class="state-container">
        <font-awesome-icon icon="fa fa-triangle-exclamation" class="error" />
        <div>{{ profileError }}</div>
      </div>
    </div>
    <div v-else-if="profileLoading === 'loaded' && showForm">
      <RegistrationForm
        :is-editing="isEditing"
        :profile-info="isEditing ? profile : null"
        @exit="handleExit"
      />
    </div>
    <div v-else-if="profileLoading === 'loaded' && showFollowInfo">
      <button class="back-btn" @click="exitFollowInfo">
        <font-awesome-icon
          icon="fa fa-angle-left"
          class="fa-lg"
          aria-hidden="true"
        />
        Atrás
      </button>
      <div class="follow-info-container">
        <div class="follow-filter-title">{{ numFollow }} {{ followTitle }}</div>
        <SearchUsers :followFilter="followFilter" />
      </div>
    </div>
    <div v-else-if="profileLoading === 'loaded' && !showForm">
      <div class="top">
        <div class="profile-info">
          <div class="info-summary-section">
            <div class="main-info-container">
              <div class="picture-cotainer">
                <div class="picture-wrapper">
                  <NuxtImg
                    v-if="profile.pictureUrl"
                    class="profile-picture"
                    :src="profile.pictureUrl"
                  />
                </div>
              </div>
              <div class="user-name">{{ profile.name }}</div>
            </div>
            <div class="info-summary">
              <div class="summary-item">
                <div class="s-i-num">{{ profile.numPosts }}</div>
                <div class="s-i-text">Publicaciones</div>
              </div>
              <div class="summary-item clickable" @click="checkFollowers">
                <div class="s-i-num">{{ profile.numFollowers }}</div>
                <div class="s-i-text">Seguidores</div>
              </div>
              <div class="summary-item clickable" @click="checkFollowing">
                <div class="s-i-num">{{ profile.numFollowing }}</div>
                <div class="s-i-text">Siguiendo</div>
              </div>
            </div>
            <div v-if="selfProfile">
              <div class="own-notifications-container">
                <button class="own-notifications" @click="console.log(id)">
                  <font-awesome-icon
                    icon="fa fa-bell"
                    class="fa-lg"
                    aria-hidden="true"
                  />
                </button>
                <div class="options-container">
                  <button
                    class="options-btn"
                    @click="clickShowOptions"
                    v-click-outside="clickOutside"
                  >
                    <font-awesome-icon
                      icon="fa fa-ellipsis-vertical"
                      class="fa-lg"
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    class="dropdown-options-container"
                    :hidden="!showOptions"
                  >
                    <div class="dropdown-wrapper">
                      <button
                        class="option"
                        @click="(isEditing = true), (showOptions = false)"
                      >
                        <div class="option-icon-wrapper">
                          <font-awesome-icon
                            icon="fa fa-pencil"
                            class="fa-lg"
                            aria-hidden="true"
                          />
                        </div>
                        <div>Editar perfil</div>
                      </button>
                      <button
                        class="option"
                        @click="doLogout(), (showOptions = false)"
                      >
                        <div class="option-icon-wrapper">
                          <font-awesome-icon
                            icon="fa fa-power-off"
                            class="fa-lg"
                            aria-hidden="true"
                          />
                        </div>
                        <div>Cerrar sesión</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="!selfProfile" class="follow-container">
              <FollowButton :data="followButtonData" />
            </div>
          </div>
        </div>
        <div class="info-detail">
          <div class="i-d-description">{{ profile.description }}</div>
        </div>
      </div>
      <TabView content-class="mt-3" class="profile-tab">
        <TabPanel header="RECETAS">
          <ProfileRecipes :id="id" />
        </TabPanel>
        <TabPanel header="COMUNIDAD">
          <ProfileCommunity :id="id" />
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script setup>
import ProfileRecipes from "~/components/Profile/ProfileRecipes.vue";
import ProfileCommunity from "~/components/Profile/ProfileCommunity.vue";
import RegistrationForm from "~/components/Profile/RegistrationForm.vue";
import FollowButton from "~/components/Profile/FollowButton.vue";
import { useLoginStore } from "~/store/login.js";
import { useProfileStore } from "~/store/profile.js";
import { useAuth } from "~/composables/useAuth";

useHead({
  meta: [{ name: "robots", content: "noindex" }],
});

const { guard, doLogout, logoutAndRedirectToLogin, setToken } = useAuth();

// Manejo de orden coherente de carga de datos
const loginLoading = ref(true);

// Parámetros por query string
const route = useRoute();
const id = computed(() => route.query.id || null);

onMounted(async () => {
  await setToken();
  loginLoading.value = false;
  fetchProfileData();
});

// Acceso a métodos que permiten setear el estado de completitud del formulario de registro
const loginStore = useLoginStore();

// Acceso a api
const profileStore = useProfileStore();
// Profile
const profile = computed(() => profileStore.getProfileInfoState.data);
const profileLoading = computed(() => profileStore.getProfileInfoState.loading);
const profileError = computed(() => profileStore.getProfileInfoState.error);
const selfProfile = computed(() => {
  if (!id.value) return true;
  return profileStore.getProfileInfoState.data.selfProfile;
});

watch(profileLoading, async (newValue, oldValue) => {
  if (newValue === "loaded" && selfProfile.value) {
    await guard(route.path);
  }
});

const followButtonData = computed(() => {
  return { id: id, follow: profile.value.follow };
});

// Ver lista de seguidores y seguidos.
const showFollowInfo = ref(false);
const followFilter = ref(null);

const checkFollowers = () => {
  followFilter.value = { idUser: profile.value.id, followType: "R" };
  showFollowInfo.value = true;
};

const checkFollowing = () => {
  followFilter.value = { idUser: profile.value.id, followType: "G" };
  showFollowInfo.value = true;
};

const exitFollowInfo = () => {
  showFollowInfo.value = false;
  followFilter.value = null;
};

const numFollow = computed(() => {
  if (followFilter.value.followType === "R") return profile.value.numFollowers
  if (followFilter.value.followType === "G") return profile.value.numFollowing
  return 0
})

const followTitle = computed(() => {
  if (followFilter.value.followType === "R") return "seguidores"
  if (followFilter.value.followType === "G") return "siguiendo"
  return ""
})

// Métodos de llamadas
const fetchProfileData = () => {
  profileStore.fetchProfileInfo(id.value);
};


watch(id, (newVal, oldVal) => {
  // TODO: Cuando tenga el navbar para cambiar entre recetas, discusiones y encuestas, ponerlo en recetas cuando pase por este watch.

  // Refresco del perfil al ir de uno ajeno al propio
  fetchProfileData();

  // Refresco del perfil al clickar en seguidores/seguidos
  exitFollowInfo();
});

// Manejo de opciones de perfil
const showOptions = ref(false);
const clickShowOptions = () => (showOptions.value = !showOptions.value);

// Manejo de propiedades que determinan si se debe mostrar el formulario de registro/edición o no.
const isSignedUp = computed(() => {
  const value = profile.value.id ? true : false;
  loginStore.setCheckSignUpData(value);
  return value;
});

const isEditing = ref(false);

const showForm = computed(() => !isSignedUp.value || isEditing.value);

const handleExit = () => {
  // Utiliza las propiedades computadas para deducir cómo debería salir del formulario.
  // Si se está registrando por primera vez, hace logout.
  // Si solo está editando, setea isEditing a false.

  if (!isSignedUp.value) logoutAndRedirectToLogin();
  else if (isEditing.value) isEditing.value = false;
};

// Click outside
const clickOutside = () => {
  if (showOptions.value) showOptions.value = false;

  // Ir añadir todos los elementos que deban cerrarse al clickar fuera de ellos.
};
</script>

<style scoped lang="scss">
.profile {
  margin: auto;
  width: 46rem;
  background-color: $color-background;
  border-radius: 5px;
}
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
.back-btn {
  margin: 10px 0 30px 0;
  padding: 1px 15px 0 8px;
  border: 1px solid $color-soft-grey;
  background-color: $color-soft-grey;
  color: white;
  border-radius: 5px;
}
.back-btn:hover {
  border: 1px solid $color-primary;
  background-color: $color-primary;
  color: white;
}
.follow-info-container {
  padding: 0 0 0 20px;
}
.follow-filter-title {
  font-size: 130%;
  font-family: $font-headers;
}
.top {
  display: flex;
  flex-direction: column;
}
.profile-info {
  width: 100%;
  height: 9rem;
}
.info-summary-section {
  display: flex;
  height: 7rem;
}
.main-info-container {
  width: 9rem;
}
.picture-cotainer {
  height: 100%;
  aspect-ratio: 1/1;
  margin-bottom: 10px;
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
.user-name {
  font-weight: bold;
}
.info-summary {
  display: flex;
  justify-content: space-evenly;
  height: 100%;
  flex-grow: 1;
  // font-family: $font-headers;
}
.summary-item {
  height: 100%;
  width: auto;
  text-align: center;
}
.clickable {
  cursor: pointer;
}
.clickable:hover {
  text-decoration: underline;
}
.s-i-num {
  font-size: 150%;
  font-weight: bold;
}
.s-i-text {
  font-size: 90%;
}
.info-detail {
  padding: 10px 0 20px 0;
  font-size: 90%;
}
.i-d-description {
  // TODO: Borrar
}
.own-notifications-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  min-width: 160px;
}
.own-notifications {
  font-size: 140%;
  background-color: transparent;
  color: $color-primary;
  border: none;
}
.options-container {
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  margin-left: 30px;
}
.options-btn {
  height: 37px;
  width: 27px;
  //max-width: min-content;
  background-color: transparent;
  border-radius: 5px;
  border: none;
  font-size: 140%;
}
.options-btn:hover {
  background-color: $color-soft-grey;
}
.options-btn:active {
  background-color: transparent;
}
.option-icon-wrapper {
  display: flex;
  justify-content: center;
  min-width: 25px;
  margin-right: 7px;
}
.dropdown-options-container {
  position: relative;
  z-index: 10;
}
.dropdown-wrapper {
  position: absolute;
  border: 2px solid $color-dark;
  border-radius: 5px;
}
.option {
  display: flex;
  align-items: center;
  min-height: 30px;
  min-width: 140px;
  padding: 0 13px 0 10px;
  white-space: nowrap;
  width: 100%;
  text-align: start;
  background-color: $color-background;
  border: none;
  border-bottom: 1px solid grey;
}
.option:hover {
  background-color: $color-soft-grey;
}
.follow-container {
  display: flex;
  align-items: flex-start;
  margin-top: 8px;
  position: relative;
}
.profile-tab {
  width: 100%;
  position: relative;
  z-index: 1;
}
/* Aumentar la especificidad para el ul */
:deep(ul.p-tabview-nav) {
  padding: 0;
  font-family: $font-headers;
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
  font-family: $font-primary;
}

/* Esto está ahora en las clases globales
:deep(ul.p-tabview-nav > li.p-tabview-ink-bar) {
  display: none;
} */

.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
  font-size: 100%;

  overflow-wrap: anywhere;
}
.loading {
}
.error {
  // TODO: Considerar mover a clases globales
  color: $color-primary;
  font-size: 200%; // Se acumula sobre el font-size: 200%; del contenedor
}

@media (max-width: 600px) {
  .profile {
    margin: auto;
    width: 100%;
    font-size: 95%;
  }
  .top {
    height: auto;
    width: 100%;
    padding: 0 15px;
  }
  .profile-info {
    height: auto;
  }
  .info-summary-section {
    height: auto;
    flex-direction: column;
    gap: 10px;
  }
  .main-info-container {
    display: flex;
    flex-direction: column;
    width: auto;
  }
  .picture-cotainer {
    height: 100px;
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
  }
  .picture-wrapper {
    aspect-ratio: 1/1;
  }
  .user-name {
    display: flex;
    justify-content: center;
  }
  .info-summary {
    justify-content: space-between;
  }
  .summary-item {
    width: 33%;
  }
  .info-detail {
    display: flex;
    justify-content: center;
    padding: 10px 0 20px 0;
  }
  .own-notifications-container {
    justify-content: center;
  }
  .follow-container {
    justify-content: center;
    margin-bottom: 7px;
  }

  /* Aumentar la especificidad para el ul */
  :deep(ul.p-tabview-nav) {
    font-size: 90%;
  }
}
</style>