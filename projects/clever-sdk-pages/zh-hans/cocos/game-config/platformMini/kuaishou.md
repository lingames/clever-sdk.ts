# 快手小游戏适配器

快手小游戏适配器通过 `ks` 全局对象调用快手平台 API，提供登录、广告、分享、桌面快捷方式、侧边栏跳转等功能。

## 类定义

```ts
import { KuaiShouSdk } from "@lingames/clever-sdk/src/platformMini/KuaiShouSdk.js";

const sdk = new KuaiShouSdk(platform, project_id, game_id);
```

- **全局对象**: `ks`
- **继承**: `CleverSdk`

## 初始化

```ts
interface ksInitialize {
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

1. 调用 `ks.login()` 获取临时登录凭证 `code`
2. 将 `code` 连同 `platform`、`project_id`、`grant_type` 发送到 SDK 登录服务器
3. 服务器返回 `session_key`，SDK 自动保存

> 参考: [ks.request](https://open.kuaishou.com/docs/develop/api/network/request/request.html#ks-request)

## 激励视频广告

```ts
interface ksCreateRewardedVideoAd {
    adUnitId?: string;           // 通用广告单元 ID（ksUnitId 为空时必填）
    ksUnitId?: string;           // 快手专用广告 ID
    multiton?: boolean;          // 是否开启再得广告模式
    multitonMessage?: string[];  // 再得广告奖励文案
    multitonTimes?: 1|2|3|4;    // 额外观看次数
}

const reward = await sdk.playRewardedVideo({
    ksUnitId: "your_ks_ad_unit_id"
});
```

全局只创建一个视频广告实例。

> 参考: [ks.createRewardedVideoAd](https://open.kuaishou.com/miniGameDocs/gameDev/api/ad/rewardAd/ks.createRewardedVideoAd.html)

## 分享

```ts
interface ksShareAppMessage {
    templateId?: string;  // 分享模版 ID，不传走默认分享文案
    query?: string;       // 查询字符串，key1=val1&key2=val2 格式
}

const success = await sdk.shareAppMessage({
    templateId: "your_template_id"
});
```

> 参考: [ks.shareAppMessage](https://ks-game-docs.kuaishou.com/minigame/api/open/repost/ks.shareAppMessage.html)

## 添加到桌面

```ts
await sdk.addShortcut({
    // 快手平台自动处理参数
});
```

> 参考: [ks.addShortcut](https://ks-game-docs.kuaishou.com/minigame/api/open/shortcut/ks.addShortcut.html)

## 设为常用

```ts
await sdk.addCommonUse();
```

> 参考: [侧边栏复访](https://open.kuaishou.com/miniGameDocs/gameDev/open-function/siderBarRevisit.html)

## 侧边栏跳转

快手支持通过 `navigateToScene` 跳转到侧边栏等场景入口。

### 场景检测

```ts
const result = await sdk.checkScene();
// result.isSupport === false — 快手不支持 checkScene
```

### 跳转场景

```ts
interface ksNavigateToScene {
    scene: string;  // 需要跳转的入口场景
}

await sdk.navigateToScene({ scene: "sidebar" });
```

> 参考: [ks.navigateToScene](https://open.kuaishou.com/miniGameDocs/gameDev/api/siderBar/navigateToScene.html)

## Banner 广告

快手适配器的 Banner 广告直接继承基类默认实现。

```ts
await sdk.createBannerAd({ adUnitId: "banner_id" });
await sdk.showBannerAd();
await sdk.hideBannerAd();
await sdk.destroyBannerAd();
```

## 事件上报

快手适配器重写了 `reportEvent`，通过 `ks.request` 直接上报：

```ts
await sdk.reportEvent("event_id", { key: "value" });
```
