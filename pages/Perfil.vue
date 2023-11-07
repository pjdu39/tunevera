<template>
  <div class="profile">
    <div class="top">
      <div class="profile-info">
        <div class="info-summary-section">
          <div class="picture-cotainer">
            <div class="picture-wrapper"></div>
          </div>
          <div class="info-summary">
            <div class="summary-item"></div>
            <div class="summary-item"></div>
            <div class="summary-item"></div>
          </div>
        </div>
        <div class="info-detail">
          <div class="name"></div>
          <div class="description"></div>
        </div>
      </div>
      <div class="side-menu">
        <div class="side-menu-button"></div>
        <div class="side-menu-button"></div>
        <div class="side-menu-button"></div>
      </div>
    </div>
    <div class="profile-content">
      <div class="p-recipe">1</div>
      <div class="p-recipe">2</div>
      <div class="p-recipe">3</div>
      <div class="p-recipe">4</div>
      <div class="p-recipe">5</div>
      <div class="p-recipe">6</div>
      <div class="p-recipe">7</div>
      <div class="p-recipe">8</div>
      <div class="p-recipe">9</div>
    </div>

    <!--OLD-->
    <b-row class="head">
      <b-col md="5" class="">
        <div class="perfil-vw">
          <div class="wrapper-marco">
            <div class="marco">
              <div class="wrapper-foto">
                <img class="foto" :src="usuarioDummy.img" />
              </div>
            </div>
          </div>
        </div>
        <div class="rank-img"></div>
      </b-col>
      <b-col md="7" class="main-info">
        <b-row>
          <b-col md="6">
            <div class="perfil-info-box">
              <div class="perfil-info-num">{{ usuarioDummy.seguidores }}</div>
              <div class="perfil-info-lit">SEGUIDORES</div>
            </div>
          </b-col>
          <b-col md="6">
            <div class="perfil-info-box">
              <div class="perfil-info-num">
                {{ usuarioDummy.publicaciones }}
              </div>
              <div class="perfil-info-lit">RECETAS</div>
              <!-- TODO: Sustituir este título por pestañas para ve distintas secciones relacionadas con el perfil. -->
            </div>
          </b-col>
        </b-row>
        <div class="descripcion">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum,
          dolor sit amet consectetur adipisicing elit.
        </div>
      </b-col>
    </b-row>
    <b-row class="separacion">
      <b-col md="5">
        <div class="separacion-linea"></div>
      </b-col>
      <b-col class="separacion-titulo" md="2">RECETAS</b-col>
      <b-col md="5">
        <div class="separacion-linea"></div>
      </b-col>
    </b-row>
    <div class="recetas">
      <BListGroupItem
        :class="'group-item-container ' + derechaIzquierda(index, 'group-item')"
        v-for="(receta, index) in recetasDummy"
        :key="index"
      >
        <a :class="'receta-globo ' + derechaIzquierda(index, 'globo')" href="#">
          <div v-if="index % 2 === 0" class="wrapper-dibujo">
            <img class="dibujo" :src="seleccionaDibujo()" />
          </div>
          <div class="info_receta">
            <h4>{{ receta.nombre }}</h4>
            <div>{{ receta.descripcion }}</div>
          </div>
          <div v-if="index % 2 === 1" class="wrapper-dibujo">
            <img class="dibujo" :src="seleccionaDibujo()" />
          </div>
        </a>
      </BListGroupItem>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuarioDummy: {
        id: 1,
        nombreCompleto: "Juan Pérez Delgado",
        publicaciones: 28,
        seguidores: 143,
        img: "/img/foto_perfil2.jpg",
      },
      recetasDummy: [
        {
          id: 1,
          nombre: "Huevos Rellenos",
          descripcion:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          id: 2,
          nombre: "Café Irlandés",
          descripcion:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          id: 3,
          nombre: "Cocido Madrileño",
          descripcion:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          id: 4,
          nombre: "Pavo Relleno",
          descripcion:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      dibujosComida: [
        { name: "comida1", img: "/img/food_draw_1.png" },
        { name: "comida2", img: "/img/food_draw_2.png" },
        { name: "comida3", img: "/img/food_draw_3.png" },
      ],
    };
  },
  methods: {
    derechaIzquierda(index, element) {
      if (element === "group-item") {
        return index % 2 === 0
          ? "group-item-container--izquierda"
          : "group-item-container--derecha";
      } else if (element === "globo") {
        return index % 2 === 0
          ? "receta-globo--izquierda"
          : "receta-globo--derecha";
      }

      return "";
    },
    seleccionaDibujo() {
      let r = Math.floor(Math.random() * 3);
      return this.dibujosComida[r].img;
    },
  },
};
</script>

