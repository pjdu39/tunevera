<template>
  <div class="component-wrapper"></div>
  <button class="follow-box" @click="showOptions = !showOptions">
    <div class="notification">
      <font-awesome-icon icon="fa fa-bell" class="fa-lg" aria-hidden="true" />
    </div>
    <div class="follow">Seguir</div>
  </button>
  <div v-if="showOptions" class="follow-options">
    <button class="option" @click="showOptions = false">
      <div class="notification">
        <font-awesome-icon icon="fa fa-bell" class="fa-lg" aria-hidden="true" />
      </div>
      <div class="">Todas</div>
    </button>
    <button class="option" @click="showOptions = false">
      <div class="notification">
        <font-awesome-icon icon="far fa-bell" class="fa-lg" aria-hidden="true" />
      </div>
      <div class="">Personalizadas</div>
    </button>
    <button class="option" @click="showOptions = false">
      <div class="notification">
        <font-awesome-icon icon="far fa-bell-slash" class="fa-lg" aria-hidden="true" />
      </div>
      <div class="">Ninguna</div>
    </button>
    <button class="option" @click="showOptions = false">
      <div class="notification">
        <font-awesome-icon icon="fa fa-user" class="fa-lg" aria-hidden="true" />
      </div>
      <div class="">Dejar de seguir</div>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  id: Number,
});

const showOptions = ref(false);
</script>

<style lang="scss" scoped>
.component-wrapper {
  position: relative;
}
.follow-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 100px;
  background-color: $color-primary;
  color: white;
  border: none;
  border-radius: 5px;
}
.follow {
}
.notification {
    display: flex;
    justify-content: center;
    min-width: 25px;
  margin-right: 7px;
}
.follow-options {
  position: absolute;
  margin-top: 30px;
  height: auto;
  width: auto;
  border: 3px solid $color-dark;
  border-radius: 5px;
}
.option {
  display: flex;
  align-items: center;
  height: 37px;
  width: 100%;
  padding: 0 9px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid grey;
}
.option:hover {
  background-color: $color-soft-grey;
}
</style>