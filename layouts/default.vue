<template>
  <div class="global-container">
    <Header />
    <div class="content">
      <MainMenu />
      <slot />
    </div>
  </div>
  <PostOptionsModal
    v-if="postOptionsModalLoading"
  />
</template>

<script setup>
import "../assets/scss/custom.scss";
import "../assets/scss/global.scss";
import Header from "../components/Structure/Header.vue";
import MainMenu from "../components/Structure/MainMenu.vue";
import PostOptionsModal from "~/components/Modals/PostOptionsModal.vue";
import { useLoginStore } from "~/store/login.js";
import { useModalStore } from "~/store/modal.js";

const store = useLoginStore();
const route = useRoute();

const { setToken } = useAuth();

watch(() => route.path, (newPath) => {
  // store.setLastRoute(newPath);
  // console.log("La ruta actual es:", newPath);
});

onMounted(async() => {
  await setToken();
  await store.checkSignUp();
})

// Modales
const modalStore = useModalStore();
const postOptionsModalLoading = computed(() => {
  if(modalStore) return modalStore.postOptionsModalState.isOpen

  // Si aún no ha cargado la store
  return false
})
</script>

<style scoped lang="scss">
.content {
  position: relative;
  min-height: 100vh;
  max-width: 100vw;
}
.global-container {
  display: flex;
  flex-direction: column;
}
</style>