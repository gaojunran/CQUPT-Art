import {createApp} from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from "primevue/button";
import Dialog from 'primevue/dialog';
import Panel from 'primevue/panel';
import ButtonGroup from "primevue/buttongroup";
import DataTable from "primevue/datatable";
import Column from 'primevue/column';
import Card from 'primevue/card';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Select from 'primevue/select';
import SelectButton from "primevue/selectbutton";
import Message from "primevue/message";
import Divider from "primevue/divider";
import {router} from "./utils/router.js";
import Cookies from "universal-cookie";
import Tooltip from 'primevue/tooltip';
import CSS from './style.css?url'

// 特定路由直接放行
const regexList = [
    /\/student\/chengji\.php/,  // 成绩详情
    /\/pyfa2024\/reader\.php/,  // 2024培养方案
    /\/pyfa2020\/pyfa2022\/index\.php/,   // 2020培养方案
    /\/xk\.php/,    // 选课中心
    /\/jxpj\//,     // 学评教
    /\/infoNavi/,     // 各类文档
    /\/login\.php/,   // 登录
    // /\/fileShowContent/   // 文档详情
];

const isURLMatchesRegex = (regexList, currentURL) => {
    for (let i = 0; i < regexList.length; i++) {
        if (regexList[i].test(currentURL)) {
            return true;
        }
    }
    return false;
}

// console.log(isURLMatchesRegex(regexList, window.location.href) ? "不进行样式修改" : "进行样式修改")

if (!new Cookies().get("notToStyle") && !isURLMatchesRegex(regexList, window.location.href)) {
    console.log("CQUPT-Art插件运行中！祝您使用愉快！")

    // 为TailwindCSS的响应式设计
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0';
    document.getElementsByTagName('head')[0].appendChild(viewport);

    // 挂载Vue，加载PrimeVue组件
    const app = createApp(App)
    app.use(PrimeVue, {
        theme: {
            preset: Aura
        }
    });
    app.use(router)

    app.component('Button', Button);
    app.component('Dialog', Dialog);
    app.component('Panel', Panel);
    app.component('ButtonGroup', ButtonGroup);
    app.component('DataTable', DataTable);
    app.component('Column', Column);
    app.component('Card', Card);
    app.component('Tabs', Tabs);
    app.component('TabList', TabList);
    app.component('Tab', Tab);
    app.component('TabPanels', TabPanels);
    app.component('TabPanel', TabPanel);
    app.component('Select', Select);
    app.component('SelectButton', SelectButton);
    app.component('Message', Message);
    app.component('Divider', Divider);
    app.directive('tooltip', Tooltip);
    app.mount(
        (() => {
            const app = document.createElement('div');
            app.id = 'app';
            document.body.append(app);
            return app;
        })(),
    );

    // 处理Vue的路由
    const currentUrl = window.location.href.replace(/^(http[s]?:\/\/)?jwzx\.cqupt\.edu\.cn\/?/, "/");
    await router.push(currentUrl);

    // 判断一个节点是否是另一个节点的后代
    const isDescendantOf = (node, ancestor) => {
        let currentNode = node;
        while (currentNode.parentNode) {
            currentNode = currentNode.parentNode;
            if (currentNode === ancestor) {
                return true;
            }
        }
        return false;
    }

    // 移除原始样式
    const appNode = document.getElementById('app');
    const removeOriginalStyle = () => {
        const allNodes = document.body.getElementsByTagName('*');
        for (let i = 0; i < allNodes.length; i++) {
            const node = allNodes[i];
            // 检查节点是否满足条件
            if (node.id !== 'app' && !isDescendantOf(node, appNode)) {
                node.style.display = 'none';
            }
        }
    }
    removeOriginalStyle();

    const injectCSS = (url) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    }
    injectCSS(CSS)

}
