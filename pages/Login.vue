<template>
  <div>
    <button @click="login">Log in</button>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';

const { login } = useAuth();
</script>