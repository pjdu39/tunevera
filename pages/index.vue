<template>
  <div class="board-container">
    <div
      class=""
      v-for="(element, index) in elements"
      :key="index"
    >
      <RecipePost v-if="element.type === 'Receta'" :post-data="element"/>
      <PollPost v-if="element.type === 'Encuesta'" :post-data="element"/>
      <DiscussionPost v-if="element.type === 'Discusion'" :post-data="element"/>
    </div>
  </div>
</template>

<script>
import { useBoardStore } from "~/store/board.js";
import DiscussionPost from "~/components/Posts/DiscussionPost.vue";
import PollPost from "~/components/Posts/PollPost.vue";
import RecipePost from "~/components/Posts/RecipePost.vue";
export default {
  components: {
    RecipePost,
    PollPost,
    DiscussionPost
  },
  data() {
    return {
      elements: [
        {
          type: "Receta",
          title: "Cocido",
          time: 35,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit",
          author: "carlos",
          likes: 67,
          comments: [
            { usuario: "Pepe Hamond", texto: "Lorem ipsum dolor sit amet" },
            {
              usuario: "Carlos",
              texto:
                "Consectetur adipisicing elit. Dolor sit amet consectetur adipisicing",
            },
          ],
        },
        {
          type: "Encuesta",
          title: "Qué guiso queréis que os traiga esta semana?",
          time: null,
          description: null,
          author: "aka_shiro",
          likes: 209,
          comments: [],
          options: [
            { id: 1, answer: "Lentejas", votes: 109 },
            { id: 2, answer: "Caldo gallego", votes: 135 },
            { id: 3, answer: "Guiso de pollo", votes: 21 },
            { id: 4, answer: "Ramen", votes: 287 },
          ],
        },
        {
          type: "Receta",
          title: "Galletas",
          time: 50,
          description: "Lorem ipsum dolor sit amet adipisicing elit",
          author: "andrea",
          likes: 216,
          comments: [
            {
              usuario: "Pepe Hamond",
              texto:
                "Consectetur adipisicing elit. Dolor sit amet ipsum dolor sit consectetur adipisicing hahah",
            },
            { usuario: "Carlos", texto: "Lorem ipsum dolor sit amet." },
            {
              usuario: "Andrea",
              texto:
                "Consectetur elit adipisicing. Dolor sit amet consectetur adipisicing",
            },
          ],
        },
        {
          type: "Discusion",
          title: "Cilantro o no?",
          time: null,
          description:
            "Qué opinais del uso del cilantro en la cocina latino americana?",
          author: "sara_rivas_",
          likes: 13,
          comments: [
            {
              usuario: "Pepe Hamond",
              texto:
                "Lorem ipsum dolor sit consectetur adipisicing hahah. sit amet.",
            },
            {
              usuario: "Andrea",
              texto:
                "Consectetur elit adipisicing. Dolor sit amet consectetur adipisicing",
            },
          ],
        },
        {
          type: "Encuesta",
          title: "Cocido con o sin patata?",
          time: null,
          description: null,
          author: "misco_jones",
          likes: 693,
          comments: [],
          options: [
            { id: 1, answer: "Con patata", votes: 38 },
            { id: 2, answer: "Sin patata", votes: 856 },
          ],
        },
      ],
    };
  },
  computed: {
    // TODO: Considerar meter estos elementos de la store en un solo elemento que contenga {data, loading, error} como en uploads.
    // También habría que cambiarlo en la store.
    data() {
      const store = useBoardStore();
      return store.data;
    },
    loading() {
      const store = useBoardStore();
      return store.loading;
    },
    error() {
      const store = useBoardStore();
      return store.error;
    },
  },
  created() {
    this.fetchBoardElements()(50);
  },
  watch: {
    data(newVal, oldVal) {
      if (this.loading === "loaded" && this.error === null)
        this.elements.push(...newVal);
    },
  },
  methods: {
    fetchBoardElements() {
      const store = useBoardStore();
      return store.fetchBoardElements;
    },
  },
};
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