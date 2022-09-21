<template>
  <div>
    <b-row>
      <b-col class="col-md-3 box box1">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum error
          quod, magnam quos veritatis, ut repellendus nisi voluptatibus ab
          ducimus in. Ex qui voluptatem, voluptas nulla maxime corrupti
          praesentium doloremque?
        </p>
      </b-col>
      <b-col class="col-md-6 box box2">
        <h1 class="title-receta">Receta</h1>
        <h3 class="title-seccion">Ingredientes</h3>
        <ul>
          <li>2 Ajos</li>
          <li>1 Cebolla</li>
          <li>2 Tomates</li>
          <li>1/2 Pollo</li>
          <li>200g Almendras</li>
        </ul>
        <h3 class="title-seccion">Paso 1</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum error
          quod, magnam quos veritatis, ut repellendus nisi voluptatibus ab
          ducimus in. Ex qui voluptatem, voluptas nulla maxime corrupti
          praesentium doloremque?
        </p>
        <h3 class="title-seccion">Paso 2</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum error
          quod, magnam quos veritatis, ut repellendus nisi voluptatibus ab
          ducimus in. Ex qui voluptatem, voluptas nulla maxime corrupti
          praesentium doloremque?
        </p>
        <h3 class="title-seccion">Paso 3</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum error
          quod, magnam quos veritatis, ut repellendus nisi voluptatibus ab
          ducimus in. Ex qui voluptatem, voluptas nulla maxime corrupti
          praesentium doloremque?
        </p>
        <h3 class="title-seccion">Paso 4</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum error
          quod, magnam quos veritatis, ut repellendus nisi voluptatibus ab
          ducimus in. Ex qui voluptatem, voluptas nulla maxime corrupti
          praesentium doloremque?
        </p>
      </b-col>
      <b-col class="col-md-3 box box3">
        <div>
          <b-form-input v-model="buscar" class="buscador" placeholder="Buscar..."></b-form-input>
          <b-list-group-item
            class="badge-container"
            v-for="result in busquedaResultado"
            :key="result"
          >
            <a class="badge-custom">
              {{ result.literal }}
            </a>
          </b-list-group-item>
        </div>
        <p>Meter el buscador de ingredientes.</p>
        <p>
          Utilizar Badge de bootstrap-vue para mostrar los ingredientes
          seleccionados.
        </p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buscar: "",
      buscar2: "tocino",
      ingredientes: [
        { id: 1, literal: "piña" },
        { id: 2, literal: "tocino" },
        { id: 3, literal: "cerveza" },
        { id: 4, literal: "huevo" },
        { id: 5, literal: "arroz" },
        { id: 6, literal: "tomate" },
        { id: 7, literal: "pera" },
        { id: 8, literal: "puerro" },
      ],
    };
  },
  computed: {
    busquedaResultado() {
      if (!this.buscar) return [];
      return this.ingredientes.filter((x) => x.literal.includes(this.buscar));
    },
  },
};
</script>

<style scoped>
.box1 {
}
.box3 {
}
.buscador {
  margin-bottom: 1.5rem;
}
.badge-container {
  display: inline;
  padding: 0;
  background-color: transparent;
  border: none;
}
.badge-custom {
  color: #252b31;
  background-color: #D49C6B;
  border-radius: 1rem;
  padding-inline: .4rem;
  margin-right: .4rem;
}
.box2 {
  background-color: #eaedee;
  border-radius: 1rem;
  box-shadow: 1.5px 1.5px 30px -10px #252b31;
}

/*
  PALETAS DE COLORES

    #5C2C0C #405357 #252B31
    #DDA35D #F5D29E #5E6668
    #AA6231 #7F5B3F #C1C8C7
    #E3DECA #334C38 #F6FAFB
    #3C3A1E #182312 #D49C6B
*/
</style>