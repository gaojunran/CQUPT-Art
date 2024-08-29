<script setup>
import $ from "jquery";
import {computed, ref} from "vue";
import {useClipboard} from "@vueuse/core";

const stuId = ref("");

stuId.value = $('#head > div:nth-child(1) > div:nth-child(2)').text().match(/\d{10}/)[0]
const fetchURL = computed(() => `https://api.imvictor.tech/cqupt/ical/${stuId.value}.ics?exam=0`)

const {copy, copied} = useClipboard({source: fetchURL, legacy: true});

const openURL = () => {
  window.open(fetchURL.value);
}

const copyURL = () => {
  copy(fetchURL.value);
}
</script>

<template>
  <Panel header="下载/导入课表"
         class="sm:w-3/4 w-full mx-auto p-1 sm:p-4"
         pt:header:class="!text-xl"
  >
    <div class="text-left text-base">
      <p>
        当前课表的解析能力依赖
        <a href="https://github.com/qwqVictor/CQUPT-ics"
           class="text-white hover:text-green hover:font-bold">CQUPT-ics</a>
        。数据源来自
        <a href="https://app.redrock.team/#/" class="text-white hover:text-green hover:font-bold">掌上重邮</a>
        。
      </p>
    </div>
    <div class="block sm:flex mt-4  mx-auto">
      <Button outlined class="w-full sm:w-auto" pt:label:class="!font-bold"
              @click="openURL()" label="下载本学期课表">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/>
          </svg>
        </template>
      </Button>

      <Divider layout="vertical" class="hidden sm:block"></Divider>

      <div class="px-4 rounded border border-white/50 text-white sm:flex items-center text-base hidden ">{{
          fetchURL
        }}
      </div>

      <Button class="ml-0 sm:ml-2 w-full sm:w-auto mt-4 sm:mt-0" @click="copyURL()" outlined
              :label="copied ? '复制成功！' :'复制URL订阅'"
              pt:label:class="!font-bold"
      >
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm-4 4q-.825 0-1.412-.587T3 20V6h2v14h11v2z"/>
          </svg>
        </template>
      </Button>
    </div>

    <div class="text-left text-base mt-4">
      <p class="text-white/50">
        通常Windows可通过以日历应用打开ics文件导入，安卓端日历可在日历设置中找到导入或订阅的选项。Apple平台的导入方式请查看
        <a href="https://github.com/qwqVictor/CQUPT-ics/blob/main/docs/ImportOrSubscribe.md"
           class="text-white/50 hover:text-green hover:font-bold">这里</a>
        。
      </p>
    </div>

    <Divider class="my-8"></Divider>
    <div class="flex gap-4 items-center">
      <div class="text-base">其它适配重邮教务的平台：
        <a href="https://i.ai.mi.com/h5/precache/ai-schedule/#/home"
           class="hover:text-green hover:font-bold">小爱课程表</a>；
        <a href="https://www.wakeup.fun/" class="hover:text-green hover:font-bold">WakeUp课程表</a>
      </div>
    </div>
  </Panel>
</template>

<style scoped>

</style>