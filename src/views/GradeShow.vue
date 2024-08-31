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

const jumpTo = (url) => {
  window.location.href = url;
}

</script>

<template>
  <Panel class="sm:w-3/4 w-full mx-auto p-1 sm:p-4 mt-16">
    <div class="sm:flex block justify-between">
      <SelectButton class="w-3/4 sm:w-auto "
                    v-model="tabValue" :options="['绩点', '成绩', '学分']"
      ></SelectButton>
      <Select class="w-3/4 sm:w-48 text-sm sm:text-lg mt-4 sm:mt-0"
              :options="choices" optionLabel="name"
              v-model="myChoice"
      ></Select>
    </div>

    <div class="block sm:flex mt-8">
      <div class="w-full sm:w-1/3 flex flex-col gap-4">

        <ShowCard
            v-if="tabValue === '绩点'"
            title="平均学分绩点"
            :main-content="rankAndGrade?.find(item => item.semester === semesterValue)?.gpa || '暂无数据'"
            sub-content=" / 4.0"
            color="green"
        ></ShowCard>

        <ShowCard
            v-if="tabValue === '绩点'"
            title="专业排名"
            :main-content="rankAndGrade?.find(item => item.semester === semesterValue)?.gpaRank || '暂无数据'"
            color="green"
        ></ShowCard>

        <ShowCard v-if="tabValue === '绩点'"
                  title="满绩门数"
                  :main-content="detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all') && Number(item.gradePoint) === 4.0).length"
                  :sub-content="' / ' + detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all')).length || ''"
                  color="green"
        ></ShowCard>

        <ShowCard v-if="tabValue === '成绩'"
                  title="平均分"
                  :main-content="rankAndGrade?.find(item => item.semester === semesterValue)?.gradeAverage || '暂无数据'"
                  sub-content=" / 100.00"
                  color="blue"
        ></ShowCard>

        <ShowCard v-if="tabValue === '成绩'"
                  title="专业排名"
                  :main-content="rankAndGrade?.find(item => item.semester === semesterValue)?.gradeAverageRank || '暂无数据'"
                  color="blue"
        ></ShowCard>

        <ShowCard v-if="tabValue === '成绩'"
                  color="blue"
                  :title="'及格门数'"
                  :main-content="detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all') && Number(item.grade) > 60).length"
                  :sub-content="' / ' + detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all')).length || ''"
        ></ShowCard>

        <ShowCard v-if="tabValue === '学分'"
                  color="purple" :title="'必修通过学分'"
                  :main-content="detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all') && item.isRequired && item.grade > 60).reduce((acc, cur) => acc + Number(cur.credit), 0)"
                  :sub-content="' / ' + detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all')&& item.isRequired).reduce((acc, cur) => acc + Number(cur.credit), 0) || ''"
        ></ShowCard>

        <ShowCard v-if="tabValue === '学分'"
                  color="purple" :title="'选修通过学分'"
                  :main-content="detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all') && !item.isRequired && item.grade > 60).reduce((acc, cur) => acc + Number(cur.credit), 0)"
                  :sub-content="' / ' + detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all')&& !item.isRequired).reduce((acc, cur) => acc + Number(cur.credit), 0) || ''"
        ></ShowCard>


        <Button severity="secondary" class="hidden sm:block"
                @click="jumpTo('/student/chengji.php')"
        >
          查看成绩详情
        </Button>
        <Button severity="secondary" class="hidden sm:block" @click="jumpTo('/pyfa2020/pyfa2022/index.php')">
          查看培养方案（2020）
        </Button>
        <Button severity="secondary" class="hidden sm:block" @click="jumpTo('/pyfa2024/reader.php')">
          查看培养方案（2024）
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