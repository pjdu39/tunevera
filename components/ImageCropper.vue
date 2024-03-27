<template>
  <div class="cropper-container">
    <img
      v-if="selectedImage"
      :src="selectedImage"
      ref="imageElement"
      alt="Imagen para recortar"
    />
  </div>
  <button v-if="selectedImage" class="btn" @click="cropImage">Listo</button>
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
watch(
  () => props.selectedImage,
  async (newImage) => {
    await nextTick(); // Esperamos a que la imagen se cargue en el DOM

    if (cropper) {
      cropper.destroy(); // Si ya hay una instancia de CropperJS, la destruimos
    }

    if (newImage && imageElement.value) {
      // Inicializamos CropperJS con la nueva imagen
      cropper = new Cropper(imageElement.value, {
        aspectRatio: 1,
        viewMode: 2, // Modificamos la viewMode para rellenar el área
        autoCropArea: 1, // Esto asegura que el área de recorte inicie al tamaño máximo posible
        movable: true, // Permite mover la imagen dentro del contenedor
        zoomable: true, // Permite zoom
        rotatable: true, // Permite rotación
        scalable: true, // Permite escalar
      });
    }
  },
  { immediate: true }
);

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
  
<style scoped lang="scss">
.cropper-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: 20px;
  border: 2px solid $color-dark;
  max-height: 650px;
}
.cropper-container img {
  /* Establece máximos para asegurarse de que la imagen no excede el tamaño del contenedor */
  max-width: 100%;
  max-height: 100vh; /* O establece un valor fijo si se tiene una altura máxima en mente */
  /* object-fit asegura que la imagen cubra todo el espacio disponible */
  object-fit: cover;
}
.btn {
  position: relative;
  margin: 15px auto 0 auto;
  padding: 0 25px 3px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $color-primary;
  border-radius: 100px;
  color: white;
  font-size: 150%;
  font-weight: 600;
}
.btn:disabled {
  background-color: $color-soft-grey;
}
</style>
  