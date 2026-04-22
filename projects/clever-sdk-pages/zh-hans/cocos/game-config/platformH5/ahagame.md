# 传音（Ahagame）H5 适配器

传音（Dlightek / Ahagame）H5 适配器通过动态加载传音广告 SDK 脚本，提供激励视频、插屏广告、Banner 广告和 Athena 埋点上报功能。适用于传音旗下 H5 游戏平台。

## 类定义

```ts
import { AhagameSdk } from "@lingames/clever-sdk/src/platformH5/transsion/AhagameSdk.js";

const sdk = new AhagameSdk(platform, project_id, game_id);
```

- **全局对象**: `window.h5sdk`
- **运行环境**: Web 浏览器
- **SDK 脚本**: `https://www.hippoobox.com/static/sdk/adsdk_1.8.0.0.js`
- **继承**: `CleverSdk`

## 初始化

```ts
interface ggInitialize {
    adSenseId: string;              // Google AdSense 发布商 ID（必填）
    appKey?: string;                // 传音 App Key
    gaId?: string;                  // Google Analytics ID
    adFrequencyHint?: string;       // 广告频率提示，默认 "45s"
    adChannel?: string;             // 广告渠道
    adBreakTest?: boolean;          // 测试广告模式，联调时开启，上线务必关闭
    pauseCallback?: () => void;     // 广告暂停回调
    resumeCallback?: () => void;    // 广告恢复回调
}

await sdk.initialize({
    adSenseId: "ca-pub-xxxxxxxxxxxxxxxx",
    appKey: "your_app_key",
    gaId: "GA_MEASUREMENT_ID",
    adFrequencyHint: "45s",
    adBreakTest: false
});
```

**初始化流程**:

1. 动态创建 `<script>` 标签加载传音广告 SDK（`adsdk_1.8.0.0.js`）
2. 脚本加载成功后调用 `window.h5sdk.init()` 初始化
3. 配置 AdSense 参数和 Google Analytics
4. 调用 `h5sdk.adConfig()` 预加载广告
5. 调用 `h5sdk.gameLoadingCompleted()` 通知游戏加载完成
6. 脚本加载失败时返回 `false`

> 注意: 脚本不设置 `crossOrigin`，因为 hippoobox 未对 localhost 返回 ACAO 头，Cocos Creator 预览（localhost:7456）会整包失败。

## 激励视频广告

```ts
interface ggCreateRewardedVideoAd {
    adUnitId?: string;
    name?: string;         // 广告位名称，默认 "my_reward"
    beforeAd?: () => void; // 广告开始前回调
    afterAd?: () => void;  // 广告结束后回调
}

const reward = await sdk.playRewardedVideo({
    name: "my_reward"
});
// reward.isEnded === true 时发放奖励
```

**广告回调**:

| 回调 | 说明 |
|------|------|
| `beforeAd` | 广告开始播放前触发 |
| `afterAd` | 广告播放结束后触发 |
| `beforeReward` | 奖励确认前触发，调用 `showAdFn()` 展示奖励 |
| `adDismissed` | 用户中途关闭广告，返回 `{ isEnded: false }` |
| `adViewed` | 用户完整观看广告，返回 `{ isEnded: true }` |
| `adBreakDone` | 广告流程结束（无论广告是否成功展示） |

## 显示激励视频广告

```ts
const reward = await sdk.showRewardedVideoAd();
```

快捷方法，内部调用 `playRewardedVideo({ adUnitId: "", name: "show_reward" })`。

## 插屏广告

```ts
interface ShowInterstitialAdOptions {
    type?: string;        // 广告类型，默认 "start"
    name?: string;        // 广告位名称，默认 "my_interstitial"
    beforeAd?: () => void;
    afterAd?: () => void;
}

const result = await sdk.showInterstitialAd({
    type: "start",
    name: "my_interstitial"
});
```

## Banner 广告

```ts
// 创建 Banner 广告
const result = await sdk.createBannerAd({
    client: "ca-pub-xxxxxxxxxxxxxxxx",
    slot: "ad_slot_id"
});

// 显示 Banner
const shown = await sdk.showBannerAd();

// 隐藏 Banner
const hidden = await sdk.hideBannerAd();

// 销毁 Banner
const destroyed = await sdk.destroyBannerAd();
```

**Banner 容器**: 使用 `id="ahagame-banner-container"` 的 DOM 元素，固定在页面底部。`createBannerAd` 会自动创建容器，`destroyBannerAd` 会移除容器。

## Athena 埋点上报

传音适配器通过 `h5sdk.athenaSend()` 上报事件到 Athena 分析系统。

### 通用事件上报

```ts
await sdk.reportEvent("event_id", { key: "value" });
```

### 预定义事件方法

适配器提供了多个预定义的便捷事件上报方法：

| 方法 | 说明 | 参数 |
|------|------|------|
| `reportGameStart(gameName)` | 游戏开始 | 游戏名称 |
| `reportLoadingBegin()` | 加载开始 | 无 |
| `reportLoadingEnd()` | 加载结束 | 无 |
| `reportLoadAdsbygoogle()` | 谷歌 JS 加载开始 | 无 |
| `reportLoadedAdsbygoogle()` | 谷歌 JS 加载完毕 | 无 |
| `reportTurnScreen()` | 转屏提示页面 | 无 |
| `reportHorizontal()` | 横屏动作 | 无 |
| `reportGamePage()` | 游戏主页面 | 无 |
| `reportLevelBegin(level)` | 关卡开始 | 关卡编号 |
| `reportLevelEnd(status)` | 关卡结束 | `"Fail"` 或 `"Pass"` |
| `reportLevelReward(hasAdOption)` | 关卡奖励 | 是否有广告选项 |
| `reportLevelNext()` | 过关点击 | 无 |
| `reportRewardClick(scene)` | 激励点击 | 场景名称 |

## 不支持的功能

传音适配器未实现以下功能，调用时使用基类默认行为：

- `login()` — 继承基类
- `checkSession()` — 继承基类
- `shareAppMessage()` — 继承基类
- `addShortcut()` / `checkShortcut()` — 继承基类
- `addCommonUse()` / `checkCommonUse()` — 继承基类
- `checkScene()` / `navigateToScene()` — 继承基类
- `getUserInfo()` — 继承基类
