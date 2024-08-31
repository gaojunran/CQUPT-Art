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
  <Panel pt:header:class="!pt-0" class="block sm:hidden">
    <div class="flex justify-between">
      <div class="text-opacity-80 text-sm sm:text-base" :class="[colorClassName]">{{ props.title }}</div>
      <div class=" block sm:hidden" :class="[colorClassName]">{{mainContent}} {{subContent}}</div>
    </div>
  </Panel>
  <Card class="flex-none hidden sm:block" pt:root:class="border border-white dark:border-black !bg-white !bg-opacity-5 hover:!border-black dark:hover:!border-white transition">
    <template #title>
      <div class="flex justify-between">
        <div class="text-opacity-80 text-sm sm:text-base" :class="[colorClassName]">{{ props.title }}</div>
        <div class=" block sm:hidden" :class="[colorClassName]">{{mainContent}} {{subContent}}</div>
      </div>
    </template>
    <template #content>
      <div class="text-left ">
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