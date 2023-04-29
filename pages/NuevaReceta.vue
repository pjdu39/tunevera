<template>
  <div class="mainBox">
    <div class="section">
      <h6>Título</h6>
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
              placeholder="Título..."
              v-model="tittle"
              trim
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="col-md-4 subir-imagen">
          <label class="anadir-btn anadir-btn--img">
            <input type="file" :v-model="foto" />
            <span class="fa fa-cloud-upload fa-lg" aria-hidden="true"></span>
          </label>
        </b-col>
      </b-row>
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
              class="textarea-descripcion"
              placeholder="(opcional)"
              v-model="descripcion"
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
          v-for="(ingrediente, index) in ingredientes"
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
                  v-model="ingrediente.literal"
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
                  v-model="ingrediente.cantidad"
                  trim
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col class="col-md-3">
              <b-form-select
                v-model="ingrediente.unidad"
                :options="unidadesDummy"
              ></b-form-select>
            </b-col>
            <b-col class="col-md-1">
              <button
                class="anadir-btn anadir-btn--quitar"
                @click="EliminaIngrediente(ingrediente)"
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
          v-for="(paso, index) in pasos"
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
                  v-model="paso.contenido"
                  trim
                ></b-form-textarea>
              </b-form-group>
            </b-col>
            <b-col class="col-md-1">
              <button
                class="anadir-btn anadir-btn--quitar"
                @click="EliminaPaso(paso)"
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
          <button class="anadir-btn anadir-btn--aceptar" @click="Aceptar()">
            Aceptar
          </button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tittle: null,
      foto: null,
      ingredientes: [{ literal: null, cantidad: 0, unidad: null }],
      pasos: [{ numero: 1, contenido: '' }],
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
    PuedeAnadirIngrediente() {
      let result = true;
      this.ingredientes.forEach((x) => {
        if (!x.literal) result = false;
        if (!x.cantidad) result = false;
        if (!x.unidad) result = false;
      });

      return result;
    },
    PuedeAnadirPaso() {
      let result = true;
      this.pasos.forEach((x) => {
        if (!x.contenido) result = false;
      });

      return result;
    },
  },
  methods: {
    OtroIngrediente() {
      if (this.PuedeAnadirIngrediente) {
        this.ingredientes.push({ literal: null, cantidad: 0, unidad: null });
      }
    },
    EliminaIngrediente(ingrediente) {
      if (this.ingredientes.length <= 1) return;
      const index = this.ingredientes.indexOf(ingrediente);
      if (index > -1) {
        this.ingredientes.splice(index, 1);
      }
    },
    OtroPaso() {
      if (this.PuedeAnadirPaso) {
        let numero = this.pasos.length;
        this.pasos.push({ numero: numero, contenido: "" });
      }
    },
    EliminaPaso(paso) {
      if (this.pasos.length <= 1) return;
      const index = this.pasos.indexOf(paso);
      if (index > -1) {
        this.pasos.splice(index, 1);
      }
    },
    ValidaTitulo() {
      // Valida cantidad de caracteres
    },
    ValidaPaso() {
      // Valida cantidad de caracteres
    },
    Resolve() {
      if (!this.PuedeAnadirIngrediente) {
        if (this.ingredientes.length <= 1) return;
        this.ingredientes.splice(this.ingredientes.length - 1, 1);
      }
      if (!this.PuedeAnadirPaso) {
        if (this.pasos.length <= 1) return;
        this.pasos.splice(this.pasos.length - 1, 1);
      }
    },
    Aceptar() {
      this.Resolve();
      // Luego hace el POST a la api
    },
    Atras() {},
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
.tittle-container {
  width: 100%;
}
.input-tittle {
  font-size: 120%;
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
</style>