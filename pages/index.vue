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
        class="post"
      />
      <DiscussionPost
        v-if="element.type === 'Discusion'"
        :post-data="element"
        class="post"
      />
    </div>
    <div ref="observerElement"></div>
    <div class="skeleton-container">
      <div v-for="item in 2" :key="item" class="skeleton-card">
        <Skeleton
          height="22rem"
          width="22rem"
          class="mb-2"
          style="margin-bottom: 0 !important"
        ></Skeleton>
        <div class="skeleton-info-container">
          <div class="skeleton-signature">
            <Skeleton height="1rem" width="8rem" class="mb-2"></Skeleton>
          </div>
          <Skeleton
            height="2rem"
            width="13rem"
            class="mb-2"
            style="margin-bottom: 15px !important"
          ></Skeleton>
          <div class="skeleton-general-info-bottom">
            <div class="skeleton-general-info-left">
              <div class="skeleton-description">
                <Skeleton height="14px" width="11rem" class="mb-2"></Skeleton>
                <Skeleton height="14px" width="13rem" class="mb-2"></Skeleton>
                <Skeleton height="14px" width="10rem" class="mb-2"></Skeleton>
                <Skeleton height="14px" width="13rem" class="mb-2"></Skeleton>
              </div>
              <div class="skeleton-bottom-info">
                <Skeleton
                  height="25px"
                  width="2rem"
                  class="mb-2"
                  style="margin: 0 20px 0 0 !important"
                ></Skeleton>
                <Skeleton
                  height="25px"
                  width="2rem"
                  class="mb-2"
                  style="margin: 0 20px 0 0 !important"
                ></Skeleton>
              </div>
            </div>
            <div class="skeleton-general-info-right">
              <div class="icon-info-container">
                <Skeleton height="2rem" width="3rem" class="mb-2"></Skeleton>
              </div>
              <div class="icon-info-container">
                <Skeleton height="2rem" width="3rem" class="mb-2" style="margin-bottom: 0 !important"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    elements.value = [...elements.value, ...boardStore.data];
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
.post {
  margin-bottom: 20px;
}
.skeleton-card {
  display: flex;
  position: relative;
  height: auto;
  border: solid 2px $color-skeleton;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
}
.skeleton-info-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 10px 17px 12px 17px;
}
.skeleton-signature {
  margin-bottom: 8px;
  text-align: end;
  margin-left: auto;
}
.skeleton-general-info-bottom {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  margin-top: 1rem;
}
.skeleton-general-info-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
}
.skeleton-general-info-right {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 20%;
}
.skeleton-bottom-info {
  display: flex;
}

@media (max-width: 800px) {
  .board-container {
    margin: auto;
    width: 80%;
  }
}
</style>