<template>
  <div class="header">
    <div class="secondary-options-banner">
      <BButton
        v-click-outside="onClickOutside"
        class="secondary-options-button"
        @click="opcionesGear = !opcionesGear"
      >
        <font-awesome-icon icon="fa fa-cog" aria-hidden="true" />
      </BButton>
      <div v-if="opcionesGear" class="gear-options-container">
        <nuxt-link to="/Explorar" class="gear-option"> General </nuxt-link>
        <nuxt-link to="/Explorar" class="gear-option"> Perfil </nuxt-link>
        <nuxt-link to="/Explorar" class="gear-option"> Contáctanos </nuxt-link>
      </div>
    </div>
    <NuxtImg src="/img/cookbook-logo-recorte.png" class="logo" />
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      opcionesGear: false,
    };
  },
  methods: {
    onClickOutside(event) {
      this.opcionesGear = false;
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: column;
  position: static;
  background-color: $color-background;
  width: 100vw;
}
.secondary-options-banner {
  display: flex;
  height: $header-top-bar-height;
  background-color: #252b31;
  border-style: none;
}
.secondary-options-button {
  position: absolute;
  right: 1.4rem;
  height: 20%;
  aspect-ratio: 1/1;
  font-size: 165%;
  background-color: transparent;
  border-style: none;
  box-shadow: none !important;
}
.gear-options-container {
  position: absolute;
  width: 9rem;
  top: 3.2rem;
  right: 2.4rem;
  padding: 0.4rem 0.3rem 0.4rem 0.3rem;
  background-color: #eaedee;
  border-radius: 1rem;
}
.gear-option {
  display: block;
  padding: 0 0.8rem 0 0.8rem;
  color: #252b31;
  text-decoration: none;
  border-radius: 1rem;
}
.gear-option:hover {
  background-color: #c1c8c7;
}

.logo {
  margin: auto;
  height: $header-logo-height;
}

@media (min-width: 900px) {
  .navbar-main-container {
    width: 50rem;
  }
}
</style>