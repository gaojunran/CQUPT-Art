<script setup>
import $ from "jquery";
import {ref} from "vue";

const tbodyNode = $('#bzyTable > tbody:nth-child(2)');
const choices = [
  {name:"20231", code:"20231"},
    {name:"20232", code:"20232"},
    {name:"全部学期", code:"all"},
]
const myChoice = ref({name:"全部学期", code:"all"});
</script>

<template>

<Panel class="w-2/3 mx-auto">
  <Tabs value="0">
    <Select class="w-48 mr-2 ml-auto"
    :options="choices" optionLabel="name"
            v-model="myChoice"
    ></Select>
    <TabList>
      <Tab value="0">绩点</Tab>
      <Tab value="1">成绩</Tab>
      <Tab value="2">学分</Tab>
    </TabList>
    <TabPanels>
      <TabPanel value="0">
        <div class="flex mt-4">
          <div class="w-1/3 flex flex-col">
            <Card class="flex-1 text-[#34d399]" pt:root="bg-white bg-opacity-5">
              <template #title>
                <div class="text-left text-[#34d399] text-opacity-80">平均学分绩点</div>
              </template>
              <template #content>
                <div class="text-left">
                  <span class="text-2xl font-bold shadow-2xl">3.5</span>
                  <span class="text-sm font-bold"> / 4.0</span>
                </div>
              </template>
            </Card>
            <Card class="flex-1 text-[#34d399] mt-4" pt:root="bg-white bg-opacity-5">
              <template #title>
                <div class="text-left text-[#34d399] text-opacity-80">专业排名</div>
              </template>
              <template #content>
                <div class="text-left">
                  <span class="text-2xl font-bold shadow-2xl">3</span>
                  <span class="text-sm font-bold"></span>
                </div>
              </template>
            </Card>
          </div>
          <div class="w-2/3">
            <DataTable>

            </DataTable>
          </div>
        </div>

      </TabPanel>
      <TabPanel value="1">
        <p class="m-0">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
          ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
        </p>
      </TabPanel>
      <TabPanel value="2">
        <p class="m-0">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
          qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
        </p>
      </TabPanel>
    </TabPanels>
  </Tabs>
</Panel>
</template>

<style scoped>

</style>