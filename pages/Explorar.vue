<template>
  <div>
    <b-row>
      <b-col class="col-md-4"></b-col>
      <b-col class="col-md-4">
        <b-form-input
          v-model="buscar"
          class="buscador"
          placeholder="Buscar..."
        ></b-form-input>
        <div class="images-container">
          <b-list-group-item class="card" v-for="receta in recetas" :key="receta">
            <div class="card-tittle" :hidden="muestraTitulo">
              {{ receta.name }}
            </div>
            <a href="#" class="card-link">
              <!-- @mouseover="hover(receta.name)  Evento de hover -->
              <img class="card-image" :src="receta.img" />
            </a>
          </b-list-group-item>
        </div>
      </b-col>
      <b-col class="col-md-4"></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      muestraTitulo: false,
      tituloRecetaHover: null,
      recetas: [
        { name: "Cocido", img: require("~/assets/img/cocido.jpg") },
        { name: "Postre", img: require("~/assets/img/postre1.jpg") },
        { name: "Cóctel", img: require("~/assets/img/coctel1.jpg") },
        { name: "Pizza", img: require("~/assets/img/pizza.jpg") },
        { name: "Postre", img: require("~/assets/img/postre1.jpg") },
        { name: "Cocido", img: require("~/assets/img/cocido.jpg") },
        { name: "Postre", img: require("~/assets/img/postre1.jpg") },
        { name: "Cóctel", img: require("~/assets/img/coctel1.jpg") },
        { name: "Postre", img: require("~/assets/img/postre1.jpg") },
        { name: "Pizza", img: require("~/assets/img/pizza.jpg") },
        { name: "Cocido", img: require("~/assets/img/cocido.jpg") },
        { name: "Postre", img: require("~/assets/img/postre1.jpg") },
        { name: "Pizza", img: require("~/assets/img/pizza.jpg") },
        { name: "Cóctel", img: require("~/assets/img/coctel1.jpg") },
        { name: "Pizza", img: require("~/assets/img/pizza.jpg") },
        { name: "Postre", img: require("~/assets/img/postre1.jpg") },
      ],
    };
  },
};
</script>

<style scoped>
:root {
  --image-z-indx: 10
}
.images-container {
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* grid-template-rows: repeat(auto-fill, 200px); */ /* Averiguar qué es esto y por qué solo se está aplicando a la primera row */
  row-gap: 0;
  column-gap: 0;
  overflow: auto;
}
.card {
  width: 7vw;
  height: 7vw;
  margin-top: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 0;
  border-style: none;
  border-radius: 0.8rem;
  box-shadow: 1.5px 1.5px 23px -10px #252b31;
  overflow: hidden;
}
.card:hover {
  width: 7.2vw;
  height: 7.2vw;
  margin-right: 0rem;
  margin-bottom: 0rem;
  box-shadow: 1.5px 1.5px 8px 6px #252b31;
  --image-z-indx: 1;
}
.card-tittle {
  position: absolute;
  z-index: 5;
  padding: 0 1rem;
  border-radius: 0.8rem 0 0.8rem 0;
  color: #eaedee;
  background-color: #252b31;
  box-shadow: 2px 2px 12px 0px #252b31;
  border-style: none;
  font-weight: 600;
}
.card-link {
  padding: auto;
  display: block;
  width: inherit;
  height: inherit;
}
.card-image {
  top: 0;
  left: 0;
  width: auto;
  height: inherit;
  position: absolute;
  z-index: var(--image-z-indx, 10);
}
</style>