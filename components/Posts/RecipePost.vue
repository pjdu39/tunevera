<template>
  <div class="recipe-post">
    <div class="img-wrapper">
      <NuxtImg src="/img/tarta-manzana.png" class="image" />
    </div>
    <div class="post-info">
      <div class="signature">
        por <b>{{ postData.author }}</b>
      </div>
      <div class="">
        <h4 class="">{{ postData.title }}</h4>
        {{ postData.time }}'
        <font-awesome-icon icon="fa fa-clock" aria-hidden="true" />
      </div>
      <div>{{ postData.description }}</div>
      <div class="interacciones">
        <div class="likes">
          <font-awesome-icon icon="fa fa-heart" aria-hidden="true" />
        </div>
        <div class="num">{{ postData.likes }}</div>
        <div class="comentarios">
          <font-awesome-icon icon="fa fa-comment" aria-hidden="true" />
        </div>
        <!-- <div class="num">{{ postData.comentarios.length }}</div> -->
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
  width: 50%;
}
.signature {
  text-align: end;
  margin-left: auto;
  font-style: italic;
}
</style>