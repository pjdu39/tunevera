<template>
  <div class="mainBox">
    <b-tabs content-class="mt-3" class="tab-option">
      <div class="page">
        <b-tab title="Receta" @click="cleanData">
          <div class="section">
            <h5>Título</h5>
            <b-row>
              <b-col class="col-md-8">
                <b-form-group
                  id="fieldset-tittle"
                  class="input-container tittle-container"
                  label-for="input-tittle"
                >
                  <b-form-input
                    id="input-tittle"
                    class="input-tittle"
                    placeholder="Escribir título..."
                    v-model="postRecipeData.tittle"
                    trim
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col class="col-md-4 subir-imagen">
                <label class="anadir-btn anadir-btn--img">
                  <input type="file" :v-model="foto" />
                  <span
                    class="fa fa-cloud-upload fa-lg"
                    aria-hidden="true"
                  ></span>
                </label>
              </b-col>
            </b-row>
          </div>
          <div class="section">
            <h6>Tiempo</h6>
            <b-form-select
              v-model="postRecipeData.time"
              :options="timeOptions"
              class="tiempo-container"
            ></b-form-select>
            mins <span class="fa fa-clock" aria-hidden="true"></span>
          </div>
          <div class="section">
            <h6>Descripción</h6>
            <b-row>
              <b-col class="col-md-11">
                <b-form-group
                  id="fieldset-descripcion"
                  class="form-group-descripcion"
                  label-for="input-descripcion"
                >
                  <b-form-textarea
                    id="input-descripcion"
                    class="textarea-descripcion--articulo"
                    placeholder="(opcional)"
                    v-model="postRecipeData.description"
                    trim
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          <div class="section">
            <h6>Ingredientes</h6>
            <div>
              <b-list-group-item
                class="input-container"
                v-for="(
                  recipeIngredient, index
                ) in postRecipeData.recipeIngredients"
                :key="index"
              >
                <b-row>
                  <b-col class="col-md-6">
                    <b-form-group
                      id="fieldset-literal"
                      class=""
                      label-for="input-literal"
                    >
                      <b-form-input
                        id="input-literal"
                        class="input-literal"
                        placeholder="Ingrediente..."
                        v-model="recipeIngredient.idIngredient"
                        trim
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col class="col-md-2">
                    <b-form-group
                      id="fieldset-cantidad"
                      class=""
                      label-for="input-cantidad"
                    >
                      <b-form-input
                        id="input-cantidad"
                        class="input-cantidad"
                        placeholder="Cantidad..."
                        type="number"
                        v-model="recipeIngredient.amount"
                        trim
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col class="col-md-3">
                    <b-form-select
                      v-model="recipeIngredient.idUnit"
                      :options="unidadesDummy"
                    ></b-form-select>
                  </b-col>
                  <b-col class="col-md-1">
                    <button
                      class="anadir-btn anadir-btn--quitar"
                      @click="EliminaIngrediente(recipeIngredient)"
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
                @click="OtroIngrediente()"
                :disabled="!PuedeAnadirIngrediente"
              >
                <span class="fa fa-plus fa-lg" aria-hidden="true"></span>
              </button>
            </div>
          </div>
          <div class="section">
            <h6>Pasos</h6>
            <div>
              <b-list-group-item
                class="input-container input-container--paso"
                v-for="(step, index) in postRecipeData.steps"
                :key="index"
              >
                <b-row>
                  <b-col class="col-md-11">
                    <b-form-group
                      id="fieldset-paso"
                      class="form-group-paso"
                      label-for="input-paso"
                    >
                      <b-form-textarea
                        id="input-paso"
                        class="textarea-paso"
                        placeholder="Escribir paso..."
                        v-model="postRecipeData.steps[index]"
                        trim
                      ></b-form-textarea>
                    </b-form-group>
                  </b-col>
                  <b-col class="col-md-1">
                    <button
                      class="anadir-btn anadir-btn--quitar"
                      @click="EliminaPaso(step)"
                    >
                      <span class="fa fa-times" aria-hidden="true"></span>
                    </button>
                  </b-col>
                </b-row>
              </b-list-group-item>
            </div>
            <div>
              <button
                class="anadir-btn anadir-btn--paso"
                @click="OtroPaso()"
                :disabled="!PuedeAnadirPaso"
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
        <b-tab title="Encuesta" @click="cleanData">
          <div class="section">
            <h5>Pregunta</h5>
            <b-row>
              <b-col class="col-md-11">
                <b-form-group
                  id="fieldset-tittle"
                  class="input-container tittle-container"
                  label-for="input-tittle"
                >
                  <b-form-input
                    id="input-tittle"
                    class="input-tittle"
                    placeholder="¿Qué quieres preguntar?"
                    v-model="postRecipeData.tittle"
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
                  id="fieldset-tittle"
                  class="input-container tittle-container"
                  label-for="input-tittle"
                >
                  <b-form-input
                    id="input-tittle"
                    class="input-tittle"
                    placeholder="¿Sobre qué quieres hablar?"
                    v-model="postRecipeData.tittle"
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
export default {
  data() {
    return {
      postRecipeData: {
        tittle: "",
        description: "",
        time: null,
        recipeIngredients: [{ idIngredient: null, amount: null, idUnit: null }],
        steps: [""],
        tags: [],
      },
      foto: null,
      tiempo: 0,
      timeOptions: [
        { value: 0, text: "0" },
        { value: 5, text: "5" },
        { value: 10, text: "10" },
        { value: 15, text: "15" },
        { value: 20, text: "20" },
        { value: 25, text: "25" },
        { value: 30, text: "30" },
        { value: 35, text: "35" },
        { value: 40, text: "40" },
        { value: 45, text: "45" },
        { value: 50, text: "50" },
        { value: 55, text: "55" },
        { value: 60, text: "60" },
        { value: 65, text: "65" },
        { value: 70, text: "70" },
        { value: 75, text: "75" },
        { value: 80, text: "80" },
        { value: 85, text: "85" },
        { value: 90, text: "90" },
        { value: 105, text: "105" },
        { value: 110, text: "110" },
        { value: 115, text: "115" },
        { value: 120, text: "120" },
      ],
      ingredientes: [{ literal: null, cantidad: 0, unidad: null }],
      respuestas: [{ literal: null }],
      pasos: [{ numero: 1, contenido: "" }],
      descripcion: null,
      unidadesDummy: [
        { value: 1, text: "kilogramos" },
        { value: 2, text: "gramos" },
        { value: 3, text: "litros" },
        { value: 4, text: "mililitros" },
        { value: 5, text: "onzas" },
        { value: 6, text: "tazas" },
        { value: 7, text: "cucharadas" },
        { value: 8, text: "cucharaditas" },
        { value: 9, text: "unidades" },
      ],
    };
  },
  computed: {
    ...mapState("uploads", ["data", "loading", "error"]),
    PuedeAnadirIngrediente() {
      let result = true;
      this.postRecipeData.recipeIngredients.forEach((x) => {
        if (!x.idIngredient) result = false;
        if (!x.amount) result = false;
        if (!x.idUnit) result = false;
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
          idIngredient: null,
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
        // TODO: Borrar
        /* let stepNumber = this.postRecipeData.steps.length + 1;
        this.postRecipeData.steps.push({ text: "", stepNumber: stepNumber }); */
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
    Aceptar() {
      this.Resolve();
      // Luego hace el POST a la api
    },
    Atras() {
      this.postRecipe(this.postRecipeData);
    },
    cleanData() {
      this.tittle = null;
      this.descripcion = null;
    },
  },
};
</script>

<style scoped>
.mainBox {
  margin: auto;
  width: 44rem;

  padding: 1.5rem 2rem 1rem 1.5rem;
  background-color: #eaedee;
  border-radius: 1rem;
  box-shadow: 1.5px 1.5px 30px -10px #252b31;
}
.page {
  margin-top: 1rem;
}
.tittle-container {
  width: 100%;
}
.tiempo-container {
  width: 12%;
}
.input-tittle {
  font-size: 110%;
}
.anadir-btn {
  background-color: #d49c6b;
  box-shadow: 2px 2px 6px 0px #252b31;
  color: #eaedee;
  border-radius: 1rem;
  border-style: none;
  padding: 0.4rem 0.5rem 0.4rem 0.4rem;
  margin-right: 0rem;
  margin-bottom: 1rem;
}
.anadir-btn:hover {
  box-shadow: 1px 1px 10px 10px #eaedee;
}
.anadir-btn:active {
  background-color: #5e6668;
  box-shadow: 1px 1px 5px 2px #f6fafb;
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
.textarea-paso {
  height: 6rem;
}
.textarea-cuerpo {
  height: 7rem;
}
</style>