<style scoped lang="scss">
.profile {
  margin: auto;
  width: 44rem;
  background-color: $color-background;
  border-radius: 5px;
}
.top {
  display: flex;
  height: 12rem; // Provisional
}
.profile-info {
  width: 90%;

  // TODO: Borrar. Es solo para maquetar
  border: 1px solid black;
}
.info-summary-section {
  display: flex;
  height: 50%;

  // TODO: Borrar. Es solo para maquetar
  background-color: darksalmon;
}
.picture-cotainer {
  height: 100%;
  aspect-ratio: 1/1;

  // TODO: Borrar. Es solo para maquetar
  background-color: pink;
}
.picture-wrapper {
  height: 100%;
  border-radius: 50%;

  // TODO: Borrar. Es solo para maquetar
  background-color: darkred;
}
.info-summary {
  display: flex;
  justify-content: center;
  height: 100%;
  flex-grow: 1;
}
.summary-item {
  height: 100%;
  width: 5rem;
  font-size: 150%;

  // TODO: Borrar. Es solo para maquetar
  background-color: darkred;
  border: 1px solid pink;
}
.info-detail {
  height: 50%;

  // TODO: Borrar. Es solo para maquetar
  background-color: aqua;
}
.side-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 10%;

  // TODO: Borrar. Es solo para maquetar
  background-color: burlywood;
}
.side-menu-button {
  height: 3rem; // Provisional
  width: 3rem; // Provisional
  border-radius: 50%;

  // TODO: Borrar. Es solo para maquetar
  background-color: darkred;
}
.profile-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;

  // TODO: Borrar. Es solo para maquetar
  height: 55rem;
  background-color: greenyellow;
}
.p-recipe {

  // TODO: Borrar. Es solo para maquetar
  border: 1px solid black;
  border-radius: 5px;
  background-color: aliceblue;
}

// TODO: Adaptación, renombres y limpieza de todo lo que esté aquí debajo
.wrapper-marco {
  display: inline-block;
  width: 9rem;
  height: 9rem;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  z-index: 5;
}
.marco {
  padding: 0.5rem;
  width: auto;
  height: 100%;
  background-color: maroon;
}

.wrapper-foto {
  display: inline-block;
  width: 8rem;
  height: 8rem;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
}

.foto {
  width: auto;
  height: 100%;
  /* Los márgenes están customizados a mano para cuadrar la foto donde quiero. TODO: quitar en el futuro */
  margin-left: -0.4rem;
  margin-bottom: 2rem;
}

.rank-img {
  margin: 0 1rem;
  height: 3rem;
  background-color: brown;
}

.head {
  padding: 1.3rem;
}

.perfil-vw {
  text-align: center;
}

.main-info {
  padding: 0.5rem 0.5rem 0.5rem 0;
}

.perfil-info-box {
  display: inline-block;
  text-align: center;
  margin-bottom: 2rem;
}
.perfil-info-num {
  font-size: 160%;
  font-weight: 600;
  margin-bottom: 0.4rem;
}
.perfil-info-lit {
  font-weight: 350;
  font-size: 95%;
  letter-spacing: 2px;
}

.descripcion {
}

.wrapper-separacion {
  position: relative;
}

.separacion {
  margin: 3rem 0;
}

.separacion-linea {
  margin: 0 1.6rem;
  border-bottom: 4px dotted brown;
}

.separacion-titulo {
  text-align: center;
  margin-top: -0.7rem;
}

.recetas {
}

.group-item-container {
  border: none;
  background-color: transparent;
}

.group-item-container--derecha {
  text-align: end;
}

.group-item-container--izquierda {
  text-align: end;
}

.receta-globo {
  width: 80%;
  display: inline-flex;
  padding: 1rem;
  color: black;
  background-color: $color-primary;
  border-radius: 2rem;
}

.receta-globo--izquierda {
  margin-right: 20%;
}

.receta-globo--derecha {
  /* margin-right: 0; */
  margin-left: 20%;
  text-align: right;
}

.info_receta {
  vertical-align: middle;
  margin: 0 0.9rem 0 0.9rem;
}

.wrapper-dibujo {
  margin: 0 0 0.4rem 0;
  display: inline-block;
  width: 7rem; /* Valorar poner el mismo valor que en height por motivos de wrapping si hiciera falta. */
  height: auto;
  position: relative;
  border-radius: 50%;
  background-color: transparent;
}

.dibujo {
  width: inherit;
  height: auto;
}

@media (max-width: 800px) {
  .profile-container {
    margin: auto;
    width: 80%;
  }
}
</style>