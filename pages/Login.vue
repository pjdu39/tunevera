<template>
  <div class="container">
    <div class="login-card">
      <b-form-group
        id="fieldset-email"
        class="input-container email-container"
        label="Email"
        label-for="input-email"
        :state="emailState"
      >
        <b-form-input
          id="input-email"
          class="input"
          v-model="email"
          :state="emailState"
          trim
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="fieldset-password"
        class="input-container pass-container"
        label="Contraseña"
        label-for="input-password"
        :state="passwordState"
      >
        <b-form-input
          id="input-password"
          class="input"
          v-model="password"
          :state="passwordState"
          trim
        ></b-form-input>
      </b-form-group>
      <a href="#" class="contrasena-olvidada">¿Ha olvidado la contraseña?</a>
      <b-button class="login-button"> Login </b-button>
    </div>
  </div>
</template>

<script>
export default {
  layout: "empty",
  computed: {
    emailState() {
      if (this.email.length == 0) return null;
      return this.email.length >= 4;
    },
    passwordState() {
      if (this.password.length == 0) return null;
      return this.password.length >= 4;
    }
  },
  data() {
    return {
      email: "",
      password: "",
    };
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
.input-container {
  margin-left: auto;
  margin-right: auto;
}
.input {
  border-radius: 0.8rem;
}
.contrasena-olvidada {
  bottom: 8rem;
  position: absolute;
}
</style>