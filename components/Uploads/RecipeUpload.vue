<template>
  <div v-if="newRecipeState.loading === 'waiting'">
    <div class="section">
      <h5>Título</h5>
      <b-row>
        <b-col class="col-md-8">
          <BFormGroup
            id="fieldset-title"
            class="input-container title-container"
            label-for="input-title"
          >
            <BFormInput
              id="input-title"
              class="input input-title"
              placeholder="Escribir título..."
              v-model="postRecipeData.title"
              autocomplete="off"
              trim
            ></BFormInput>
          </BFormGroup>
        </b-col>
        <b-col class="col-md-4 subir-imagen">
          <label class="base-btn base-btn--img">
            <input type="file" :v-model="foto" />
            <font-awesome-icon
              icon="fa fa-camera-retro"
              class="fa-lg"
              aria-hidden="true"
            />
          </label>
        </b-col>
      </b-row>
    </div>
    <div class="section">
      <h6>
        Tiempo (mins
        <font-awesome-icon icon="fa fa-clock" aria-hidden="true" />)
      </h6>
      <BFormGroup
        id="fieldset-time"
        class="input-container time-container"
        label-for="input-time"
        ><BButton class="time-btn"
          ><div class="time-btn-content" @click="sumTime(-5)">-</div></BButton
        >
        <BFormInput
          id="input-time"
          class="input time-input"
          placeholder=""
          v-model="postRecipeData.time"
          trim
          type="number"
          min="0"
          autocomplete="off"
          v-click-outside="roundTime"
          onkeydown="return event.keyCode !== 69"
        ></BFormInput
        ><BButton class="time-btn" @click="sumTime(5)"
          ><div class="time-btn-content">+</div></BButton
        >
      </BFormGroup>
    </div>
    <div class="section">
      <h6>Descripción</h6>
      <b-row>
        <b-col class="col-md-11">
          <BFormGroup
            id="fieldset-descripcion"
            class="form-group-descripcion"
            label-for="input-descripcion"
          >
            <BFormTextarea
              id="input-descripcion"
              class="input textarea textarea-descripcion--articulo"
              placeholder=""
              v-model="postRecipeData.description"
              maxlength="530"
              max-rows="8"
              trim
            ></BFormTextarea>
          </BFormGroup>
        </b-col>
      </b-row>
    </div>
    <div class="section">
      <h6>Ingredientes</h6>
      <div>
        <BListGroupItem
          class="input-container"
          v-for="(recipeIngredient, index) in postRecipeData.recipeIngredients"
          :key="index"
        >
          <b-row>
            <b-col class="col-md-6">
              <BFormGroup
                id="fieldset-literal"
                class=""
                label-for="input-literal"
              >
                <BFormInput
                  id="input-literal"
                  class="input input-literal"
                  placeholder="Ingrediente..."
                  v-model="recipeIngredient.text"
                  @input="pointTo(index)"
                  @keydown="handleKeydown"
                  autocomplete="off"
                  trim
                ></BFormInput>
                <div class="dropdown-container">
                  <div
                    v-if="showDropdown && index === currentInput"
                    class="dropdown-ingredients"
                    v-click-outside="onClickOutside"
                  >
                    <div
                      v-for="(s, i) in suggestions"
                      :key="s"
                      :class="{ highlighted: i === highlightedIndex }"
                      @click="selectSuggestion(s)"
                    >
                      {{ s }}
                    </div>
                  </div>
                </div>
              </BFormGroup>
            </b-col>
            <b-col class="col-md-2">
              <BFormGroup
                id="fieldset-cantidad"
                class=""
                label-for="input-cantidad"
              >
                <BFormInput
                  id="input-cantidad"
                  class="input input-cantidad"
                  placeholder="Cantidad..."
                  type="number"
                  v-model="recipeIngredient.amount"
                  trim
                ></BFormInput>
              </BFormGroup>
            </b-col>
            <b-col class="col-md-3">
              <BFormSelect
                class="input"
                v-model="recipeIngredient.idUnit"
                :options="getUnitsState.data"
              ></BFormSelect>
            </b-col>
            <b-col class="col-md-1">
              <button
                class="base-btn base-btn--quitar"
                @click="EliminaIngrediente(recipeIngredient)"
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
          @click="OtroIngrediente()"
          :disabled="!PuedeAnadirIngrediente"
        >
          <font-awesome-icon
            icon="fa fa-plus"
            class="fa-lg"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
    <div class="section">
      <h6>Pasos</h6>
      <div>
        <BListGroupItem
          class="input-container input-container--paso"
          v-for="(step, index) in postRecipeData.steps"
          :key="index"
        >
          <b-row>
            <b-col class="col-md-11">
              <BFormGroup
                id="fieldset-paso"
                class="form-group-paso"
                label-for="input-paso"
              >
                <BFormTextarea
                  id="input-paso"
                  class="input textarea"
                  placeholder="Escribir paso..."
                  maxlength="430"
                  max-rows="8"
                  v-model="postRecipeData.steps[index]"
                  trim
                ></BFormTextarea>
              </BFormGroup>
            </b-col>
            <b-col class="col-md-1">
              <button
                class="base-btn base-btn--quitar"
                @click="EliminaPaso(step)"
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
          @click="OtroPaso()"
          :disabled="!PuedeAnadirPaso"
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
  <div v-else-if="newRecipeState.loading === 'loading'" class="spinner">
    <font-awesome-icon
      icon="fa fa-spinner"
      class="fa-pulse fa-lg"
      aria-hidden="true"
    />
  </div>
  <div v-else-if="newRecipeState.loading === 'loaded'">
    Wow! Eso tiene buena pinta! Se ha añadido a tus recetas
  </div>
  <div v-else-if="newRecipeState.loading === 'error'">
    Ups, parece que algo falló. {{ newRecipeState.error }}
    <BButton @click="setLoadingToWaiting()">Reintentar</BButton>
  </div>
