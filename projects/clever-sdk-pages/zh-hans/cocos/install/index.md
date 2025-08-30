# 安装

## 1. 获取 SDK

SDK 已发布到 [npm](https://www.npmjs.com/package/@lingames/clever-sdk), 可使用如下命令安装最新版本

```shell
npm i @lingames/clever-sdk
```

## 2. 项目集成

#### 动态判断法

在 `assets/Script/SdkManager.ts` (或其他你管理 SDK 的文件) 中，使用 `createSdk` 函数动态派发 SDK 实现：

```ts
import {createSdk} from "@lingames/clever-sdk/src";
import {DynamicSdkConfig} from "@lingames/clever-sdk/src/models";

export class SdkManager {
    public static async initSdk(config: DynamicSdkConfig) {
        const sdk = await createSdk(config);
        (window as any).mySdk = sdk;
        console.log("SDK 初始化成功");
    }
}
```

#### 静态编译法

在 Cocos Creator 中创建 `GAME_PLATFORM` 宏，并在 `assets/Script/SdkManager.ts` 中静态派发 SDK 实现：

1. **创建宏**: 在 Cocos Creator 编辑器中，进入 `项目 -> 项目设置 -> 宏`，添加一个名为 `GAME_PLATFORM` 的宏，并设置其值为当前平台（例如
   `WECHAT_GAME`, `douyingame`, `kuaishou`, `bilibili`, `oppo`, `huawei`, `google` 等）。

2. **静态派发**: 在 `SdkManager.ts` 中，根据 `GAME_PLATFORM` 宏的值来实例化对应的 SDK：

```ts
import {CleverSdk} from "@lingames/clever-sdk/src";
import {DynamicSdkConfig} from "@lingames/clever-sdk/src/models";
import {
    WeChatSdk,
    DouyinSDK,
    KuaiShouSdk,
    BilibiliSdk,
    OppoSdk,
    HuaweiSdk
} from "@lingames/clever-sdk/src/platformMini";
import {AdSenseSdk, BrowserSdk} from "@lingames/clever-sdk/src/platformH5";

declare const GAME_PLATFORM: string;

export async function createSdk(config: DynamicSdkConfig): Promise<CleverSdk> {
    console.log('my sdk create:', GAME_PLATFORM, config.game_id, typeof (config.wx));
    if (GAME_PLATFORM == 'WECHAT_GAME') {
        let sdk = new WeChatSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id.toString());
        await sdk.initialize({wx: (window as any).wx});
        return sdk
    }
    if (GAME_PLATFORM == 'douyingame') {
        return new DouyinSDK(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id.toString());
    }
    if (GAME_PLATFORM == 'kuaishou') {
        return new KuaiShouSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id.toString());
    }
    if (GAME_PLATFORM == 'bilibili') {
        return new BilibiliSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id.toString());
    }
    if (GAME_PLATFORM == 'oppo') {
        return new OppoSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id.toString());
    }
    if (GAME_PLATFORM == 'huawei') {
        return new HuaweiSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id.toString());
    }
    if (GAME_PLATFORM == 'google') {
        let sdk = new AdSenseSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id.toString());
        await sdk.initialize({adSenseId: config.adSenseId});
        return sdk
    }

    return new BrowserSdk(GAME_PLATFORM, config.sdk_url, config.sdk_key, config.game_id.toString());
}
```

## 3. 配置参数说明

### 核心参数

#### platform
- **用途**: 用于后端交互，标识当前运行的平台
- **说明**: 在 `createSdk` 中默认使用 clever-sdk 约定的平台标识，自建服务器可以改成任意的平台列表
- **示例值**: `"wechat"`, `"dou-yin"`, `"kuai-shou"`, `"bilibili"`, `"oppo"`, `"hua-wei"`, `"google"`, `"mock"` 等

#### project_id
- **用途**: 用于 SDK 服务器交互
- **说明**: 标识你的项目，用于 SDK 服务器识别和管理不同的游戏项目
- **获取方式**: 从 Clever SDK 后台获取

#### game_id
- **用途**: 用于运行时登录，特别是平台登录
- **说明**: 各个平台分配的游戏 ID，如华为平台的 AppID、微信小游戏的 AppID 等
- **示例**:
  - 微信小游戏: `"wxXXXXXXXXXXXXXXXX"`
  - 华为平台: 华为开发者联盟分配的 AppID
  - Google AdSense: Publisher ID (以 `"ca-pub-"` 开头)

### 其他配置参数

#### sdk_login_url
- **用途**: SDK 登录服务器地址
- **默认值**: `"https://api.salesagent.cc/game-analyzer/player/login"`
- **说明**: 用于 SDK 登录验证的服务器地址

#### sdk_event_key
- **用途**: 数据埋点事件上报的密钥
- **说明**: 用于验证数据上报请求的合法性

#### adSenseId (仅 Google 平台)
- **用途**: Google AdSense 发布商 ID
- **格式**: `"ca-pub-XXXXXXXXXXXXXXXX"`
- **说明**: 用于 Google AdSense 广告展示

#### mockConfig (仅 Mock 平台)
- **用途**: Mock 平台的配置参数
- **说明**: 用于配置 Mock SDK 的行为，方便开发和测试
- **配置项**:
  - `enableMockAds`: 是否启用模拟广告 (默认: true)
  - `mockAdDelay`: 模拟广告加载延迟，单位毫秒 (默认: 2000)
  - `mockAdSuccessRate`: 模拟广告成功率，0-1 之间 (默认: 0.8)
  - `enableMockLogin`: 是否启用模拟登录 (默认: true)
  - `mockUserInfo`: 模拟用户信息 (默认: {nickname: 'Mock用户', avatar: '...'})
  - `enableConsoleLog`: 是否启用控制台日志 (默认: true)

### 配置示例

```ts
// 微信平台配置示例
const wechatConfig: DynamicSdkConfig = {
    platform: "wechat",                    // 平台标识
    project_id: "your_project_id",        // 项目 ID
    game_id: "wxXXXXXXXXXXXXXXXX",        // 微信小游戏 AppID
    sdk_login_url: "https://api.salesagent.cc/game-analyzer/player/login",
    sdk_event_key: "your_event_key",      // 数据埋点密钥
};

// Mock 平台配置示例（用于开发测试）
const mockConfig: DynamicSdkConfig = {
    platform: "mock",                      // Mock 平台
    project_id: "test_project_id",        // 测试项目 ID
    game_id: "mock_game_id",              // Mock 游戏 ID
    sdk_login_url: "https://mock-api.example.com",
    sdk_event_key: "mock_event_key",      // Mock 事件密钥
    mockConfig: {                          // Mock 配置
        enableMockAds: true,               // 启用模拟广告
        mockAdDelay: 1500,                 // 广告加载延迟 1.5 秒
        mockAdSuccessRate: 0.9,            // 90% 成功率
        enableMockLogin: true,             // 启用模拟登录
        mockUserInfo: {
            nickname: "测试用户",
            avatar: "https://example.com/avatar.png"
        },
        enableConsoleLog: true             // 启用控制台日志
    }
};

SdkManager.initSdk(mockConfig);
```
