<template>
  <div v-if="newPollState.loading === 'waiting'">
    <div class="section">
      <h5>Pregunta</h5>
      <b-row>
        <b-col class="col-md-11">
          <BFormGroup
            id="fieldset-title"
            class="input-container title-container"
            label-for="input-title"
          >
            <BFormInput
              id="input-title"
              class="input input-title"
              placeholder="¿Qué quieres preguntar?"
              v-model="postPollData.title"
              trim
            ></BFormInput>
          </BFormGroup>
        </b-col>
      </b-row>
    </div>
    <div class="section">
      <h6>Opciones</h6>
      <div>
        <BListGroupItem
          class="input-container"
          v-for="(option, index) in postPollData.options"
          :key="index"
        >
          <b-row>
            <b-col class="col-md-11">
              <BFormGroup
                id="fieldset-literal"
                class=""
                label-for="input-literal"
              >
                <BFormInput
                  id="input-literal"
                  class="input input-literal"
                  placeholder="Escribir opción..."
                  v-model="postPollData.options[index]"
                  trim
                ></BFormInput>
              </BFormGroup>
            </b-col>
            <b-col class="col-md-1">
              <button
                class="base-btn base-btn--quitar"
                @click="EliminaRespuesta(option)"
              >
                <font-awesome-icon icon="fa fa-times" aria-hidden="true" />
              </button>
            </b-col>
          </b-row>
        </BListGroupItem>
      </div>
      <div>
        <button
          class="base-btn base-btn--anadir"
          @click="OtraRespuesta()"
          :disabled="!PuedeAnadirRespuesta"
        >
          <font-awesome-icon
            icon="fa fa-plus"
            class="fa-lg"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
    <div class="section-end">
      <b-row>
        <b-col class="col-md-6">
          <button class="base-btn base-btn--aceptar" @click="Atras()">
            Atrás
          </button>
        </b-col>
        <b-col class="col-md-6">
          <button class="base-btn base-btn--aceptar" @click="Aceptar()">
            Aceptar
          </button>
        </b-col>
      </b-row>
    </div>
  </div>
  <div v-else-if="newPollState.loading === 'loading'" class="spinner">
    <font-awesome-icon
      icon="fa fa-spinner"
      class="fa-pulse fa-lg"
      aria-hidden="true"
    />
  </div>
  <div v-else-if="newPollState.loading === 'loaded'">Encuesta publicada.</div>
  <div v-else-if="newPollState.loading === 'error'">Error</div>
</template>

<script>
import { useUploadsStore } from "~/store/uploads.js";
export default {
  name: "PollUpload",
  data() {
    return {
      postPollData: {
        title: "",
        description: "", // TODO: Darle una vuelta. Por ahora creo que lo voy a borrar.
        options: [""],
      },
    };
  },
  computed: {
    newPollState() {
      const store = useUploadsStore();
      return store.newPollState;
    },
    PuedeAnadirRespuesta() {
      let result = true;
      this.postPollData.options.forEach((x) => {
        if (!x) result = false;
      });

      return result;
    },
  },
  methods: {
    postPoll() {
      const store = useUploadsStore();
      return store.postPoll;
    },
    OtraRespuesta() {
      if (this.PuedeAnadirRespuesta) {
        this.postPollData.options.push("");
      }
    },
    Resolve() {
      if (!this.PuedeAnadirRespuesta) {
        if (this.postPollData.options.length > 1)
          this.postPollData.options.splice(
            this.postPollData.options.length - 1,
            1
          );
      }
    },
    setLoadingToWaiting() {
      // TODO: Esto no funciona, crear una función en la store para manejar el loading si se requiere hacerlo.
      /* this.loading = "waiting"; */
    },
    Aceptar() {
      this.Resolve();

      // TODO: Validaciones de contenido sobre postPollData
      this.postPoll(this.postPollData);
    },
    // TODO: Borrar la función y el botón. Ya no tienen sentido
    Atras() {
      // this.postPoll(this.postPollData);
    },
  },
};
</script>

<style scoped>
.input {
  border: none;
  background-color: #f2f4f5;
  border-radius: 0.7rem;
  box-shadow: 2px 2px 3px 1px #55555525 inset,
    -1.3px -1.3px 9px 2px rgb(255, 255, 255) inset;
}
.title-container {
  width: 100%;
}
.input-title {
  font-size: 110%;
}
.base-btn {
  padding: 0.4rem 0.5rem 0.4rem 0.4rem;
  margin-right: 0rem;
  margin-bottom: 1rem;

  /* background-color: #d49c6b;
  box-shadow: 2px 2px 6px 0px #252b31;
  color: #eaedee;
  border-radius: 1rem;
  border-style: none; */

  background-color: #d49c6b;
  /* TODO: Invertir los inset tratando de conseguir el mismo resultado. Con los inset simulando los bordes queda fatal al pulsar los botones */
  box-shadow: 1px 1px 6px -3px #575757, -1px -1px 1px 0.5px #70340071 inset,
    -1px -1px 6px 1.5px rgb(255, 255, 255),
    0.4px 0.4px 1px 0.5px rgb(255, 216, 165) inset;
  color: #eaedee;
  border-radius: 0.9rem;
  border-style: none;
}
.base-btn:hover {
  color: #ffffff;
}
.base-btn:active {
  color: #ffffff;
  box-shadow: -1px -1px 6px -3px #575757, 1px 1px 1px 0.5px #70340041 inset,
    1px 1px 6px 1.5px rgb(255, 255, 255),
    -0.4px -0.4px 1px 0.5px rgb(255, 216, 165) inset;
}
.base-btn--img {
  text-align: center;
  width: 4rem;
}
.base-btn--anadir {
  width: 2.5rem;
}
.base-btn--quitar {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 2rem;
  padding: 0.37rem 0.35rem 0.4rem 0.4rem;
  box-shadow: 1px 1px 4px 0px #252b31;
  color: #eaedee;
  background-color: #d34545;
}
.base-btn--aceptar {
  margin-top: 4rem;
  width: 100%;
}
.subir-imagen {
  text-align: center;
}
.subir-imagen:hover {
}
input[type="file"] {
  display: none;
}
.textarea::-webkit-scrollbar {
  display: none;
}
.textarea-cuerpo {
  height: 7rem;
}
.spinner {
  text-align: center;
  font-size: 180%;
}
</style>