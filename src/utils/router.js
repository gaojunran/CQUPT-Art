import {createMemoryHistory, createRouter} from 'vue-router'

import Main from '../views/Main.vue'
import AnnouncementContent from "../views/AnnouncementContent.vue";
import ExamInfoTable from "../views/ExamInfoTable.vue";
import VPNGuard from "../views/VPNGuard.vue";
import GradeShow from "../views/GradeShow.vue";
import TimeTable from "../views/TimeTable.vue";

const routes = [
    {path: '/fileShowContent.php', component: AnnouncementContent},
    {path: '/student/ksap.php', component: ExamInfoTable},
    {path: '/', component: Main},
    {path: '/index.php', component: Main},
    {path: '/rump_frontend/access_forbidden/', component: VPNGuard},
    {path: '/student/chengjiPm.php', component: GradeShow},
    {path: '/user.php', component: TimeTable}
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})