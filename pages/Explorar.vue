<template>
  <div class="explorar-container">
        <div class="filtros">
          <b-form-input
            v-model="buscarGeneral"
            class="buscador"
            placeholder="Buscar..."
          ></b-form-input>
          <div class="rounded-wrapper">
            <b-tabs v-model="tab" content-class="mt-3" class="tab-option">
              <div class="filtros-adicionales-container">
                <b-tab title="Ingredientes">
                  <b-row>
                    <b-col md="7" class="row-barra-busqueda-ingredientes">
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
                    </b-col>
                    <b-col md="5" class="filtros-elegidos">
                      Patata
                    </b-col>
                  </b-row>
                </b-tab>
                <b-tab title="Tags #">
                  <b-row>
                    <b-col md="7">
                      <div class="filtro-tags-container">
                        <div class="form-and-button">
                          <b-form-input
                            v-model="buscarTag"
                            class="buscador-ingredientes"
                            placeholder="Buscar tag..."
                          ></b-form-input>
                          <b-button class="button add-button"><span class="fa fa-search" aria-hidden="true"></span></b-button>
                        </div>
                      </div>
                    </b-col>
                    <b-col md="5">
                      <!-- TODO: Todo lo que está dentro de este col, está copiado de Recetas.vue, hay que adaptarlo. Considerar hacer las clases globales. -->
                      <div class="buscador-card buscador-card--filtro">
                        <h6>Filtros:</h6>
                        <b-list-group-item
                          class="badge-container badge-container--filtro"
                          v-for="filtro in filtros"
                          :key="filtro"
                        >
                          <!-- Considerar utilizar Badge de bootstrap-vue para mostrar los ingredientes seleccionados. -->
                          <a class="badge-custom badge-custom--filtro">
                            {{ filtro.literal }}
                            <!-- TODO: Icono de X en un link para quitar el filtro -->
                          </a>
                        </b-list-group-item>
                      </div>
                    </b-col>
                  </b-row>
                </b-tab>
              </div>
            </b-tabs>
          </div>

          <!-- TODO: Refactor de nombres de clases. -->

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
      filtroDesplegado: null,
      tipoFiltroIngredientesSeleccionado: 'tiene',
      ingredientesFiltrados: {
        tiene: [],
        noTiene: [],
        soloTiene: false
      },
      tagsFiltrados: [],
      buscarGeneral: null,
      buscarIngrediente: null, // se volcará en el objeto de arrays de arriba "ingredientesFiltrados"
      buscarTag: null,
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
    seleccionaTipoFiltroIngredientes(str) {
      this.tipoFiltroIngredientesSeleccionado = str
    }, 
    /* TODO: Borrar. Legacy.
    focusButton(str) {
      return str === this.tipoFiltroIngredientesSeleccionado ? 'filtro-button--selected' : 'filtro-button--not-selected'
    }, */
    autoVegetariano(checkboxSeleccionado) {
      /* Esto marca vegetariano automáticamente al seleccionar comida vegana, pues lo engloba. Aún así queda raro, pendiente de revisión */
      /*
      if(this.vegano && checkboxSeleccionado === 'vegano') this.vegetariano = true
      if(!this.vegetariano && checkboxSeleccionado === 'vegetariano') this.vegano = false */

      /* TODO: Eliminar este método y hacer la asignación de vegano o vegetariano a false en el propio @change. */

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

/* TODO: Borrar. Legacy.
.button--selected {
  color: white;
  box-shadow: 1px 1px 11px 4px #F6FAFB;
} */

.explorar-container {
  margin: auto;
  width: 53rem;
}

.filtros {
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 1.5rem;
  /* margin-bottom: 0.5rem; */
}

.buscador {
  margin-bottom: 1.5rem;
}

.tab-option:deep() a {
  border-radius: 0rem;
  color: white;
  background-color: #5E6668;
  border-radius: 1rem 1rem 0 0;
}

.tab-option:deep() a:active {
  background-color: #d49c6b;
}
.tab-option:deep() a:hover {
  box-shadow: 1px 1px 6px 2px #F6FAFB;
}

/* TODO: Borrar, no veo que se use en ninguna parte, probablemente es legacy

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
} */

.filtros-adicionales-container {
  position: relative;
  height: auto;
  width: 100%;

  padding: 3rem;
  
  background-color: #eaedee;
  border-radius: 1rem;
  box-shadow: 1.5px 1.5px 30px -10px #252b31;
}

.button-atras {
  position: absolute;
  top: 4rem;
  background-color: transparent;
  border: none;
}

.filtro-categoria-container {
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

/* TODO: Borrar. Legacy.
.filtro-button--selected {
  color: white;
  box-shadow: 1px 1px 11px 4px #F6FAFB;
  /* border: 1px solid white;
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
} */

.buscador-ingredientes-container {
  width: calc(100% - 0rem);
  /* right: 0; */
}

.row-barra-busqueda-ingredientes {
  padding-left: 0;
}

.filtros-elegidos {
  padding: .5rem 1rem .5rem 1rem;
  margin-bottom: 0rem;
  background-color: white; /* #eaedee; */
  border-radius: 1rem;
  box-shadow: 1.5px 1.5px 30px -10px #252b31;
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