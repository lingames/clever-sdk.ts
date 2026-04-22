# Mock 测试适配器

Mock 适配器用于开发和测试环境，提供模拟的登录和广告功能，无需接入真实平台 SDK。

## 类定义

```ts
import { MockSdk } from "@lingames/clever-sdk/src/platformH5/MockSdk.js";

const sdk = new MockSdk(platform, project_id, game_id);
```

- **用途**: 开发调试、测试环境
- **继承**: `CleverSdk`

## 初始化

```ts
interface mockInitialize {
    mockConfig?: {
        enableMockAds?: boolean;        // 启用模拟广告，默认 false
        mockAdDelay?: number;           // 模拟广告延迟（毫秒）
        mockAdSuccessRate?: number;     // 模拟广告成功率（0-1）
        enableMockLogin?: boolean;      // 启用模拟登录，默认 false
        mockUserInfo?: {                // 模拟用户信息
            nickname?: string;
            avatar?: string;
        };
        enableConsoleLog?: boolean;     // 启用控制台日志
    };
}

await sdk.initialize({
    mockConfig: {
        enableMockAds: true,
        mockAdDelay: 1000,
        enableMockLogin: true,
        mockUserInfo: { nickname: "测试用户", avatar: "https://..." },
        enableConsoleLog: true
    }
});
```

初始化直接继承基类默认实现，返回 `true`。

## 登录

```ts
const data = await sdk.login();
// 固定返回: { open_id: "0", union_id: "0", session_key: "DEVELOPMENT_MODE" }
```

始终返回开发模式标记的模拟数据，不调用任何平台 API。

## 激励视频广告

```ts
const reward = await sdk.playRewardedVideo({});
// 固定返回: { isEnded: true, count: 1 }
```

始终返回观看成功的模拟数据，方便测试奖励发放逻辑。

## 不支持的功能

Mock 适配器未实现以下功能，调用时使用基类默认行为：

- `checkSession()` — 继承基类
- `createBannerAd()` / `showBannerAd()` / `hideBannerAd()` / `destroyBannerAd()` — 继承基类
- `shareAppMessage()` — 继承基类
- `addShortcut()` / `checkShortcut()` — 继承基类
- `addCommonUse()` / `checkCommonUse()` — 继承基类
- `checkScene()` / `navigateToScene()` — 继承基类
- `getUserInfo()` — 继承基类
- `reportEvent()` — 继承基类
