<template>
  <div class="callback-container">
    <div class="icon-container">
      <font-awesome-icon
        icon="fa fa-circle-notch"
        class="fa-spin fa-lg"
        aria-hidden="true"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuth } from "~/composables/useAuth";
import { useRouter } from "vue-router";

const router = useRouter();
const { redirectCallback } = useAuth();

onMounted(async () => {
  try {
    await redirectCallback();
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped>
.callback-container {
}
.icon-container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  height: 200px;
  width: 100%;
  font-size: 200%;
  color: $color-primary;
}
</style>