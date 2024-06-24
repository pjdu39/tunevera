<template>
  <div class="header">
    <div class="secondary-options-banner">
      <BButton
        class="secondary-options-button"
        @click="opcionesGear = !opcionesGear"
        v-click-outside="clickOutside"
      >
        <font-awesome-icon icon="fa fa-cog" aria-hidden="true" />
      </BButton>
      <div v-if="opcionesGear" class="gear-options-container">
        <nuxt-link to="/Buscar" class="gear-option"> General </nuxt-link>
        <nuxt-link to="/Buscar" class="gear-option"> Perfil </nuxt-link>
        <nuxt-link to="/Buscar" class="gear-option"> Contáctanos </nuxt-link>
      </div>
    </div>
    <div class="logo-container">
      <NuxtImg :src="logoUrl" class="logo" />
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
  height: $header-top-bar-height;
  background-color: #252b31;
  border-style: none;
}
.secondary-options-button {
  position: absolute;
  right: 1rem;
  aspect-ratio: 1/1;
  height: 100%;
  padding: 0;
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
.logo-container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  height: 170px;
}
.logo {
  position: absolute;
  top: 40px;
  height: $header-logo-height;
}

@media (min-width: 900px) {
  .navbar-main-container {
    width: 50rem;
  }
}
</style>