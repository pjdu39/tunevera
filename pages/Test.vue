<template>
    <div>
      <ImageCropper @cropComplete="handleCropComplete" />
      <img v-if="croppedImageUrl" :src="croppedImageUrl" alt="Imagen Recortada">
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ImageCropper from '@/components/ImageCropper.vue';
  
  const croppedImageUrl = ref('');
  
  const handleCropComplete = (blob) => {
    croppedImageUrl.value = URL.createObjectURL(blob);
  };
  </script>