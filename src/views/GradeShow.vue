<script setup>
import $ from "jquery";
import {computed, onMounted, ref, watch} from "vue";
import ShowCard from "../components/ShowCard.vue";

let detailedGrade = ref([]);
let totalInfo = ref({});

const getDetailedGrade = () => {
  const $tbodyNode = $('#bzyTable > tbody:nth-child(2)');
  $tbodyNode.find('tr').each(function () {
    let row = {
      semester: $(this).find('td:nth-child(2)').text(),
      courseName: $(this).find('td:nth-child(4)').text(),
      isRequired: $(this).find('td:nth-child(5)').text() === "必修",
      credit: Number($(this).find('td:nth-child(6)').text()),
      grade: Number($(this).find('td:nth-child(8)').text()),
      gradePoint: Number($(this).find('td:nth-child(9)').text()),
    }
    detailedGrade.value.push(row);
  })
}
const getTotalInfo = () => {
  let requiredPass = Number($('#AxfTjTable > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2)').text());
  let requiredNotPass = Number($('#AxfTjTable > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(3)').text());
  let requiredTotal = requiredPass + requiredNotPass;
  let optionalPass = Number($('#AxfTjTable > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2)').text());
  let optionalNotPass = Number($('#AxfTjTable > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(3)').text());
  let otherPass = Number($('#AxfTjTable > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(2)').text());
  let otherNotPass = Number($('#AxfTjTable > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(3)').text());
  let notRequiredPass = optionalPass + otherPass;
  let notRequiredTotal = notRequiredPass + optionalNotPass + otherNotPass;
  let gpa = Number($('#AxfTjTable > tbody:nth-child(2) > tr:nth-child(4) > td:nth-child(2)').text());
  let grade = Number($('#AxfTjTable > tbody:nth-child(2) > tr:nth-child(5) > td:nth-child(2)').text());
  $('ui-id-2').trigger("click");
  let gpaRank = $('#cjAllTab-zypm > table:nth-child(1) > tbody:nth-child(2) > tr:nth-last-child(2) > td:nth-child(4)').text();
  let gradeRank = $('#cjAllTab-zypm > table:nth-child(1) > tbody:nth-child(2) > tr:nth-last-child(1) > td:nth-child(3)').text();
  totalInfo.value = {
    requiredPass, requiredTotal, notRequiredPass, notRequiredTotal, gpa, grade, gpaRank, gradeRank
  }
}

const singleInfo = computed(() => {
  return {
    gpa: (detailedGrade.value?.filter(item => item.semester === semesterValue.value)?.reduce((acc, cur) => acc + cur.gradePoint * cur.credit, 0)
        / (detailedGrade.value?.filter(item => item.semester === semesterValue.value)?.reduce((acc, cur) => acc + cur.credit, 0))).toFixed(2),
    gradeAverage: (detailedGrade.value?.filter(item => item.semester === semesterValue.value && item.isRequired)?.reduce((acc, cur) => acc + cur.grade * cur.credit, 0)
        / (detailedGrade.value?.filter(item => item.semester === semesterValue.value && item.isRequired)?.reduce((acc, cur) => acc + cur.credit, 0))).toFixed(2),
  }
})

const semesters = computed(() => [...new Set(detailedGrade.value.map(item => item.semester))]);
const choices = computed(() => {
  return [
    ...semesters.value.map(item => ({name: item, code: item})),
    {name: "全部学期", code: "all"},
  ]
})
const myChoice = ref({name: "全部学期", code: "all"});
const semesterValue = computed(() => myChoice.value.code);
const tabValue = ref("绩点");

const jumpTo = (url) => {
  window.location.href = url;
}
const popover = ref();
const togglePopover = (event) => {
  popover.value.toggle(event);
}

const visible = ref(false);

onMounted(() => {
  getDetailedGrade();
  getTotalInfo();
});

</script>

