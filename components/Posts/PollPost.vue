<template>
  <div class="poll-post">
    <div class="signature">
      por <b>{{ postData.author }}</b>
    </div>
    <h4 class="title">{{ postData.title }}</h4>

    <div class="post-body">
      <div class="poll-options-container">
        <div class="poll-options">
            <div v-for="option in postData.options" :key="option.id">
            <div class="encuesta-opcion">
                <div class="encuesta-opcion-texto">{{ option.answer }}</div>
                <div
                class="encuesta-opcion-barra encuesta-opcion-barra--rellena"
                :style="
                    'width: ' +
                    calculaBarraEncuesta(postData.options, option) +
                    'rem;'
                "
                ></div>
                <div
                class="encuesta-opcion-barra encuesta-opcion-barra--fondo"
                ></div>
                <!-- Por algún motivo desconocido, en este div estoy obligado a aplicar el text-align en el style, ya que no se aplica en la clase -->
                <div
                class="encuesta-opcion-barra porcentaje"
                style="text-align: end"
                >
                {{ calculaPorcentajeEncuesta(postData.options, option) }} %
                </div>
            </div>
            </div>
        </div>
      </div>

      <div class="aspect-ratio-wrapper">
        <div class="aspect-ratio-container">
            <div class="img-wrapper">
                <NuxtImg src="/img/tarta-manzana.png" class="image" />
            </div>
        </div>
      </div>
    </div>

    <div class="bottom-info">
      <div class="interactions">
        <div class="interaction-wrapper">
          <div class="interaction-icon">
            <font-awesome-icon icon="fa fa-heart" aria-hidden="true" />
          </div>
          <div class="num-likes">{{ postData.likes }}</div>
        </div>
        <div class="interaction-wrapper">
          <div class="interaction-icon">
            <font-awesome-icon icon="fa fa-comment" aria-hidden="true" />
          </div>
          <!--<div class="num-comments">{{ postData.comentarios.length }}</div>-->
        </div>
      </div>
      <div class="time-left">
        Acaba en 2 días
      </div>
    </div>
  </div>
</template>
  
<script setup>
const props = defineProps({
  postData: Object,
});

const calculaPorcentajeEncuesta = (pollOptions, option) => {
  let totalVotes = pollOptions.reduce((acum, x) => acum + x.votes, 0);
  let result = (option.votes / totalVotes) * 100;

  if (isNaN(result)) return 0;

  return result % 1 !== 0 ? result.toFixed(1) : result.toFixed(0);
};

const calculaBarraEncuesta = (pollOptions, option) => {
  let porcentaje = calculaPorcentajeEncuesta(pollOptions, option);
  let result = porcentaje / 5; // Divide entre 5 porque la longitud de la barra es 20rem (100 / 5 = 20)
  return result.toFixed(1);
};
</script>
  
<style scoped lang="scss">
.poll-post {
  display: flex;
  flex-direction: column;
  position: relative;
  height: auto;
  border: solid 2px $color-dark;
  border-radius: 5px;
  overflow: hidden;
  padding: 0.5rem 1rem;

  // TODO: Borrar, es solo para maquetar
  z-index: 20;
  margin: 3rem 0;
}
.signature {
  flex-grow: 1;
  text-align: end;
  margin-left: auto;
  font-style: italic;
}
.title {
  flex-grow: 0;
  margin-bottom: 1rem;
}
.post-body {
  flex-grow: 20;
  display: flex;
  margin-bottom: 1rem;
}
// Esta clase es solo para centrar verticalmente el conjunto de barras
.poll-options-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 60%;
}
// Esta es la clase que coloca las barras en columnas y crea el espacio entre barras
.poll-options {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}
.aspect-ratio-wrapper {
  display: flex;
  justify-content: center; // Centrar horizontalmente
  align-items: center; // Centrar verticalmente
  position: relative;
  width: 40%;
}
.aspect-ratio-container {
  position: relative;
  width: 50%;
}
.img-wrapper {
  position: relative;
  padding-top: 100%;
  width: 100%;
  overflow: hidden;
  background-color: white;
}
.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.bottom-info {
  flex-grow: 0;
  display: flex;
  align-items: center; // Alineación vertical. Solo disponible en clases flex.
  justify-content: space-between;
}
.interactions {
  display: flex;
}
.interaction-wrapper {
  display: flex;
  line-height: 100%;
  margin: 0 1rem 0 0;
}
.interaction-icon {
  text-align: center;
  color: $color-primary;
  margin: 0 5px;
}
.num-likes {
  font-size: small;
}
.time-left {
    font-size: 80%;
  text-align: right;
}

// TODO: Adaptar todo esto y renombrarlo.

.encuesta-opcion {
  position: relative;
  /* width: 20rem; */
  height: 1.6rem;
  /* display: inline-flex; */
  margin: 0 0 0 0;
}

.encuesta-opcion-texto {
  display: inline-block;
  position: sticky; /* TODO: Ver qué hace esto y cambiar si es necesario. Ahora está puesto para evitar que el valor por defecto impida que se aplique el z-index */
  margin-left: 0.5rem;
  margin-top: 0.1rem;
  font-size: 85%;
  z-index: 10;
}

.encuesta-opcion-barra {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  background-color: $color-primary;
  border-radius: 0.5rem 0 0 0.5rem;
  z-index: 5;
}

.encuesta-opcion-barra--rellena {
  box-shadow: 1.5px 1.5px 5px -4px rgb(0, 0, 0),
    -2px -2px 5px 0px rgb(248, 248, 248, 0.8),
    -0.2px -1.5px 3px -4px rgb(0, 0, 0) inset,
    2px 2px 2px -1.2px rgb(248, 248, 248, 0.8) inset;
}

.encuesta-opcion-barra--fondo {
  width: 20rem;
  padding-top: 0.1rem;
  background-color: #d7d9da;
  box-shadow: 3px 3px 5px -4px rgb(0, 0, 0) inset,
    -0.1px -0.1px 2px 1.5px rgb(248, 248, 248, 0.6) inset;
  border: 1px solid #d7d9da;
  border-radius: 0.5rem;
  font-size: 85%;
  z-index: 1;
}

.porcentaje {
  width: 20rem;
  padding-top: 0.1rem;
  padding-right: 0.5rem;
  background-color: transparent;
  border-radius: 0.5rem;
  font-size: 85%;
  z-index: 15;
}
</style>