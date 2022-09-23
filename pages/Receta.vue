<template>
  <div>
    <b-row>
      <b-col class="col-md-3 box perfil-container">
        <b-row class="perfil-seccion1">
          <b-col class="col-md-4 perfil-foto">
            <div class="wrapper-foto">
              <img class="foto" :src="usuarioDummy.img" />
              <!-- TODO: Ponerle un link al perfil -->
            </div>
          </b-col>
          <b-col class="col-md-4 perfil-info">
            <div class="perfil-info-box">
              <h6 class="perfil-info-num">{{ usuarioDummy.seguidores }}</h6>
              <div class="perfil-info-lit">Seguidores</div>
            </div>
          </b-col>
          <b-col class="col-md-4 perfil-info">
            <div class="perfil-info-box">
              <h6 class="perfil-info-num">
                {{ usuarioDummy.publicaciones }}
              </h6>
              <div class="perfil-info-lit">Recetas</div>
            </div>
          </b-col>
        </b-row>
        <div>{{ usuarioDummy.nombreCompleto }}</div>
        <p>
          CHEF de @nakedandsated THE BEST FODDIE 2018 AUTOR DE 3 LIBROS
          CONSEJERO MCHEF VI
          <a href="#">linktr.ee/chefbosquet</a>
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
        <div class="buscador-card">
          <b-form-input
            v-model="buscar"
            class="buscador"
            placeholder="Buscar..."
          ></b-form-input>
          <b-list-group-item
            class="badge-container"
            v-for="result in busquedaResultado"
            :key="result"
          >
            <!-- Considerar utilizar Badge de bootstrap-vue para mostrar los ingredientes seleccionados. -->
            <a class="badge-custom" @click="AddFilter(result)">
              {{ result.literal }}
            </a>
          </b-list-group-item>
        </div>
        <div class="buscador-card buscador-card--filtro">
          <h6>Filtros:</h6>
          <b-list-group-item
            class="badge-container badge-container--filtro"
            v-for="filtro in filtros"
            :key="filtro"
          >
            <!-- Considerar utilizar Badge de bootstrap-vue para mostrar los ingredientes seleccionados. -->
            <a class="badge-custom badge-custom--filtro">
              {{ filtro.literal }} <!-- Icono de X en un link para quitar el filtro -->
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
        { id: 20, literal: "queso mozarella" },
      ],
      usuarioDummy: {
        id: 1,
        nombreCompleto: "Juan Pérez Delgado",
        publicaciones: 28,
        seguidores: 143,
        img: require("~/assets/img/foto_perfil2.jpg"),
      },
      filtros: [],
    };
  },
  computed: {
    busquedaResultado() {
      if (!this.buscar) return [];
      return this.ingredientes.filter((x) => x.literal.includes(this.buscar));
    },
  },
  methods: {
    AddFilter(filtro) {
      if (this.filtros.includes(filtro)) {
        return
      }
      this.filtros.push(filtro);
    },
  },
};
</script>

<style scoped>
.perfil-container {
  padding: 2.5rem 3rem 0 4rem;
}
.perfil-seccion1 {
  margin-bottom: 2rem;
}
.perfil-foto {
  /*text-align: center;*/
}
.wrapper-foto {
  display: inline-block;
  width: 3.7rem;
  height: 3.7rem;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
}
.foto {
  width: auto;
  height: 100%;
  margin-left: -0.4rem;
  margin-bottom: 2rem;
}
.perfil-info {
  padding-top: 0.6rem;
}
.perfil-info-box {
  display: inline-block;
  text-align: center;
}
.perfil-info-num {
  font-weight: 700;
  margin: 0;
}
.perfil-info-lit {
  font-weight: 350;
  font-size: 90%;
}
.box3 {
  padding-right: 5rem;
}
.buscador-card {
  min-height: 18rem;
  max-height: 18rem;
  margin-bottom: 2rem;
  overflow: hidden;
}
.buscador {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.badge-container {
  display: inline-block;
  padding: 0;
  background-color: transparent;
  border: none;
  margin-bottom: 0.7rem;
}
.badge-custom {
  color: #252b31;
  background-color: #d49c6b;
  border-radius: 1rem;
  padding: 0 0.5rem 0.2rem 0.5rem;
  margin-right: 0.4rem;
}
.buscador-card--filtro {
  padding: .6rem;
  min-height: 10rem;
  max-height: none;
  border-radius: 1rem;
  box-shadow: 1.5px 1.5px 30px -10px #252b31;
  background-color: #eaedee;
}
.badge-container--filtro {
}
.badge-custom--filtro {
  color: #d49c6b;
  background-color: #252b31;
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