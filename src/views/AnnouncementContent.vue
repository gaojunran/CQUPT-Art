<script setup>
import $ from 'jquery';
import {ref} from "vue";

let title = ref(""), content = ref([]), attachments = ref([]);

const jumpTo = (url) => {
  window.location.href = url;
}

function getAll() {
  title.value = $('#mainPanel > h3:nth-child(1)').text();

  $('html body div div#mainPanel div').find('p').each(function () {
    const text = $(this).text().trim()
    text !== title && content.value.push(text);
  });

  $('html body div div#mainPanel ul li').each(function () {
    const attachmentsNode = $(this).find('a');
    if (attachmentsNode.length > 0) {
      attachmentsNode.each(function () {
        const href = $(this).attr('href');
        const text = $(this).text();
        // console.log(href)
        href.includes('DownLoad') && attachments.value.push({
          href: href,
          text: text
        });
      });
    }
  })
}

getAll();
// console.log(title.value, content.value, attachments.value)
</script>


<template>
  <Panel class="w-full sm:w-2/3 mx-auto mt-16">
    <div class="text-lg sm:text-2xl font-bold mb-4">{{ title }}</div>
    <div v-for="paragraph in content" :key="paragraph" class="text-left text-sm sm:text-lg mb-4">
      {{ paragraph }}
    </div>

    <Divider></Divider>

    <p v-if="attachments.length" class="text-left text-sm sm:text-lg mb-4">附件下载：</p>
    <div class="flex gap-4">

      <Button outlined v-for="attachment in attachments" :key="attachment" class="flex-auto"
              @click="jumpTo(attachment.href)">
        {{ attachment.text }}
      </Button>
    </div>


  </Panel>
</template>

<style scoped>

</style>