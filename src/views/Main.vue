<script setup>
import Annoucements from "../components/Annoucements.vue";
import {onMounted, ref} from "vue";
import $ from "jquery";

const isAnnouncementOverlay = ref(false);
let announcementData = [];

const jumpToCourceCenter = () => {
  window.open("https://cc.cqupt.edu.cn");
}

const jumpToDocuments = () => {
  window.open("/infoNavi.php");
}

const jumpTo = (url) => {
  window.open(url);
}

const linkList = ref([
  {
    title: "作者Github",
    url: "https://github.com/gaojunran"
  },
  {
    title: "作者主页",
    url: "https://gaojunran.fun"
  },
  {
    title: "重邮官网",
    url: "https://www.cqupt.edu.cn/"
  },
]);

const parseAnnouncement = () => {
  const $tbodyNode = $('#newsList > tbody');
  console.log("$tbodyNode:", $tbodyNode);
  const $links = $tbodyNode.find('a');
  announcementData = $links.map((index, link) => {
    const $link = $(link);
    return {
      title: $link.text(),
      url: $link.attr('href')
    };
  }).get();
  console.log("results:", announcementData);
  // dump("art-announcement", results);
}

onMounted(() => {
  setTimeout(() => {
    parseAnnouncement();
  }, 1000);
})
</script>

<template>
  <Panel header="快捷服务" class="w-2/3 sm:w-1/2 mx-auto">
    <ButtonGroup class="hidden sm:block">
      <Button class="font-bold" outlined>课 程 表</Button>
      <Button class="font-bold" outlined>成绩查询</Button>
      <Button class="font-bold" outlined>考试信息</Button>
      <Button class="font-bold" outlined>选课中心</Button>
      <Button class="font-bold" outlined>学 评 教</Button>
    </ButtonGroup>

    <div class="flex flex-col sm:hidden gap-2">
      <Button class="font-bold block w-full text-sm" outlined>课 程 表</Button>
      <Button class="font-bold block w-full text-sm" outlined>成绩查询</Button>
      <Button class="font-bold block w-full text-sm" outlined>考试信息</Button>
      <Button class="font-bold block w-full text-sm" outlined>选课中心</Button>
      <Button class="font-bold block w-full text-sm" outlined>学 评 教</Button>
    </div>
    <Annoucements v-model:visible="isAnnouncementOverlay" :data="announcementData"></Annoucements>

  </Panel>

  <Panel header="信息公开" class="w-2/3 sm:w-1/2 mx-auto mt-4">
    <ButtonGroup class="hidden sm:block">
      <Button class="font-bold" outlined @click="isAnnouncementOverlay = true" label="Info" severity="info">教务动态
      </Button>
      <Button class="font-bold" outlined @click="jumpToCourceCenter()" label="Info" severity="info">课程中心</Button>
      <Button class="font-bold" outlined @click="jumpToDocuments()" label="Info" severity="info">各类文档</Button>
      <Button class="font-bold" outlined @click="" label="Info" severity="info">校 历</Button>
    </ButtonGroup>
    <div class="flex flex-col sm:hidden gap-2">
      <Button class="font-bold block w-full text-sm" outlined @click="isAnnouncementOverlay = true" label="Info"
              severity="info">教务动态
      </Button>
      <Button class="font-bold block w-full text-sm" outlined @click="jumpToCourceCenter()" label="Info"
              severity="info">课程中心
      </Button>
      <Button class="font-bold block w-full text-sm" outlined @click="jumpToDocuments()" label="Info" severity="info">
        各类文档
      </Button>
      <Button class="font-bold block w-full text-sm" outlined @click="" label="Info" severity="info">校 历</Button>
    </div>
  </Panel>

  <Panel header="我的链接" class="w-2/3 sm:w-1/2 mx-auto mt-4">
    <ButtonGroup class="hidden sm:block">
      <Button v-for="(item, index) in linkList" :key="index"
              class="font-bold" outlined
              @click="jumpTo(item.url)"
              label="Secondary" severity="secondary">{{ item.title }}
      </Button>
    </ButtonGroup>
    <div class="flex flex-col sm:hidden gap-2">
      <Button v-for="(item, index) in linkList" :key="index"
              class="font-bold block w-full text-sm" outlined
              @click="jumpTo(item.url)"
              label="Secondary" severity="secondary">{{ item.title }}
      </Button>
    </div>
  </Panel>
</template>

<style scoped>

</style>