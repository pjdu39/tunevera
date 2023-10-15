<template>
  <div class="container">
    <div class="login-card">
      <BFormGroup
        id="fieldset-email"
        class="input-container email-container"
        label="Email"
        label-for="input-email"
        :state="emailState"
      >
        <BFormInput
          id="input-email"
          class="input"
          v-model="email"
          :state="emailState"
          trim
        ></BFormInput>
      </BFormGroup>
      <BFormGroup
        id="fieldset-password"
        class="input-container pass-container"
        label="Contraseña"
        label-for="input-password"
        :state="passwordState"
      >
        <BFormInput
          id="input-password"
          class="input"
          v-model="password"
          :state="passwordState"
          trim
        ></BFormInput>
      </BFormGroup>
      <a href="#" class="contrasena-olvidada">¿Ha olvidado la contraseña?</a>
      <BButton class="login-button"> Login </BButton>
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
    },
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