</template>

<script>
import { useUploadsStore } from "~/store/uploads.js";
import vClickOutside from "v-click-outside";
export default {
  name: "RecipeUpload",
  // TODO: Probar a borrar esto, el click-outside ya lo tiene el padre -> pages/Uploads.vue
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

      currentIngSearch: null,
      ingredientSuggestionsDummy: [
        { value: 1, text: "patata" },
        { value: 2, text: "pera" },
        { value: 3, text: "sal" },
      ],
      currentInput: 0,
      highlightedIndex: -1,
      showDropdown: false,
    };
  },
  computed: {
    newRecipeState() {
      const store = useUploadsStore();
      return store.newRecipeState;
    },
    getUnitsState() {
      const store = useUploadsStore();
      return store.getUnitsState;
    },
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

    suggestions() {
      return this.ingredientSuggestionsDummy
        .map((s) => s.text)
        .filter((s) => s.includes(this.currentIngSearch));
    },
  },
  mounted() {
    this.fetchUnits();
  },
  methods: {
    postRecipe() {
      const store = useUploadsStore();
      return store.postRecipe;
    },
    fetchUnits() {
      const store = useUploadsStore();
      return store.fetchUnits;
    },
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
      if (!this.postRecipeData.time) this.postRecipeData.time = 0;
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
      // TODO: Esto no funciona, crear una función en la store para manejar el loading si se requiere hacerlo.
      /* this.loading = "waiting"; */
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

    pointTo(index) {
      // Resetea la sugerencia marcada por el highlight
      this.highlightedIndex = -1;

      this.showDropdown = true;

      /* Indica cuál es el input de ingtrediente actualmente seleccionado para usarlo en las
        posiciones de arrays sin tener que pasárlo como parámetro a cada método que lo usa */
      this.currentInput = index;

      /* Guarda el valor escrito en el input (que se asigna a postRecipeData.recipeIngredients[x] a través
        del v-model) en la variable currentIngSearch que se usa para filtrar las sugerencias en una propiedad computada */
      this.currentIngSearch = this.postRecipeData.recipeIngredients[index].text;

      // TODO: LLamada a la api
    },
    selectSuggestion(suggestion) {
      /* this.suggestionSelected = s.text; */
      this.postRecipeData.recipeIngredients[this.currentInput].text =
        suggestion;
      this.showDropdown = false;
    },
    handleKeydown(event) {
      switch (event.key) {
        case "ArrowDown":
          if (this.highlightedIndex < this.suggestions.length - 1) {
            this.highlightedIndex++;
          }
          break;
        case "ArrowUp":
          if (this.highlightedIndex > 0) {
            this.highlightedIndex--;
          }
          break;
        case "Enter":
          if (this.highlightedIndex >= 0) {
            this.selectSuggestion(this.suggestions[this.highlightedIndex]);
          }
          break;
      }
    },
    onClickOutside(event) {
      console.log("im clicking outside!");
      this.showDropdown = false;
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
.dropdown-container {
  position: relative;
}
.dropdown-ingredients {
  position: absolute;
  background-color: white;
  padding: 1rem 0 1rem 1rem;
  width: 100%;
  z-index: 10;
}
.highlighted {
  background-color: #007bff;
  color: white;
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