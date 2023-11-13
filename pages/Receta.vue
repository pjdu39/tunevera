<template>
  <div>
    <div v-if="getRecipeState.loading === 'loaded'" class="recipe">
      <div class="top-section">
        <div class="img-wrapper">
          <NuxtImg
            src="https://img.delicious.com.au/G-2mxbOh/w1200/del/2022/08/parmesan-crumbed-chicken-schnitzel-fried-eggs-and-apple-cabbage-slaw-173352-2.jpg"
            class="image"
          />
        </div>
        <div class="general-info">
          <div class="general-info-top">
            <div class="recipe-title">{{ getRecipeState.data.title }}</div>
            <div class="signature">
              <div class="signature-name">
                {{ usuarioDummy.nombreCompleto }}
              </div>
              <div class="sign-img-wrapper">
                <NuxtImg
                  src="data:image/jpeg;base64,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"
                  class="sign-image"
                />
              </div>
            </div>
          </div>
          <div class="properties">
            <!-- TODO: Poner condiciones, ahora es solo un ejemplo -->
            <div class="badge--vegan">VEGANO</div>
          </div>
          <div class="general-info-bottom">
            <div class="general-info-left">
              <div class="description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
                laboriosam necessitatibus aspernatur numquam soluta suscipit
                dolores! Excepturi aperiam aliquam magni ea esse minus! Velit
                magnam ducimus recusandae laborum reiciendis accusantium.
              </div>
              <div class="interaction-container">
                <div class="interaction-icon">
                  <font-awesome-icon icon="fa fa-heart" aria-hidden="true" />
                </div>
                <div class="num-likes">2345</div>
              </div>
            </div>
            <div class="general-info-right">
              <div class="icon-info-container">
                4
                <font-awesome-icon
                  icon="fa fa-utensils"
                  class="icon-info"
                  aria-hidden="true"
                />
              </div>
              <div class="icon-info-container">
                35'
                <font-awesome-icon
                  icon="fa fa-clock"
                  class="icon-info"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tags-section">
        <div class="badge--tag">#vegano</div>
        <div class="badge--tag">#sinLactosa</div>
        <div class="badge--tag">#glutenFree</div>
        <div class="badge--tag">#pollo</div>
        <div class="badge--tag">#verduras</div>
      </div>
      <div class="middle-section">
        <div class="ingredients">
          <div class="middle-section-title">Ingredientes:</div>
          <div>Aquí va un v-for</div>
        </div>
        <div class="steps">
          <div class="middle-section-title">Pasos:</div>
          <div>Aquí va otro v-for</div>
        </div>
      </div>
      <div class="comment-section"></div>
    </div>

    <!-- TODO: Borrar. Es legacy -->
    <div class="main-container">
      <div class="page">
        <div v-if="getRecipeState.loading === 'waiting'">
          Waiting {{ getRecipeState.data }}
        </div>
        <div v-if="getRecipeState.loading === 'loading'" class="spinner">
          <font-awesome-icon
            icon="fa-solid fa-spinner"
            class="fa-spin-pulse fa-lg"
            aria-hidden="true"
          />
        </div>
        <div v-else-if="getRecipeState.loading === 'loaded'">
          <div class="section flex">
            <div class="title-section">
              <h2 class="title">{{ getRecipeState.data.title }}</h2>
              <div class="descripcion">
                {{ getRecipeState.data.description }}
              </div>
            </div>
            <div class="author-section">
              <b-row>
                <b-col class="col-md-7"> </b-col>
                <b-col class="col-md-5">
                  <div class="wrapper-foto">
                    <img class="foto" :src="usuarioDummy.img" />
                    <!-- TODO: Ponerle un link al perfil -->
                  </div>
                </b-col>
              </b-row>
              <div class="author-name">{{ usuarioDummy.nombreCompleto }}</div>
            </div>
          </div>
          <div class="section">
            <h5 class="section--receta">Ingredientes</h5>
            <ul>
              <BListGroupItem
                class="group-item-container"
                v-for="(ingredient, index) in getRecipeState.data.ingredients"
                :key="index"
              >
                <li>
                  {{
                    ingredient.amount +
                    " " +
                    ingredient.unit +
                    " " +
                    ingredient.text
                  }}
                </li>
              </BListGroupItem>
            </ul>
          </div>
          <div class="section">
            <h5 class="section--receta"></h5>
            <BListGroupItem
              class="group-item-container"
              v-for="(step, index) in getRecipeState.data.steps"
              :key="index"
            >
              <div class="section section--paso">
                <div class="num-paso-wrapper">{{ index + 1 }}</div>
                <div class="paso">{{ step.text }}</div>
              </div>
            </BListGroupItem>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { useRecipeStore } from "~/store/recipe.js";
