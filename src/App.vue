<script setup>
import {useRoute} from "vue-router";
import {useCookies} from "@vueuse/integrations/useCookies";
let route = useRoute();
let cookie = useCookies()
const refresh = () => {
  cookie.set("notToStyle", true, {maxAge: 10 * 60});
  window.location.href = route.fullPath;
}
</script>

<template>
  <div class="relative text-right">

    <Button class="fixed top-0 right-0 m-4"
            raised label="Danger" severity="danger" outlined
            v-tooltip="'仅临时关闭, 10分钟内有效\n彻底关闭请直接禁用此插件'"
            @click="refresh()"
            pt:root:class="opacity-20 hover:opacity-100 transition"
    >返回原版</Button>

  </div>

  <div class=" mx-auto">
    <RouterView></RouterView>
  </div>
    <div>{{ $route.fullPath }}</div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
