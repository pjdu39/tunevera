<template>
  <div class="component-wrapper">
    <div class="main-button-container">
      <button
        v-if="!alreadyFollowing"
        class="follow-box"
        @click="follow()"
      >
        <div class="notification">
          <font-awesome-icon
            :icon="followIcon"
            :class="followClass"
            aria-hidden="true"
          />
        </div>
        <div class="follow">Seguir</div>
      </button>
      <button
        v-else-if="alreadyFollowing"
        class="follow-box follow-box--already-following"
        @click="showOptions = !showOptions"
      >
        <div class="notification">
          <font-awesome-icon
            :icon="bellIcon"
            class="fa-lg"
            aria-hidden="true"
          />
        </div>
        <div class="follow">Siguiendo</div>
      </button>
    </div>
    <div v-if="showOptions" class="follow-options">
      <div v-for="(option, index) in options" :key="index">
        <button class="option" @click="option.action(), (showOptions = false)">
          <div class="notification">
            <font-awesome-icon
              :icon="option.icon"
              class="fa-lg"
              aria-hidden="true"
            />
          </div>
          <div class="">{{ option.text }}</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFollowerStore } from "~/store/follower.js";

const props = defineProps({
  data: Object,
});

// Acceso a api
const store = useFollowerStore();

const followState = computed(() => store.followState);
const unfollowState = computed(() => store.unfollowState);
const setNotificationsState = computed(() => store.setNotificationsState);
const localFollowState = computed(() => store.localFollowState);

const follow = () => store.follow(props.data.id.value);
const unfollow = () => store.unfollow(props.data.id.value);
const setNotifications = (notifications) =>
  store.setNotifications(props.data.id.value, notifications);

// Manejo del botón
const showOptions = ref(false);
const alreadyFollowing = computed(() => {
  if (localFollowState.value.following === null) 
    return props.data.follow.following;
  
  return localFollowState.value.following;
});
const notificationsState = computed(() => {
  if (localFollowState === null) return "P";

  if (localFollowState.value.notifications === null)
    return !props.data.follow.notifications
      ? "P"
      : props.data.follow.notifications.value;

  return localFollowState.value.notifications;
});
const followIcon = computed(() => {
  if (followState.value.loading === 'loading') 
    return 'fa fa-spinner'

  return 'far fa-bell fa-lg'
});
const followClass = computed(() => {
  if (followState.value.loading === 'loading') 
    return 'fa-pulse'

  return 'fa-lg'
});
const bellIcon = computed(() => {
  let n = "P";
  if (notificationsState) n = notificationsState.value;

  switch (n) {
    case "A":
      return "fa fa-bell";
    case "P":
      return "far fa-bell";
    case "N":
      return "far fa-bell-slash";
  }
});
const options = [
  {
    text: "Todas",
    icon: "fa fa-bell",
    action: () => {
      store.setLocalNotificationsState("A");
      //notifications.value = "A";
      setNotifications("A");
    },
  },
  {
    text: "Personalizadas",
    icon: "far fa-bell",
    action: () => {
      store.setLocalNotificationsState("P");
      // notifications.value = "P";
      setNotifications("P");
    },
  },
  {
    text: "Ninguna",
    icon: "far fa-bell-slash",
    action: () => {
      store.setLocalNotificationsState("N");
      // notifications.value = "N";
      setNotifications("N");
    },
  },
  {
    text: "Dejar de seguir",
    icon: "fa fa-user",
    action: () => {
      store.setLocalFollowingState(false);
      unfollow();
      // localFollow.value = false;
    },
  },
];

// Limpia estados locales
onUnmounted(() => {
  store.flush();
});
</script>

<style lang="scss" scoped>
.component-wrapper {
  position: relative;
}
.main-button-container {
  min-width: 160px;
  display: flex;
  justify-content: end;
}
.follow-box {
  display: flex;
  align-items: center;
  min-height: 30px;
  min-width: 110px;
  padding: 0 15px 0 12px;
  background-color: $color-primary;
  color: white;
  border: none;
  border-radius: 5px;
}
.follow-box:hover {
  text-decoration: underline;
}
.follow-box--already-following {
  padding: 0 15px 0 9px;
  background-color: transparent;
  color: $color-dark;
  border: 2px solid $color-dark;
  border-radius: 5px;
  animation: follow 500ms;
}
@keyframes follow {
  from {
    background-color: $color-primary;
  }
  to {
    background-color: transparent;
  }
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
  height: auto;
  width: max-content;
  border: 2px solid $color-dark;
  border-radius: 5px;
}
.option {
  display: flex;
  align-items: center;
  height: 37px;
  width: 100%;
  padding: 0 9px;
  background-color: $color-background;
  border: none;
  border-bottom: 1px solid grey;
}
.option:hover {
  background-color: $color-soft-grey;
}

@media (max-width: 600px) {
  .main-button-container {
    min-width: 0;
  }
}


</style>