<template>
  <div class="page-container">
    <TabView content-class="mt-3" class="">
      <TabPanel header="RECETAS">
        <SearchRecipe :tag="tag" />
      </TabPanel>
      <TabPanel header="PERSONAS">
        <SearchUsers />
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup>
import SearchRecipe from '~/components/Search/SearchRecipe.vue';
import SearchUsers from '~/components/Search/SearchUsers.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const tagEncoded = route.query.tag;
const tag = tagEncoded ? JSON.parse(decodeURIComponent(tagEncoded)) : null;
</script>

<style scoped lang="scss">
.page-container {
  margin: auto;
  width: 53rem;
}

/* Aumentar la especificidad para el ul */
:deep(ul.p-tabview-nav) {
  padding: 0;
  font-family: $font-headers;
}
/* Aumentar la especificidad para el contenido */
:deep(.p-tabview-panels) {
  padding: 0 20px;
  margin: 0;
  font-family: $font-primary;
}

@media (max-width: 600px) {
  .page-container {
    margin: auto;
    width: 100%;
  }
}
</style>