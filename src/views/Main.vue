<script setup>
import Annoucements from "../components/Annoucements.vue";
import {ref} from "vue";

const isAnnouncementOverlay = ref(false);
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
    <Annoucements v-model="isAnnouncementOverlay"></Annoucements>

  </Panel>
</template>

<style scoped>

</style>