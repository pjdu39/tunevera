<template>
  <div class="empty">
    <slot />
  </div>
</template>
  
<script>
export default {};
</script>
  
<style scoped lang="scss">
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-width: 100vw;
  background-color: $color-background;
}
</style>