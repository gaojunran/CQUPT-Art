import {createApp} from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from "primevue/button";
import Dialog from 'primevue/dialog';
import Panel from 'primevue/panel';
import ButtonGroup from "primevue/buttongroup";
import $ from 'jquery';
import {dump} from "./utils/utils.js"
import {router} from "./utils/router.js";


// 获取 "app" 节点
const appNode = document.getElementById('app');
const removeOriginalStyle = () => {
    const allNodes = document.body.getElementsByTagName('*');
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
    for (let i = 0; i < allNodes.length; i++) {

        const node = allNodes[i];
        // 检查节点是否满足条件
        if (node.id !== 'app' && !isDescendantOf(node, appNode)) {
            // 隐藏节点
            node.style.display = 'none';
        }

    }
};

removeOriginalStyle();
const parseAnnouncement = () => {
    // sleep for one second
    setTimeout(() => {
            const $tbodyNode = $('#newsList > tbody');
            console.log("$tbodyNode:", $tbodyNode);
            const $links = $tbodyNode.find('a');
            const results = $links.map((index, link) => {
                const $link = $(link);
                return {
                    title: $link.text(),
                    url: $link.attr('href')
                };
            }).get();
            console.log("results:", results);
            dump("art-announcement", results);
        },
        1000)

}

$(document).ready(function () {
    parseAnnouncement();
});
// const parseAnnouncement = () => {
//     const tbodyNode = document.querySelector('#newsList > tbody:nth-child(2)');
//     console.log("tbodyNode:",tbodyNode)
//     console.log("innerHTML:",tbodyNode.innerHTML)
//     const regex = /<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
//     const results = [];
//     let match;
//     while (( match = regex.exec(tbodyNode.innerHTML)) !== null) {
//         results.push({
//             title: match[2],
//             url: match[1]
//         });
//     }
//     console.log("results:", results);
//     dump("art-announcement", results)
// }

// parseAnnouncement();

const app = createApp(App)
// For UI library PrimeVue
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
app.mount(
    (() => {
        const app = document.createElement('div');
        app.id = 'app';
        document.body.append(app);
        return app;
    })(),
);