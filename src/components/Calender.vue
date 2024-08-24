<script setup>
import $ from "jquery";
import {ref} from "vue";
import imgURL1 from "../assets/calendar_2425_1.png"
import imgURL2 from "../assets/calendar_2425_2.png"
const visible = defineModel("visible")

// console.log(imgURL1)
</script>

<template>
  <Dialog v-model:visible="visible" modal header="校历" :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
   <img :src="imgURL1" alt="calendar" class="w-full  sm:w-2/3 mx-auto" />
    <img :src="imgURL2" alt="calendar" class="w-full  sm:w-2/3 mx-auto mt-4" />

    <div class="mt-4">注：此校历图片暂时为写死在插件内的，以后会修改成从作者的服务器获取，并由作者本人维护.</div>
  </Dialog>


</template>

<style module>

</style>