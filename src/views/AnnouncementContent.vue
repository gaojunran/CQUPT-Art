<script setup>
import $ from 'jquery';
let title, content;
title = $('#mainPanel > h3:nth-child(1)').text();
console.log(title)

const extractAllText = (node) => {
  let paragraphs = [];
  let currentParagraph = '';

  // 如果当前节点是文本节点,添加到当前段落
  if (node.nodeType === Node.TEXT_NODE) {
    currentParagraph += $(node).text().trim();
  }
  // 如果当前节点是 <p> 标签,保存当前段落并开始新的段落
  else if (node.nodeName.toLowerCase() === 'p') {
    if (currentParagraph.trim() !== '') {
      paragraphs.push(currentParagraph.trim());
      currentParagraph = '';
    }
  }

  // 遍历当前节点的所有子节点
  $(node).contents().each(function() {
    paragraphs = paragraphs.concat(extractAllText(this));
  });

  // 保存最后一个段落
  if (currentParagraph.trim() !== '') {
    paragraphs.push(currentParagraph.trim());
  }

  return paragraphs;
}

// 示例使用
let rootNode = $('html body div div#mainPanel div')[0];
let allText = extractAllText(rootNode);
console.log(allText);

</script>

<template>
<!--  <Button>hello</Button>-->
  <div class="text-2xl font-bold">{{ title }}</div>
  <Panel>
    {{allText}}
  </Panel>
</template>

<style scoped>

</style>