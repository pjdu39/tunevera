<template>
  <div class="component">
    <div class="basic-options-container">
      <input
        class="main-search-input"
        v-model="filter"
        type="text"
        placeholder="Buscar receta..."
        @input="searchUser"
      />
      <button class="vegan-button">Vegano</button>
      <button class="vegan-button">Vegetariano</button>
    </div>
  </div>
  <button class="advanced-options-dropdown">Avanzado</button>
  <div class="advanced-options-container">
    <TabView content-class="mt-3" class="search-tool-container">
      <TabPanel header="INGREDIENTES">
        <input
          class="advanced-search-input"
          type="text"
          placeholder="Buscar por ingredientes..."
        />
      </TabPanel>
      <TabPanel header="TAGS">
        <input
          class="advanced-search-input"
          type="text"
          placeholder="Buscar por etiquetas..."
        />
      </TabPanel>
    </TabView>
    <div class="applied-filters-container">
      <div class="ingredients-filter"></div>
      <div class="tags-filter"></div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
input {
  width: 40%;
  margin-top: 15px;
  border: none;
  border-bottom: 1px solid $color-dark;
  border-radius: 0;
  background-color: $color-background;
}
input:focus {
  border: none;
  outline: none !important;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  border-bottom: 2px solid $color-dark;
}
input:disabled {
  border-color: $color-soft-grey;
}

.component {
  height: auto;
}
.basic-options-container {
  display: flex;
  margin-bottom: 25px;
}
.main-search-input {
  display: block;
}
.vegan-button {
  color: $color-soft-grey;
  background-color: transparent;
  border: none;
  margin-left: 30px;
}
.advanced-options-dropdown {
  padding: 0 15px 2px 15px;
  color: white;
  background-color: $color-soft-grey;
  border: none;
  border-radius: 9px;
  line-height: 20px;
  font-size: 95%;
}
.advanced-options-container {
  display: flex;
  margin-top: 20px;
  font-size: 80%;
}
.search-tool-container {
  width: 50%;
}
.advanced-search-input {
  width: calc(100% - 20px);
}
.applied-filters-container {
  display: flex;
  width: 50%;
}
.ingredients-filter {
  height: 6rem;
  width: 50%;
  background-color: rgb(123, 162, 53);
}
.tags-filter {
  height: 6rem;
  width: 50%;
  background-color: rgb(12, 182, 213);
}

// Estilos de primevue

/* Aumenta la especificidad para el título de las pestañas */
:deep(.p-tabview-title) {
  font-size: 70%;
}
/* Aumenta la especificidad para el contenedor de las pestañas */
:deep(.p-tabview-nav) {
  padding: 0;
}
:deep(.p-tabview-nav-link) {
  padding: 0 20px;
  margin: 0;
}
/* Aumentar la especificidad para el contenido */
:deep(.p-tabview-panels) {
  padding: 0 20px;
  margin: 0;
}
</style>