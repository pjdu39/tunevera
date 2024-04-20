<template>
  <NuxtLink class="recipe-post" :to="`/receta?id=${postData.id}`">
    <div class="img-wrapper">
      <div v-if="!postData.pictureUrl" class="image">Cargando...</div>
      <NuxtImg
        v-else-if="postData.pictureUrl"
        v-cloak
        :src="postData.pictureUrl"
        class="image"
      />
    </div>
    <div class="post-info">
      <NuxtLink class="signature" :to="`/perfil?id=${postData.idUser}`">
        por <b>{{ postData.userName }}</b>
      </NuxtLink>
      <h4 class="title">{{ postData.title }}</h4>
      <div class="general-info-bottom">
        <div class="general-info-left">
          <div class="description">{{ postData.description }}</div>
          <div class="bottom-info">
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
                <div class="num-interactions">{{ postData.numComments }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="general-info-right">
          <div class="icon-info-container">
                {{ postData.servings }}'
                <font-awesome-icon
                  icon="fa fa-utensils"
                  class="icon-info"
                  aria-hidden="true"
                />
              </div>
              <div class="icon-info-container">
                {{ postData.time }}'
                <font-awesome-icon
                  icon="fa fa-clock"
                  class="icon-info"
                  aria-hidden="true"
                />
              </div>
        </div>
      </div>
    </div>
  </NuxtLink>
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
  padding: 10px 17px 12px 17px;
}
.signature {
  /* flex-grow: 1; */
  margin-bottom: 8px;
  text-align: end;
  margin-left: auto;
  font-style: italic;
}
.signature:hover {
  text-decoration: underline;
}
.title {
  flex-grow: 0;
  font-family: $font-headers;
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
  width: 80%;
}
.description {
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
.general-info-right {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 20%;
}
.icon-info-container {
  margin-top: 5px;
  color: $color-dark;
}
.icon-info {
  aspect-ratio: 1 / 1;
}
</style>