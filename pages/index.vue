<template>
  <div class="board-container">
    <div class="" v-for="(element, index) in elements" :key="index">
      <RecipePost v-if="element.type === 'Receta'" :post-data="element" />
      <PollPost v-if="element.type === 'Encuesta'" :post-data="element" />
      <DiscussionPost
        v-if="element.type === 'Discusion'"
        :post-data="element"
      />
    </div>
    <div ref="observerElement"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useBoardStore } from "~/store/board.js";
import DiscussionPost from "~/components/Board/DiscussionPost.vue";
import PollPost from "~/components/Board/PollPost.vue";
import RecipePost from "~/components/Board/RecipePost.vue";

const boardStore = useBoardStore();
const elements = ref([]);
const page = ref(0);
const observerElement = ref(null);
let observer; // Declara observer aquí

// Accede directamente a las propiedades reactivas del store
const { loading, error } = boardStore;

// Función para cargar más elementos
const loadMoreElements = async () => {
  page.value += 1;
  
  await boardStore.fetchBoardElements(5, page.value);

  if (boardStore.loading === "loaded" && boardStore.error === null) {
    elements.value = [...elements.value, ...boardStore.data]
  }
};

onMounted(async () => {
  // await boardStore.fetchBoardElements(5, 1);

  /*
  watchEffect(() => {
    // TODO: Considerar borrar este watch, ya que resetea el valor de elements y no puedo acumularlos
    if (boardStore.loading === "loaded" && boardStore.error === null) {
      elements.value = [...boardStore.data];
    }
  });
  */

  // IntersectionObserver para detectar cuando el usuario llega al final de la lista
  observer = new IntersectionObserver(
    async (entries) => {
      if (entries[0].isIntersecting) {
        await loadMoreElements();
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }
  );

  if (observerElement.value) {
    observer.observe(observerElement.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped lang="scss">
.board-container {
  margin: auto;
  width: 44rem;
}

@media (max-width: 800px) {
  .board-container {
    margin: auto;
    width: 80%;
  }
}
</style>