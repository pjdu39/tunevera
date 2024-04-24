<template>
    <div class="phone-skeleton-container">
    <div v-for="item in 2" :key="item" class="skeleton-card">
      <Skeleton
        height="100%"
        width="50%"
        class="mb-2"
        style="margin-bottom: 0 !important"
      ></Skeleton>
      <div class="skeleton-info-container">
        <div class="skeleton-signature">
          <Skeleton height="10px" width="5rem" class="mb-2"></Skeleton>
        </div>
        <Skeleton
          height="24px"
          width="7rem"
          class="mb-2"
          style="margin-bottom: 5px !important"
        ></Skeleton>
        <div class="skeleton-general-info-bottom">
          <div class="skeleton-general-info-left">
            <div class="skeleton-description">
              <Skeleton height="9px" width="8rem" class="mb-2"></Skeleton>
              <Skeleton height="9px" width="6rem" class="mb-2"></Skeleton>
              <Skeleton height="9px" width="7rem" class="mb-2"></Skeleton>
            </div>
            <div class="skeleton-bottom-info">
              <Skeleton
                height="20px"
                width="29px"
                class="mb-2"
                style="margin: 0 15px 0 0 !important"
              ></Skeleton>
              <Skeleton
                height="20px"
                width="29px"
                class="mb-2"
                style="margin: 0 20px 0 0 !important"
              ></Skeleton>
            </div>
          </div>
          <div class="skeleton-general-info-right">
            <div class="icon-info-container">
              <Skeleton height="22px" width="30px" class="mb-2"></Skeleton>
            </div>
            <div class="icon-info-container">
              <Skeleton height="22px" width="30px" class="mb-2" style="margin-bottom: 0 !important"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.skeleton-card {
  display: flex;
  position: relative;
  aspect-ratio: 2/1;
  border: solid 2px $color-skeleton;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
}
.skeleton-info-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 6px 10px 7px 10px;
}
.skeleton-signature {
  margin-bottom: 8px;
  text-align: end;
  margin-left: auto;
}
.skeleton-general-info-bottom {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  margin-top: 1rem;
}
.skeleton-general-info-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
}
.skeleton-general-info-right {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 20%;
}
.skeleton-bottom-info {
  display: flex;
}
.phone-skeleton-container {
  display: none;
}
</style>