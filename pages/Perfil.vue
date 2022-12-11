<template>
  <div>
    <b-row>
      <b-col class="" md="4"></b-col>
      <b-col class="mainBox fixed-col" md="4">
        <b-row class="head">
          <b-col md="5" class="fixed-col">
            <div class="perfil-vw">
              <div class="wrapper-marco">
                <div class="marco">
                  <div class="wrapper-foto">
                    <img class="foto" :src="usuarioDummy.img" />
                  </div>
                </div>
              </div>
            </div>
            <div class="rank-img">
            </div>
          </b-col>
          <b-col  md="7" class="main-info">
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
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </div>
          </b-col>
        </b-row>
        <b-row class="separacion">
          <b-col class="fixed-col" md="5">
            <div class="separacion-linea"></div>
          </b-col>
          <b-col class="fixed-col separacion-titulo" md="2">RECETAS</b-col>
          <b-col class="fixed-col" md="5">
            <div class="separacion-linea"></div>
          </b-col>
        </b-row>
        <!--
        <div class="wrapper-separacion">
          <div class="separacion"></div>
          <div class="separacion-titulo">RECETAS</div>
        </div> -->
        <div class="recetas">
          <b-list-group-item
            :class="'group-item-container ' + derechaIzquierda(index, 'group-item')"
            v-for="(receta, index) in recetasDummy"
            :key="index"
          >
            <a :class="('receta-globo ' + derechaIzquierda(index, 'globo'))" href="#">
              <div class="wrapper-dibujo">
                <img class="dibujo" :src="seleccionaDibujo()" />
              </div>
              <h4>{{ receta.nombre }}</h4>
              <div>{{ receta.descripcion }}</div>
            </a>
          </b-list-group-item>
        </div>
      </b-col>
      <b-col class="" md="4"></b-col>
    </b-row>
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
        img: require("~/assets/img/foto_perfil2.jpg")
      },
      recetasDummy: [
        {
          id: 1,
          nombre: 'Huevos Rellenos',
          descripcion:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          id: 2,
          nombre: 'Café Irlandés',
          descripcion:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          id: 3,
          nombre: 'Cocido Madrileño',
          descripcion:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          id: 4,
          nombre: 'Pavo Relleno',
          descripcion:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      dibujosComida: [
        { name: "comida1", img: require("~/assets/img/dibujo-comida1.jpg") },
        { name: "comida2", img: require("~/assets/img/dibujo-comida2.jpg") },
        { name: "comida3", img: require("~/assets/img/dibujo-comida3.jpg") },
        { name: "comida4", img: require("~/assets/img/dibujo-comida4.jpg") },
        { name: "comida5", img: require("~/assets/img/dibujo-comida5.jpg") },
        { name: "comida6", img: require("~/assets/img/dibujo-comida6.jpg") }
      ]
    }
  },
  methods: {
    derechaIzquierda(index, element) {
      if (element === 'group-item') {
        return index % 2 === 0 ? 'group-item-container--izquierda' : 'group-item-container--derecha'
      } else if (element === 'globo') {
        return index % 2 === 0 ? 'receta-globo--izquierda' : 'receta-globo--derecha'
      }

      return ''
    },
    seleccionaDibujo() {
      let r = Math.floor(Math.random() * 6)
      return this.dibujosComida[r].img
    }
  }
}
</script>

<style>

.fixed-col {
  padding-left: 0;
}

.redBox {
  background-color: red;
}

.blueBox {
  background-color: blue;
}

.greenBox {
  background-color: green;
}

/*
.goldenBox {
  background-color: goldenrod;
} */

.mainBox {
  background-color: #eaedee;
  border-radius: 1rem;
  box-shadow: 1.5px 1.5px 30px -10px #252b31;
}

.pinkBox {
  background-color: pink;
}

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
  padding: .5rem .5rem .5rem 0;
}

.perfil-info-box {
  display: inline-block;
  text-align: center;
  margin-bottom: 2rem;
}
.perfil-info-num {
  font-size: 160%;
  font-weight: 600;
  margin-bottom: .4rem;
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
  margin-top: -.7rem;
}

.recetas {
}

.group-item-container {
  background-color: transparent;
}

.group-item-container--derecha {
  text-align: end;
}

.group-item-container--izquierda {
  text-align: end;
}

.receta-globo {
  width: 70%;
  display: inline-block;
  padding: 1rem;
  color: black;
  background-color: #d49c6b;
  border-radius: 2rem;
}

.receta-globo--izquierda {
  margin-right: 30%;
}

.receta-globo--derecha {
  /* margin-right: 0; */
  margin-left: 30%;
  text-align: right;
}

.wrapper-dibujo {
  display: inline-block;
  width: 6rem;
  height: 6rem;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  background-color: black;
}

.dibujo {
  width: auto;
  height: 100%;
  background-color: black;
}

/*
.separacion {
  border-bottom: 4px dotted brown;
}

.separacion-titulo {
  text-align: center;
  width: 6rem;
  background-color: goldenrod;
  margin-top: -1rem;
  margin-left: 41%;
} */

</style>