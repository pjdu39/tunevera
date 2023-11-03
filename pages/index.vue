<template>
  <div class="tablon-container">
    <!-- <main></main> -->
    <BListGroupItem
      class="elemento"
      v-for="(element, index) in elements"
      :key="index"
    >
      <div class="linea-superior">
        <div class="tipo-elemento">{{ element.type }}</div>
        <div class="autor">
          por <b>{{ element.author }}</b>
        </div>
      </div>
      <div class="linea-superior">
        <h4 class="titulo">{{ element.title }}</h4>
        <div v-if="element.type === 'Receta'" class="tiempo">
          {{ element.time }}min
          <font-awesome-icon icon="fa fa-clock" aria-hidden="true" />
        </div>
      </div>
      <div>{{ element.description }}</div>
      <div v-if="element.type === 'Encuesta'" class="encuesta-container">
        <div v-for="option in element.options" :key="option.id">
          <div class="encuesta-opcion">
            <div class="encuesta-opcion-texto">{{ option.answer }}</div>
            <div
              class="encuesta-opcion-barra encuesta-opcion-barra--rellena"
              :style="
                'width: ' +
                calculaBarraEncuesta(element.options, option) +
                'rem;'
              "
            ></div>
            <!-- Por algún motivo desconocido, en este div estoy obligado a aplicar el text-align en el style, ya que no se aplica en la clase -->
            <div
              class="encuesta-opcion-barra encuesta-opcion-barra--fondo"
            ></div>
            <div
              class="encuesta-opcion-barra porcentaje"
              style="text-align: end"
            >
              {{ calculaPorcentajeEncuesta(element.options, option) }} %
            </div>
          </div>
        </div>
      </div>
      <div class="interacciones">
        <div class="likes">
          <font-awesome-icon icon="fa fa-heart" aria-hidden="true" />
        </div>
        <div class="num">{{ element.likes }}</div>
        <div class="comentarios">
          <font-awesome-icon icon="fa fa-comment" aria-hidden="true" />
        </div>
        <!-- <div class="num">{{ element.comentarios.length }}</div> -->
      </div>
    </BListGroupItem>
  </div>
</template>

<script>
import { useBoardStore } from "~/store/board.js";
export default {
  data() {
    return {
      elements: [
        {
          type: "Receta",
          title: "Cocido",
          time: 35,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit",
          author: "carlos",
          likes: 67,
          comments: [
            { usuario: "Pepe Hamond", texto: "Lorem ipsum dolor sit amet" },
            {
              usuario: "Carlos",
              texto:
                "Consectetur adipisicing elit. Dolor sit amet consectetur adipisicing",
            },
          ],
        },
        {
          type: "Encuesta",
          title: "Qué guiso queréis que os traiga esta semana?",
          time: null,
          description: null,
          author: "aka_shiro",
          likes: 209,
          comments: [],
          options: [
            { id: 1, answer: "Lentejas", votes: 109 },
            { id: 2, answer: "Caldo gallego", votes: 135 },
            { id: 3, answer: "Guiso de pollo", votes: 21 },
            { id: 4, answer: "Ramen", votes: 287 },
          ],
        },
        {
          type: "Receta",
          title: "Galletas",
          time: 50,
          description: "Lorem ipsum dolor sit amet adipisicing elit",
          author: "andrea",
          likes: 216,
          comments: [
            {
              usuario: "Pepe Hamond",
              texto:
                "Consectetur adipisicing elit. Dolor sit amet ipsum dolor sit consectetur adipisicing hahah",
            },
            { usuario: "Carlos", texto: "Lorem ipsum dolor sit amet." },
            {
              usuario: "Andrea",
              texto:
                "Consectetur elit adipisicing. Dolor sit amet consectetur adipisicing",
            },
          ],
        },
        {
          type: "Discusión",
          title: "Cilantro o no?",
          time: null,
          description:
            "Qué opinais del uso del cilantro en la cocina latino americana?",
          author: "sara_rivas_",
          likes: 13,
          comments: [
            {
              usuario: "Pepe Hamond",
              texto:
                "Lorem ipsum dolor sit consectetur adipisicing hahah. sit amet.",
            },
            {
              usuario: "Andrea",
              texto:
                "Consectetur elit adipisicing. Dolor sit amet consectetur adipisicing",
            },
          ],
        },
        {
          type: "Encuesta",
          title: "Cocido con o sin patata?",
          time: null,
          description: null,
          author: "misco_jones",
          likes: 693,
          comments: [],
          options: [
            { id: 1, answer: "Con patata", votes: 38 },
            { id: 2, answer: "Sin patata", votes: 856 },
          ],
        },
      ],
    };
  },
  computed: {
    // TODO: Considerar meter estos elementos de la store en un solo elemento que contenga {data, loading, error} como en uploads.
    // También habría que cambiarlo en la store.
    data() {
      const store = useBoardStore();
      return store.data;
    },
    loading() {
      const store = useBoardStore();
      return store.loading;
    },
    error() {
      const store = useBoardStore();
      return store.error;
    },
  },
  created() {
    this.fetchBoardElements()(50);
  },
  watch: {
    data(newVal, oldVal) {
      if (this.loading === "loaded" && this.error === null)
        this.elements.push(...newVal);
    },
  },
  methods: {
    fetchBoardElements() {
      const store = useBoardStore();
      return store.fetchBoardElements;
    },
    calculaBarraEncuesta(pollOptions, option) {
      let porcentaje = this.calculaPorcentajeEncuesta(pollOptions, option);
      let result = porcentaje / 5; // Divide entre 5 porque la longitud de la barra es 20rem
      return result.toFixed(1);
    },
    calculaPorcentajeEncuesta(pollOptions, option) {
      let totalVotes = pollOptions.reduce((acum, x) => acum + x.votes, 0);
      let result = (option.votes / totalVotes) * 100;

      if (isNaN(result)) return 0;

      return result % 1 !== 0 ? result.toFixed(1) : result.toFixed(0);
    },
  },
};
</script>
<style scoped lang="scss">
.tablon-container {
  margin: auto;
  width: 44rem;
}

