<template>r
  <div class="container">
    <div class="login-card">
      <BFormGroup
        id="fieldset-email"
        class="email-container"
        label="Email"
        label-for="input-email"
        :state="emailState"
      >
        <BFormInput
          id="input-email"
          class="email-input"
          v-model="email"
          autocomplete="off"
          trim
        ></BFormInput>
      </BFormGroup>
      <BButton class="login-button" @click="fetchFakeLoginToken()(email)">
        Login
      </BButton>

      <!--
      <div class="token" v-if="getFakeLoginTokenState.loading === 'loaded'">
        {{ getFakeLoginTokenState.data.token }}
      </div>
      -->
    </div>
  </div>
</template>
  
<script>
import { useFakeStore } from "~/store/fake.js";
export default {
  layout: "empty",
  data() {
    return {
      email: null,
    };
  },
  computed: {
    getFakeLoginTokenState() {
      const store = useFakeStore();
      return store.getFakeLoginTokenState;
    },
  },
  methods: {
    fetchFakeLoginToken() {
      const store = useFakeStore();
      return store.fetchFakeLoginToken;
    },
  },
};
</script>
  
<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
}
.login-card {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 4rem;
  padding: 0 2rem;
  width: 25rem;
  height: 15rem;
  border: 3px solid $color-dark;
  border-radius: 5px;
}
.email-container {
  width: 100%;
}
.login-button {
  width: 100%;
  border-radius: 3rem;
  background-color: $color-primary;
  border: 1px solid $color-primary;
}
.token {
  max-width: 18rem;
  overflow-wrap: break-word;
}
.email-input {
  border: 1px solid $color-dark;
  border-radius: 5px;
}
</style>