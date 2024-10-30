import {DefaultTheme} from 'vitepress';

export const zhHans: DefaultTheme.Config = {
    nav: [
        {
            text: 'Cocos',
            link: '/zh-hans/cocos/index',
        },
        {
            text: 'Unity',
            link: '/zh-hans/unity/index',
        },
    ],
    sidebar: {
        '/zh-hans/cocos/': [
            {
                text: 'Cocos',
                items: [
                    {text: '安装', link: '/zh-hans/cocos/install/index'},
                    {text: '广告接入', link: '/zh-hans/cocos/ad-integration/index'},
                    {text: '广告监测', link: '/zh-hans/cocos/ad-tracking/index',
                        items: [
                            {text: 'Google AdSense ID 申请', link: '/zh-hans/cocos/ad-tracking/adsense'},
                        ]
                    },
                    {text: '数据埋点', link: '/zh-hans/cocos/data-analytics/index'},
                    {text: 'SDK 功能', link: '/zh-hans/cocos/sdk-features/index'},
                    {text: '小游戏 ID 申请', link: '/zh-hans/cocos/game-id-application/index'},
                    {text: '常见问题', link: '/zh-hans/cocos/faq/index'},
                ],
            },
        ],
        '/zh-hans/unity/': [
            {
                text: 'Unity',
                items: [
                    {text: '安装', link: '/zh-hans/unity/install/index'},
                    {text: '广告接入', link: '/zh-hans/unity/ad-integration/index'},
                    {text: '广告监测', link: '/zh-hans/unity/ad-tracking/index'},
                    {text: '数据埋点', link: '/zh-hans/unity/data-analytics/index'},
                    {text: 'SDK 功能', link: '/zh-hans/unity/sdk-features/index'},
                    {text: '小游戏 ID 申请', link: '/zh-hans/unity/game-id-application/index'},
                    {text: '常见问题', link: '/zh-hans/unity/faq/index'},
                ],
            },
        ],
    },
}