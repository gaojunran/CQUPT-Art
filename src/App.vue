<script setup>


import {useRoute} from "vue-router";
import {useCookies} from "@vueuse/integrations/useCookies";
import {ref} from "vue";
import Settings from "./components/Settings.vue";

let route = useRoute();
let cookie = useCookies()
const refresh = () => {
  cookie.set("notToStyle", true, {maxAge: 10 * 60});
  window.location.href = route.fullPath;
}

const jumpTo = (url) => {
  window.location.href = url;
}

const isSettingsOverlay = ref(false);

</script>

<template>
  <div class="flex justify-between bg-gray-50 dark:bg-[#242424] fixed
  left-0 right-0 top-0 z-50 items-center">
    <div class="ml-4 mt-4 mb-4">
      <Button rounded pt:root:class="opacity-50 hover:opacity-100 transition  font-bold !w-12 !h-12 "
              v-tooltip="'主页'"
              @click="jumpTo('/')"
              outlined>
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5 20V9.5l7-5.288L19 9.5V20h-5.192v-6.384h-3.616V20z"/>
          </svg>
        </template>
      </Button>
    </div>
    <div class="font-bold text-black dark:text-white text-2xl text-center">CQUPT-Art</div>
    <div class="mr-4 mt-4 mb-4">
      <Button raised severity="secondary" outlined rounded
              v-tooltip="'设置'"
              @click="isSettingsOverlay = true"
              pt:root:class="opacity-50 hover:opacity-100 transition font-bold !w-12 !h-12">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path fill="currentColor"
                d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zM11 20h1.975l.35-2.65q.775-.2 1.438-.587t1.212-.938l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12t-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587zm1.05-4.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5M12 12"/>
        </svg>
      </Button>
    </div>
  </div>


  <div class="mx-auto mt-2">
    <RouterView></RouterView>
  </div>

  <Settings v-model:visible="isSettingsOverlay"></Settings>

</template>

<style scoped>

</style>
