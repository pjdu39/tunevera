<template>
    <div
      class="skeleton-container"
    >
      <div class="top">
        <div class="profile-info">
          <div class="info-summary-section">
            <div class="picture-cotainer">
              <div class="picture-wrapper">
                <Skeleton
                  class="mb-2"
                  height="12rem"
                  borderRadius="16px"
                ></Skeleton>
              </div>
            </div>
            <div class="info-summary">
              <div class="summary-item">
                <div class="s-i-num" style="display: inline-block">
                  <Skeleton
                    height="2rem"
                    width="2rem"
                    class="mb-2"
                    style="margin: 0 !important"
                  ></Skeleton>
                </div>
                <div>
                  <Skeleton height="1rem" width="6rem" class="mb-2"></Skeleton>
                </div>
              </div>
              <div class="summary-item">
                <div class="s-i-num" style="display: inline-block">
                  <Skeleton
                    height="2rem"
                    width="2rem"
                    class="mb-2"
                    style="margin: 0 !important"
                  ></Skeleton>
                </div>
                <div>
                  <Skeleton height="1rem" width="6rem" class="mb-2"></Skeleton>
                </div>
              </div>
              <div class="summary-item">
                <div class="s-i-num" style="display: inline-block">
                  <Skeleton
                    height="2rem"
                    width="2rem"
                    class="mb-2"
                    style="margin: 0 !important"
                  ></Skeleton>
                </div>
                <div>
                  <Skeleton height="1rem" width="6rem" class="mb-2"></Skeleton>
                </div>
              </div>
            </div>
          </div>
          <div class="info-detail">
            <Skeleton
              height="1rem"
              width="7rem"
              class="mb-2"
              style="margin-top: 10px"
            ></Skeleton>
            <Skeleton
              height="2rem"
              width="15rem"
              class="mb-2"
              style="margin-top: 10px"
            ></Skeleton>
          </div>
        </div>
      </div>
      <div class="tab-skeleton" style="margin-top: 10px">
        <div>
          <Skeleton height="2rem" width="7rem" class="mb-2"></Skeleton>
        </div>
        <div>
          <Skeleton height="2rem" width="7rem" class="mb-2"></Skeleton>
        </div>
        <div>
          <Skeleton height="2rem" width="7rem" class="mb-2"></Skeleton>
        </div>
      </div>
      <div class="grid-skeleton">
        <div v-for="item in 9" :key="item" class="grid-skeleton-item">
          <Skeleton height="100%" width="100%" class="mb-2" style="margin: 0 !important"></Skeleton>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.top {
  display: flex;
  height: 12rem;
}
.profile-info {
  width: 90%;
}
.info-summary-section {
  display: flex;
  height: 50%;
}
.picture-cotainer {
  height: 100%;
  aspect-ratio: 1/1;
}
.picture-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
}
.info-summary {
  display: flex;
  justify-content: space-evenly;
  height: 100%;
  flex-grow: 1;
}
.summary-item {
  height: 100%;
  width: auto;
  text-align: center;
}
.info-detail {
  height: 50%;
}
.tab-skeleton {
  display: flex;
  justify-content: space-around;
}
.grid-skeleton {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  min-height: 15rem;
}
.grid-skeleton-item {
  aspect-ratio: 1/1;
}
</style>