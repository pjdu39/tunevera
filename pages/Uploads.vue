<template>
  <div class="uploads">
    <TabView content-class="mt-3">
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
import { useAuth } from '~/composables/useAuth';

// Protección de ruta con login
const { guard } = useAuth();
const route = useRoute();

onMounted(() => {
  guard(route.path);
});
</script>

<style scoped lang="scss">
.uploads {
  margin: auto;
  padding: 5px 10px;
  width: 55rem;
  border: 3px solid $color-dark;
  border-radius: 5px;
}

/* Aumentar la especificidad para el ul */
:deep(ul.p-tabview-nav) {
  padding: 0;
  font-family: $font-headers;
}
/* Aumentar la especificidad para el contenido */
:deep(.p-tabview-panels) {
  font-family: $font-primary;
}

@media (max-width: 1100px) {
  .uploads {
    margin: auto;
    width: 80%;
  }
}
@media (max-width: 600px) {
  .uploads {
    margin: auto;
    width: 95%;
    border: none;
  }
  
  // Ajuste manual del padding del primer elemento para alinear el menú a la izquierda.
  :deep(ul.p-tabview-nav > li.p-tabview-header:first-child .p-tabview-nav-link) {
    padding-left: 0 !important;
  }
  /* Aumentar la especificidad para el contenido */
  :deep(.p-tabview-panels) {
    padding: 0;
  }
}
</style>