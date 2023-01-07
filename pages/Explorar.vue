<template>
  <div class="explorar-container">
        <div class="filtros">
          <b-form-input
            v-model="buscarGeneral"
            class="buscador"
            placeholder="Buscar..."
          ></b-form-input>
          <b-tabs content-class="mt-3">
            <b-tab title="Ingredientes" active>
              asdasdasd
            </b-tab>
            <b-tab title="Categorías">
              asdasdasdasd
            </b-tab>
          </b-tabs>
          <div class="filtro-ingredientes-container">
            <b-button 
                v-if="!filtroDesplegado" 
                class="button desplegable-button desplegable-button--ingredientes" 
                @click="despliegaFiltro('ingredientes')"
              >
              Ingredientes
            </b-button>
            <b-button 
                v-if="!filtroDesplegado" 
                class="button desplegable-button desplegable-button--categoria"
                @click="despliegaFiltro('categorias')"
              >
              Categorías
            </b-button>
            <div v-else-if="filtroDesplegado === 'categorias'">
              <b-button class="filtro-ingredientes-button-atras" @click="despliegaFiltro(null)"><span class="fa fa-angle-left" aria-hidden="true"></span></b-button>
              <div class="filtro-categoria-container">
                <b-button class="filtro-button filtro-button--categoria">
                  Combinados
                </b-button>
                <b-button class="filtro-button filtro-button--categoria">
                  Guisos
                </b-button>
                <b-button class="filtro-button filtro-button--categoria">
                  Ensaladas
                </b-button>
                <b-button class="filtro-button filtro-button--categoria">
                  Bebidas
                </b-button>
                <b-button class="filtro-button filtro-button--categoria">
                  Postres
                </b-button>
                <b-button class="filtro-button filtro-button--categoria">
                  Pizzas
                </b-button>
              </div>
            </div>
            <div v-else-if="filtroDesplegado === 'ingredientes'">
              <b-button class="filtro-ingredientes-button-atras" @click="despliegaFiltro(null)"><span class="fa fa-angle-left" aria-hidden="true"></span></b-button>
              <b-button-group class="filtro-ingredientes-button-group" vertical>
                <b-button :class="'filtro-button filtro-button--ingredientes ' + focusButton('tiene')" @click="seleccionaTipoFiltroIngredientes('tiene')">
                  Que tenga
                </b-button>
                <b-button :class="'filtro-button filtro-button--ingredientes ' + focusButton('noTiene')" @click="seleccionaTipoFiltroIngredientes('noTiene')">
                  Que NO tenga
                </b-button>
              </b-button-group>
              <div class="buscador-ingredientes-container">
                <div class="form-and-button">
                  <b-form-input
                    v-model="buscarIngrediente"
                    class="buscador-ingredientes"
                    placeholder="Buscar ingrediente..."
                  ></b-form-input>
                  <b-button class="button add-button"><span class="fa fa-plus" aria-hidden="true"></span></b-button>
                </div>
                <div class="vege-options">
                  <b-form-checkbox
                    v-model="vegetariano"
                    :class="'button check-vege ' + vegeActive('vegetariano')"
                    name="check-button"
                    button
                    @change="autoVegetariano('vegetariano')"
                  >
                    Vegetariano
                  </b-form-checkbox>
                  <b-form-checkbox 
                    v-model="vegano"
                    :class="'button check-vege ' + vegeActive('vegano')"
                    name="check-button"
                    button
                    @change="autoVegetariano('vegano')"
                  >
                    Vegano
                  </b-form-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="images-container">
          <b-list-group-item class="card" v-for="receta in recetas" :key="receta.id">
            <div class="card-tittle" :hidden="muestraTitulo">
              {{ receta.name }}
            </div>
            <a href="#" class="card-link">
              <!-- @mouseover="hover(receta.name)  Evento de hover -->
              <img class="card-image" :src="receta.img" />
            </a>
          </b-list-group-item>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      muestraTitulo: false,
      tituloRecetaHover: null,
      /* filtroIngredienteText: 'Que tenga', */
      filtroDesplegado: null,
      tipoFiltroIngredientesSeleccionado: 'tiene',
      ingredientesFiltrados: {
        tiene: [],
        noTiene: [],
        soloTiene: []
      },
      buscarGeneral: null,
      buscarIngrediente: null, // se volcará en el objeto de arrays de arriba "ingredientesFiltrados"
      vegetariano: false,
      vegano: false,
      recetas: [
        { id: 1, name: "Cocido", img: require("~/assets/img/cocido.jpg") },
        { id: 2, name: "Postre", img: require("~/assets/img/postre1.jpg") },
        { id: 3, name: "Cóctel", img: require("~/assets/img/coctel1.jpg") },
        { id: 4, name: "Pizza", img: require("~/assets/img/pizza.jpg") },
        { id: 5, name: "Postre", img: require("~/assets/img/postre1.jpg") },
        { id: 6, name: "Cocido", img: require("~/assets/img/cocido.jpg") },
        { id: 7, name: "Postre", img: require("~/assets/img/postre1.jpg") },
        { id: 8, name: "Cóctel", img: require("~/assets/img/coctel1.jpg") },
        { id: 9, name: "Postre", img: require("~/assets/img/postre1.jpg") },
        { id: 10, name: "Pizza", img: require("~/assets/img/pizza.jpg") },
        { id: 11, name: "Cocido", img: require("~/assets/img/cocido.jpg") },
        { id: 12, name: "Postre", img: require("~/assets/img/postre1.jpg") },
        { id: 13, name: "Pizza", img: require("~/assets/img/pizza.jpg") },
        { id: 14, name: "Cóctel", img: require("~/assets/img/coctel1.jpg") },
        { id: 15, name: "Pizza", img: require("~/assets/img/pizza.jpg") },
        { id: 16, name: "Postre", img: require("~/assets/img/postre1.jpg") },
      ],
    };
  },
  methods: {
    /*
    choseFiltroIngredienteText(text) {
      this.filtroIngredienteText = text
    }, */
    despliegaFiltro(value) {
      this.filtroDesplegado = value
    },
    seleccionaTipoFiltroIngredientes(str) {
      this.tipoFiltroIngredientesSeleccionado = str
    },
    focusButton(str) {
      return str === this.tipoFiltroIngredientesSeleccionado ? 'filtro-button--selected' : 'filtro-button--not-selected'
    },
    autoVegetariano(checkboxSeleccionado) {
      /* Esto marca vegetariano automáticamente al seleccionar comida vegana, pues lo engloba. Aún así queda raro, pendiente de revisión */
      /*
      if(this.vegano && checkboxSeleccionado === 'vegano') this.vegetariano = true
      if(!this.vegetariano && checkboxSeleccionado === 'vegetariano') this.vegano = false */

      if(checkboxSeleccionado === 'vegano') this.vegetariano = false
      if(checkboxSeleccionado === 'vegetariano') this.vegano = false
    },
    vegeActive(str) {
      if(str === 'vegetariano' && this.vegetariano) return 'check-vege--active'
      if(str === 'vegano' && this.vegano) return 'check-vege--active'
    }
  }
};
</script>

