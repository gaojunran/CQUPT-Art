<script setup>
const jumpTo = (url) => {
  window.location.href = url;
}
</script>

<template>

  <Panel class="w-2/3 sm:w-1/2 mx-auto">
    <div class="text-center font-bold mb-4 text-sm">请挂载重邮VPN，或在校园网下继续访问。</div>
    <Button class="font-bold" outlined @click="jumpTo('/')">重 试</Button>
  </Panel>

</template>

<style scoped>

</style>