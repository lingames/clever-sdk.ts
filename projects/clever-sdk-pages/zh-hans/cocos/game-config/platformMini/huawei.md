# 华为快游戏适配器

华为快游戏适配器通过 `qg` 全局对象调用华为快应用 API，提供登录和广告功能。

## 类定义

```ts
import { HuaweiSdk } from "@lingames/clever-sdk/src/platformMini/HuaweiSdk.js";

const sdk = new HuaweiSdk(platform, project_id, game_id);
```

- **全局对象**: `qg`
- **继承**: `CleverSdk`

## 登录

```ts
interface HuaweiLoginData {
    state: string;
    code?: string;          // 授权码
    accessToken?: string;   // 访问令牌
    tokenType?: string;     // 令牌类型
    expiresIn?: number;     // 过期时间（秒）
    scope?: string;         // 权限范围
    openid?: string;        // 用户 openid（1020+）
    unionid?: string;       // 平台唯一标识（1020+）
    nickname?: string;      // 昵称（1020+）
    avatar?: {              // 头像（1020+）
        default?: string;
        [resolution: string]: string | undefined;
    };
    email?: string;         // 绑定邮箱（1060+）
}

const data = await sdk.login();
```

**登录流程**:

1. 调用 `qg.gameLoginWithReal()` 进行真实用户登录
2. 使用 `forceLogin: 1` 强制登录
3. 登录成功后将 `playerId` 映射为 `openid`

**错误码说明**:

| 状态码 | 含义 | 处理建议 |
|--------|------|----------|
| 7004 | 玩家取消登录 | 返回游戏界面，让玩家重新登录 |
| 2012 | 玩家取消登录 | 同上 |
| 7021 | 玩家取消实名认证 | 在中国大陆需禁止进入游戏 |

> 参考: [qg.gameLoginWithReal](https://developer.huawei.com/consumer/cn/doc/quickApp-Guides/quickgame-runtime-account-kit-0000001113458340)

## 激励视频广告

```ts
interface hwCreateRewardedVideoAd {
    adUnitId?: string;    // 通用广告单元 ID
    hwUnitId?: string;    // 华为专用广告 ID
    multiton?: boolean;   // 是否启用多例模式，默认 false
    onComplete?: () => void;
}

const reward = await sdk.playRewardedVideo({
    hwUnitId: "your_hw_ad_unit_id"
});
```

**与微信/抖音的区别**: 华为适配器在创建广告后监听 `onLoad` 事件自动调用 `show()`，然后通过 `load()` 加载广告。广告加载完成后自动展示。

> 参考: [qg.createRewardedVideoAd](https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-ad-0000001130711971#section9772146486)

## Banner 广告

```ts
await sdk.createBannerAd({
    adUnitId: "banner_id",
    style: { left: 0, top: 100, width: 300, height: 50 },
    adIntervals: 30
});
```

华为适配器的 `createBannerAd` 在创建后会监听 `onLoad` 自动调用 `show()`。`showBannerAd` 通过 `load()` 重新加载广告。

> 参考: [qg.createBannerAd](https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-ad-0000001130711971#section912518224415)

## 不支持的功能

华为适配器未实现以下功能，调用时使用基类默认行为：

- `initialize()` — 继承基类，不做额外处理
- `checkSession()` — 继承基类
- `shareAppMessage()` — 继承基类
- `addShortcut()` / `checkShortcut()` — 继承基类
- `addCommonUse()` / `checkCommonUse()` — 继承基类
- `checkScene()` / `navigateToScene()` — 继承基类
- `getUserInfo()` — 继承基类
- `reportEvent()` — 继承基类
