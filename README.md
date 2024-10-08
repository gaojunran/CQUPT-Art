# CQUPT-Art

## 简介

一个重庆邮电大学「教务在线」的油猴脚本插件，全面重构原版教务的页面，聚焦关键信息，为学生提供流畅体验。

## 技术架构

技术架构和部分代码参考了同类项目[PKU-Art](https://github.com/zhuozhiyongde/PKU-Art)，在此表示感谢。

- [jQuery](https://jquery.com/)：抓取DOM元素的常用库。
- [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)：基于Vite的插件，可将Vue等主流框架代码编译成UserScript。
- [Vue3](https://cn.vuejs.org/)：现代前端框架。
- [TailwindCSS](https://tailwindcss.com/)：原子类CSS框架。
- [PrimeVue](https://cn.vuejs.org/)：最优秀的Vue组件样式库。

## 特色

- 📱 响应式设计：基于Tailwind CSS的响应式，手机端也能获得媲美电脑端的体验。
- 🌙 暗黑模式：基于PrimeVue的样式模式，日间/夜间模式随浏览器设置随心改变。
- 🌐 全面重构：不同于其它简单的CSS注入，隐藏了原版的整个页面并从零搭建。
- 🐒 油猴脚本：不同于我校另外两个出色的项目（掌上重邮、We重邮），插件完全静态地基于网页的解析，不用担心服务器宕机和隐私泄露。
- 📅 课表导入：引入[CQUPT-ics](https://github.com/qwqVictor/CQUPT-ics)项目的API，一键将课表下载到本地日历。

## 页面预览
![img_1.png](screenshots/img_1.png)
![img.png](screenshots/img.png)
![img_2.png](screenshots/img_2.png)

## 如何使用

### 电脑端

使用Chrome、Firefox等常见浏览器下载插件「[TamperMonkey](https://www.tampermonkey.net/)」，导入[release](https://github.com/gaojunran/CQUPT-Art/releases)的UserScript脚本。

访问[jwzx.cqupt.edu.cn]()，即可开始使用。

### 手机端

建议使用[Via浏览器](https://viayoo.com/zh-cn/)，更轻便易用。在设置 - 脚本处导入[release](https://github.com/gaojunran/CQUPT-Art/releases)的UserScript脚本即可。

您也可使用手机版的Firefox浏览器安装油猴插件，方法与电脑端类似。访问[jwzx.cqupt.edu.cn]()，即可开始使用。


## 0.9.4版本更新内容

- 增加吸顶导航栏，优化了电脑和手机端的布局。
- 优化了明亮（日间）模式下的显示效果，但建议使用深色模式以获得更佳体验。
- 优化了主页的CSS动画效果，划过Panel时会有边框闪烁效果。
- 校历图片更新为从Supabase Storage中动态获取，现在脚本中不再有静态资源，降低了插件大小。
- 右上角的临时关闭按钮改为设置按钮。设置功能开发中。
- 【重要说明】当前版本的成绩统计逻辑有误，等待下一版本修复。

## 0.9.5版本更新内容

- 重构了成绩查询页面的计算逻辑。
- 设置页面现在支持自定义自己的链接。
- 优化了手机端成绩查询页面的显示效果。

## 下一版本更新内容

全面重构课表订阅的逻辑（将页面DOM信息发送给后端，后端解析并返回ics课表及其订阅地址），使用自己的API。
