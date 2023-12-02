<template>
  <div class="component-wrapper">
    <div class="main-button-container">
      <button
        v-if="!alreadyFollowing"
        class="follow-box"
        @click="follow(), (localFollow = true)"
      >
        <div class="notification">
          <font-awesome-icon
            icon="far fa-bell"
            class="fa-lg"
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

// Data
const notifications = ref("P");

// Acceso a api
const store = useFollowerStore();

const followState = computed(() => store.followState);
const unfollowState = computed(() => store.unfollowState);
const setNotificationsState = computed(() => store.setNotificationsState);

const follow = () => store.follow(props.data.id.value);
const unfollow = () => store.unfollow(props.data.id.value);
const setNotifications = () =>
  store.setNotifications(props.data.id.value, notifications.value);

// Manejo del botón
const localFollow = ref(null)
//const localNotifications = ref(null)
const showOptions = ref(false);
const alreadyFollowing = computed(() => {
  if (localFollow.value === null) return props.data.following;
  return localFollow.value;
});
const bellIcon = computed(() => {
  const n = notifications.value;
  //if (localNotifications.value !== null) n = localNotifications.value

  switch(n) {
    case 'A':
      return 'fa fa-bell'
    case 'P':
      return 'far fa-bell'
    case 'N':
      return 'far fa-bell-slash'
  }
});
const options = [
  {
    text: "Todas",
    icon: "fa fa-bell",
    action: () => {
      notifications.value = "A";
      setNotifications();
    },
  },
  {
    text: "Personalizadas",
    icon: "far fa-bell",
    action: () => {
      notifications.value = "P";
      setNotifications();
    },
  },
  {
    text: "Ninguna",
    icon: "far fa-bell-slash",
    action: () => {
      notifications.value = "N";
      setNotifications();
    },
  },
  {
    text: "Dejar de seguir",
    icon: "fa fa-user",
    action: () => {
      unfollow();
      localFollow.value = false;
    },
  },
];
</script>

<style lang="scss" scoped>
.component-wrapper {
  position: relative;
}
.main-button-container {
  /*
  display: flex;
  justify-content: flex-end;
  */
  min-width: 140px;
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
  background-color: transparent;
  border: none;
  border-bottom: 1px solid grey;
}
.option:hover {
  background-color: $color-soft-grey;
}
</style>