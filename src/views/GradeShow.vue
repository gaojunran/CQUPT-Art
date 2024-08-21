<script setup>
import $, {cssNumber} from "jquery";
import {computed, ref} from "vue";
import ShowCard from "../components/ShowCard.vue";

let detailedGrade = ref([]);
let rankAndGrade = ref([]);

const $tbodyNode1 = $('#bzyTable > tbody:nth-child(2)');
$tbodyNode1.find('tr').each(function () {
  let row = {
    semester: $(this).find('td:nth-child(2)').text(),
    courseName: $(this).find('td:nth-child(4)').text(),
    isRequired: $(this).find('td:nth-child(5)').text() === "必修",
    credit: $(this).find('td:nth-child(6)').text(),
    grade: $(this).find('td:nth-child(8)').text(),
    gradePoint: $(this).find('td:nth-child(9)').text(),
  }
  detailedGrade.value.push(row);
})

$('ui-id-2').trigger("click");
const $tbodyNode2 = $('#cjAllTab-zypm > table:nth-child(1) > tbody:nth-child(2)')
let currSemester = '';
let currData = {}
$tbodyNode2.find('tr').each((index, tr) => {
  if (index % 2 === 0) {
    currSemester = $(tr).find('td:nth-child(1)').text();
    currData = {
      gpa: $(tr).find('td:nth-child(3)').text(),
      gpaRank: $(tr).find('td:nth-child(4)').text(),
    }
  } else {
    rankAndGrade.value.push({
      semester: currSemester,
      gpa: currData.gpa,
      gpaRank: currData.gpaRank,
      gradeAverage: $(tr).find('td:nth-child(2)').text(),
      gradeAverageRank: $(tr).find('td:nth-child(3)').text(),
    })
  }
})
rankAndGrade.value.push({
  semester: "all",
  gpa: rankAndGrade.value.reduce((acc, cur) => acc + Number(cur.gpa), 0) / rankAndGrade.value.length,
  gpaRank: rankAndGrade.value.reduce((acc, cur) => acc + Number(cur.gpaRank), 0) / rankAndGrade.value.length,
  gradeAverage: rankAndGrade.value.reduce((acc, cur) => acc + Number(cur.gradeAverage), 0) / rankAndGrade.value.length,
  gradeAverageRank: rankAndGrade.value.reduce((acc, cur) => acc + Number(cur.gradeAverageRank), 0) / rankAndGrade.value.length,
})
// console.log(rankAndGrade)


const semesters = [...new Set(detailedGrade.value.map(item => item.semester))];
const choices = [
  ...semesters.map(item => ({name: item, code: item})),
  {name: "全部学期", code: "all"},
]
const myChoice = ref({name: "全部学期", code: "all"});
const semesterValue = computed(() => myChoice.value.code);
const tabValue = ref("绩点");

</script>

