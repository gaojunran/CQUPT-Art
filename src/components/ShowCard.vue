<script setup>
const props = defineProps({
  color: String,
  title: String,
  mainContent: String,
  subContent: {
    type: String,
    default: "",
  },
});
console.log(props.color)
</script>

<template>
  <Card class="flex-none" pt:root="bg-white bg-opacity-5">
    <template #title>
      <div class="text-left text-opacity-80" :class="[`text-[${props.color}]`]">{{ props.title }}</div>
    </template>
    <template #content>
      <div class="text-left">
        <span class="text-2xl font-bold shadow-2xl" :class="[`text-[${props.color}]`]">
          {{ mainContent }}
        </span>
        <span class="text-sm font-bold" :class="[`text-[${props.color}]`]">{{ subContent }}</span>
      </div>
    </template>
  </Card>
</template>

<style scoped>

</style>