<style scoped>
:root {
  --image-z-indx: 10
}

.button {
  text-align: center;
  background-color: #d49c6b;
  color: white;
  border-radius: 1rem !important;
  border-style: none;
  box-shadow: none;
}

.button:hover {
  box-shadow: 1px 1px 11px 4px #F6FAFB;
}

.button--selected {
  color: white;
  box-shadow: 1px 1px 11px 4px #F6FAFB;
}

.explorar-container {
  margin: auto;
  width: 53rem;
}

.filtros {
  margin-bottom: 5rem;
}

.buscador {
  margin-bottom: 1.5rem;
}

.desplegable-button {
  position: absolute;
  padding: .5rem;
  min-width: 8rem;
  box-shadow: 2px 2px 10px 1px #252b31;
}

.desplegable-button:hover {
  box-shadow: 1px 1px 11px 4px #F6FAFB;
}

.desplegable-button--ingredientes {
  top: 2.3rem;
}

.desplegable-button--categoria {
  top: 5.3rem;
}

.filtro-ingredientes-container {
  position: relative;
  height: 7rem;
  width: 100%;
}

.filtro-ingredientes-button-atras {
  position: absolute;
  top: 4rem;
  background-color: transparent;
  border: none;
}

.filtro-categoria-container {
  position: absolute;
  left: 2rem;
  top: 1.2rem;
  max-width: 100%;
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 0;
  column-gap: 0;
  overflow: visible;
}

