<script setup>
import $ from 'jquery';
let title, content;
title = $('#mainPanel > h3:nth-child(1)').text();
console.log(title)

function getPTagTexts(node) {
  let pTagTexts = [];
  $(node).find('p').each(function() {
    const text = $(this).text().trim()
    text !== title && pTagTexts.push(text);
  });

  return pTagTexts;
}

// 示例使用
let rootNode = $('html body div div#mainPanel div')[0];
content = getPTagTexts(rootNode);
// console.log(allText);

</script>


<template>
  <Panel class="w-full sm:w-2/3 mx-auto">
    <div class="text-lg sm:text-2xl font-bold mb-4">{{ title }}</div>
    <div v-for="paragraph in content" :key="paragraph" class="text-left text-sm sm:text-lg mb-4">
      {{ paragraph }}
    </div>

  </Panel>
</template>

<style scoped>

</style>