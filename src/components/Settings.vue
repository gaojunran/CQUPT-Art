<script setup>
const visible = defineModel("visible")
</script>

<template>
  <Dialog v-model:visible="visible" modal header="设置" :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div>
      设置功能还在开发中，敬请期待！
    </div>
  </Dialog>
</template>

<style scoped>

</style>