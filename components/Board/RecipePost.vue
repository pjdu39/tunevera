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
        <b>@{{ postData.userName }}</b>
      </NuxtLink>
      <h4 class="title">{{ postData.title }}</h4>
      <div class="general-info-bottom">
        <div class="general-info-left">
          <div class="description-container">
            <div class="description">{{ postData.description }}</div>
          </div>
        </div>
      </div>
      <div class="blur"></div>
      <div class="bottom-info-container">
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
            {{ postData.servings }}'<font-awesome-icon
              icon="fa fa-utensils"
              class="icon-info"
              aria-hidden="true"
            />
          </div>
          <div class="icon-info-container">
            {{ postData.time }}'<font-awesome-icon
              icon="fa fa-clock"
              class="icon-info"
              aria-hidden="true"
            />
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
  height: 22rem;
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
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 10px 17px 12px 17px;
}
.signature {
  /* flex-grow: 1; */
  margin-bottom: 12px;
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
}
.description {
  overflow: hidden;
}
.blur {
  height: 70px; /* Altura del efecto de desvanecimiento */
  width: 80%;
  background-image: linear-gradient(
    to top,
    $color-background,
    rgba($color-background, 0)
  );
  position: absolute;
  bottom: 58px;
}
.bottom-info-container {
  position: absolute;
  bottom: 0;
  height: 58px;
  width: 100%;
  background-color: $color-background;
}
.bottom-info {
  display: flex;
  flex-grow: 0;
  margin-top: 30px;
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
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 7px;
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

@media (max-width: 800px) {
  .recipe-post {
    height: 100%;
    aspect-ratio: 2/1;
    max-height: 14rem;
  }
  .post-info {
    font-size: 85%;
    padding: 4px 10px 7px 10px;
  }
  .signature {
    margin-bottom: 7px;
    // display: none;
  }
  .title {
    font-size: 145%;
  }
  .bottom-info-container {
    height: 30px;
    margin-bottom: 0px;
    width: 100%;
    background-color: $color-background;
  }
  .bottom-info {
    margin-top: 7px;
  }
  .general-info-bottom {
    margin-top: 1px;
  }
  .general-info-left {
    width: 70%;
  }
  .description-container {
  }
  .description {
    font-size: 85%;
    z-index: 5;
    overflow: hidden;
  }
  .blur {
    height: 45px; /* Altura del efecto de desvanecimiento */
    bottom: 30px;
    width: 70%;
    z-index: 6;
  }
  .interaction-container {
    background-color: $color-background;
    margin: 0 15px 0 0;
    z-index: 7;
  }
  .interaction-icon {
    margin: 0 3px;
  }
  .general-info-right {
    width: 30%;
    font-size: 95%;
  }
  .icon-info-container {
    margin-top: 10px;
  }
}
</style>