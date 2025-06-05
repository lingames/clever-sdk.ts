# 传音（Ahagame）H5 SDK 模块

本目录为 Clever SDK 中 **传音 / Dlightek** 平台的 H5 实现：通过官方 **`h5sdk`**（脚本托管于 `hippoobox.com` 的 **adsdk**）对接 **激励、插屏、Banner** 及 **Athena 埋点**。

更完整的架构说明、FAQ、上线检查清单见：**[docs/transsion-ads.md](../../../docs/transsion-ads.md)**。

---

## 1. 如何引用（给集成方）

与迁移目录前一致，仍从 **`@lingames/clever-sdk`** 包引用，无需写本目录深层路径：

```ts
import { createSdk } from "@lingames/clever-sdk";
import { AhagameSdk, TRANSSION_ADSDK_SCRIPT_URL } from "@lingames/clever-sdk";
```

- **`createSdk`**：当 `config.platform === "ahagame"` 时内部会 `new AhagameSdk` 并执行 `initialize`（推荐）。
- **`TRANSSION_ADSDK_SCRIPT_URL`**：当前集成的 adsdk 脚本 URL，升级版本时与 `constants.ts`、文档同步。

---

## 2. 必配 / 选填参数（`createSdk`）

传音走 **`ggInitialize`**（见 `src/models/SdkInitialize.ts`），并与 **`DynamicSdkConfig`** 中的公共字段组合使用。

### 2.1 公共字段（`MyConfig`，必配）

| 字段 | 说明 |
|------|------|
| `project_id` | 项目 ID（Clever 侧约定，字符串）。 |
| `sdk_login_url` | 登录鉴权地址；纯广告场景可传 `""`。 |
| `game_id` | 游戏 ID。 |

### 2.2 传音专用：必须把 `platform` 设为 `"ahagame"`

自动平台探测**不会**识别传音浏览器环境，必须显式：

```ts
platform: "ahagame",
```

### 2.3 广告与后台参数（初始化核心）

| 参数 | 是否必填 | 说明 |
|------|----------|------|
| **`appKey`** | **联调/上线必填** | **传音 / Dlightek 控制台**为应用分配的 **App Key**（多为数字字符串，如 `5024356`）。没有则 `h5sdk.init` 无有效应用上下文，广告无法正常填充。 |
| **`adSenseId`** | **必填（字符串）** | Google AdSense **客户端 ID**（`ca-pub-xxxxxxxx`）。联调可用官方示例或 Google 测试发布商；正式环境用后台/运营下发的正式 ID。 |
| `gaId` | 选填 | GA4 测量 ID（如 `G-xxxx`），与官方壳里 `ga.id` 一致时可填。 |
| `adChannel` | 选填 | 对应 adsense 的 `data-ad-channel`，渠道号由运营/后台提供。 |
| `adFrequencyHint` | 选填 | 默认常见为 `45s`，与 `data-ad-frequency-hint` 对应。 |
| **`adBreakTest`** | 选填（联调建议开） | 为 `true` 时注入 **`data-adbreak-test: "on"`**，便于出**测试广告**；**上线必须关闭**。 |
| `pauseCallback` / `resumeCallback` | 选填 | 广告展示前后暂停/恢复游戏的回调。 |

最小可运行示例（字段名与 `createSdk` 传入对象一致）：

```ts
const sdk = await createSdk({
  project_id: "your_project",
  sdk_login_url: "",
  game_id: "your_game_id",
  platform: "ahagame",
  adSenseId: "ca-pub-xxxxxxxxxxxxxxxx",
  appKey: "你的AppKey",
  adBreakTest: true, // 仅联调；上线改为 false 或删除
});
```

---

## 3. 在哪里试用 / 演示（本 monorepo）

| 场景 | 位置 | 说明 |
|------|------|------|
| **Cocos Creator + Web 预览** | 仓库 **`assets/scripts/UIController.ts`** | 挂载在 Canvas，Inspector 中可设「演示平台」、**`ahagameAppKey`**、**`ahagameAdSenseId`** 等；按钮「传音广告 / SDK测试」走 `playRewardedVideo`。预览前建议在 **`onLoad` 最前**调用 **`AhagamePreviewShim`**（见 `assets/scripts/AhagamePreviewShim.ts`），减轻 manifest / Service Worker 404。 |
| **官方 iframe 壳 + 子游戏** | 仓库 **`game/`** 目录 | 根 `game/index.html` 为壳，`game/game/` 为示例小游戏；通过 `postMessage("reward" \| "next")` 调广告。说明见 **`game/readme.md`**。 |
| **构建产物联调** | **Web Mobile 构建输出** | 可在工程 **`build-templates/web-mobile/`** 放置 `manifest_transsion.json`、`sw_transsion.js` 占位，减少根路径 404（见 **[docs/transsion-ads.md](../../../docs/transsion-ads.md)** 第六节）。 |

---

## 4. 常用广告 API（`AhagameSdk` 类）

| 方法 | 用途 |
|------|------|
| `initialize(config)` | 拉取 adsdk、`h5sdk.init`、`adConfig` 等。 |
| `playRewardedVideo({ adUnitId, name, ... })` | **激励视频**（`adBreak` type `reward`）。 |
| `showInterstitialAd(...)` | **插屏**。 |
| `createBannerAd` / `showBannerAd` / … | **横幅**等。 |
| `reportEvent` / `reportGameStart` / … | **Athena 埋点**。 |

激励位名称由参数 **`name`** 传入，需与后台/运营约定（如 `transsion_reward_test`）。

---

## 5. 官方文档与升级

- 开发者门户：<https://dev.dlightek.com>  
- adsdk 版本与 **`TRANSSION_ADSDK_SCRIPT_URL`**（`constants.ts`）保持一致；升级后需回归激励、插屏与埋点。

---

## 6. 延伸阅读

| 文档 | 内容 |
|------|------|
| **[docs/transsion-ads.md](../../../docs/transsion-ads.md)** | 两种接入形态对比、Cocos 预览注意、上线检查、FAQ |
| **[game/readme.md](../../../../aha-game-example/readme.md)**（monorepo 根） | iframe 壳、`postMessage`、Git 发布参考 |
