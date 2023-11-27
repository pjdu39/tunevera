<template>
  <div class="uploads">
    <TabView content-class="mt-3" class="">
      <TabPanel header="RECETA">
        <RecipeUpload />
      </TabPanel>
      <TabPanel header="ENCUESTA">
        <PollUpload />
      </TabPanel>
      <TabPanel header="ARTICULO">
        <DiscussionUpload />
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup>
import DiscussionUpload from "~/components/Uploads/DiscussionUpload.vue";
import PollUpload from "~/components/Uploads/PollUpload.vue";
import RecipeUpload from "~/components/Uploads/RecipeUpload.vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

definePageMeta({
  middleware: "auth",
});
</script>

<style scoped lang="scss">
.uploads {
  margin: auto;
  padding: 5px 0;
  width: 55rem;
  border: 3px solid $color-dark;
  border-radius: 5px;
}
</style>