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

const colorClassNameMapping = {
  'green': 'text-green',
  'blue': 'text-blue',
  'purple': 'text-purple',
}
const colorClassName = colorClassNameMapping[props.color]
</script>

<template>
  <Card class="flex-none" :pt:root:class="['border border-gray-500 !bg-white !bg-opacity-5']">
    <template #title>
      <div class="text-left text-opacity-80 " :class="[colorClassName]">{{ props.title }}</div>
    </template>
    <template #content>
      <div class="text-left">
        <span class="text-2xl font-bold shadow-2xl" :class="[colorClassName]">
          {{ mainContent }}
        </span>
        <span class="text-sm font-bold" :class="[colorClassName]">{{ subContent }}</span>
      </div>
    </template>
  </Card>
</template>

<style scoped>

</style>