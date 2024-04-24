<template>
  <div class="skeleton-container">
    <div v-for="item in 2" :key="item" class="skeleton-card">
      <Skeleton
        height="22rem"
        width="22rem"
        class="mb-2"
        style="margin-bottom: 0 !important"
      ></Skeleton>
      <div class="skeleton-info-container">
        <div class="skeleton-signature">
          <Skeleton height="1rem" width="8rem" class="mb-2"></Skeleton>
        </div>
        <Skeleton
          height="2rem"
          width="13rem"
          class="mb-2"
          style="margin-bottom: 15px !important"
        ></Skeleton>
        <div class="skeleton-general-info-bottom">
          <div class="skeleton-general-info-left">
            <div class="skeleton-description">
              <Skeleton height="14px" width="11rem" class="mb-2"></Skeleton>
              <Skeleton height="14px" width="13rem" class="mb-2"></Skeleton>
              <Skeleton height="14px" width="10rem" class="mb-2"></Skeleton>
              <Skeleton height="14px" width="13rem" class="mb-2"></Skeleton>
            </div>
            <div class="skeleton-bottom-info">
              <Skeleton
                height="25px"
                width="2rem"
                class="mb-2"
                style="margin: 0 20px 0 0 !important"
              ></Skeleton>
              <Skeleton
                height="25px"
                width="2rem"
                class="mb-2"
                style="margin: 0 20px 0 0 !important"
              ></Skeleton>
            </div>
          </div>
          <div class="skeleton-general-info-right">
            <div class="icon-info-container">
              <Skeleton height="2rem" width="3rem" class="mb-2"></Skeleton>
            </div>
            <div class="icon-info-container">
              <Skeleton
                height="2rem"
                width="3rem"
                class="mb-2"
                style="margin-bottom: 0 !important"
              ></Skeleton>
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
  height: auto;
  border: solid 2px $color-skeleton;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
}
.skeleton-info-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 10px 17px 12px 17px;
}
.skeleton-signature {
  margin-bottom: 12px;
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
</style>