<template>
  <div class="container">
    <div class="login-card">
      <b-form-group
        id="fieldset-email"
        class="input-container"
        label="Email"
        label-for="input-email"
        valid-feedback="Thank you!"
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
        class="input-container"
        label="Password"
        label-for="input-password"
        valid-feedback="Thank you!"
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
      <b-button class="login-button">
        Login
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  layout: "empty",
  computed: {
    emailState() {
      if(this.email.length == 0) return null
      return this.email.length >= 4;
    },
    emailInvalidFeedback() {
      if (this.email.length > 0) {
        return "Enter at least 4 characters.";
      }
      return "Please enter something.";
    },
    passwordState() {
      if(this.password.length == 0) return null
      return this.password.length >= 4;
    },
    passwordInvalidFeedback() {
      if (this.password.length > 0) {
        return "Enter at least 4 characters.";
      }
      return "Please enter something.";
    },
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
};
</script>

<style>
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
.login-button {
    bottom: 2.5rem;
  position: absolute;
  width: 76%; /* Utilizar variables css para calcular  */
  border-radius: 0.8rem;
  color: #252b31;
  background-color: #d49c6b;
  box-shadow: 2px 2px 12px 0px #252b31;
  border-style: none;
}
</style>