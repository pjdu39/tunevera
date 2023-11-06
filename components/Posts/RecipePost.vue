<template>
  <div class="recipe-post">
    <div class="img-wrapper">
      <NuxtImg src="/img/tarta-manzana.png" class="image" />
    </div>
    <div class="post-info">
      <div class="signature">
        por <b>{{ postData.author }}</b>
      </div>
      <h4 class="title">{{ postData.title }}</h4>
      <div class="description">{{ postData.description }}</div>
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
        <div class="time">
          {{ postData.time }}'
          <font-awesome-icon icon="fa fa-clock" aria-hidden="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  postData: Object,
});
</script>

<style scoped lang="scss">
.recipe-post {
  display: flex;
  position: relative;
  height: auto;
  border: solid 2px $color-dark;
  border-radius: 5px;
  overflow: hidden;

  // TODO: Borrar, es solo para maquetar
  z-index: 20;
  margin: 3rem 0;
}
.img-wrapper {
  position: relative;
  padding-top: 50%;
  width: 50%;
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
.post-info {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 0.5rem 1rem;
}
.signature {
  flex-grow: 1;
  text-align: end;
  margin-left: auto;
  font-style: italic;
}
.title {
  flex-grow: 0;
}
.description {
  flex-grow: 20;
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
.time {
  text-align: right;
}
</style>