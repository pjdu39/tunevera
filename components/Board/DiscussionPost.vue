<template>
  <NuxtLink class="discussion-post" :to="`/foro?id=${postData.id}`">
    <NuxtLink class="signature" :to="`/perfil?id=${postData.idUser}`">
      <b>@{{ postData.userName }}</b>
    </NuxtLink>
    <h4 class="title">{{ postData.title }}</h4>
    <div class="description">{{ postData.description }}</div>
    <div class="bottom-info">
      <div class="interactions">
        <div class="interaction-container">
          <div class="interaction-icon">
            <font-awesome-icon icon="fa fa-heart" aria-hidden="true" />
          </div>
          <div class="num-likes">{{ postData.likes }}</div>
        </div>
        <div class="interaction-container">
          <div class="interaction-icon">
            <font-awesome-icon icon="fa fa-comment" aria-hidden="true" />
          </div>
          <!--<div class="num-comments">{{ postData.comentarios.length }}</div>-->
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
.discussion-post {
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
  margin-bottom: 12px;
  font-style: italic;
}
.signature:hover {
  text-decoration: underline;
}
.title {
  flex-grow: 0;
  font-family: $font-headers;
}
.description {
  flex-grow: 20;
  margin: 30px 0;
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
.num-likes {
  font-size: small;
}

@media (max-width: 800px) {
  .discussion-post {
    font-size: 90%;
  }
  .signature {
    font-size: 90%;
  }
  .title {
    font-size: 145%;
  }
  .description {
    font-size: 90%;
  }
}
</style>