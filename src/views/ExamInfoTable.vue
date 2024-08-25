<script setup>
import $ from "jquery";
let tableNode = $('#stuKsTab-ks > table:nth-child(1)');
// console.log(tableNode.prop('outerHTML'));
let data = [];
const dayOfWeekMap = {
  "1": "周一",
  "2": "周二",
  "3": "周三",
  "4": "周四",
  "5": "周五",
  "6": "周六",
  "7": "周日",
};
$(tableNode).find('tr').each(function() {
  let row = {
    courseName: $(this).find('td:nth-child(6)').text()
        + " / " + $(this).find('td:nth-child(4)').text(),
    dateTime: $(this).find('td:nth-child(7)').text()
        + " / " + dayOfWeekMap[$(this).find('td:nth-child(8)').text()]
        + " / " + $(this).find('td:nth-child(9)').text(),
    location: $(this).find('td:nth-child(10)').text()
        + " / " + $(this).find('td:nth-child(11)').text(),
  };
  data.push(row);
});
data.shift();
// console.log(data)
</script>

<template>
  <Panel header="考试安排" pt:header:class="!text-xl"
      class="sm:w-3/4 w-full mx-auto p-1 sm:p-4">
    <DataTable :value="data"  class="text-sm sm:text-base">
      <Column field="courseName" header="课程名称"></Column>
      <Column field="dateTime" header="日期时间"></Column>
      <Column field="location" header="地点座位"></Column>
    </DataTable>
  </Panel>

</template>

<style scoped>

</style>