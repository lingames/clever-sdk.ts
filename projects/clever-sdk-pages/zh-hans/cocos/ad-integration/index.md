# 广告接入

Clever SDK 提供了统一的广告接口，支持激励视频广告、Banner 广告和原生广告。

## 1. 激励视频广告

激励视频广告通常用于奖励玩家观看完整视频后获得游戏内奖励的场景。

### 创建激励视频广告

```ts
import {VideoReward} from "@lingames/clever-sdk/src/models/PlayRewardedVideo";

// 播放激励视频广告
const reward: VideoReward = await (window as any).mySdk.playRewardedVideo({
    adUnitId: "YOUR_REWARDED_VIDEO_AD_UNIT_ID", // 替换为你的广告单元 ID
    // 其他平台特定参数
});

if (reward.isEnded) {
    console.log('激励视频广告观看完成，发放奖励');
    // 在这里发放游戏内奖励
} else {
    console.log('激励视频广告未观看完成');
}
```



## 2. Banner 广告

Banner 广告通常显示在屏幕的顶部或底部，作为持续展示的广告。

### 创建并展示 Banner 广告

```ts
// 创建 Banner 广告
await (window as any).mySdk.createBannerAd({
    adUnitId: "YOUR_BANNER_AD_UNIT_ID", // 替换为你的广告单元 ID
    style: { // 样式参数，具体取决于平台
        left: 0,
        top: 0,
        width: 300,
        height: 100,
    },
    adIntervals: 30, // 广告刷新间隔，单位秒
});

// 展示 Banner 广告
await (window as any).mySdk.showBannerAd();
```

### 隐藏 Banner 广告

```ts
// 隐藏 Banner 广告
await (window as any).mySdk.hideBannerAd();
```

### 销毁 Banner 广告

```ts
// 销毁 Banner 广告
await (window as any).mySdk.destroyBannerAd();
```

## 3. 原生广告

原生广告以更自然的方式融入游戏界面，提供更好的用户体验（目前仅 OPPO 平台支持）。

### 创建原生广告

```ts
// 创建原生广告
const ad = await (window as any).mySdk.createNativeAd({
    adUnitId: "YOUR_NATIVE_AD_UNIT_ID", // 替换为你的广告单元 ID
});
```

### 展示原生广告

```ts
// 展示原生广告
await (window as any).mySdk.showNativeAd();
```

### 隐藏原生广告

```ts
// 隐藏原生广告
await (window as any).mySdk.hideNativeAd();
```

### 销毁原生广告

```ts
// 销毁原生广告
await (window as any).mySdk.destroyNativeAd();
```