# 小游戏 ID 申请

小游戏 ID (或称 AppID, GameID) 是你在各个小游戏平台上的唯一标识，用于区分不同的游戏应用。申请流程通常涉及以下步骤：

## 1. 选择小游戏平台并注册开发者账号

在选择的每个小游戏平台注册开发者账号。这通常需要提供企业或个人身份信息进行实名认证。

* **微信公众平台**: [https://mp.weixin.qq.com/](https://mp.weixin.qq.com/)
* **抖音开放平台**: [https://developer.open-douyin.com/](https://developer.open-douyin.com/)
* **Tiktok 开放平台**: [https://developers.tiktok.com/](https://developers.tiktok.com/)
* **快手开放平台**: [https://open.kuaishou.com/](https://open.kuaishou.com/)
* **Bilibili 开放平台**: [https://open.bilibili.com/](https://open.bilibili.com/)
* **OPPO 开放平台**: [https://open.oppomobile.com/](https://open.oppomobile.com/)
* **华为开发者联盟**: [https://developer.huawei.com/](https://developer.huawei.com/)
* **Google AdSense**: [https://www.google.com/adsense/](https://www.google.com/adsense/)
* **4399 开放平台**: [https://open.4399.cn/](https://open.4399.cn/)
* **传音 Dlightek**: [https://dev.dlightek.com/](https://dev.dlightek.com/)
* **微游 Minigame**: [https://developers.minigame.com/zh](https://developers.minigame.com/zh)

## 2. 创建游戏应用

在开发者平台注册并登录后，通常会有一个“创建应用”或“创建游戏”的入口。按照指引填写游戏的基本信息，包括：

* **游戏名称**
* **游戏简介**
* **游戏分类**
* **游戏图标**
* **游戏截图**
* **隐私政策**
* **服务协议**

## 3. 获取 AppID/GameID

完成游戏应用创建后，平台会自动分配一个唯一的 AppID 或 GameID。这个 ID 将用于你在 Clever SDK 中初始化游戏。

### 示例：

* **微信小游戏**: `AppID` (以 `wx` 开头)
* **抖音小游戏**: 使用抖音开放平台的 App ID
* **TikTok 小游戏**: 使用 TikTok for Developers 平台的 App ID
* **快手小游戏**: `App ID`
* **华为快游戏**: `App ID`
* **OPPO 小游戏**: `App ID`
* **4399 APP**: `Game ID` + `SDK Key`
* **Google AdSense**: `Publisher ID` (以 `ca-pub-` 开头)
* **传音 Ahagame**: `App Key`
* **微游 Minigame**: 通过平台后台自动分配

## 4. 配置 Clever SDK

将获取到的 AppID/GameID 配置到 Clever SDK 的初始化参数中：

```ts
import {createSdk} from "@lingames/clever-sdk/src";
import {DynamicSdkConfig} from "@lingames/clever-sdk/src/models";

const sdkConfig: DynamicSdkConfig = {
    platform: "wechat",          // 对应平台标识
    project_id: "your_project_id",
    game_id: "YOUR_GAME_ID",     // 这里填写你申请到的 AppID/GameID
    sdk_login_url: "https://api.salesagent.cc/game-analyzer/player/login",
};

const sdk = await createSdk(sdkConfig);
(window as any).mySdk = sdk;
```

## 5. 提交审核

完成游戏开发和 SDK 集成后，你需要将游戏提交到各个平台进行审核。审核通过后，你的小游戏才能正式上线。

### 常见问题

* **审核被拒**: 仔细阅读平台审核规范，确保游戏内容、功能和隐私政策符合要求。
* **ID 混淆**: 不同平台的 ID 名称可能不同，请仔细核对，确保填写正确。