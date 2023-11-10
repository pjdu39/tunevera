<template>
  <div class="poll-post">
    <div class="signature">
      por <b>{{ postData.author }}</b>
    </div>
    <h4 class="title">{{ postData.title }}</h4>

    <div class="post-body">
      <div ref="optionContainer" class="poll-options-container">
        <div class="poll-options">
          <div v-for="option in postData.options" :key="option.id">
            <div class="option-wrapper">
              <div class="option-text">{{ option.answer }}</div>
              <div
                class="option-bar"
                :style="
                  'width: ' +
                  calculaBarraEncuesta(postData.options, option) +
                  'px;'
                "
              ></div>
              <!-- Por algún motivo desconocido, en este div estoy obligado a aplicar el text-align en el style, ya que no se aplica en la clase -->
              <div class="option-bar percentage" style="text-align: end">
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
      <div class="time-left">Acaba en 2 días</div>
    </div>
  </div>
</template>
  
<script setup>
const props = defineProps({
  postData: Object,
});

// CÁLCULO DE PORCENTAJE Y LAS BARRAS GRÁFICAS
const calculaPorcentajeEncuesta = (pollOptions, option) => {
  let totalVotes = pollOptions.reduce((acum, x) => acum + x.votes, 0);
  let result = (option.votes / totalVotes) * 100;

  if (isNaN(result)) return 0;

  return result % 1 !== 0 ? result.toFixed(1) : result.toFixed(0);
};
const calculaBarraEncuesta = (pollOptions, option) => {
  if (!anchoActual.value) return;

  const porcentaje = calculaPorcentajeEncuesta(pollOptions, option);
  const coeficiente = parseInt(anchoActual.value) / 100;
  let result = porcentaje * coeficiente;
  
  return result.toFixed(1);
};


// OBTENCIÓN REACTIVA DEL VALOR DEL ANCHO DEL CONTENEDOR
const optionContainer = ref(null);
const anchoDiv = ref(0);
// Inicializa el observer en null para que pueda ser asignado luego
let resizeObserver = null;
onMounted(() => {
  if (optionContainer.value) {
    resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      anchoDiv.value = entry.contentRect.width;
    });
    resizeObserver.observe(optionContainer.value);
  }
});
onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
// Propiedad computada que siempre reflejará el ancho actual del div
const anchoActual = computed(() => anchoDiv.value);
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
.option-wrapper {
  position: relative;
  height: 1.6rem;
}

.option-text {
  display: inline-block;
  position: relative; // Esto es solo para generar un contexto de apilamiento
  margin-left: 0.5rem;
  font-size: 85%;
  z-index: 10;
}

.option-bar {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  background-color: $color-primary;
  border-radius: 5px 0 0 5px;
  z-index: 5;
}

.percentage {
  width: 100%;
  padding-top: 0.1rem;
  padding-right: 0.5rem;
  background-color: transparent;
  border-radius: 0.5rem;
  font-size: 85%;
  z-index: 15;
}
</style>