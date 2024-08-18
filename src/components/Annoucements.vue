<script setup>
import {onMounted} from "vue";
import {load} from "../utils/utils.js";
import {router} from "../utils/router.js";

const visible = defineModel()

const data = load("art-announcement");
const jump = (url) => {
  alert("当前暂未开发【公告详情】页面的美化，已为您跳转至原网页。")
  window.open(url);
  router.push(url);
};

onMounted(() => {
  load("art-announcement")
});


</script>

<template>
  <Dialog v-model:visible="visible" modal header="教务动态" :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <Button label="Secondary" severity="secondary"
            v-for="(item, index) in data"
            :key="index" class="mb-4 w-full"
            @click="jump(item.url)"
    >
      {{ item.title }}
    </Button>
  </Dialog>
</template>