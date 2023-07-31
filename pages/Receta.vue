<template>
  <div>
    <div class="main-container">
      <div class="page">
        <div v-if="loading === 'waiting'">Waiting {{ data }}</div>
        <div v-if="loading === 'loading'" class="spinner">
          <span class="fa fa-spinner fa-pulse fa-lg" aria-hidden="true"></span>
        </div>
        <div v-else-if="loading === 'loaded'">
          <h1 class="title-receta">{{ data.tittle }}</h1>
          <div class="descripcion">{{ data.description }}</div>
          <div class="section">
            <h4 class="section section--receta">Ingredientes</h4>
            <ul>
              <b-list-group-item
                class="group-item-container"
                v-for="(ingredient, index) in data.ingredients"
                :key="index"
              >
                <li>
                  {{
                    ingredient.amount +
                    " " +
                    ingredient.unit +
                    " " +
                    ingredient.text
                  }}
                </li>
              </b-list-group-item>
            </ul>
          </div>
          <div class="section">
            <h4 class="section section--receta">Pasos</h4>
            <b-list-group-item
              class="group-item-container"
              v-for="(step, index) in data.steps"
              :key="index"
            >
              <div class="section section--paso">
                <div class="num-paso-wrapper">{{ index + 1 }}</div>
                <div class="paso">{{ step.text }}</div>
              </div>
            </b-list-group-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      idRecipe: 10,
    };
  },
  computed: {
    ...mapState("recipe", ["data", "loading", "error"]),
  },
  methods: {
    ...mapActions("recipe", ["fetchData"]),
  },
  mounted() {
    this.fetchData(11); // TODO: Recibir este valor por url.
  },
};
</script>
  
  <style scoped>
.main-container {
  margin: auto;
  width: 54rem;
}
.page {
  margin-top: 1rem;
  padding: 2rem;
  background-color: #eaedee;
  border: 1px solid rgba(255, 255, 255, 0.836);
  border-radius: 1.7rem;
  box-shadow: 5px 5px 20px -15px #252b31ec,
    -3px -3px 10px 2px rgb(251, 251, 251),
    10px 10px 100px -20px rgba(248, 248, 248) inset,
    -10px -10px 30px -40px #252b31 inset;
}
.descripcion {
  width: 35rem;
  margin-bottom: 2rem;
}
.section--receta {
  border-top: 1px solid #c1c8c7;
  padding: 0.8rem 0;
}
.title-receta {
  padding: 1.2rem 0 4rem 0;
}
.section--paso {
  display: flex;
  margin-bottom: 0;
  /* border-top: 1px solid #c1c8c7; */
  padding: 2rem 0;
}
.num-paso-wrapper {
  margin-right: 1rem;
  height: 2.6rem;
  aspect-ratio: 1 / 1;
  padding: 0 0 0 0.8rem;
  font-size: 150%;
  color: gray;
  border: 2px solid gray;
  border-radius: 10rem;
}
.paso {
  display: inline-block;
  margin-top: auto;
  margin-bottom: auto;
}
.group-item-container {
  display: block;
  padding: 0;
  background-color: transparent;
  border: none;
}
.spinner {
  text-align: center;
  font-size: 180%;
}
</style>