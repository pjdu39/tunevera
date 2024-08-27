<template>
  <div class="container">
    <div class="section">
        <div class="option">
            <div class="option-title">Eliminar cuenta</div>
            <div class="option-wrapper">
                <button class="option-btn" @click="deleteAccount">Eliminar Cuenta</button>
                <div class="option-description">Elimina tu cuenta y todas las publicaciones asociadas de forma permanente.</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';
import { useProfileStore } from "~/store/profile.js";

// Protección de ruta con login
const { guard, setToken, logoutAndRedirectTo } = useAuth();
const route = useRoute();

onMounted(async () => {
  await setToken();
  await guard(route.path);
});

const profileStore = useProfileStore();
const deleteSuccess = computed(() => profileStore.getDeleteAccountState.data);
const deleteLoading = computed(() => profileStore.getDeleteAccountState.loading);
const deleteError = computed(() => profileStore.getDeleteAccountState.error);

const deleteAccount = async () => {
    await profileStore.deleteAccount();
    logoutAndRedirectTo('/')
}
</script>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 51rem;
}
.section {
    padding: 40px 20px;
    border-top: 1px solid rgb(216, 216, 216);
}
.option {
    display: flex;
}
.option-title {
    width: 35%;
    font-weight: bold;
}
.option-wrapper {
    width: 65%;
}
.option-btn {
    padding: 0;
    margin-bottom: 10px;
    background-color: white;
    border: none;
    color: blue;
    font-weight: 600;
}
.option-btn:hover {
    text-decoration: underline;
}
.option-description {

}
</style>