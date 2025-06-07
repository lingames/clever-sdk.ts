# 广告监测链接

广告监测链接用于追踪广告效果，通常由广告平台提供。

## 1. 获取监测链接

请从你的广告平台（如 Google AdSense）获取相应的广告监测链接。

## 2. 配置监测链接

Clever SDK 在初始化时，可以通过配置参数传入广告监测链接。具体配置方式取决于你使用的平台和广告类型。

### 示例：Google AdSense

对于 Google AdSense，你需要在初始化 SDK 时传入 `adSenseId`。

```ts
import {SdkManager} from "./SdkManager";

const sdkConfig = {
    platform: "google",
    sdk_url: "YOUR_SDK_SERVER_URL",
    sdk_key: "YOUR_SDK_KEY",
    game_id: "YOUR_GAME_ID",
    adSenseId: "ca-pub-XXXXXXXXXXXXXXXX" // 你的 Google AdSense 发布商 ID
};

SdkManager.initSdk(sdkConfig);
```



### 其他平台

对于其他平台，如果需要配置广告监测链接，通常会在 `createRewardedVideoAd`, `createBannerAd` 或 `createNativeAd` 方法的 `adInfo` 参数中提供相应的字段。请查阅具体平台的文档以获取详细信息。

## 3. 监测数据

配置完成后，SDK 会自动向广告平台发送监测数据。你可以在广告平台的后台查看广告的展示、点击、转化等数据。

### 常见问题

* **监测数据不准确**: 请检查 `adUnitId` 和 `adSenseId` 是否配置正确，并确保网络连接正常。
* **广告无法展示**: 检查广告单元是否有效，是否通过了审核，以及是否有足够的广告填充。