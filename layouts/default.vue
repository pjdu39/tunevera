<template>
  <div>
    <Header />
    <div class="nuxt-container">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
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
}
</style>