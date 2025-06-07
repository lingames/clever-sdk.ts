# Cocos 使用方法

# Cocos SDK 使用方法

## 动态判断法

使用 `createSdk` 函数动态派发 SDK 实现

```ts
import {createSdk} from "@lingames/clever-sdk/src";
const sdk = await createSdk({...})

Global["mySdk"] = sdk
```

## 静态编译法

在 Cocos 中创建 `GAME_PLATFORM` 宏, 静态派发 SDK 实现

```ts
export async function createSdk(config: DynamicSdkConfig): Promise<CleverSdk> {
    console.log('my sdk create:', GAME_PLATFORM, config.game_id, typeof (config.wx));
    if (GAME_PLATFORM == 'WECHAT_GAME') {
        let sdk = new WeChatSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id);
        await sdk.initialize({wx: window.wx});
        return sdk
    }
    if (GAME_PLATFORM == 'douyingame') {
        return new WeChatSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id);
    }
    if (GAME_PLATFORM == 'kuaishou') {
        return new KuaiShouSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id);
    }
    if (GAME_PLATFORM == 'bilibili') {
        return new BilibiliSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id);
    }
    if (GAME_PLATFORM == 'oppo') {
        return new OppoSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id);
    }
    if (GAME_PLATFORM == 'google') {
        let sdk = new AdSenseSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id);
        await sdk.initialize({adSenseId: config.adSenseId});
        return sdk
    }

    return new BrowserSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id);
}
```