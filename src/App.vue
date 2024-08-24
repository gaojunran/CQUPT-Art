<script setup>


import {useRoute} from "vue-router";
import {useCookies} from "@vueuse/integrations/useCookies";

let route = useRoute();
let cookie = useCookies()
const refresh = () => {
  cookie.set("notToStyle", true, {maxAge: 10 * 60});
  window.location.href = route.fullPath;
}

const jumpTo = (url) => {
  window.location.href = url;
}
</script>

<template>
  <div class="relative">
    <div class="fixed top-0 left-0 m-4 sm:m-8">
      <Button rounded pt:root:class="opacity-20 hover:opacity-100 transition  font-bold"
              v-tooltip="'回到主页'"
              @click="jumpTo('/')"
              outlined>
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5 20V9.5l7-5.288L19 9.5V20h-5.192v-6.384h-3.616V20z"/>
          </svg>
        </template>
      </Button>
    </div>
    <div class="fixed top-0 right-0 m-4 sm:m-8">
      <Button raised severity="danger" outlined rounded
              v-tooltip="'临时禁用插件, \n10分钟内有效'"
              @click="refresh()"
              pt:root:class="opacity-20 hover:opacity-100 transition font-bold">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor" fill-rule="evenodd"
                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m-4.906-3.68L18.32 7.094A8 8 0 0 1 7.094 18.32M5.68 16.906A8 8 0 0 1 16.906 5.68z"/>
          </svg>
        </template>
      </Button>
    </div>

  </div>



  <div class="mx-auto">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>

</style>
