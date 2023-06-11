<template>
  <div class="container">
    <div class="login-card">
      <b-form-group
        id="fieldset-email"
        class="input-container email-container"
        label="Email"
        label-for="input-email"
        valid-feedback="Correcto"
        :invalid-feedback="emailInvalidFeedback"
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
        valid-feedback="Correcto"
        :invalid-feedback="passwordInvalidFeedback"
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
      <b-form-checkbox
        id="checkbox-1"
        class="condiciones"
        v-model="terminosAceptados"
        name="checkbox-1"
      >
        Acepto los <a href="#">términos y condiciones</a>
      </b-form-checkbox>
      <b-button class="login-button"> Registrarse </b-button>
    </div>
  </div>
</template>
  
  <script>
export default {
  layout: "empty",
  data() {
    return {
      email: "",
      password: "",
      terminosAceptados: false,
    };
  },
  computed: {
    emailState() {
      if (this.email.length == 0) return null;
      return this.email.length >= 4;
    },
    emailInvalidFeedback() {
      if (this.email.length > 0) {
        return "Enter at least 4 characters.";
      }
      return "Please enter something.";
    },
    passwordState() {
      if (this.password.length == 0) return null;
      return this.password.length >= 4;
    },
    passwordInvalidFeedback() {
      if (this.password.length > 0) {
        return "Enter at least 4 characters.";
      }
      return "Please enter something.";
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
.input-container {
  margin-left: auto;
  margin-right: auto;
}
.input {
  border-radius: 0.8rem;
}
.condiciones {
  bottom: 8rem;
  position: absolute;
}
</style>