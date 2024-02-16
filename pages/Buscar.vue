<template>
  <div class="page-container">
    <TabView content-class="mt-3" class="">
      <TabPanel header="RECETAS">
        <SearchRecipe />
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
</script>

<style scoped lang="scss">
.page-container {
  margin: auto;
  width: 53rem;
}
</style>