// https://vitepress.vuejs.org/config/app-configs
import {defineConfig} from 'vitepress';
import {zhHans} from './zhHans.js';

export default defineConfig({
    locales: {
        root: {
            label: 'English',
            lang: 'en-US',
            link: '/en-us/',
            themeConfig: {},
        },
        'zh-hans': {
            label: '简体中文',
            lang: 'zh-Hans',
            link: '/zh-hans/engine/',
            themeConfig: zhHans,
        },
        'zh-hant': {
            label: '繁体中文',
            lang: 'zh-Hant',
            link: '/zh-hant/',
            themeConfig: zhHans
        }
    }
});

