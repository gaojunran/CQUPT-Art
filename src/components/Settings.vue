<script setup>
import {dump, load} from "../utils/utils.js";
import {computed, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useDark, useToggle} from "@vueuse/core";

const visible = defineModel("visible");
const links = ref(load("art-links"));
let route = useRoute();
const refresh = () => {
  window.location.href = route.fullPath;
}

const isDark = useDark()
const toggleDark = useToggle(isDark);

</script>

<template>
  <Dialog v-model:visible="visible" modal header="设置" :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" pt:root:class="!p-8">

    <div class="text-lg mb-4 font-bold">
      编辑我的链接
    </div>
    <div v-for="(item, idx) in links" class="mb-4 sm:mb-2">
      <InputText class="mr-4 !w-full sm:!w-1/3" v-model="links[idx].title"></InputText>
      <InputText v-model="links[idx].url" pt:root:class="!w-full mt-1 sm:mt-0 sm:!w-1/2"></InputText>
    </div>
    <Button outlined class="mr-2 mt-2 w-full sm:w-1/4" @click="links.push({title: '', url: ''})">新增一行</Button>
    <Button outlined class="mr-2 mt-2 w-full sm:w-1/4" @click="links.pop()">删除末行</Button>
    <Button outlined class="mt-2 w-full sm:w-1/4" @click="dump('art-links', links);refresh()">保 存</Button>
    <div class="mt-4 sm:mt-2 text-white/50">
      注：此配置保存在LocalStorage中，清除浏览器数据后会丢失。
    </div>
    <Divider class="!my-8"></Divider>
    <div class="text-lg mb-4 font-bold">
      关于此项目
    </div>
    <div>
      <p>
        高浚然 <a href="https://gaojunran.fun" class="hover:text-green">【查看作者主页】</a>
      </p>
      <p>
        当前版本：0.9.5 <a href="https://github.com/gaojunran/CQUPT-Art/releases" class="hover:text-green">【查看更新日志】</a>
      </p>
      <p>
        项目已遵循MIT License协议开源
        <a href="https://github.com/gaojunran/CQUPT-Art" class="hover:text-green">【项目源码及使用教程】</a>
      </p>

    </div>


  </Dialog>
</template>

<style scoped>

</style>