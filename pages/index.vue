<template>
  <div>
    <!-- <main></main> -->
    <b-row>
      <b-col md="4"></b-col>
      <b-col md="4">
        <b-list-group-item
            class="elemento"
            v-for="(elemento, index) in elementos"
            :key="index"
          >
          <div class="linea-superior">
            <div class="tipo-elemento">{{ elemento.tipo }}</div>
            <div class="autor">por <b>{{ elemento.autor }}</b></div>
          </div>
          <h4 class="titulo">{{ elemento.titulo }}</h4>
          <div>{{ elemento.descripcion }}</div>
          <div 
              v-if="elemento.tipo === 'Encuesta'" 
              class="encuesta-container"
            >
            <div v-for="opcion in elemento.opciones" :key="opcion.id">
              <div class="encuesta-opcion">
                <div class="encuesta-opcion-texto">{{ opcion.texto }}</div>
                <div class="encuesta-opcion-barra" :style="'width: ' + calculaBarraEncuesta(elemento.opciones, opcion) + 'rem;'"></div>
                <!-- Por algún motivo desconocido, en este div estoy obligado a aplicar el text-align en el style, ya que no se aplica en la clase -->
                <div 
                    class="encuesta-opcion-barra encuesta-opcion-barra--fondo"
                  >
                </div>
                <div class="encuesta-opcion-barra porcentaje" style="text-align: end;">
                  {{ calculaPorcentajeEncuesta(elemento.opciones, opcion) }}%
                </div>
              </div>
            </div>
          </div>
          <div class="interacciones">
            <div class="likes">
              <span class="fa fa-heart" aria-hidden="true"></span>
            </div>
            <div class="num">{{ elemento.likes }}</div>
            <div class="comentarios">
              <span class="fa fa-comment" aria-hidden="true"></span>
            </div>
            <div class="num">{{ elemento.comentarios.length }}</div>
          </div>
        </b-list-group-item>
      </b-col>
      <b-col md="4"></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      elementos: [
        { 
          tipo: 'Receta',
          titulo: 'Cocido',
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
          autor: 'carlos',
          likes: 67,
          comentarios: [
            { usuario: 'Pepe Hamond', texto: 'Lorem ipsum dolor sit amet' },
            { usuario: 'Carlos', texto: 'Consectetur adipisicing elit. Dolor sit amet consectetur adipisicing' }
          ]
        },
        { 
          tipo: 'Receta',
          titulo: 'Galletas',
          descripcion: 'Lorem ipsum dolor sit amet adipisicing elit',
          autor: 'andrea',
          likes: 216,
          comentarios: [
            { usuario: 'Pepe Hamond', texto: 'Consectetur adipisicing elit. Dolor sit amet ipsum dolor sit consectetur adipisicing hahah' },
            { usuario: 'Carlos', texto: 'Lorem ipsum dolor sit amet.' },
            { usuario: 'Andrea', texto: 'Consectetur elit adipisicing. Dolor sit amet consectetur adipisicing' }
          ]
        },
        { 
          tipo: 'Discusión',
          titulo: 'Cilantro o no?',
          descripcion: 'Qué opinais del uso del cilantro en la cocina latino americana?',
          autor: 'sara_rivas_',
          likes: 13,
          comentarios: [
            { usuario: 'Pepe Hamond', texto: 'Lorem ipsum dolor sit consectetur adipisicing hahah. sit amet.' },
            { usuario: 'Andrea', texto: 'Consectetur elit adipisicing. Dolor sit amet consectetur adipisicing' }
          ]
        },
        { 
          tipo: 'Encuesta',
          titulo: 'Cocido con o sin patata?',
          descripcion: null,
          autor: 'misco_jones',
          likes: 693,
          comentarios: [],
          opciones: [
            { id: 1, texto: 'Con patata', votos: 38 },
            { id: 2, texto: 'Sin patata', votos: 856 }
          ]
        }
      ]
    }
  },
  methods: {
    calculaBarraEncuesta(encuestaOpciones, opcion) {
      let porcentaje = this.calculaPorcentajeEncuesta(encuestaOpciones, opcion)
      let result = porcentaje / 5 // Divide entre 5 porque la longitud de la barra es 20rem
      return result.toFixed(1)
    },
    calculaPorcentajeEncuesta(encuestaOpciones, opcion) {
      let votosTotales = encuestaOpciones.reduce(
        (acum, x) => acum + x.votos, 0
      )
      let result = opcion.votos / votosTotales * 100
      return result.toFixed(1)
    }
  }
}
</script>
<style scoped>

.mainBox { /* TODO: Borrar si continúa sin usarse */
  background-color: #eaedee;
  border-radius: 1rem;
  box-shadow: 1.5px 1.5px 30px -10px #252b31;
}

.elemento {
  margin-bottom: 2rem;
  background-color: #eaedee;
  border-radius: 1rem;
  box-shadow: 1.5px 1.5px 30px -10px #252b31;
}

.tipo-elemento {
  display: inline-block;
  color: white;
  background-color: #C1C8C7;
  font-size: 110%;
  font-weight: 400;
  letter-spacing: .3rem;
  margin-left: -.3rem;
  padding: 0 .6rem 0.1rem .6rem;
  border-radius: 2rem;
  /* text-align: center; */
}

.linea-superior {
  display: inline-flex;
  width: 100%;
  margin-bottom: 1.4rem;
}

.titulo {
  margin-bottom: 1rem;
}

.autor {
  text-align: end;
  margin-left: auto;
  font-style: italic;
}

.encuesta-container {
 margin-bottom: 1rem;
}

.encuesta-opcion {
  position: relative;
  /* width: 20rem; */
  height: 1.6rem;
  /* display: inline-flex; */
  margin: 0 0 .8rem 0;
}

.encuesta-opcion-texto {
  display: inline-block;
  position: sticky; /* TODO: Ver qué hace esto y cambiar si es necesario. Ahora está puesto para evitar que el valor por defecto impida que se aploque el z-index */
  margin-left: .5rem;
  margin-top: .1rem;
  font-size: 85%;
  z-index: 10;
}

.encuesta-opcion-barra {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #d49c6b;
  border-radius: .5rem 0 0 .5rem;
  z-index: 5;
}

.encuesta-opcion-barra--fondo {
  width: 20rem;
  padding-top: .1rem;
  background-color: #C1C8C7;
  border-radius: 0.5rem;
  font-size: 85%;
  z-index: 1;
}

.porcentaje {
  width: 20rem;
  padding-top: .1rem;
  padding-right: .5rem;
  background-color: transparent;
  font-size: 85%;
  z-index: 15;
}

.interacciones {
  margin-top: 1rem;
  display: inline-flex;
}

.likes {
  text-align: center;
  height: 1.9rem;
  width: 1.9rem;
  padding: .25rem;
  color: #d49c6b;
}

.comentarios {
  text-align: center;
  height: 1.9rem;
  width: 1.9rem;
  padding: .25rem;
  color: #d49c6b;
}

.num {
  font-size: 90%;
  padding-top: .4rem;
  margin-left: .2rem;
  margin-right: 1rem;
}

</style>