<template>
  <div class="community-content">
    <div
      v-if="postsLoading === 'waiting' || postsLoading === 'loading'"
      class="loading-container"
    >
      <font-awesome-icon
        icon="fa fa-circle-notch"
        class="fa-spin fa-lg"
        aria-hidden="true"
      />
    </div>
    <div v-else-if="postsLoading === 'error'">{{ postsError }}</div>
    <div
      v-else-if="postsLoading === 'loaded'"
      v-for="(post, index) in posts"
      :key="index"
    >
      <div v-if="post.type === 'D'" class="post-container">
        <NuxtLink class="post" :to="`/foro?id=${post.id}`">
          <div class="title">{{ post.title }}</div>
          <div class="description">{{ post.description }}</div>
          <div class="interactions-container">
            <div class="interaction-wrapper">
              <div>{{ post.likes }}</div>
              <div class="icon">
                <font-awesome-icon
                  icon="fa-regular fa-heart"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div class="interaction-wrapper">
              <div>{{ post.numComments }}</div>
              <div class="icon">
                <font-awesome-icon
                  icon="fa-regular fa-comment"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div v-else>
        <PollPost :post-data="post" :show-signature="false" class="poll" />
        <!---
        <div class="title">{{ post.title }}</div>
        <div class="poll-info">
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
        -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProfileStore } from "~/store/profile.js";
import PollPost from "~/components/Board/PollPost.vue";

const props = defineProps({
  id: Number,
});

onMounted(() => {
  fetchCommunityData();
});

const profileStore = useProfileStore();

const posts = computed(() => profileStore.getCommunityState.data);
const postsLoading = computed(() => profileStore.getCommunityState.loading);
const postsError = computed(() => profileStore.getCommunityState.error);

const fetchCommunityData = () => {
  profileStore.fetchCommunity(props.id);
};

// Refresco del perfil al ir de uno ajeno al propio
watch(props, (newVal, oldVal) => {
  fetchCommunityData();
});
</script>

<style scoped lang="scss">
.loading-container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  height: 200px;
  width: 100%;
  font-size: 200%;
  color: $color-primary;
}
.post-container {
  width: 100%;
  margin-bottom: 20px;
  padding: 15px 20px;
  border: solid 2px black;
  border-radius: 5px;
}
.post {
}
.title {
  margin-bottom: 20px;
  font-size: 140%;
  font-family: $font-headers;
}
.description {
  margin-bottom: 20px;
}
.interactions-container {
  display: flex;
  gap: 25px;
}
.interaction-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}
.icon {
}
.poll {
  margin-bottom: 20px;
}
</style>