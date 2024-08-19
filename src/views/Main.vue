<script setup>
import Annoucements from "../components/Annoucements.vue";
import {onMounted, ref} from "vue";
import $ from "jquery";
import {dump} from "../utils/utils.js";

const isAnnouncementOverlay = ref(false);
let announcementData = [];

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
  <Panel header="快捷服务">

    <ButtonGroup>
      <Button class="font-bold" outlined @click="isAnnouncementOverlay = true">教务动态</Button>
      <Button class="font-bold" outlined>课 程 表</Button>
      <Button class="font-bold" outlined>成绩查询</Button>
      <Button class="font-bold" outlined>选课中心</Button>
      <Button class="font-bold" outlined>课程中心</Button>
    </ButtonGroup>
    <Annoucements v-model:visible="isAnnouncementOverlay" :data="announcementData"></Annoucements>

  </Panel>
</template>

<style scoped>

</style>