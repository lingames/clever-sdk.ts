# Google AdSense ID 申请

## 1. 注册 Google AdSense 账号

访问 [Google AdSense 官网](https://www.google.com/adsense/start/)，点击“立即注册”或“开始使用”，按照提示完成账号注册。

## 2. 关联网站/应用

注册成功后，你需要将你的网站或应用与 AdSense 账号关联。对于应用，通常需要通过 Google Play 或 App Store 进行关联。

## 3. 获取发布商 ID

关联成功后，你可以在 AdSense 账号的“账号”->“设置”->“账号信息”中找到你的发布商 ID，格式通常为 `ca-pub-XXXXXXXXXXXXXXXX`。

## 4. 在 Clever SDK 中配置

在 Clever SDK 初始化时，将获取到的 `adSenseId` 传入配置中：

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