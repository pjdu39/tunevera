<template>
  <div>
    <Header class="header"/>
    <div class="nuxt-container">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import '../assets/scss/custom.scss'
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  components: { Header, Footer },
};
</script>

<style scoped>
.nuxt-container{
  position: relative;
  min-height: 100vh;
  max-width: 100vw;
  margin-top: 13rem;
  margin-bottom: 6rem;
  margin-right: auto;
  margin-left: auto;
}

.header {
  position: fixed;
  top: 0;
}
</style>