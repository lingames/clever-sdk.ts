# 传音 / Dlightek H5 广告接入说明（Ahagame）

本文说明如何在 **Web / Cocos Creator 导出 Web** 环境中，通过 Clever SDK 的 **`AhagameSdk`** 使用传音（Dlightek 开发者平台）提供的 **h5sdk**（官方脚本托管于 `hippoobox.com` 的 `adsdk`）播放激励、插屏等广告。

官方开发者站点：<https://dev.dlightek.com>（文档以平台最新版为准）。

---

## 1. 模块位置与引用方式

实现代码集中在 npm 包源码目录：

```text
projects/clever-sdk/src/platformH5/transsion/
├── AhagameSdk.ts    # 传音 H5 实现类
├── constants.ts     # adsdk 脚本 URL 等常量
├── index.ts         # 对外导出
└── README.md        # 本模块索引
```

**推荐用法（与历史版本兼容）：**

```ts
import { createSdk } from "@lingames/clever-sdk";
// 或
import { AhagameSdk, TRANSSION_ADSDK_SCRIPT_URL } from "@lingames/clever-sdk";
```

`createSdk` 在 `config.platform === "ahagame"` 时会构造并初始化 `AhagameSdk`，无需直接 `new AhagameSdk`（除非自行管理生命周期）。

---

## 2. 两种接入形态（开发者需二选一或分渠道）

| 形态 | 适用场景 | 说明 |
|------|----------|------|
| **A. Clever `AhagameSdk`（本仓库）** | Cocos / 单页内直接调 `h5sdk` | 游戏与壳在同一页面，通过 `createSdk` + `playRewardedVideo` 等调用。 |
| **B. 官方 iframe 壳 + `game/` 子目录** | 传音提供的标准 H5 壳 | 根目录 `index.html` 加载 adsdk，游戏放在 `game/` 内，通过 `postMessage("reward"|"next")` 与父页通信；详见 monorepo 内 **`game/readme.md`**。 |

形态 **B** 与 **A** 使用同一套底层 **h5sdk**，但集成边界不同：Cocos 项目常用 **A**；纯 H5 按传音交付模板常用 **B**。

---

## 3. `createSdk` 传音相关配置

`platform` 必须显式为 **`"ahagame"`**（环境探测不会自动识别传音）。

初始化参数对应 `ggInitialize`（见 `src/models/SdkInitialize.ts`），常用字段如下：

| 字段 | 类型 | 说明 |
|------|------|------|
| `adSenseId` | string | Google AdSense 客户端 ID（`ca-pub-...`）。 |
| `appKey` | string | 传音 / Dlightek 后台下发的应用 **App Key**。 |
| `gaId` | string | 可选；GA4 测量 ID（如 `G-xxx`）。 |
| `adChannel` | string | 可选；对应 adsense `data-ad-channel`。 |
| `adFrequencyHint` | string | 可选；默认如 `45s`，对应频次提示。 |
| `adBreakTest` | boolean | **联调测试广告**：为 `true` 时注入 `data-adbreak-test: "on"`；**上线务必关闭**。 |
| `pauseCallback` / `resumeCallback` | function | 可选；广告前后暂停/恢复游戏。 |

示例：

```ts
const sdk = await createSdk({
  project_id: "your_project",
  sdk_login_url: "",
  game_id: "your_game",
  platform: "ahagame",
  adSenseId: "ca-pub-xxxxxxxx",
  appKey: "你的AppKey",
  gaId: "",
  adChannel: "",
  adBreakTest: true, // 仅联调
});
await sdk.initialize?.(); // createSdk 内已对 Ahagame 调用 initialize
```

---

## 4. 广告 API 概要（`AhagameSdk`）

- **激励视频**：`playRewardedVideo({ adUnitId: "", name: "placement_name", ... })`，内部使用 `h5sdk.adBreak({ type: "reward", ... })`。  
- **插屏**：`showInterstitialAd({ type, name, ... })`，内部 `adBreak` 非 reward 类型。  
- **Banner**：`createBannerAd` / `showBannerAd` 等（见源码）。  
- **埋点**：`reportEvent` 及 `reportGameStart`、`reportLevelBegin` 等封装，走 `h5sdk.athenaSend`。

`adBreakDone` 回调中的 `breakStatus` 等字段请以官方 adsdk 行为为准。

---

## 5. 脚本地址与版本

- 常量 **`TRANSSION_ADSDK_SCRIPT_URL`**（`transsion/constants.ts`）指向当前集成的 **adsdk** URL（如 `adsdk_1.8.0.0.js`）。  
- 官方升级脚本版本时，应 **同步更新常量** 并在联调环境验证。

---

## 6. Cocos Creator 浏览器预览注意点

1. **不要** 给动态插入的 `<script>` 设置 `crossOrigin = "anonymous"`，否则在 `localhost` 预览时易触发 **CORS**，导致 adsdk 整包加载失败（本仓库实现已避免）。  
2. 预览阶段可能出现 **`manifest_transsion.json` / `sw_transsion.js` 404** 或 Service Worker 注册失败。monorepo 示例中通过 **`assets/scripts/AhagamePreviewShim.ts`** 在加载 adsdk **之前** 做减灾（替换 manifest、跳过 SW 等）；集成方可按需拷贝或自行在壳层提供静态文件。  
3. **正式 Web 构建**可在工程 **`build-templates/web-mobile/`** 下放置占位 `manifest_transsion.json`、`sw_transsion.js`，由构建拷贝到输出根目录（见 monorepo 示例）。

---

## 7. 测试开关与上线检查

- 联调：可开启 **`adBreakTest`**（或官方壳中的 `data-adbreak-test`）。  
- 上线：**关闭**测试开关，使用正式 `appKey`、正式 AdSense 与渠道配置，并按传音要求完成 **Git 打 tag / 发布流程**（参见 `game/readme.md` 中的参考命令）。

---

## 8. 相关文档与示例

| 资源 | 路径 / 说明 |
|------|-------------|
| 传音模块 README | `src/platformH5/transsion/README.md` |
| iframe 壳 + 游戏示例 | monorepo `game/`、`game/readme.md` |
| Cocos 演示 UI | monorepo `assets/scripts/UIController.ts`、`AhagamePreviewShim.ts` |

---

## 9. 常见问题

**Q：为什么 `platform` 不能自动识别传音？**  
A：`createSdk` 的自动探测面向微信/抖音等；传音 H5 在浏览器中与通用 Web 难以区分，需显式 `platform: "ahagame"`。

**Q：激励立刻返回、没有画面？**  
A：若误用 **MockSdk**（`platform: "mock"`），不会加载 h5sdk；请改为 `ahagame` 并填有效 `appKey`。若仍无广告，检查 Network 是否成功加载 `hippoobox` adsdk、是否被广告插件拦截、以及账号/地区与 AdSense 策略。

**Q：与 npm 包 `dist` 的关系？**  
A：发布包由 `rollup` 从 `src` 打出；传音逻辑在 **`transsion/`** 子目录中维护，对外 API **保持不变**。