<template>

  <Panel class="sm:w-3/4 w-full mx-auto p-1 sm:p-4">
    <div class="flex justify-between">
      <SelectButton class=""
                    v-model="tabValue" :options="['绩点', '成绩', '学分']"></SelectButton>
      <Select class="w-28 sm:w-48 text-lg"
              :options="choices" optionLabel="name"
              v-model="myChoice"
      ></Select>
    </div>

    <div class="block sm:flex mt-8">
      <div class="w-full sm:w-1/3 flex flex-col gap-4">
        <Card class="flex-none text-[#34d399]" pt:root="bg-white bg-opacity-5" v-if="tabValue === '绩点'">
          <template #title>
            <div class="text-left text-[#34d399] text-opacity-80">平均学分绩点</div>
          </template>
          <template #content>
            <div class="text-left">
                <span class="text-2xl font-bold shadow-2xl">
                  {{ rankAndGrade?.find(item => item.semester === semesterValue)?.gpa || "暂无数据" }}
                </span>
              <span class="text-sm font-bold"> / 4.0</span>
            </div>
          </template>
        </Card>
        <Card class="flex-none text-[#34d399]" pt:root="bg-white bg-opacity-5" v-if="tabValue === '绩点'">
          <template #title>
            <div class="text-left text-[#34d399] text-opacity-80">专业排名</div>
          </template>
          <template #content>
            <div class="text-left">
                <span class="text-2xl font-bold shadow-2xl">
                  {{ rankAndGrade?.find(item => item.semester === semesterValue)?.gpaRank || "暂无数据" }}
                </span>
              <span class="text-sm font-bold"></span>
            </div>
          </template>
        </Card>
        <ShowCard v-if="tabValue === '绩点'"
                  class="text-green" :title="'满绩门数'"
                  :main-content="detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all') && Number(item.gradePoint) === 4.0).length"
                  :sub-content="' / ' + detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all')).length || ''"
        ></ShowCard>
        <Card class="flex-none text-[#0ea5e9]" pt:root="bg-white bg-opacity-5" v-if="tabValue === '成绩'">
          <template #title>
            <div class="text-left text-[#0ea5e9] text-opacity-80">平均分</div>
          </template>
          <template #content>
            <div class="text-left">
                <span class="text-2xl font-bold shadow-2xl">
                  {{ rankAndGrade?.find(item => item.semester === semesterValue)?.gradeAverage || "暂无数据" }}
                </span>
              <span class="text-sm font-bold"> / 100.00</span>
            </div>
          </template>
        </Card>
        <Card class="flex-none text-[#0ea5e9]" pt:root="bg-white bg-opacity-5" v-if="tabValue === '成绩'">
          <template #title>
            <div class="text-left text-[#0ea5e9] text-opacity-80">专业排名</div>
          </template>
          <template #content>
            <div class="text-left">
                <span class="text-2xl font-bold shadow-2xl">
                  {{ rankAndGrade?.find(item => item.semester === semesterValue)?.gradeAverageRank || "暂无数据" }}
                </span>
              <span class="text-sm font-bold"></span>
            </div>
          </template>
        </Card>
        <ShowCard v-if="tabValue === '成绩'"
                  class="text-blue"
                  :title="'及格门数'"
                  :main-content="detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all') && Number(item.grade) > 60).length"
                  :sub-content="' / ' + detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all')).length || ''"
        ></ShowCard>

        <ShowCard v-if="tabValue === '学分'"
                  class="text-purple"
                  :color="'#d4aafb'" :title="'必修通过学分'"
                  :main-content="detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all') && item.isRequired && item.grade > 60).reduce((acc, cur) => acc + Number(cur.credit), 0)"
                  :sub-content="' / ' + detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all')&& item.isRequired).reduce((acc, cur) => acc + Number(cur.credit), 0) || ''"
        ></ShowCard>

        <ShowCard v-if="tabValue === '学分'"
                  class="text-purple"
                  :color="'#d4aafb'" :title="'选修通过学分'"
                  :main-content="detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all') && !item.isRequired && item.grade > 60).reduce((acc, cur) => acc + Number(cur.credit), 0)"
                  :sub-content="' / ' + detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all')&& !item.isRequired).reduce((acc, cur) => acc + Number(cur.credit), 0) || ''"
        ></ShowCard>


        <Button severity="secondary" class="hidden sm:block">
          查看成绩详情
        </Button>
        <Button severity="secondary" class="hidden sm:block">
          查看培养方案
        </Button>
      </div>

      <div class="w-full sm:w-2/3 mt-4 sm:mt-0 ml-0 sm:ml-4">
        <DataTable :paginator="true" :rows="10"
                   :value="detailedGrade.filter(item => item.semester === semesterValue || semesterValue === 'all')"
                   class="text-sm sm:text-sm"
        >
          <Column field="courseName" header="课程名称" sortable></Column>
          <Column v-if="tabValue === '绩点'" field="gradePoint" header="绩点" sortable></Column>
          <Column v-if="tabValue === '成绩'" field="grade" header="成绩" sortable></Column>
          <Column field="credit" header="学分" sortable></Column>
        </DataTable>
      </div>
    </div>

  </Panel>
</template>

<style scoped>

</style>