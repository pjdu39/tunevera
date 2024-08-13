<template>
  <div class="poll-post">
    <NuxtLink v-if="props.showSignature" class="signature" :to="`/perfil?id=${postData.idUser}`">
      <b>@{{ postData.userName }}</b>
    </NuxtLink>
    <div v-else class="space"></div>
    <h4 class="title">{{ postData.title }}</h4>
    <div class="post-info">
      <div
        v-show="!isVoted"
        ref="optionContainer"
        class="poll-options-container"
      >
        <div class="poll-options">
          <div v-for="(option, index) in postData.options" :key="index">
            <button
              class="option-button"
              @click="vote(index, postData.id, option), (option.voted = true)"
            >
              <div class="option-button-text">{{ option.answer }}</div>
            </button>
          </div>
        </div>
      </div>

      <div
        v-show="isVoted"
        ref="optionContainer"
        class="poll-options-container"
      >
        <div class="poll-options">
          <div v-for="(option, index) in localOptions" :key="index">
            <div class="option-wrapper">
              <div class="option-text">{{ option.answer }}</div>
              <div
                :class="[
                  'option-bar',
                  { 'option-bar--selected': chosenOptionId === index },
                ]"
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
      <!-- 
        <div class="interactions">
        <div class="interaction-container">
          <div class="interaction-icon">
            <font-awesome-icon icon="fa fa-heart" aria-hidden="true" />
          </div>
          <div class="num-interactions">{{ postData.likes }}</div>
        </div>
        <div class="interaction-container">
          <div class="interaction-icon">
            <font-awesome-icon icon="fa fa-comment" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div class="time-left">Acaba en 2 días</div>
      -->
    </div>
  </div>
</template>
  
<script setup>
import { useAuth } from '~/composables/useAuth';
import { usePollStore } from "~/store/poll.js";

// Proteción de acciones con login
const { guard } = useAuth();

const route = useRoute();

const props = defineProps({
  postData: Object,
  showSignature: Boolean
});

// Utilizando la store
const store = usePollStore();

// Manejo de votaciones
const localOptions = ref([...props.postData.options]);
const isVoted = ref(false);
const chosenOptionId = ref(null);
const vote = async (index, idPost, option) => {
  const hasAccess = await guard(route.path);
  if(!hasAccess) return

  option.votes += 1;
  isVoted.value = true;
  chosenOptionId.value = index;
  store.vote(idPost, option.id);
};
onMounted(() => {
  isVoted.value = props.postData.options.some((x) => x.voted);
  if (isVoted.value) {
    chosenOptionId.value =
      props.postData.options.find((x) => x.voted).optionNumber - 1; // Se le resta 1 porque index (el del v-for) empieza en 0
  }
});

// Ajuste fino de encuestas responsive.
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
}
.signature {
  flex-grow: 1;
  text-align: end;
  margin-left: auto;
  font-style: italic;
}
.signature:hover {
  text-decoration: underline;
}
.space {
  margin-bottom: 20px;
}
.title {
  flex-grow: 0;
  max-width: 80%;
  margin-bottom: 1rem;
  font-family: $font-headers;
}
.post-info {
  flex-grow: 20;
  display: flex;
  margin-bottom: 1rem;
}
// Esta clase es solo para centrar verticalmente el conjunto de barras
.poll-options-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 90%;
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
  width: 10%;
}
.aspect-ratio-container {
  display: none; // TODO: Provicional, se queda así mientras no tenga una imagen/contenido que usar de relleno
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
.interaction-container {
  display: flex;
  line-height: 100%;
  margin: 0 1rem 0 0;
}
.interaction-icon {
  text-align: center;
  color: $color-primary;
  margin: 0 5px;
}
.num-interactions {
  font-size: small;
}
.time-left {
  font-size: 80%;
  text-align: right;
}
.option-wrapper {
  position: relative;
  min-height: 26px;
  height: auto;
  border: 1px solid rgb(228, 228, 228);
  border-radius: 5px;
  overflow: hidden;
}
.option-text {
  display: inline-block;
  position: relative; // Esto es solo para generar un contexto de apilamiento
  margin-left: 0.5rem;
  margin-right: 55px;
  font-size: 85%;
  z-index: 10;
}
.option-bar {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgb(228, 228, 228);
  z-index: 5;
}
.option-bar--selected {
  background-color: $color-primary;
}
.option-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0;
  background-color: transparent;
  border: 2px solid $color-dark;
  border-radius: 5px;
}
.option-button-text {
  padding: 0 5px;
  font-size: 85%;
}

.percentage {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding-right: 0.5rem;
  background-color: transparent;
  font-size: 85%;
  font-weight: 600;
  z-index: 15;
}

@media (max-width: 800px) {
  .title {
    font-size: 140%;
  }
  .signature {
    font-size: 85%;
    margin-bottom: 5px;
  }
  .poll-options-container {
    width: 100%;
  }
  .aspect-ratio-wrapper {
    display: none;
  }
}

</style>