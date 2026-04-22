# B 站小游戏适配器

B 站小游戏适配器目前继承 `CleverSdk` 基类的所有默认实现，尚未添加平台特定功能。

## 类定义

```ts
import { BilibiliSdk } from "@lingames/clever-sdk/src/platformMini/BilibiliSdk.js";

const sdk = new BilibiliSdk(platform, project_id, game_id);
```

- **全局对象**: 无（未声明平台全局对象）
- **继承**: `CleverSdk`

## 当前状态

B 站适配器为空实现，所有接口均使用基类默认行为：

| 接口 | 默认行为 |
|------|----------|
| `initialize()` | 返回 `true` |
| `login()` | 返回空的 `LoginData` |
| `checkSession()` | 返回 `false` |
| `playRewardedVideo()` | 返回 `{ isEnded: false, count: 0 }` |
| `createBannerAd()` | 调用 `showBannerAd()` |
| `showBannerAd()` | 返回 `{ isEnded: false, count: 0 }` |
| `hideBannerAd()` | 返回 `true` |
| `destroyBannerAd()` | 返回 `true` |
| `addShortcut()` | 抛出异常 |
| `checkShortcut()` | 返回 `{ isSupport: false, exist: true, needUpdate: false }` |
| `addCommonUse()` | 抛出异常 |
| `checkScene()` | 返回 `{ isSupport: false, isScene: false }` |
| `navigateToScene()` | 返回 `false` |
| `shareAppMessage()` | 返回 `false` |
| `getUserInfo()` | 返回 `{} ` |
| `reportEvent()` | 返回 `false` |

## 后续规划

如需支持 B 站平台，需要：

1. 声明 B 站全局对象
2. 实现平台特定的登录逻辑
3. 实现广告相关接口
4. 添加对应的类型定义
