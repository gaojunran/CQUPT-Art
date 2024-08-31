<script setup>
const visible = defineModel("visible")

</script>

<template>
  <Dialog v-model:visible="visible" modal header="校历" :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="mb-4">图片保存在Supabase Storage中，请等待图片加载完成。</div>
    <img src="https://femvysmblittcbcajcac.supabase.co/storage/v1/object/public/assets/calendar1.png" alt="calendar" class="w-full  sm:w-2/3 mx-auto" />
    <img src="https://femvysmblittcbcajcac.supabase.co/storage/v1/object/public/assets/calendar2.png" alt="calendar" class="w-full  sm:w-2/3 mx-auto mt-4" />


  </Dialog>


</template>

<style module>

</style>