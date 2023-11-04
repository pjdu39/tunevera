<template>
  <div class="global-container">
    <Header />
    <div class="content">
      <MainMenu />
      <slot />
    </div>
  </div>
</template>

<script>
import "../assets/scss/custom.scss";
import "../assets/scss/global.scss";
import Header from "../components/Structure/Header.vue";
import MainMenu from "../components/Structure/MainMenu.vue";
export default {
  components: { Header, MainMenu },
};
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