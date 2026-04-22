# Google AdSense 适配器

Google AdSense 适配器通过动态加载 Google AdSense 脚本提供激励视频广告和 Banner 广告功能，适用于 Web/H5 浏览器环境。

## 类定义

```ts
import { AdSenseSdk } from "@lingames/clever-sdk/src/platformH5/AdSenseSdk.js";

const sdk = new AdSenseSdk(platform, project_id, game_id);
```

- **运行环境**: Web 浏览器（`document` 对象可用）
- **继承**: `CleverSdk`

## 初始化

```ts
interface ggInitialize {
    adSenseId: string;          // Google AdSense 发布商 ID（必填）
}

await sdk.initialize({
    adSenseId: "ca-pub-xxxxxxxxxxxxxxxx"
});
```

**初始化流程**:

1. 动态创建 `<script>` 标签加载 Google AdSense SDK
2. 脚本加载成功后初始化 `window.adsbygoogle`、`window.adBreak`、`window.adConfig`
3. 调用 `adConfig()` 配置广告参数（声音、预加载等）
4. 脚本加载失败时返回 `false`

## 激励视频广告

```ts
interface ggCreateRewardedVideoAd {
    adUnitId?: string;
}

const reward = await sdk.playRewardedVideo({
    adUnitId: "your_ad_unit_id"
});
// reward.isEnded === true 时发放奖励
```

**广告回调**:

| 回调 | 说明 |
|------|------|
| `beforeAd` | 广告开始播放前触发 |
| `afterAd` | 广告播放结束后触发（关闭和看完都会触发） |
| `beforeReward` | 奖励确认前触发，调用 `showAdFn()` 展示奖励 |
| `adDismissed` | 用户中途关闭广告 |
| `adViewed` | 用户完整观看广告 |
| `adBreakDone` | 广告流程结束（无论广告是否成功展示） |

> 参考: [Google AdSense for Games](https://developers.google.com/ad-sense/)

## 显示激励视频广告

```ts
const reward = await sdk.showRewardedVideoAd();
```

通过页面中 `id="adsense-container"` 的 DOM 元素展示广告。如果容器存在，显示容器并返回成功；否则返回失败。

## 隐藏 Banner 广告

```ts
const success = await sdk.hideBannerAd();
```

隐藏页面中 `id="adsense-container"` 的广告容器。

## 不支持的功能

AdSense 适配器未实现以下功能，调用时使用基类默认行为：

- `login()` — 继承基类
- `checkSession()` — 继承基类
- `createBannerAd()` — 继承基类
- `showBannerAd()` — 继承基类
- `destroyBannerAd()` — 继承基类
- `shareAppMessage()` — 继承基类
- `addShortcut()` / `checkShortcut()` — 继承基类
- `addCommonUse()` / `checkCommonUse()` — 继承基类
- `checkScene()` / `navigateToScene()` — 继承基类
- `getUserInfo()` — 继承基类
- `reportEvent()` — 继承基类