.elemento {
  margin-bottom: 2rem;
  background-color: #eaedee;
  border: 2px solid white;
  border-radius: 1.7rem;
  box-shadow: 5px 5px 20px -15px #252b31, -3px -3px 10px 2px rgb(248, 248, 248),
    10px 10px 100px -20px rgb(248, 248, 248) inset,
    -10px -10px 30px -40px #252b31 inset;

  /*
  background-color: #eaedee;
  border-radius: 1rem;
  box-shadow: 1.5px 1.5px 30px -10px #252b31;
  */
}

.tipo-elemento {
  display: inline-block;
  color: white;
  background-color: #c1c8c7;
  font-size: 110%;
  font-weight: 400;
  letter-spacing: 0.3rem;
  margin-left: -0.3rem;
  padding: 0 0.6rem 0.1rem 0.6rem;
  border-radius: 2rem;
  /* text-align: center; */
}

.linea-superior {
  display: inline-flex;
  width: 100%;
  margin-bottom: 1.4rem;
}

.titulo {
  margin-top: 0.4rem;
}

.tiempo {
  color: #c1c8c7;
  font-size: 160%;
  text-align: end;
  margin-left: auto;
}

.autor {
  text-align: end;
  margin-left: auto;
  font-style: italic;
}

.encuesta-container {
  /* color: white; */
  letter-spacing: 0.05rem;
  margin-top: 0rem;
  margin-bottom: 1rem;
}

.encuesta-opcion {
  position: relative;
  /* width: 20rem; */
  height: 1.6rem;
  /* display: inline-flex; */
  margin: 0 0 0.8rem 0;
}

.encuesta-opcion-texto {
  display: inline-block;
  position: sticky; /* TODO: Ver qué hace esto y cambiar si es necesario. Ahora está puesto para evitar que el valor por defecto impida que se aplique el z-index */
  margin-left: 0.5rem;
  margin-top: 0.1rem;
  font-size: 85%;
  z-index: 10;
}

.encuesta-opcion-barra {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  background-color: $color-primary;
  border-radius: 0.5rem 0 0 0.5rem;
  z-index: 5;
}

.encuesta-opcion-barra--rellena {
  box-shadow: 1.5px 1.5px 5px -4px rgb(0, 0, 0),
    -2px -2px 5px 0px rgb(248, 248, 248, 0.8),
    -0.2px -1.5px 3px -4px rgb(0, 0, 0) inset,
    2px 2px 2px -1.2px rgb(248, 248, 248, 0.8) inset;
}

.encuesta-opcion-barra--fondo {
  width: 20rem;
  padding-top: 0.1rem;
  background-color: #d7d9da;
  box-shadow: 3px 3px 5px -4px rgb(0, 0, 0) inset,
    -0.1px -0.1px 2px 1.5px rgb(248, 248, 248, 0.6) inset;
  border: 1px solid #d7d9da;
  border-radius: 0.5rem;
  font-size: 85%;
  z-index: 1;
}

.porcentaje {
  width: 20rem;
  padding-top: 0.1rem;
  padding-right: 0.5rem;
  background-color: transparent;
  border-radius: 0.5rem;
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
  padding: 0.25rem;
  color: $color-primary;
}

.comentarios {
  text-align: center;
  height: 1.9rem;
  width: 1.9rem;
  padding: 0.25rem;
  color: $color-primary;
}

.num {
  font-size: 90%;
  padding-top: 0.4rem;
  margin-left: 0.2rem;
  margin-right: 1rem;
}

@media (max-width: 800px) {
  .tablon-container {
    margin: auto;
    width: 80%;
  }
}
</style>