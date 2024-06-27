<template>
  <div class="global-container">
    <Header />
    <div class="content">
      <MainMenu />
      <slot />
    </div>
  </div>
</template>

<script setup>
import "../assets/scss/custom.scss";
import "../assets/scss/global.scss";
import Header from "../components/Structure/Header.vue";
import MainMenu from "../components/Structure/MainMenu.vue";
import { useLoginStore } from "~/store/login.js";

const store = useLoginStore();
const route = useRoute();

const { setToken } = useAuth();

onMounted(async() => {
  await setToken();
  await store.checkSignUp();
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