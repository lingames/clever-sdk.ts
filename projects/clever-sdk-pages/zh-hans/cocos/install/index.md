# 安装

## 1. 获取 SDK

SDK 已发布到 [npm](https://www.npmjs.com/package/@lingames/clever-sdk), 可使用如下命令安装最新版本

```shell
npm i @lingames/clever-sdk
```

## 2. 项目集成

#### 动态判断法

在 `assets/Script/SdkManager.ts` (或其他你管理 SDK 的文件) 中，使用 `createSdk` 函数动态派发 SDK 实现：

```ts
import {createSdk} from "@lingames/clever-sdk/src";
import {DynamicSdkConfig} from "@lingames/clever-sdk/src/models";

export class SdkManager {
    public static async initSdk(config: DynamicSdkConfig) {
        const sdk = await createSdk(config);
        (window as any).mySdk = sdk;
        console.log("SDK 初始化成功");
    }
}
```

#### 静态编译法

在 Cocos Creator 中创建 `GAME_PLATFORM` 宏，并在 `assets/Script/SdkManager.ts` 中静态派发 SDK 实现：

1. **创建宏**: 在 Cocos Creator 编辑器中，进入 `项目 -> 项目设置 -> 宏`，添加一个名为 `GAME_PLATFORM` 的宏，并设置其值为当前平台（例如
   `WECHAT_GAME`, `douyingame`, `kuaishou`, `bilibili`, `oppo`, `huawei`, `google` 等）。

2. **静态派发**: 在 `SdkManager.ts` 中，根据 `GAME_PLATFORM` 宏的值来实例化对应的 SDK：

```ts
import {CleverSdk} from "@lingames/clever-sdk/src";
import {DynamicSdkConfig} from "@lingames/clever-sdk/src/models";
import {
    WeChatSdk,
    DouyinSDK,
    KuaiShouSdk,
    BilibiliSdk,
    OppoSdk,
    HuaweiSdk
} from "@lingames/clever-sdk/src/platformMini";
import {AdSenseSdk, BrowserSdk} from "@lingames/clever-sdk/src/platformH5";

declare const GAME_PLATFORM: string;

export async function createSdk(config: DynamicSdkConfig): Promise<CleverSdk> {
    console.log('my sdk create:', GAME_PLATFORM, config.game_id, typeof (config.wx));
    if (GAME_PLATFORM == 'WECHAT_GAME') {
        let sdk = new WeChatSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id.toString());
        await sdk.initialize({wx: (window as any).wx});
        return sdk
    }
    if (GAME_PLATFORM == 'douyingame') {
        return new DouyinSDK(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id.toString());
    }
    if (GAME_PLATFORM == 'kuaishou') {
        return new KuaiShouSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id.toString());
    }
    if (GAME_PLATFORM == 'bilibili') {
        return new BilibiliSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id.toString());
    }
    if (GAME_PLATFORM == 'oppo') {
        return new OppoSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id.toString());
    }
    if (GAME_PLATFORM == 'huawei') {
        return new HuaweiSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id.toString());
    }
    if (GAME_PLATFORM == 'google') {
        let sdk = new AdSenseSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id.toString());
        await sdk.initialize({adSenseId: config.adSenseId});
        return sdk
    }

    return new BrowserSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id.toString());
}
```
