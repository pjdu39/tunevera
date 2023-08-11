<template>
  <div class="mainBox">
    <b-tabs content-class="mt-3" class="tab-option">
      <div class="page">
        <b-tab title="Receta" @click="cleanData">
          <RecipeUpload />
        </b-tab>
        <b-tab title="Encuesta" @click="cleanData">
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
                <button
                  class="anadir-btn anadir-btn--aceptar"
                  @click="Aceptar()"
                >
                  Aceptar
                </button>
              </b-col>
            </b-row>
          </div>
        </b-tab>
        <b-tab title="Artículo" @click="cleanData">
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
                    class="input-title"
                    placeholder="¿Sobre qué quieres hablar?"
                    v-model="postRecipeData.title"
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
                    class="textarea-cuerpo"
                    placeholder="Cuerpo de texto (opcional)"
                    v-model="descripcion"
                    trim
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          <div class="section-end">
            <b-row>
              <b-col class="col-md-6">
                <button class="anadir-btn anadir-btn--aceptar" @click="Atras()">
                  Atrás
                </button>
              </b-col>
              <b-col class="col-md-6">
                <button
                  class="anadir-btn anadir-btn--aceptar"
                  @click="Aceptar()"
                >
                  Aceptar
                </button>
              </b-col>
            </b-row>
          </div>
        </b-tab>
      </div>
    </b-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import vClickOutside from "v-click-outside";
import DiscussionUpload from "~/components/Uploads/DiscussionUpload.vue";
import PollUpload from "~/components/Uploads/PollUpload.vue";
import RecipeUpload from "~/components/Uploads/RecipeUpload.vue";
export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    DiscussionUpload,
    PollUpload,
    RecipeUpload,
  },
  data() {
    return {
      postRecipeData: {
        title: "",
        description: "",
        time: 0,
        recipeIngredients: [{ text: null, amount: null, idUnit: null }],
        steps: [""],
        tags: [],
      },
      foto: null,
      respuestas: [{ literal: null }],
      descripcion: null,
      unidadesDummy: [
        { value: 1, text: "unidades" },
        { value: 2, text: "kg" },
        { value: 3, text: "gr" },
        { value: 4, text: "L" },
        { value: 5, text: "ml" },
        { value: 6, text: "cucharadas" },
        { value: 7, text: "cucharaditas" },
        { value: 8, text: "tazas" },
        { value: 9, text: "tacitas" },
        { value: 10, text: "libras" },
        { value: 11, text: "onzas" },
      ],
    };
  },
  computed: {
    ...mapState("uploads", ["data", "loading", "error"]),
    PuedeAnadirIngrediente() {
      let result = true;
      this.postRecipeData.recipeIngredients.forEach((x) => {
        if (!x.text) result = false;
        /* if (!x.amount) result = false;
        if (!x.idUnit) result = false; */
      });

      return result;
    },
    PuedeAnadirPaso() {
      let result = true;
      this.postRecipeData.steps.forEach((x) => {
        if (!x) result = false;
      });

      return result;
    },
    PuedeAnadirRespuesta() {
      let result = true;
      this.respuestas.forEach((x) => {
        if (!x.literal) result = false;
      });

      return result;
    },
  },
  methods: {
    ...mapActions("uploads", ["postRecipe"]),
    OtroIngrediente() {
      if (this.PuedeAnadirIngrediente) {
        this.postRecipeData.recipeIngredients.push({
          text: null,
          amount: null,
          idUnit: null,
        });
      }
    },
    OtraRespuesta() {
      if (this.PuedeAnadirRespuesta) {
        this.respuestas.push({ literal: null });
      }
    },
    OtroPaso() {
      console.log(this.postRecipeData.steps);
      if (this.PuedeAnadirPaso) {
        this.postRecipeData.steps.push("");
      }
    },
    EliminaIngrediente(ingredient) {
      if (this.postRecipeData.recipeIngredients.length <= 1) return;
      const index = this.postRecipeData.recipeIngredients.indexOf(ingredient);
      if (index > -1) {
        this.postRecipeData.recipeIngredients.splice(index, 1);
      }
    },
    EliminaRespuesta(respuesta) {
      if (this.respuestas.length <= 1) return;
      const index = this.respuestas.indexOf(respuesta);
      if (index > -1) {
        this.respuestas.splice(index, 1);
      }
    },
    EliminaPaso(step) {
      if (this.postRecipeData.steps.length <= 1) return;

      const index = this.postRecipeData.steps.indexOf(step);
      if (index > -1) {
        this.postRecipeData.steps.splice(index, 1);
      }
    },
    ValidaLongitud(maxLength) {
      // TODO: Probablemente habrá que borrarlo. No es necesario.
      // Valida cantidad de caracteres
    },
    // TODO: Actualmente borra la última posición si hay alguno vacío, en lugar de el que está vacío específicamente. Arreglar.
    Resolve() {
      if (!this.PuedeAnadirIngrediente) {
        if (this.postRecipeData.recipeIngredients.length > 1)
          this.postRecipeData.recipeIngredients.splice(
            this.postRecipeData.recipeIngredients.length - 1,
            1
          );
      }
      if (!this.PuedeAnadirPaso) {
        if (this.postRecipeData.steps.length > 1)
          this.postRecipeData.steps.splice(
            this.postRecipeData.steps.length - 1,
            1
          );
      }
      if (!this.PuedeAnadirRespuesta) {
        if (this.respuestas.length > 1)
          this.respuestas.splice(this.respuestas.length - 1, 1);
      }
    },
    convertTimeToInt(event) {
      this.postRecipeData.time = parseInt(this.postRecipeData.time);
    },
    roundTime() {
      this.convertTimeToInt();

      if (this.postRecipeData.time < 0) this.postRecipeData.time = 0;
      if (this.postRecipeData.time > 999) this.postRecipeData.time = 995;

      this.postRecipeData.time =
        this.postRecipeData.time - (this.postRecipeData.time % 5);
    },
    sumTime(n) {
      this.convertTimeToInt();

      if (this.postRecipeData.time < 0) this.postRecipeData.time = 0;

      const diff = this.postRecipeData.time % n;

      if (n >= 0) {
        this.postRecipeData.time += n - diff;
      } else if (diff === 0) {
        this.postRecipeData.time += n;
      } else {
        this.postRecipeData.time -= diff;
      }
    },
    Aceptar() {
      this.Resolve();

      // TODO: Validaciones de contenido sobre postRecipeData
      this.postRecipe(this.postRecipeData);
    },
    // TODO: Borrar la función y el botón. Ya no tienen sentido
    Atras() {
      // this.postRecipe(this.postRecipeData);
    },
    // TODO: Borrar. Esto sólo tenía sentido antes de separar cada formulario en componentes.
    cleanData() {
      this.title = null;
      this.descripcion = null;
    },
    setLoadingToWaiting() {
      this.loading = "waiting";
    },
  },
};
</script>

<style scoped>
.mainBox {
  margin: auto;
  width: 53rem;

  padding: 1.5rem 2rem 1rem 1.5rem;
  /* background-color: #eaedee;
  border-radius: 1rem;
  box-shadow: 1.5px 1.5px 30px -10px #252b31; */

  background-color: #f2f4f5;
  border: 1px solid rgba(249, 249, 249);
  border-radius: 1.7rem;
  box-shadow: 5px 5px 3px -1px #252b310a, -4px -4px 4px -2px rgb(251, 251, 251),
    -10px -10px 30px -80px #252b31 inset;
}
.page {
  margin-top: 1rem;
}
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