<template>
  <div class="header">
    <div class="secondary-options-banner">
      <nuxt-link to="/" class="option-text">Contacto</nuxt-link>
      <nuxt-link to="/" class="option-text">About</nuxt-link>
      <nuxt-link to="/cuenta" class="option-text">Cuenta</nuxt-link>
      <nuxt-link to="/" class="option-text">Aviso legal</nuxt-link>
      <!--
      <button
        class="secondary-options-button"
        @click="opcionesGear = !opcionesGear"
        v-click-outside="clickOutside"
      >
        <div class="option-text">Contacto</div>
      </button><button
        class="secondary-options-button"
        @click="opcionesGear = !opcionesGear"
        v-click-outside="clickOutside"
      >
        <div class="option-text">About</div>
      </button>
      
      <button
        class="secondary-options-button"
        @click="opcionesGear = !opcionesGear"
        v-click-outside="clickOutside"
      >
        <font-awesome-icon icon="fa fa-ellipsis-vertical" aria-hidden="true" />
      </button>
      <div class="side-bar">
        <nuxt-link to="/" class="side-bar-option"> General </nuxt-link>
      </div>
      <div v-if="opcionesGear" class="gear-options-container">
        <nuxt-link to="/Buscar" class="gear-option"> General </nuxt-link>
        <nuxt-link to="/Buscar" class="gear-option"> Perfil </nuxt-link>
        <nuxt-link to="/Buscar" class="gear-option"> Contáctanos </nuxt-link>
      </div>
      -->
    </div>
    <div class="logo-container">
      <nuxt-link to="/">
        <NuxtImg :src="logoUrl" class="logo" />
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
// Obtención del logo
const { blobStorageAccountName, blobStorageContainerName } = useRuntimeConfig().public;
const logoUrl = `https://${blobStorageAccountName}.blob.core.windows.net/${blobStorageContainerName}/cookbook_logo_1.png`;

const opcionesGear = ref(false)

// Click outside
const clickOutside = () => {
  if (opcionesGear.value) opcionesGear.value = false;
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
  position: relative;
  height: auto;
  background-color: #2f373f;
  border-style: none;
}
.secondary-options-button {
  height: 100%;
  padding: 2px 10px;
  background-color: transparent;
  border-style: none;
  box-shadow: none !important;
  color: white;
}
.option-text {
  padding: 2px 18px;
  color: white;
  font-size: 85%;
  line-height: 95%;
}
.gear-options-container {
  position: absolute;
  width: 9rem;
  top: 3.2rem;
  left: 2.4rem;
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
.logo-container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  height: 170px;
}
.logo {
  height: $header-logo-height;
}

.side-bar {

}
.side-bar-option {
  
}

@media (min-width: 900px) {
  .navbar-main-container {
    width: 50rem;
  }
}
</style>