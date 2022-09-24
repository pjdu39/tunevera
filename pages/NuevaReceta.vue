<template>
  <div class="borrar-box">
    <div class="section1">
      <b-row>
        <b-col class="col-md-7">
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
        <b-col class="col-md-5">
          <label class="subir-imagen">
            <input type="file" :v-model="foto" />
            Subir imagen
          </label>
        </b-col>
      </b-row>
    </div>
    <div class="section2">
      <b-row>
        <b-col class="col-md-6">
          <b-form-group
            id="fieldset-ingrediente"
            class="input-container ingrediente-container"
            label-for="input-ingrediente"
          >
            <b-form-input
              id="input-ingrediente"
              class="input-ingrediente"
              placeholder="Ingrediente..."
              v-model="ingrediente"
              trim
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="col-md-3">
          <b-form-group
            id="fieldset-cantidad"
            class="input-container cantidad-container"
            label-for="input-cantidad"
          >
            <b-form-input
              id="input-cantidad"
              class="input-cantidad"
              placeholder="Cantidad..."
              type="number"
              v-model="cantidad"
              trim
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="col-md-3">
            <b-form-select v-model="unidad" :options="unidadesDummy"></b-form-select>
        </b-col>
      </b-row>
    </div>
    <div class="section3"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tittle: null,
      foto: null,
      ingrediente: null,
      ingredientes: [],
      cantidad: 0,
      unidadesDummy: [
        { value: 1, text: "g" },
        { value: 2, text: "ml" },
        { value: 3, text: "u" },
    ],
    };
  },
};
</script>

<style scoped>
.borrar-box {
  padding-left: 28rem;
  padding-right: 28rem;
}
.tittle-container {
}
.input-tittle {
  font-size: 120%;
}
.subir-imagen {
  background-color: #d49c6b;
  box-shadow: 2px 2px 6px 0px #252b31;
  color: #252b31;
  border-radius: 1rem;
  border-style: none;
  padding: 0.4rem 0.5rem 0.5rem 0.5rem;
  margin-right: 0.4rem;
}
.subir-imagen:hover {
  box-shadow: 1px 1px 10px 10px #eaedee;
}
input[type="file"] {
  display: none;
}
.ingrediente-container {
}
.input-ingrediente {
}
</style>