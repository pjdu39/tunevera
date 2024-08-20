<template>
  <div class="board-container">
    <div class="" v-for="(element, index) in elements" :key="index">
      <RecipePost
        v-if="element.type === 'Receta'"
        :post-data="element"
        class="post"
      />
      <PollPost
        v-if="element.type === 'Encuesta'"
        :post-data="element"
        :show-signature="true"
        class="post"
      />
      <DiscussionPost
        v-if="element.type === 'Discusion'"
        :post-data="element"
        class="post"
      />
    </div>
    <div ref="observerElement"></div>
    <!--
    <BoardPcSkeleton class="pc-skeleton"/>
    <BoardPhoneSkeleton class="phone-skeleton" />
    -->
    <div class="loading-container">
      <font-awesome-icon
        icon="fa fa-circle-notch"
        class="fa-spin fa-lg"
        aria-hidden="true"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useAuth } from '~/composables/useAuth';
import { useBoardStore } from "~/store/board.js";
import DiscussionPost from "~/components/Board/DiscussionPost.vue";
import PollPost from "~/components/Board/PollPost.vue";
import RecipePost from "~/components/Board/RecipePost.vue";
import BoardPcSkeleton from "~/components/Skeletons/BoardPcSkeleton.vue";
import BoardPhoneSkeleton from "~/components/Skeletons/BoardPhoneSkeleton.vue";

const { setToken } = useAuth();

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
    elements.value = [...elements.value, ...boardStore.data];
  }
};

onMounted(async () => {
  await setToken();
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
.loading-container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  height: 200px;
  width: 100%;
  font-size: 200%;
  color: $color-primary;
}
.board-container {
  margin: auto;
  width: 44rem;
}
.post {
  margin-bottom: 20px;
}
.phone-skeleton {
  display: none;
}
.pc-skeleton {
  display: block;
}

@media (max-width: 800px) {
  .board-container {
    margin: auto;
    width: 98%;
  }

  .pc-skeleton {
    display: none;
  }
  .phone-skeleton {
    display: block;
  }
}
</style>