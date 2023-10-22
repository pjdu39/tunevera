<template>
  <div class="explorar-container">
    <div class="filtros">
      <h5>¿Qué receta buscas?</h5>
      <BFormInput
        v-model="buscarGeneral"
        class="buscador"
        placeholder="Buscar..."
      ></BFormInput>
      <div class="rounded-wrapper">
        <!-- TODO: Los tabs no tienen soporte aún en Bootstrap Vue Next. Comentarlos y crearlos manualmente hasta que existan. -->
        <BTabs content-class="mt-3" class="tab-option">
          <div class="filtros-adicionales-container">
            <BTab title="Ingredientes">
              <b-row>
                <b-col md="6" class="row-barra-busqueda-ingredientes">
                  <div class="buscador-ingredientes-container">
                    <div class="form-and-button">
                      <BFormInput
                        v-model="buscarIngrediente"
                        class="buscador-ingredientes"
                        placeholder="Buscar ingrediente..."
                      ></BFormInput>
                      <BButton class="button add-button">
                        <font-awesome-icon icon="fa fa-plus" aria-hidden="true"
                      /></BButton>
                    </div>
                    <div class="vege-options">
                      <BFormCheckbox
                        v-model="vegetariano"
                        :class="
                          'button check-vege ' + vegeActive('vegetariano')
                        "
                        name="check-button"
                        button
                        @change="autoVegetariano('vegetariano')"
                      >
                        Vegetariano
                      </BFormCheckbox>
                      <BFormCheckbox
                        v-model="vegano"
                        :class="'button check-vege ' + vegeActive('vegano')"
                        name="check-button"
                        button
                        @change="autoVegetariano('vegano')"
                      >
                        Vegano
                      </BFormCheckbox>
                    </div>
                  </div>
                </b-col>
                <b-col md="6" class="filtros-elegidos"> Patata </b-col>
              </b-row>
            </BTab>
            <BTab title="Tags #">
              <b-row>
                <b-col md="6">
                  <div class="filtro-tags-container">
                    <div class="form-and-button">
                      <BFormInput
                        v-model="buscarTag"
                        class="buscador-ingredientes"
                        placeholder="Buscar tag..."
                      ></BFormInput>
                      <BButton class="button add-button">
                        <font-awesome-icon
                          icon="fa fa-search"
                          aria-hidden="true"
                      /></BButton>
                    </div>
                  </div>
                </b-col>
                <b-col md="6">
                  <!-- TODO: Todo lo que está dentro de este col, está copiado de Recetas.vue, hay que adaptarlo. Considerar hacer las clases globales. -->
                  <div class="buscador-card buscador-card--filtro">
                    <h6>Filtros:</h6>
                    <BListGroupItem
                      class="badge-container badge-container--filtro"
                      v-for="filtro in filtros"
                      :key="filtro"
                    >
                      <!-- Considerar utilizar Badge de bootstrap-vue para mostrar los ingredientes seleccionados. -->
                      <a class="badge-custom badge-custom--filtro">
                        {{ filtro.literal }}
                        <!-- TODO: Icono de X en un link para quitar el filtro -->
                      </a>
                    </BListGroupItem>
                  </div>
                </b-col>
              </b-row>
            </BTab>
          </div>
        </BTabs>
      </div>
    </div>
    <div class="images-container">
      <BListGroupItem class="card" v-for="receta in recetas" :key="receta.id">
        <div class="card-title" :hidden="muestraTitulo">
          {{ receta.name }}
        </div>
        <a href="#" class="card-link">
          <!-- @mouseover="hover(receta.name)  Evento de hover -->
          <img class="card-image" :src="receta.img" />
        </a>
      </BListGroupItem>
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
      tipoFiltroIngredientesSeleccionado: "tiene",
      ingredientesFiltrados: {
        tiene: [],
        noTiene: [],
        soloTiene: false,
      },
      tagsFiltrados: [],
      buscarGeneral: null,
      buscarIngrediente: null, // se volcará en el objeto de arrays de arriba "ingredientesFiltrados"
      buscarTag: null,
      vegetariano: false,
      vegano: false,
      recetas: [
        { id: 1, name: "Cocido", img: "/img/cocido.jpg" },
        { id: 2, name: "Postre", img: "/img/postre1.jpg" },
        { id: 3, name: "Cóctel", img: "/img/coctel1.jpg" },
        { id: 4, name: "Pizza", img: "/img/pizza.jpg" },
        { id: 5, name: "Postre", img: "/img/postre1.jpg" },
        { id: 6, name: "Cocido", img: "/img/cocido.jpg" },
        { id: 7, name: "Postre", img: "/img/postre1.jpg" },
        { id: 8, name: "Cóctel", img: "/img/coctel1.jpg" },
        { id: 9, name: "Postre", img: "/img/postre1.jpg" },
        { id: 10, name: "Pizza", img: "/img/pizza.jpg" },
        { id: 11, name: "Cocido", img: "/img/cocido.jpg" },
        { id: 12, name: "Postre", img: "/img/postre1.jpg" },
        { id: 13, name: "Pizza", img: "/img/pizza.jpg" },
        { id: 14, name: "Cóctel", img: "/img/coctel1.jpg" },
        { id: 15, name: "Pizza", img: "/img/pizza.jpg" },
        { id: 16, name: "Postre", img: "/img/postre1.jpg" },
      ],
    };
  },
  methods: {
    seleccionaTipoFiltroIngredientes(str) {
      this.tipoFiltroIngredientesSeleccionado = str;
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

      if (checkboxSeleccionado === "vegano") this.vegetariano = false;
      if (checkboxSeleccionado === "vegetariano") this.vegano = false;
    },
    vegeActive(str) {
      if (str === "vegetariano" && this.vegetariano)
        return "check-vege--active";
      if (str === "vegano" && this.vegano) return "check-vege--active";
    },
  },
};
</script>

