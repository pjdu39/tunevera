<template>
  <div v-if="newDiscussionState.loading === 'waiting'">
    <div class="section">
      <h5>Tema</h5>
      <b-row>
        <b-col class="col-md-11">
          <b-form-group
            id="fieldset-title"
            class="input-container title-container"
            label-for="input-title"
          >
            <b-form-input
              id="input-title"
              class="input input-title"
              placeholder="¿Sobre qué quieres hablar?"
              v-model="postDiscussionData.title"
              trim
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </div>
    <div class="section">
      <h6>Cuerpo</h6>
      <b-row>
        <b-col class="col-md-11">
          <b-form-group
            id="fieldset-cuerpo"
            class="form-group-cuerpo"
            label-for="input-cuerpo"
          >
            <b-form-textarea
              id="input-cuerpo"
              class="input textarea-cuerpo"
              placeholder="Cuerpo de texto (opcional)"
              v-model="postDiscussionData.description"
              trim
            ></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
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
  <div v-else-if="newDiscussionState.loading === 'loading'" class="spinner">
    <span class="fa fa-spinner fa-pulse fa-lg" aria-hidden="true"></span>
  </div>
  <div v-else-if="newDiscussionState.loading === 'loaded'">
    Artículo publicado con éxito.
  </div>
  <div v-else-if="newDiscussionState.loading === 'error'">Error</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "DiscussionUpload",
  data() {
    return {
      postDiscussionData: {
        title: "",
        description: "",
      },
    };
  },
  computed: {
    ...mapState("uploads", ["newDiscussionState"]),
  },
  methods: {
    ...mapActions("uploads", ["postDiscussion"]),
    setLoadingToWaiting() {
      // TODO: Esto no funciona, crear una función en la store para manejar el loading si se requiere hacerlo.
      /* this.loading = "waiting"; */
    },
    Aceptar() {
      // TODO: Validaciones de contenido sobre postPollData
      this.postDiscussion(this.postDiscussionData);
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
.base-btn--aceptar {
  margin-top: 4rem;
  width: 100%;
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