export default {
  data() {
    return {
      idRecipe: 10,
      usuarioDummy: {
        id: 1,
        nombreCompleto: "Juan Pérez Delgado",
        publicaciones: 28,
        seguidores: 143,
        img: import("/img/foto_perfil2.jpg"),
      },
    };
  },
  computed: {
    getRecipeState() {
      const store = useRecipeStore();
      return store.getRecipeState;
    },
  },
  methods: {
    fetchRecipe() {
      const store = useRecipeStore();
      return store.fetchRecipe;
    },
  },
  mounted() {
    this.fetchRecipe()(12); // TODO: Recibir este valor por url.
  },
};
</script>
  
<style scoped lang="scss">
.recipe {
  margin: auto;
  width: 65rem;
  height: 80rem;

  /* Es solo para maquetar */
  background-color: linen;
}
.top-section {
  display: flex;
  height: 25rem;
  width: 100%;

  /* Es solo para maquetar */
  background-color: lightcyan;
}
.img-wrapper {
  position: relative;
  height: 100%;
  width: 25rem;
  overflow: hidden;
}
.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.general-info {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: min-content;
  flex-grow: 1;
  padding: 1rem;

  /* Es solo para maquetar */
  background-color: rgb(253, 204, 204);
}
.general-info-top {
  display: flex;
  height: 10%;
}
.recipe-title {
  font-size: 160%;
}
.signature {
  display: flex;
  align-items: center;
  justify-content: right;
  flex-grow: 1;
}
.signature-name {
  margin-right: 7px;
}
.sign-img-wrapper {
  position: relative;
  height: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 50%;
}
.sign-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.properties {
}
.general-info-bottom {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  margin-top: 1rem;
}
.general-info-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
}
.description {
}
.interaction-container {
  display: flex;
  line-height: 100%;
  margin: 0 1rem 0 0;
}
.interaction-icon {
  text-align: center;
  margin: 0 5px;
}
.interaction-icon--clicked {
  color: $color-primary;
}
.num-likes {
  font-size: small;
}
.general-info-right {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 10%;
}
.icon-info-container {
  margin-top: 5px;
  font-size: 130%;
  color: #868686;
}
.icon-info {
  aspect-ratio: 1 / 1;
}
.tags-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  height: 6rem;
}
.badge--tag {
  padding: 1px 7px 4px 7px;
  line-height: 100%;
  border-radius: 5px;
  color: white;
  background-color: $color-primary;
}
.middle-section {
  display: flex;
  width: 100%;

  /* Es solo para maquetar */
  height: 40rem;
  background-color: whitesmoke;
}
.ingredients {
  height: 100%;
  width: 25rem;
  border-right: 1px solid $color-dark;

  /* Es solo para maquetar */
  background-color: wheat;
}
.middle-section-title {
  font-size: 150%;
  text-decoration: underline;
  /* border-bottom: 2px solid $color-dark; */
}
.steps {
  padding: 0 2rem;
}
.comments-section {
  height: 30rem;
  width: 100%;

  /* TODO: Borrar. Es solo para maquetar */
  background-color: lavender;
}

/* TODO: Borrar. Es la versión antigua. ------------------------------------------------------------------------ */
.main-container {
  margin: auto;
  width: 53rem;
}
.page {
  margin-top: 1rem;
  padding: 2rem;
  background-color: #f2f4f5;
  border: 1px solid rgba(249, 249, 249);
  border-radius: 1.7rem;
  box-shadow: 5px 5px 3px -1px #252b310a, -4px -4px 4px -2px rgb(251, 251, 251),
    -10px -10px 30px -80px #252b31 inset;
}
.title-section {
  width: 65%;
}
.author-section {
  margin-top: 0.5rem;
  width: 35%;
}
/*
.descripcion {
  width: 35rem;
  margin-bottom: 2rem;
} */
.section--receta {
  border-top: 1px solid #c1c8c74b;
  padding: 0.8rem 0;
}
.title {
  padding: 1.2rem 0 4rem 0;
}
.wrapper-foto {
  display: inline-block;
  width: 5rem;
  height: 5rem;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
}
.author-name {
  text-align: right;
}
.section--paso {
  display: flex;
  margin-bottom: 0;
  /* border-top: 1px solid #c1c8c7; */
  padding: 2rem 0;
}
.num-paso-wrapper {
  margin-right: 1rem;
  height: 2.6rem;
  aspect-ratio: 1 / 1;
  padding: 0 0 0 0.8rem;
  font-size: 150%;
  color: gray;
  border: 2px solid gray;
  border-radius: 10rem;
}
.paso {
  display: inline-block;
  margin-top: auto;
  margin-bottom: auto;
}
.group-item-container {
  display: block;
  padding: 0;
  background-color: transparent;
  border: none;
}
.spinner {
  text-align: center;
  font-size: 180%;
}
</style>