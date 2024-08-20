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
import {router} from "./utils/router.js";
import Cookies from "universal-cookie";
import Tooltip from 'primevue/tooltip';

// 特定路由直接放行


if (!new Cookies().get("notToStyle" || true)) {
    console.log("CQUPT-Art插件运行中！祝您使用愉快！")

    import('./style.css');

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
}
