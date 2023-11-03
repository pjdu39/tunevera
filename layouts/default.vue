<template>
  <div class="global-container">
    <Header class="header" />
    <div class="header-space"></div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import "../assets/scss/custom.scss";
import "../assets/scss/global.scss";
import Header from "../components/Structure/Header.vue";
import Footer from "../components/Structure/Footer.vue";
export default {
  components: { Header, Footer },
};
</script>

<style scoped lang="scss">
.header-space {
  height: $header-height;
  margin-bottom: 3rem;
}
.content {
  position: relative;
  min-height: 100vh;
  max-width: 100vw;
  margin-bottom: 6rem;
}
.global-container {
  display: flex;
  flex-direction: column;
}
</style>