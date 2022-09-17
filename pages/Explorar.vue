<template>
  <div class="container">
    <b-list-group-item class="image-card" v-for="receta in recetas" :key="receta">
        {{ receta.text }}
        <img class="image" :src="receta.text">
    </b-list-group-item>
  </div>
</template>

<script>
export default {
    data() {
        return {
            recetas: [
                { text: require("~/assets/img/receta-lentejas.jpg") },
                { text: "Receta 2"},
                { text: "Receta 3"},
                { text: "Receta 4"},
                { text: "Receta 5"},
                { text: "Receta 6"},
                { text: "Receta 7"},
                { text: "Receta 8"},
                { text: "Receta 9"},
                { text: "Receta 10"},
                { text: "Receta 11"},
                { text: "Receta 12"},
                { text: "Receta 13"},
                { text: "Receta 14"},
                { text: "Receta 15"},
                { text: "Receta 16"},
                { text: "Receta 17"},
                { text: "Receta 18"},
                { text: "Receta 19"},
                { text: "Receta 20"},
                { text: "Receta 21"}
            ]
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    /* grid-template-rows: repeat(auto-fill, 200px); */ /* Averiguar qué es esto y por qué solo se está aplicando a la primera row */
    grid-row-gap: 0;
    grid-column-gap: 0;
    overflow: auto;
}
.image-card {
    width: 14vw;
    height: 14vw;
    margin-top: 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    padding: 3rem;
    background-color: #eaedee;
    border-style: none;
    border-radius: 0.8rem;
    box-shadow: 1.5px 1.5px 23px -10px #252B31;
}
.image {
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    position: absolute;
}
</style>