<template>
  <div v-if="loading === 'waiting'"></div>
  <div v-else-if="loading === 'loading'"></div>
  <div v-else-if="loading === 'loaded'">
    <div class="section">
      <h5>Pregunta</h5>
      <b-row>
        <b-col class="col-md-11">
          <b-form-group
            id="fieldset-title"
            class="input-container title-container"
            label-for="input-title"
          >
            <b-form-input
              id="input-title"
              class="input-title"
              placeholder="¿Qué quieres preguntar?"
              v-model="postRecipeData.title"
              trim
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </div>
    <div class="section">
      <h6>Opciones</h6>
      <div>
        <b-list-group-item
          class="input-container"
          v-for="(respuesta, index) in respuestas"
          :key="index"
        >
          <b-row>
            <b-col class="col-md-11">
              <b-form-group
                id="fieldset-literal"
                class=""
                label-for="input-literal"
              >
                <b-form-input
                  id="input-literal"
                  class="input-literal"
                  placeholder="Escribir opción..."
                  v-model="respuesta.literal"
                  trim
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col class="col-md-1">
              <button
                class="anadir-btn anadir-btn--quitar"
                @click="EliminaRespuesta(respuesta)"
              >
                <span class="fa fa-times" aria-hidden="true"></span>
              </button>
            </b-col>
          </b-row>
        </b-list-group-item>
      </div>
      <div>
        <button
          class="anadir-btn anadir-btn--ingrediente"
          @click="OtraRespuesta()"
          :disabled="!PuedeAnadirRespuesta"
        >
          <span class="fa fa-plus fa-lg" aria-hidden="true"></span>
        </button>
      </div>
    </div>
    <div class="section-end">
      <b-row>
        <b-col class="col-md-6">
          <button class="anadir-btn anadir-btn--aceptar" @click="Atras()">
            Atrás
          </button>
        </b-col>
        <b-col class="col-md-6">
          <button class="anadir-btn anadir-btn--aceptar" @click="Aceptar()">
            Aceptar
          </button>
        </b-col>
      </b-row>
    </div>
  </div>
  <div v-else-if="loading === 'error'"></div>
</template>

<script>
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
.time-container {
  margin-top: 1rem;
}
.time-input {
  display: inline-block;
  text-align: center;
  width: 3.2rem;
  padding: 0 0.8rem 0 0.8rem;
  margin-right: 0.25rem;
}
.time-btn {
  font-size: 130%;
  padding: 0rem;
  margin: 0 0.3rem 0.25rem 0.3rem;
  height: 2.1rem;
  width: 2.1rem;
  border-radius: 1rem;
  color: #252b31;
  background-color: #f2f4f5;
  border: 1px solid rgba(249, 249, 249);
  box-shadow: 5px 5px 3px -1px #252b310a, -4px -4px 4px -2px rgb(255, 255, 255),
    -10px -10px 30px -80px #252b31 inset;
}
/* Sobreescribo la clase btn de bootstrapvue, pero solo cuando anida a mi clase.
   Tomar de referencia para evitar sobreescribir masivamente como hice en custom.scss */
.btn.time-btn:active {
  color: #252b31;
  background-color: #f2f4f5;
  border: 1px solid rgba(249, 249, 249);
  box-shadow: 5px 5px 2px -1px #252b310a inset,
    -4px -4px 4px -2px rgb(255, 255, 255) inset !important;
}
.time-btn-content {
  margin: -0.3rem 0 0 0;
  font-weight: bold;
}
.input-title {
  font-size: 110%;
}
.anadir-btn {
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
.anadir-btn:hover {
  color: #ffffff;
}
.anadir-btn:active {
  color: #ffffff;
  box-shadow: -1px -1px 6px -3px #575757, 1px 1px 1px 0.5px #70340041 inset,
    1px 1px 6px 1.5px rgb(255, 255, 255),
    -0.4px -0.4px 1px 0.5px rgb(255, 216, 165) inset;
}
.anadir-btn--img {
  text-align: center;
  width: 4rem;
}
.anadir-btn--ingrediente {
  width: 2.5rem;
}
.anadir-btn--paso {
  width: 2.5rem;
}
.anadir-btn--quitar {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 2rem;
  padding: 0.37rem 0.35rem 0.4rem 0.4rem;
  box-shadow: 1px 1px 4px 0px #252b31;
  color: #eaedee;
  background-color: #d34545;
}
.anadir-btn--aceptar {
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
.input-container--ingrediente {
}
.input-container--paso {
  width: 100%;
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