<style scoped>
:root {
  --image-z-indx: 10;
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
  box-shadow: 1px 1px 11px 4px #f6fafb;
}

.explorar-container {
  margin: auto;
  width: 53rem;
}

.filtros {
  padding-bottom: 1.5rem;
}

.buscador {
  margin-bottom: 1.5rem;
}

.tab-option:deep() a {
  border-radius: 0rem;
  color: white;
  background-color: #5e6668;
  border-radius: 1rem 1rem 0 0;
}

.tab-option:deep() a:active {
  background-color: #d49c6b;
}
.tab-option:deep() a:hover {
  box-shadow: 1px 1px 6px 2px #f6fafb;
}

.filtros-adicionales-container {
  position: relative;
  height: auto;
  width: 100%;

  padding: 3rem;

  background-color: #eaedee;
  border: 2px solid white;
  border-radius: 1rem;
  box-shadow: 5px 5px 20px -15px #252b31, -3px -3px 10px 2px rgb(248, 248, 248),
    10px 10px 100px -20px rgb(248, 248, 248) inset,
    -10px -10px 30px -40px #252b31 inset;
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
  box-shadow: 1px 1px 11px 4px #f6fafb;
}

.buscador-ingredientes-container {
  width: calc(100% - 0rem);
}

.row-barra-busqueda-ingredientes {
  padding-left: 0;
}

.filtros-elegidos {
  /* height: min-content; Esto es por si quiero ajustar automáticamente la altura de la tarjeta al número de elementos que contenga */
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin-bottom: 0rem;
  background-color: white; /* #eaedee; */
  border-radius: 1rem;
  border: 2px solid white;
  box-shadow: 5px 5px 20px -15px #252b31, -3px -3px 10px 2px rgb(248, 248, 248),
    10px 10px 100px -20px rgb(248, 248, 248) inset,
    -10px -10px 30px -40px #252b31 inset;
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
  background-color: #5e6668;
  margin: 0 calc(20% - 4rem) 0 1rem;
  border-radius: 0.7rem !important;
}

.check-vege--active {
  background-color: #d49c6b;
  box-shadow: 1px 1px 11px 4px #f6fafb;
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

.images-container {
  position: relative;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* grid-template-rows: repeat(auto-fill, 200px); */ /* Averiguar qué es esto y por qué solo se está aplicando a la primera row */
  row-gap: 0;
  column-gap: 0;
  overflow: auto;

  background-color: #eaedee;
  border-radius: 1rem;
  border: 2px solid white;
  box-shadow: 5px 5px 20px -15px #252b31, -3px -3px 10px 2px rgb(248, 248, 248),
    10px 10px 100px -20px rgb(248, 248, 248) inset,
    -10px -10px 30px -40px #252b31 inset;
}
.card {
  width: 88%;
  aspect-ratio: 1/1;
  margin-top: 1rem;
  margin-left: 0.8rem;
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
  box-shadow: 1.5px 1.5px 8px 6px white;
  --image-z-indx: 1;
}
.card-title {
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