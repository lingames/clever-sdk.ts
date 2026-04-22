import { DefaultTheme } from "vitepress";

export const zhHans: DefaultTheme.Config = {
    nav: [
        {
            text: "灵镜引擎",
            link: "/zh-hans/engine/index",
        },
        {
            text: "Cocos",
            link: "/zh-hans/cocos/index",
        },
        {
            text: "Unity",
            link: "/zh-hans/unity/index",
        },
    ],
    sidebar: {
        "/zh-hans/engine/": [
            {
                text: "灵镜引擎用户手册",
                items: [
                    { text: "快速开始", link: "/zh-hans/engine/index" },
                    { text: "用户注册", link: "/zh-hans/engine/registration" },
                    { text: "用户登录", link: "/zh-hans/engine/login" },
                    {
                        text: "创建项目",
                        link: "/zh-hans/engine/creating-projects",
                    },
                    {
                        text: "菜单管理",
                        link: "/zh-hans/engine/managing-menus",
                    },
                    { text: "事件管理", link: "/zh-hans/engine/adding-events" },
                    {
                        text: "创建分析",
                        link: "/zh-hans/engine/creating-analysis",
                    },
                    { text: "常见问题", link: "/zh-hans/engine/faq" },
                ],
            },
        ],
        "/zh-hans/cocos/": [
            {
                text: "Cocos",
                items: [
                    { text: "安装", link: "/zh-hans/cocos/install/index" },
                    {
                        text: "广告接入",
                        link: "/zh-hans/cocos/ad-integration/index",
                    },
                    {
                        text: "广告监测",
                        link: "/zh-hans/cocos/ad-tracking/index",
                        items: [
                            {
                                text: "Google AdSense ID 申请",
                                link: "/zh-hans/cocos/ad-tracking/adsense",
                            },
                        ],
                    },
                    {
                        text: "数据埋点",
                        link: "/zh-hans/cocos/data-analytics/index",
                    },
                    {
                        text: "SDK 功能",
                        link: "/zh-hans/cocos/sdk-features/index",
                    },
                    {
                        text: "小游戏 ID 申请",
                        link: "/zh-hans/cocos/game-config/index",
                    },
                    {
                        text: "各平台渠道",
                        link: "/zh-hans/cocos/game-config/adapter",
                        items: [
                            {
                                text: "微信小游戏",
                                link: "/zh-hans/cocos/game-config/platformMini/wechat",
                            },
                            {
                                text: "抖音小游戏",
                                link: "/zh-hans/cocos/game-config/platformMini/douyin",
                            },
                            {
                                text: "Tiktok小游戏",
                                link: "/zh-hans/cocos/game-config/platformMini/tiktok",
                            },
                            {
                                text: "快手小游戏",
                                link: "/zh-hans/cocos/game-config/platformMini/kuaishou",
                            },
                            {
                                text: "Bilibili小游戏",
                                link: "/zh-hans/cocos/game-config/platformMini/bilibili",
                            },
                            {
                                text: "Oppo小游戏",
                                link: "/zh-hans/cocos/game-config/platformMini/oppo",
                            },
                            {
                                text: "华为快游戏",
                                link: "/zh-hans/cocos/game-config/platformMini/huawei",
                            },
                            {
                                text: "谷歌H5",
                                link: "/zh-hans/cocos/game-config/platformH5/adsense",
                            },
                            {
                                text: "传音H5",
                                link: "/zh-hans/cocos/game-config/platformH5/ahagame",
                            },
                            {
                                text: "微游H5",
                                link: "/zh-hans/cocos/game-config/platformH5/minigame",
                            },
                            {
                                text: "4399",
                                link: "/zh-hans/cocos/game-config/platformNative/m4399",
                            },
                        ],
                    },
                    {
                        text: "常见问题",
                        link: "/zh-hans/cocos/faq/index"
                    },
                ],
            },
        ],
        "/zh-hans/unity/": [
            {
                text: "Unity",
                items: [
                    { text: "安装", link: "/zh-hans/unity/install/index" },
                    {
                        text: "广告接入",
                        link: "/zh-hans/unity/ad-integration/index",
                    },
                    {
                        text: "广告监测",
                        link: "/zh-hans/unity/ad-tracking/index",
                    },
                    {
                        text: "数据埋点",
                        link: "/zh-hans/unity/data-analytics/index",
                    },
                    {
                        text: "SDK 功能",
                        link: "/zh-hans/unity/sdk-features/index",
                    },
                    {
                        text: "小游戏 ID 申请",
                        link: "/zh-hans/unity/game-id-application/index",
                    },
                    { text: "常见问题", link: "/zh-hans/unity/faq/index" },
                ],
            },
        ],
    },
};
