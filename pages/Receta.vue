<template>
  <div>
    <b-row>
      <b-col class="col-md-3 box box1">
        <div class="perfil-container">
          <div class="wrapper-foto">
            <img class="perfil-foto" :src="usuarioDummy.img">
          </div>
          <div class="perfil-info">{{ usuarioDummy.publicaciones }}</div>
          <div class="perfil-info">{{ usuarioDummy.seguidores }}</div>
          <div>{{ usuarioDummy.nombreCompleto }}</div>
        </div>
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
            <!-- Considerar utilizar Badge de bootstrap-vue para mostrar los ingredientes seleccionados. -->
            <a class="badge-custom">
              {{ result.literal }}
            </a>
          </b-list-group-item>
        </div>
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
        { id: 9, literal: "manzana" },
        { id: 10, literal: "plátano" },
        { id: 11, literal: "caldo de pollo" },
        { id: 12, literal: "edamame" },
        { id: 13, literal: "arroz integral" },
        { id: 14, literal: "jamón serrano" },
        { id: 15, literal: "jamón york" },
        { id: 16, literal: "queso provolone" },
        { id: 17, literal: "queso chedar" },
        { id: 18, literal: "queso de cabra" },
        { id: 19, literal: "queso parmesano" },
        { id: 20, literal: "queso mozarella" }
      ],
      usuarioDummy: {
        nombreCompleto: 'Juan Pérez Delgado',
        publicaciones: 28,
        seguidores: 143,
        img: require("~/assets/img/foto_perfil2.jpg")
      }
    }
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
.perfil-container {
  margin-left: 6rem;
}
.wrapper-foto {
  display: inline-block;
  width: 3.5rem;
  height: 3.5rem;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
}
.perfil-info {
  text-align: right;
  float: right;
}
.perfil-foto {
  width: auto;
  height: 100%;
  margin-left: -.4rem;
}
.box3 {
  padding-right: 5rem;
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