<script setup>
import Annoucements from "../components/Annoucements.vue";
import {onMounted, ref} from "vue";
import $ from "jquery";

const isAnnouncementOverlay = ref(false);
let announcementData = [];
const isLogin = ref(false);


const jumpTo = (url) => {
  window.location.href = url;
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
}

const parseLoginStatus = () => {
  const $loginNode = $('#navigation > div:nth-child(1) > div:nth-child(2)');
  isLogin.value = !$loginNode.text().includes("游客");
  console.log(isLogin)
}

onMounted(() => {
  parseLoginStatus()
  setTimeout(() => {
    parseAnnouncement();
  }, 1000);
})
</script>

<template>
  <Panel class="w-2/3 sm:w-1/2 mx-auto" v-if="!isLogin">
    <div class="text-center font-bold mb-4 text-sm">您还未登录，请点击下方按钮完成登录。</div>
    <Button class="font-bold" outlined @click="jumpTo('/tysfrz/index.php')">登 录</Button>
  </Panel>
  <Panel header="快捷服务" class="w-2/3 sm:w-1/2 mx-auto" v-if="isLogin">
    <ButtonGroup class="hidden sm:block">
      <Button class="font-bold" outlined>课 程 表</Button>
      <Button class="font-bold" outlined>成绩查询</Button>
      <Button class="font-bold" outlined @click="jumpTo('/student/ksap.php')">考试信息</Button>
      <Button class="font-bold" outlined>选课中心</Button>
      <Button class="font-bold" outlined>学 评 教</Button>
    </ButtonGroup>

    <div class="flex flex-col sm:hidden gap-2">
      <Button class="font-bold block w-full text-sm" outlined>课 程 表</Button>
      <Button class="font-bold block w-full text-sm" outlined>成绩查询</Button>
      <Button class="font-bold block w-full text-sm" outlined @click="jumpTo('/student/ksap.php')">考试信息</Button>
      <Button class="font-bold block w-full text-sm" outlined>选课中心</Button>
      <Button class="font-bold block w-full text-sm" outlined>学 评 教</Button>
    </div>
    <Annoucements v-model:visible="isAnnouncementOverlay" :data="announcementData"></Annoucements>

  </Panel>

  <Panel header="信息公开" class="w-2/3 sm:w-1/2 mx-auto mt-4" v-if="isLogin">
    <ButtonGroup class="hidden sm:block">
      <Button class="font-bold" outlined @click="isAnnouncementOverlay = true" label="Info" severity="info">教务动态
      </Button>
      <Button class="font-bold" outlined @click="jumpTo('https://cc.cqupt.edu.cn')" label="Info" severity="info">课程中心</Button>
      <Button class="font-bold" outlined @click="jumpTo('/infoNavi.php')" label="Info" severity="info">各类文档</Button>
      <Button class="font-bold" outlined @click="" label="Info" severity="info">校 历</Button>
    </ButtonGroup>
    <div class="flex flex-col sm:hidden gap-2">
      <Button class="font-bold block w-full text-sm" outlined @click="isAnnouncementOverlay = true" label="Info"
              severity="info">教务动态
      </Button>
      <Button class="font-bold block w-full text-sm" outlined @click="jumpTo('https://cc.cqupt.edu.cn')" label="Info"
              severity="info">课程中心
      </Button>
      <Button class="font-bold block w-full text-sm" outlined @click="jumpTo('/infoNavi.php')" label="Info" severity="info">
        各类文档
      </Button>
      <Button class="font-bold block w-full text-sm" outlined @click="" label="Info" severity="info">校 历</Button>
    </div>
  </Panel>

  <Panel header="我的链接" class="w-2/3 sm:w-1/2 mx-auto mt-4" v-if="isLogin">
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