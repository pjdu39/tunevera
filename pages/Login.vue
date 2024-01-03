<template>
  <div class="delete-me-container">
    <div v-if="clientLoaded && isLoading">Loading ...</div>
    <div v-else>
      <pre v-if="isAuthenticated">
        <h2>Estoy logeado</h2>
        <code>{{ user }}</code>
      </pre>
      <pre v-else>
        Por favor, inicie sesión
      </pre>
    </div>
    <div class="delete-me">
      <button @click="login">Log in</button>
      <button @click="doLogout">Log out</button>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "~/composables/useAuth";

const clientLoaded = ref(false);

onMounted(() => {
  clientLoaded.value = true;
});

const { login, doLogout, user, isAuthenticated, isLoading } = useAuth();
</script>
<style scoped lang="scss">
.delete-me-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.delete-me {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
}
</style>