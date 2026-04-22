# 微游 Minigame 适配器

微游 Minigame 适配器通过动态加载微游 SDK 脚本，提供登录、激励视频、插屏广告、Banner 广告、分享、快捷方式和事件上报等功能。适用于微游 Minigame H5 平台。

## 类定义

```ts
import { MiniGameSDK } from "@lingames/clever-sdk/src/platformH5/MiniGameSDK.js";

const sdk = new MiniGameSDK(platform, project_id, game_id);
```

- **全局对象**: `minigame`、`MiniGameAds`、`MiniGameAnalytics`
- **运行环境**: H5/浏览器（动态加载 SDK 脚本）
- **继承**: `CleverSdk`

## 初始化

```ts
interface minigameInitialize {
    sdk_login_url?: string;
    sdk_script_url?: string;   // SDK 脚本地址，默认 https://sdk.minigame.vip/js/1.1.1/minigame.js
}

await sdk.initialize({
    sdk_login_url: "https://api.salesagent.cc/game-analyzer/player/login",
    sdk_script_url: "https://sdk.minigame.vip/js/1.1.1/minigame.js"
});
```

**初始化流程**:

1. 如果 `minigame` 全局对象不存在，动态加载 SDK 脚本（避免重复加载）
2. 调用 `minigame.initializeAsync()` 初始化 SDK
3. 调用 `minigame.startGameAsync()` 启动游戏
4. 初始化成功后设置内部标记 `isInited = true`

## 声音回调

播放广告前需要暂停游戏音效，播放完毕后恢复。使用 `setSoundCallbacks` 设置回调：

```ts
sdk.setSoundCallbacks(
    () => { /* 暂停游戏声音 */ },
    () => { /* 恢复游戏声音 */ }
);
```

> 参考: [微游 Minigame SDK 接入指南](https://business.minigame.com/developers/zh/docs/cocos-creatorchajiansdkjieruzhinan)

## 登录

```ts
const data = await sdk.login();
// 返回: { open_id: "", union_id: "", session_key: "" }
```

微游 Minigame 平台不需要独立的登录流程，SDK 初始化时已自动完成身份认证。`login()` 直接返回空数据。

## 会话检查

```ts
const isValid = await sdk.checkSession();
// 返回 true 表示 SDK 已初始化
```

返回 SDK 初始化状态（`isInited`）。

## 激励视频广告

```ts
const reward = await sdk.playRewardedVideo({});
// reward.isEnded === true 时发放奖励
```

**播放流程**:

1. 检查 SDK 是否已初始化
2. 调用声音暂停回调
3. 调用 `MiniGameAds.showRewardedVideo()`
4. 广告结束后调用声音恢复回调
5. 用户完整观看返回 `{ isEnded: true, count: 1 }`
6. 用户中途退出返回 `{ isEnded: false, count: 0 }`

> 参考: [微游广告文档](https://business.minigame.com/developers/zh/docs/cocos-creatorchajiansdkjieruzhinan#%E5%B9%BF%E5%91%8A)

## 插屏广告

微游 Minigame 特有功能，其他平台不支持。

```ts
const success = await sdk.showInterstitial();
// 返回 true 表示广告展示成功
```

> 参考: [微游广告文档](https://business.minigame.com/developers/zh/docs/cocos-creatorchajiansdkjieruzhinan#%E5%B9%BF%E5%91%8A)

## Banner 广告

```ts
// 显示 Banner
const result = await sdk.showBannerAd();

// 隐藏 Banner
const hidden = await sdk.hideBannerAd();
```

> 参考: [微游广告文档](https://business.minigame.com/developers/zh/docs/cocos-creatorchajiansdkjieruzhinan#%E5%B9%BF%E5%91%8A)

## 分享

```ts
interface minigameShareAppMessage {
    image: string;   // 要分享的图像，使用 base64 编码
    text: string;    // 要分享的文字
    data?: Object;   // 附加到分享上的数据
    media?: {        // gif 或 video 媒体内容
        gif?: { url: string };
        video?: { url: string };
    };
}

const success = await sdk.shareAppMessage({
    image: "base64_encoded_image",
    text: "快来玩！",
    data: { level: 10 }
});
```

> 参考: [微游分享文档](https://business.minigame.com/developers/zh/docs/cocos-creatorchajiansdkjieruzhinan#%E5%88%86%E4%BA%AB)

## 桌面快捷方式

```ts
const success = await sdk.addShortcut({});
```

**创建流程**:

1. 检查 SDK 是否已初始化
2. 调用 `minigame.canCreateShortcutAsync()` 检查是否支持创建
3. 支持则调用 `minigame.createShortcutAsync()` 创建快捷方式

> 参考: [微游快捷方式文档](https://business.minigame.com/developers/zh/docs/cocos-creatorchajiansdkjieruzhinan#%E5%BF%AB%E6%8D%B7%E6%96%B9%E5%BC%8F)

## 获取语言环境

```ts
const locale = sdk.getLocale();
// 未初始化时返回 "zh-CN"
```

## 设置加载进度

```ts
sdk.setLoadingProgress(50); // 0-100
```

## 事件上报

微游适配器同时支持两种上报方式：

1. **微游自有统计**: 通过 `MiniGameAnalytics.onGameEvent()` 上报
2. **自有事件系统**: 通过 `fetch` 发送到 `EventEndPoint`

```ts
await sdk.reportEvent("event_id", { key: "value", label: "label" });
```
