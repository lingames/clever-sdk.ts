# 微信小游戏适配器

微信小游戏适配器通过 `wx` 全局对象调用微信平台 API，提供登录、广告、分享、用户信息等功能。

## 类定义

```ts
import { WeChatSdk } from "@lingames/clever-sdk/src/platformMini/WeChatSdk.js";

const sdk = new WeChatSdk(platform, project_id, game_id);
```

- **全局对象**: `wx`
- **继承**: `CleverSdk`

## 初始化

```ts
interface wxInitialize {
    sdk_login_url?: string;
    enableShare?: boolean;  // 启用分享功能，默认启用
}

await sdk.initialize({
    sdk_login_url: "https://api.salesagent.cc/game-analyzer/player/login",
    enableShare: true
});
```

初始化时会调用 `wx.showShareMenu()` 开启分享菜单。

## 登录

```ts
interface wxLoginData {
    open_id: string;
    union_id: string;
    session_key: string;
}

const data = await sdk.login();
```

**登录流程**:

1. 调用 `wx.login()` 获取临时登录凭证 `code`
2. 将 `code` 连同 `platform`、`project_id` 发送到 SDK 登录服务器
3. 服务器返回 `session_key`，SDK 自动保存

> 参考: [wx.login](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)

## 激励视频广告

```ts
interface wxCreateRewardedVideoAd {
    adUnitId?: string;                // 通用广告单元 ID
    wxUnitId?: string;                // 微信专用广告 ID
    multiton?: boolean;               // 是否启用多例模式，默认 false
    disableFallbackSharePage?: boolean; // 是否禁用分享页，默认 false
}

const reward = await sdk.playRewardedVideo({
    wxUnitId: "your_wx_ad_unit_id"
});
// reward.isEnded === true 时发放奖励
```

全局只创建一个视频广告实例，重复调用不会重复创建。

> 参考: [wx.createRewardedVideoAd](https://developers.weixin.qq.com/minigame/dev/api/ad/wx.createRewardedVideoAd.html)

## Banner 广告

```ts
// 创建 Banner 广告
await sdk.createBannerAd({
    adUnitId: "banner_unit_id",
    style: { left: 0, top: 100, width: 300, height: 50 }
});

// 显示 / 隐藏 / 销毁
await sdk.showBannerAd();
await sdk.hideBannerAd();
await sdk.destroyBannerAd();
```

> 参考: [wx.createBannerAd](https://developers.weixin.qq.com/minigame/dev/api/ad/wx.createBannerAd.html)

## 分享

```ts
interface wxShareAppMessage {
    title?: string;         // 转发标题
    imageUrl?: string;      // 转发图片链接
    query?: string;         // 查询字符串，key1=val1&key2=val2 格式
    imageUrlId?: string;    // 审核通过的图片编号
    toCurrentGroup?: boolean; // 是否转发到当前群
    path?: string;          // 独立分包路径
}

await sdk.shareAppMessage({
    title: "快来玩！",
    imageUrl: "https://example.com/share.png"
});
```

> 参考: [wx.shareAppMessage](https://developers.weixin.qq.com/minigame/dev/api/share/wx.shareAppMessage.html)

## 获取用户信息

```ts
interface wxGetUserInfo {
    withCredentials?: boolean;        // 是否带上登录态信息
    lang?: "en" | "zh_CN" | "zh_TW"; // 显示语言
    complete?: () => void;            // 调用结束回调
}

interface wxUserInfoCallback {
    userInfo: wxUserInfo;   // 用户信息
    rawData: string;         // 原始数据字符串
    signature: string;       // 签名
    encryptedData: string;   // 加密数据
    iv: string;              // 加密初始向量
    cloudID?: string;        // 云 ID（2.7.0+）
}

const info = await sdk.getUserInfo({ withCredentials: true });
```

> 参考: [wx.getUserInfo](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserInfo.html)

## 不支持的功能

以下接口在微信平台上不支持，调用时返回默认值或输出错误日志：

- `checkShortcut()` — 返回 `{ isSupport: false, exist: true, needUpdate: false }`
- `checkScene()` — 返回 `{ isSupport: false, isScene: false }`
- `navigateToScene()` — 返回 `false`
- `addCommonUse()` — 继承基类，抛出异常
