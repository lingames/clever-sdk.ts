# TikTok 小游戏适配器

TikTok 小游戏适配器通过 `tt` 全局对象调用 TikTok 平台 API，提供登录、广告、分享、侧边栏、桌面快捷方式等功能。

## 类定义

```ts
import { TiktokSdk } from "@lingames/clever-sdk/src/platformMini/TiktokSdk.js";

const sdk = new TiktokSdk(platform, project_id, game_id);
```

- **全局对象**: `TTMinis`
- **继承**: `CleverSdk`

## 初始化

```ts
interface ttInitialize {
    sdk_login_url?: string;
}

await sdk.initialize({
    sdk_login_url: "https://api.salesagent.cc/game-analyzer/player/login"
});
```

## 登录

```ts
const data = await sdk.login();
```

**登录流程**:

1. 调用 `TTMinis.login({ force: false })` 获取临时登录凭证 `code`
2. 将 `code` 连同 `platform: "tik-tok"`、`project_id` 发送到 SDK 登录服务器
3. 服务器返回 `session_key`，SDK 自动保存

> 参考: [TTMinis.login](https://developers.tiktok.com/doc/mini-games-sdk-login)

## 激励视频广告

```ts
interface ttCreateRewardedVideoAd {
    adUnitId?: string;           // 通用广告单元 ID
    ttUnitId?: string;           // TikTok 专用广告 ID
    multiton?: boolean;          // 是否开启再得广告模式
    multitonMessage?: string[];  // 再得广告奖励文案，单个最长 7 字符
    multitonTimes?: 1|2|3|4;     // 额外观看次数（1-4）
}

const reward = await sdk.playRewardedVideo({
    ttUnitId: "your_tt_ad_unit_id",
    multiton: true,
    multitonMessage: ["金币", "钻石"],
    multitonTimes: 2
});
// reward.isEnded === true 时发放奖励
```

**再得广告模式**: 开启后，用户看完广告可继续观看获取额外奖励，`multitonMessage` 按顺序展示文案。

> 参考: [TTMinis.game.createRewardedVideoAd](https://developers.tiktok.com/doc/mini-games-sdk-iaa)

## Banner 广告

```ts
interface ttCreateBannerAd {
    adUnitId: string;      // 广告单元 ID
    adIntervals?: number;  // 自动刷新间隔（秒），>= 30
    style?: BannerStyle;   // 广告样式
}

await sdk.createBannerAd({
    adUnitId: "banner_id",
    adIntervals: 30,
    style: { left: 0, top: 100, width: 300, height: 50 }
});
```

> 参考: [TTMinis.game.createBannerAd](https://developers.tiktok.com/doc/mini-games-sdk-iaa)

## 插屏广告

```ts
interface ttCreateInterstitialAd {
    adUnitId?: string;  // 通用广告单元 ID
    ttUnitId?: string;  // Tiktok 专用广告 ID（优先）
}

const result = await sdk.showInterstitialAd({
    ttUnitId: "your_tt_interstitial_id"
});
// result.isEnded === true 表示展示成功
```

> 参考: `TTMinis.game.createInterstitialAd` / `InterstitialAd.show`

## 分享

```ts
interface ttShareAppMessage {
    title?: string;         // 转发标题
    description?: string;   // 分享文案
    imageUrl?: string;      // 转发图片链接
    query?: string;         // 查询字符串
    imageUrlId?: string;    // 审核通过的图片编号
    toCurrentGroup?: boolean;
    path?: string;
}

const success = await sdk.shareAppMessage({
    title: "分享标题",
    description: "分享描述",
    imageUrl: "https://example.com/share.png"
});
```

> 参考: [TTMinis.shareAppMessage](https://developers.tiktok.com/doc/mini-games-sdk-share-app-message)

## 侧边栏检测

```ts
interface CheckSceneResult {
    isSupport: boolean;  // 是否支持侧边栏
    isScene: boolean;    // 当前是否在侧边栏场景中
}

const result = await sdk.checkScene();
// result.isSupport === true && result.isScene === true 表示从侧边栏进入
```

> 参考: [TTMinis.checkScene](https://developers.tiktok.com/doc/mini-games-sdk-check-scene)

## 桌面快捷方式

### 检查是否已添加

```ts
const status = await sdk.checkShortcut();
// status.isSupport — 是否支持添加到桌面
// status.exist — 是否已添加
// status.needUpdate — 是否需要更新
```

> 参考: [TTMinis.checkShortcut](https://developers.tiktok.com/doc/mini-games-sdk-check-shortcut)

### 添加到桌面

```ts
await sdk.addShortcut({
    // 平台特定参数
});
```

> 参考: [TTMinis.addShortcut](https://developers.tiktok.com/doc/mini-games-sdk-add-shortcut)

## 设为常用

```ts
await sdk.addCommonUse();
```

## 事件上报

TikTok 适配器重写了 `reportEvent`，直接通过 `TTMinis.request` 发送事件到上报服务器：

```ts
await sdk.reportEvent("event_id", { key: "value" });
```
