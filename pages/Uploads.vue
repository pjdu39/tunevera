<template>
  <div class="mainBox">
    <!-- TODO: Los tabs no tienen soporte aún en Bootstrap Vue Next. Comentarlos y crearlos manualmente hasta que existan. -->
    <BTabs content-class="mt-3" class="tab-option">
      <div class="page">
        <BTab title="Receta" @click="cleanData">
          <RecipeUpload />
        </BTab>
        <BTab title="Encuesta" @click="cleanData">
          <PollUpload />
        </BTab>
        <BTab title="Artículo" @click="cleanData">
          <DiscussionUpload />
        </BTab>
      </div>
    </BTabs>

    <TabView content-class="mt-3" class="tab-option">
      <div class="page">
        <TabPanel header="Receta" @click="cleanData">
          <RecipeUpload />
        </TabPanel>
        <TabPanel header="Encuesta" @click="cleanData">
          <PollUpload />
        </TabPanel>
        <TabPanel header="Artículo" @click="cleanData">
          <DiscussionUpload />
        </TabPanel>
      </div>
    </TabView>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
import DiscussionUpload from "~/components/Uploads/DiscussionUpload.vue";
import PollUpload from "~/components/Uploads/PollUpload.vue";
import RecipeUpload from "~/components/Uploads/RecipeUpload.vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    DiscussionUpload,
    PollUpload,
    RecipeUpload,
    TabView,
    TabPanel,
  },
  data() {
    return {
      descripcion: null,
    };
  },
  methods: {
    // TODO: Borrar. Esto sólo tenía sentido antes de separar cada formulario en componentes.
    cleanData() {
      this.title = null;
      this.descripcion = null;
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