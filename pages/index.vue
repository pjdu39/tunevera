<template>
  <div>
    <div class="header">
      <Header />
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>
<style scoped>
.header{
}
.footer{
    position: fixed;
    bottom: 0;
    /* TODO: Cambiar esto? Actualmente no sé qué es.  11/09//2022 */
    width: -webkit-fill-available;
}
</style>