<script setup>

const visible = defineModel("visible");
</script>

<template>
  <Dialog v-model:visible="visible" modal header="课程表" :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">

    <Card>
      <template #content>
        <div class="mb-4 text-lg">
          <p class="font-bold">当前版本插件尚未提供课表的解析、查看功能。</p>
          <p>您可移步至CQUPT-ics项目，使用Python命令行提取本人课表，并导出为ics文件用于系统日历，或将脚本部署到服务器上实现动态的URL订阅。</p>
          <p>您也可使用小爱课程表、WakeUp课程表，均已适配重庆邮电大学的教务信息。</p>
        </div>
       <ButtonGroup class="hidden sm:block">
         <Button outlined>
           <a href="https://github.com/qwqVictor/CQUPT-ics">CQUPT-ics</a>
         </Button>
         <Button outlined >
           <a href="https://i.ai.mi.com/h5/precache/ai-schedule/#/home">小爱课程表</a>
         </Button>
         <Button outlined>
           <a href="https://www.wakeup.fun/">WakeUp课程表</a>
         </Button>
       </ButtonGroup>

        <div class="sm:hidden flex flex-col gap-4">
          <Button outlined class="block w-full">
            <a href="https://github.com/qwqVictor/CQUPT-ics">CQUPT-ics</a>
          </Button>
          <Button outlined class="block w-full">
            <a href="https://i.ai.mi.com/h5/precache/ai-schedule/#/home">小爱课程表</a>
          </Button>
          <Button outlined class="block w-full">
            <a href="https://www.wakeup.fun/">WakeUp课程表</a>
          </Button>
        </div>

      </template>

    </Card>
  </Dialog>
</template>

<style scoped>

</style>