.filtro-ingredientes-button-group {
  position: absolute;
  left: 3rem;
  top: 1rem;
}

.filtro-button {
  text-align: center;
  background-color: #d49c6b;
  /* box-shadow: 2px 2px 10px 1px #252b31; */
  color: white;
  border-radius: 1rem !important;
  border-style: none;
}

.filtro-button:hover {
  box-shadow: 1px 1px 11px 4px #F6FAFB;
}

.filtro-button--selected {
  color: white;
  box-shadow: 1px 1px 11px 4px #F6FAFB;
  /* border: 1px solid white; */
}

.filtro-button--not-selected {
  background-color: #5E6668;
}

.filtro-button--ingredientes {
  margin-bottom: .4rem;
  padding: .5rem;
}

.filtro-button--categoria {
  height: 2.5rem;
  width: 7rem;
  margin: .3rem .3rem 0 0;
  padding: .5rem;
}

.buscador-ingredientes-container {
  position: absolute;
  width: calc(100% - 12rem);
  top: 3rem;
  right: 0;
}

.form-and-button {
  display: flex;
}

.add-button {
  border-radius: 0 1rem 1rem 0 !important;
}

.vege-options {
  margin: 1rem 0 0 calc(40% - 7rem);
  width: 100%;
}

.check-vege {
  background-color: #5E6668;
  margin: 0 calc(20% - 4rem) 0 1rem;
  border-radius: 0.7rem !important;
}

.check-vege--active {
  background-color: #d49c6b;
  box-shadow: 1px 1px 11px 4px #F6FAFB;
}

.check-vege:deep() .btn-secondary {
  background-color: transparent !important;
  border-style: none !important;
  box-shadow: none !important;
}

/* TODO: 
    IMPORTANTE:
    - Si decido quitar el estilo de botón para vegano/vegetariano, esto cambia el color del checkbox normal */
label:deep() .custom-control-input {
  background-color: #d49c6b !important;
}

 /*
:deep() .check-vege > .btn-secondary:active {
  background-color: #d49c6b;
}*/

/*
.line {
  margin-bottom: .5rem;
}

.por-ingredientes-button:deep() .btn-secondary {
  text-align: center;
  padding: .5rem;
  background-color: #d49c6b;
  box-shadow: 2px 2px 10px 1px #252b31;
  color: #252b31;
  border-radius: 1rem;
  border-style: none;
}

.por-ingredientes-button:deep() .dropdown-menu {
  background-color: transparent;
  border: none;
}

.por-ingredientes-button:deep() .dropdown-item {
  position: relative;
  text-align: center;
  margin-bottom: .3rem;
  padding: .5rem;
  background-color: #d49c6b;
  box-shadow: 2px 2px 10px 1px #252b31;
  color: #252b31;
  border-radius: 1rem;
  border-style: none;
}

.por-ingredientes-button:deep() .dropdown-item:hover {
  box-shadow: 2px 2px 10px 1px white;
  z-index: 1001;
}
*/

.images-container {
  position: relative;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* grid-template-rows: repeat(auto-fill, 200px); */ /* Averiguar qué es esto y por qué solo se está aplicando a la primera row */
  row-gap: 0;
  column-gap: 0;
  overflow: auto;
}
.card {
  width: 90%;
  aspect-ratio: 1/1;
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
  width: 92%;
  aspect-ratio: 1/1;
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
  height: 100%;
  position: absolute;
  z-index: var(--image-z-indx, 10);
}

@media (max-width: 1250px) {
  .explorar-container {
    margin: auto;
    width: 68%;
  }
}
</style>