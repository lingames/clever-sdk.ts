# OPPO 小游戏适配器

OPPO 小游戏适配器通过 `qg` 全局对象调用 OPPO 小游戏平台 API，提供登录、广告和原生广告功能。

## 类定义

```ts
import { OppoSdk } from "@lingames/clever-sdk/src/platformMini/OppoSdk.js";

const sdk = new OppoSdk(platform, project_id, game_id);
```

- **全局对象**: `qg`（硬核联盟通用对象）
- **继承**: `CleverSdk`

## 初始化

```ts
await sdk.initialize(config);
```

OPPO 适配器的 `initialize` 接受任意 `Record<string, any>` 配置，仅打印全局对象信息。

## 登录

```ts
interface OppoLoginData {
    openid: string;        // 统一登录 ID
    uid: string;           // 大厅 UID
    avatar: string;        // 大厅头像
    actualAvatar?: string; // 实际头像（不建议使用）
    nickName: string;      // 大厅昵称
    actualNickName?: string; // 实际昵称（不建议使用）
    sex: string;           // 性别
    age: string;           // 年龄
    birthday: string;      // 生日
    token: string;         // 平台 token
    location: string;      // 城市
    constellation: string; // 星座
    sign: string;          // 个人签名
    phoneNum: string;      // 电话号码
    isTourist?: string;    // 是否游客（不建议使用）
    confirmTransform?: string; // （不建议使用）
    time: number;          // 时间戳
    code?: number;         // code（不建议使用）
}

const data = await sdk.login();
```

登录成功后，SDK 会将 `uid` 映射为 `openid` 字段。

> 参考: [qg.login](https://ie-activity-cn.heytapimage.com/static/minigame/CN/docs/index.html#/develop/feature/account?id=qgloginobject)

## 激励视频广告

```ts
const reward = await sdk.playRewardedVideo({
    adUnitId: "your_ad_unit_id"
});
```

**OPPO 的特殊处理**:

- 广告创建后监听 `onLoad` 自动调用 `show()`
- 通过 `load()` 加载广告
- `onClose` 回调中，`res === undefined`（无参数）时视为正常结束
- 同时监听 `onClick` 和 `onError` 事件

> 参考: [qg.createRewardedVideoAd](https://ie-activity-cn.heytapimage.com/static/minigame/CN/docs/index.html#/develop/ad/video-ad)

## Banner 广告

```ts
const banner = await sdk.createBannerAd({
    adUnitId: "banner_id",
    style: { left: 0, top: 100, width: 300, height: 50 }
});

await sdk.showBannerAd();
await sdk.hideBannerAd();
await sdk.destroyBannerAd();
```

`createBannerAd` 返回广告实例对象。

> 参考: [qg.createBannerAd](https://ie-activity-cn.heytapimage.com/static/minigame/CN/docs/index.html#/develop/ad/banner-ad?id=qgcreatebanneradobject)

## 原生广告

OPPO 是唯一支持原生广告的平台。

### 创建原生广告

```ts
interface qgCreateNativeAd {
    // 平台原生广告参数
}

const ad = await sdk.createNativeAd(adInfo);
```

### 显示/隐藏原生广告

```ts
await sdk.showNativeAd();
await sdk.hideNativeAd();
```

> 参考: [qg.createCustomAd](https://ie-activity-cn.heytapimage.com/static/minigame/CN/docs/index.html#/develop/ad/native-template-ad?id=qgcreatecustomadobject-object)

## 不支持的功能

以下接口在 OPPO 平台上不支持：

- `addShortcut()` — 注释中标记为不支持
- `addCommonUse()` — 注释中标记为不支持
- `shareAppMessage()` — 返回 `false`，输出"不支持"日志
- `checkShortcut()` — 继承基类默认值
- `checkScene()` — 继承基类默认值
- `navigateToScene()` — 继承基类默认值
- `getUserInfo()` — 继承基类默认值
