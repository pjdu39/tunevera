<template>
    <div class="callback-container">
      <p>
        Logging you in...
      </p>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuth } from "~/composables/useAuth";
import { useRouter } from "vue-router";

const router = useRouter();
const { redirectCallback } = useAuth();

onMounted(async () => {
    try {
      await redirectCallback();
      // router.push("/perfil");
    } catch (error) {
      console.error(error)
      // router.push("/");
    }
});
</script>