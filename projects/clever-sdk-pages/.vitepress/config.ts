// https://vitepress.vuejs.org/config/app-configs
import { defineConfig } from "vitepress";
import { zhHans } from "./zhHans.js";

export default defineConfig({
    // 设置默认语言为简体中文
    lang: "zh-Hans",
    title: "Clever SDK 文档",
    description: "Clever SDK 多平台游戏开发工具包文档",

    locales: {
        root: {
            label: "简体中文",
            lang: "zh-Hans",
            link: "/zh-hans/engine/",
            themeConfig: zhHans,
        },
        "en-us": {
            label: "English",
            lang: "en-US",
            link: "/en-us/",
            themeConfig: {},
        },
        "zh-hant": {
            label: "繁体中文",
            lang: "zh-Hant",
            link: "/zh-hant/",
            themeConfig: zhHans,
        },
    },
});
