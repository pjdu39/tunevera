<template>
  <div>
    <!-- Mostramos directamente la imagen para recortar -->
    <img
      v-if="selectedImage"
      :src="selectedImage"
      ref="imageElement"
      alt="Imagen para recortar"
    />
    <button v-if="selectedImage" @click="cropImage">Confirmar Recorte</button>
  </div>
</template>
  
  <script setup>
import { ref, nextTick } from "vue";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

const emits = defineEmits(["cropComplete"]);
const props = defineProps({
  selectedImage: String,
});
const imageElement = ref(null);

let cropper;

// Observamos la prop selectedImage para inicializar CropperJS cuando cambie
watch(() => props.selectedImage, async (newImage) => {
  await nextTick(); // Esperamos a que la imagen se cargue en el DOM

  if (cropper) {
    cropper.destroy(); // Si ya hay una instancia de CropperJS, la destruimos
  }

  if (newImage && imageElement.value) {
    // Inicializamos CropperJS con la nueva imagen
    cropper = new Cropper(imageElement.value, {
      aspectRatio: 1,
      viewMode: 1,
    });
  }
}, { immediate: true });

const cropImage = () => {
  if (!cropper) return;

  cropper.getCroppedCanvas().toBlob((blob) => {
    emits("cropComplete", blob);
    // Limpieza después de recortar
    if (cropper) {
      cropper.destroy();
      cropper = null;
    }
  }, "image/jpeg");
};
</script>
  
  
  
<style scoped>
.image-container {
  width: 100%; /* Ajusta según tus necesidades */
  height: 400px; /* Ajusta según tus necesidades */
  margin-top: 20px;
}
</style>
  