<template>
  <div class="container">
    <div class="login-card">
      <BFormGroup
        id="fieldset-id-user"
        class="input-container id-user-container"
        label="IdUser"
        label-for="input-id-user"
        :state="emailState"
      >
        <BFormInput
          id="input-id-user"
          class="input"
          v-model="idUser"
          trim
        ></BFormInput>
      </BFormGroup>
      <BButton class="login-button" @click="fetchFakeLoginToken()(idUser)">
        Login
      </BButton>
      <div class="token" v-if="getFakeLoginTokenState.loading === 'loaded'">
        {{ getFakeLoginTokenState.data.token }}
      </div>
    </div>
  </div>
</template>
  
  <script>
import { useFakeStore } from "~/store/fake.js";
export default {
  layout: "empty",
  data() {
    return {
      idUser: null,
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
      console.log(this.idUser);
      const store = useFakeStore();
      return store.fetchFakeLoginToken;
    },
  },
};
</script>
  
  <style scoped>
.container {
  min-height: 100vh;
  display: flex;
  /* justify-content: center;
      align-items: center; */
}
.login-card {
  position: relative;
  margin: auto;
  padding: 3rem 3rem;
  width: 25rem;
  height: 25rem;
  background-color: #eaedee;
  border-radius: 1rem;
  box-shadow: 1.5px 1.5px 30px -10px #252b31;
}
.id-user-container {
  margin-left: auto;
  margin-right: auto;
}
.token {
  max-width: 18rem;
  overflow-wrap: break-word;
}
.input {
  border-radius: 0.8rem;
}
</style>