<template>
  <Panel class="sm:w-3/4 w-full mx-auto p-1 sm:p-4 mt-16">
    <div class="sm:flex block justify-between items-center">
      <SelectButton class="w-3/4 sm:w-auto "
                    v-model="tabValue" :options="['绩点', '成绩', '学分']"
      ></SelectButton>
      <div class="font-bold text-2xl hidden sm:block">成绩统计
        <Popover ref="popover">
          <div class="">
            <p>
              成绩统计方式：
            </p>
            <p>
              - <span class="text-green font-bold">「平均学分绩点」</span>为所有「A类课程」绩点赋以学分权重的加权平均值，不统计绩点为0的课程。
            </p>
            <p>
              - <span class="text-blue font-bold">「必修课加权平均成绩」</span> 为所有「A类必修课」成绩赋以学分权重的加权平均值，不统计成绩为0的课程。
            </p>
            <p>
              - <span class="text-purple font-bold">「学分」</span>为所有「A类课程」的学分；「非必修课」包括选修课、限选课、其他课程。
            </p>
            <p>
              - 「单个学期」的数据依照以上算法计算得来；「全部学期」的数据（包括名次）直接采集自教务在线页面。
            </p>
          </div>
        </Popover>
      </div>
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
            :main-content="(semesterValue === 'all' ? totalInfo.gpa : singleInfo.gpa) || '暂无数据'"
            sub-content=" / 4.0"
            color="green"
        ></ShowCard>

        <ShowCard
            v-if="tabValue === '绩点' && semesterValue === 'all'"
            title="绩点名次"
            :main-content="totalInfo.gpaRank || '暂无数据'"
            color="green"
        ></ShowCard>

        <ShowCard v-if="tabValue === '绩点'"
                  title="满绩门数"
                  :main-content="detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all') && Number(item.gradePoint) === 4.0).length"
                  :sub-content="' / ' + detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all')).length || ''"
                  color="green"
        ></ShowCard>

        <ShowCard v-if="tabValue === '成绩'"
                  title="必修课加权平均成绩"
                  :main-content="(semesterValue === 'all' ? totalInfo.grade : singleInfo.gradeAverage) || '暂无数据'"
                  sub-content=" / 100.00"
                  color="blue"
        ></ShowCard>

        <ShowCard v-if="tabValue === '成绩' && semesterValue === 'all'"
                  title="成绩名次"
                  :main-content="totalInfo.gradeRank || '暂无数据'"
                  color="blue"
        ></ShowCard>

        <ShowCard v-if="tabValue === '成绩'"
                  color="blue"
                  :title="'及格门数'"
                  :main-content="detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all') && item.grade > 60).length"
                  :sub-content="' / ' + detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all')).length || ''"
        ></ShowCard>

        <ShowCard v-if="tabValue === '学分'"
                  color="purple" :title="'必修通过学分'"
                  :main-content="detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all') && item.isRequired && item.grade > 60).reduce((acc, cur) => acc + Number(cur.credit), 0)"
                  :sub-content="' / ' + detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all')&& item.isRequired).reduce((acc, cur) => acc + Number(cur.credit), 0) || ''"
        ></ShowCard>

        <ShowCard v-if="tabValue === '学分'"
                  color="purple" :title="'非必修通过学分'"
                  :main-content="detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all') && !item.isRequired && item.grade > 60).reduce((acc, cur) => acc + Number(cur.credit), 0)"
                  :sub-content="' / ' + detailedGrade?.filter(item => (item.semester === semesterValue || semesterValue === 'all')&& !item.isRequired).reduce((acc, cur) => acc + Number(cur.credit), 0) || ''"
        ></ShowCard>

        <Button severity="secondary" class="block sm:hidden text-sm" @click="visible = true">
          查看各科成绩
        </Button>
        <Button severity="secondary" class="text-sm"
                @click="jumpTo('/student/chengji.php')"
        >
          查看成绩详情
        </Button>
        <Button severity="secondary" class="text-sm" @click="jumpTo('/pyfa2020/pyfa2022/index.php')">
          查看培养方案（2020）
        </Button>
        <Button severity="secondary" class="text-sm" @click="jumpTo('/pyfa2024/reader.php')">
          查看培养方案（2024）
        </Button>
        <div class="text-white/50 text-center sm:text-left" @click="togglePopover">
          查看统计方式
        </div>
      </div>

      <div class="w-2/3 mt-0 ml-8 hidden sm:block">
        <DataTable :paginator="true" :rows="10"
                   :value="detailedGrade.filter(item => item.semester === semesterValue || semesterValue === 'all')"
                   class="text-sm sm:text-sm" sortField="credit" :sortOrder="-1"
        >
          <Column field="courseName" header="课程名称" sortable></Column>
          <Column v-if="tabValue === '绩点'" field="gradePoint" header="绩点" sortable></Column>
          <Column v-if="tabValue === '成绩'" field="grade" header="成绩" sortable></Column>
          <Column field="credit" header="学分" sortable></Column>
        </DataTable>
      </div>
    </div>
  </Panel>

  <Dialog v-model:visible="visible" modal header="各科成绩" :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <DataTable
        scrollable scrollHeight="600px" sortField="credit" :sortOrder="-1"
        :value="detailedGrade.filter(item => item.semester === semesterValue || semesterValue === 'all')"
        class=""
    >
      <Column field="courseName" header="课程名称" sortable></Column>
      <Column v-if="tabValue === '绩点'" style="min-width: 80px" field="gradePoint" header="绩点" sortable></Column>
      <Column v-if="tabValue === '成绩'" style="min-width: 80px" field="grade" header="成绩" sortable></Column>
      <Column field="credit" style="min-width: 80px" header="学分" sortable></Column>
    </DataTable>
  </Dialog>
</template>

<style scoped>

</style>