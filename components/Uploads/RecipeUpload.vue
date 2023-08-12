<template>
  <div v-if="newRecipeState.loading === 'waiting'">
    <div class="section">
      <h5>Título</h5>
      <b-row>
        <b-col class="col-md-8">
          <b-form-group
            id="fieldset-title"
            class="input-container title-container"
            label-for="input-title"
          >
            <b-form-input
              id="input-title"
              class="input input-title"
              placeholder="Escribir título..."
              v-model="postRecipeData.title"
              trim
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="col-md-4 subir-imagen">
          <label class="base-btn base-btn--img">
            <input type="file" :v-model="foto" />
            <span class="fa fa-camera-retro fa-lg" aria-hidden="true"></span>
          </label>
        </b-col>
      </b-row>
    </div>
    <div class="section">
      <h6>
        Tiempo (mins
        <span class="fa fa-clock" aria-hidden="true"></span>)
      </h6>
      <b-form-group
        id="fieldset-time"
        class="input-container time-container"
        label-for="input-time"
        ><b-button class="time-btn"
          ><div class="time-btn-content" @click="sumTime(-5)">-</div></b-button
        >
        <b-form-input
          id="input-time"
          class="input time-input"
          placeholder=""
          v-model="postRecipeData.time"
          trim
          type="number"
          min="0"
          v-click-outside="roundTime"
          onkeydown="return event.keyCode !== 69"
        ></b-form-input
        ><b-button class="time-btn" @click="sumTime(5)"
          ><div class="time-btn-content">+</div></b-button
        >
      </b-form-group>
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
              class="input textarea textarea-descripcion--articulo"
              placeholder=""
              v-model="postRecipeData.description"
              maxlength="530"
              max-rows="8"
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
          v-for="(recipeIngredient, index) in postRecipeData.recipeIngredients"
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
                  class="input input-literal"
                  placeholder="Ingrediente..."
                  v-model="recipeIngredient.text"
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
                  class="input input-cantidad"
                  placeholder="Cantidad..."
                  type="number"
                  v-model="recipeIngredient.amount"
                  trim
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col class="col-md-3">
              <b-form-select
                class="input"
                v-model="recipeIngredient.idUnit"
                :options="unidadesDummy"
              ></b-form-select>
            </b-col>
            <b-col class="col-md-1">
              <button
                class="base-btn base-btn--quitar"
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
          class="base-btn base-btn--anadir"
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
                  class="input textarea"
                  placeholder="Escribir paso..."
                  maxlength="430"
                  max-rows="8"
                  v-model="postRecipeData.steps[index]"
                  trim
                ></b-form-textarea>
              </b-form-group>
            </b-col>
            <b-col class="col-md-1">
              <button
                class="base-btn base-btn--quitar"
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
          class="base-btn base-btn--anadir"
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
  <div v-else-if="newRecipeState.loading === 'loading'" class="spinner">
    <span class="fa fa-spinner fa-pulse fa-lg" aria-hidden="true"></span>
  </div>
  <div v-else-if="newRecipeState.loading === 'loaded'">
    Wow! Eso tiene buena pinta! Se ha añadido a tus recetas
  </div>
  <div v-else-if="newRecipeState.loading === 'error'">
    Ups, parece que algo falló. {{ newRecipeState.error }}
    <b-button @click="setLoadingToWaiting()">Reintentar</b-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import vClickOutside from "v-click-outside";
export default {
  name: "RecipeUpload",
  directives: {
    clickOutside: vClickOutside.directive,
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
      tiempo: 0,
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
    ...mapState("uploads", ["newRecipeState"]),
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
    EliminaPaso(step) {
      if (this.postRecipeData.steps.length <= 1) return;

      const index = this.postRecipeData.steps.indexOf(step);
      if (index > -1) {
        this.postRecipeData.steps.splice(index, 1);
      }
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
    setLoadingToWaiting() {
      this.loading = "waiting";
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
/* base-btn--aceptar es para los botones "Atrás" y "Aceptar que voy a quitar" */
.base-btn--aceptar {
  margin-top: 4rem;
  width: 100%;
}
.subir-imagen {
  text-align: center;
}
input[type="file"] {
  display: none;
}
.input-container--paso {
  width: 100%;
}
.textarea::-webkit-scrollbar {
  display: none;
}
.spinner {
  text-align: center;
  font-size: 180%;
}
</style>