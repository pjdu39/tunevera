<template>
  <div>
    <div class="main-container">
      <div class="page">
        <div v-if="loading === 'waiting'">Waiting {{ data }}</div>
        <div v-if="loading === 'loading'" class="spinner">
          <span class="fa fa-spinner fa-pulse fa-lg" aria-hidden="true"></span>
        </div>
        <div v-else-if="loading === 'loaded'">
          <div class="section flex">
            <div class="title-section">
              <h2 class="title">{{ data.title }}</h2>
              <div class="descripcion">{{ data.description }}</div>
            </div>
            <div class="author-section">
              <b-row>
                <b-col class="col-md-7"> </b-col>
                <b-col class="col-md-5">
                  <div class="wrapper-foto">
                    <img class="foto" :src="usuarioDummy.img" />
                    <!-- TODO: Ponerle un link al perfil -->
                  </div>
                </b-col>
              </b-row>
              <div class="author-name">{{ usuarioDummy.nombreCompleto }}</div>
            </div>
          </div>
          <div class="section">
            <h5 class="section--receta">Ingredientes</h5>
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
            <h5 class="section--receta"></h5>
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
      usuarioDummy: {
        id: 1,
        nombreCompleto: "Juan Pérez Delgado",
        publicaciones: 28,
        seguidores: 143,
        img: require("~/assets/img/foto_perfil2.jpg"),
      },
    };
  },
  computed: {
    ...mapState("recipe", ["data", "loading", "error"]),
  },
  methods: {
    ...mapActions("recipe", ["fetchData"]),
  },
  mounted() {
    this.fetchData(17); // TODO: Recibir este valor por url.
  },
};
</script>
  
  <style scoped>
.main-container {
  margin: auto;
  width: 53rem;
}
.page {
  margin-top: 1rem;
  padding: 2rem;
  background-color: #f2f4f5;
  border: 1px solid rgba(249, 249, 249);
  border-radius: 1.7rem;
  box-shadow: 5px 5px 3px -1px #252b310a, -4px -4px 4px -2px rgb(251, 251, 251),
    -10px -10px 30px -80px #252b31 inset;
}
.title-section {
  width: 65%;
}
.author-section {
  margin-top: 0.5rem;
  width: 35%;
}
/*
.descripcion {
  width: 35rem;
  margin-bottom: 2rem;
} */
.section--receta {
  border-top: 1px solid #c1c8c74b;
  padding: 0.8rem 0;
}
.title {
  padding: 1.2rem 0 4rem 0;
}
.wrapper-foto {
  display: inline-block;
  width: 5rem;
  height: 5rem;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
}
.author-name {
  text-align: right;
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