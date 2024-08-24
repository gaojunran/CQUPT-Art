<script setup>
import {onMounted} from "vue";

const visible = defineModel("visible")
const props = defineProps({
  data: Array
})

const jump = (url) => {
  // alert("当前暂未开发【公告详情】页面的美化，已为您跳转至原网页。")
  window.location.href = url;
};


</script>

<template>
  <Dialog v-model:visible="visible" modal header="教务动态" :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <Button label="Secondary" severity="secondary"
            v-for="(item, index) in props.data"
            :key="index" class="mb-4 w-full"
            @click="jump(item.url)"
    >
      {{ item.title }}
    </Button>
    <Button label="Primary" severity="primary"
            class="mb-4 w-full"
            @click="jump('/infoNavi.php')"
    >
      查看更多...
    </Button>
    <div v-if="!props.data.length">请关闭此对话框重新打开，或刷新页面！</div>
  </Dialog>
</template>