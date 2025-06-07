// https://vitepress.vuejs.org/config/app-configs
import {defineConfig} from 'vitepress';

export default defineConfig({
    locales: {
        root: {
            label: 'English',
            lang: 'en-US',
            link: '/en-us/',
            themeConfig: {
                nav: [
                    {
                        text: 'Cocos',
                        link: '/en-us/cocos/index',
                    },
                    {
                        text: 'Unity',
                        link: '/en-us/unity/index',
                    },
                ],
                sidebar: {
                    '/cocos/': [
                        {
                            text: 'Cocos',
                            items: [
                                {
                                    text: 'Usage',
                                    link: '/cocos/index',
                                },
                            ],
                        },
                    ],
                    '/unity/': [
                        {
                            text: 'Unity',
                            items: [
                                {
                                    text: 'Usage',
                                    link: '/unity/index',
                                },
                            ],
                        },
                    ],
                },
            },
        },
        'zh-hans': {
            label: '简体中文',
            lang: 'zh-Hans',
            link: '/zh-hans',
            themeConfig: {
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
                    '/cocos/': [
                        {
                            text: 'Cocos',
                            items: [
                                {
                                    text: '使用方法',
                                    link: '/cocos/index',
                                },
                            ],
                        },
                    ],
                    '/unity/': [
                        {
                            text: 'Unity',
                            items: [
                                {
                                    text: '使用方法',
                                    link: '/unity/index',
                                },
                            ],
                        },
                    ],
                },
            },
        },
        'zh-hant': {
            label: '繁体中文',
            lang: 'zh-Hant',
            link: '/zh-hant/',
            themeConfig: {
                nav: [
                    {
                        text: 'Cocos',
                        link: '/zh-hant/cocos/index',
                    },
                    {
                        text: 'Unity',
                        link: '/zh-hant/unity/index',
                    },
                ],
                sidebar: {
                    '/cocos/': [
                        {
                            text: 'Cocos',
                            items: [
                                {
                                    text: '使用方法',
                                    link: '/cocos/index',
                                },
                            ],
                        },
                    ],
                    '/unity/': [
                        {
                            text: 'Unity',
                            items: [
                                {
                                    text: '使用方法',
                                    link: '/unity/index',
                                },
                            ],
                        },
                    ],
                },
            },
        },
    },
});
