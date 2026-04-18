# 广告接入

Clever SDK 提供了统一的广告接口，支持激励视频广告、Banner 广告和原生广告。

## 1. 激励视频广告

激励视频广告通常用于奖励玩家观看完整视频后获得游戏内奖励的场景。

### 创建激励视频广告

```ts
import {VideoReward} from "@lingames/clever-sdk/src/models/CreateRewardedVideoAd";

// 创建激励视频广告实例
const rewardedVideoAd = (window as any).mySdk.createRewardedVideoAd({
    adUnitId: "YOUR_REWARDED_VIDEO_AD_UNIT_ID", // 替换为你的广告单元 ID
    // 其他平台特定参数
});

// 监听广告事件
rewardedVideoAd.onLoad(() => {
    console.log('激励视频广告加载成功');
});

rewardedVideoAd.onClose((res: VideoReward) => {
    if (res.isEnded) {
        console.log('激励视频广告观看完成，发放奖励');
        // 在这里发放游戏内奖励
    } else {
        console.log('激励视频广告未观看完成');
    }
});

rewardedVideoAd.onError((err: any) => {
    console.error('激励视频广告出错', err);
});
```

### 展示激励视频广告

```ts
// 展示激励视频广告
(window as any).mySdk.showRewardedVideoAd().then((res: VideoReward) => {
    if (res.isEnded) {
        console.log('激励视频广告观看完成，发放奖励');
        // 在这里发放游戏内奖励
    } else {
        console.log('激励视频广告未观看完成');
    }
}).catch((err: any) => {
    console.error('展示激励视频广告出错', err);
});
```

### 销毁激励视频广告

```ts
// 销毁激励视频广告
(window as any).mySdk.destroyRewardedVideoAd();
```

## 2. Banner 广告

Banner 广告通常显示在屏幕的顶部或底部，作为持续展示的广告。

### 创建 Banner 广告

```ts
// 创建 Banner 广告实例
const bannerAd = (window as any).mySdk.createBannerAd({
    adUnitId: "YOUR_BANNER_AD_UNIT_ID", // 替换为你的广告单元 ID
    style: { // 样式参数，具体取决于平台
        left: 0,
        top: 0,
        width: 300,
        height: 100,
    },
    adIntervals: 30, // 广告刷新间隔，单位秒
});

// 监听广告事件
bannerAd.onLoad(() => {
    console.log('Banner 广告加载成功');
});

bannerAd.onError((err: any) => {
    console.error('Banner 广告出错', err);
});
```


### 展示 Banner 广告

```ts
// 展示 Banner 广告
(window as any).mySdk.showBannerAd();
```

### 隐藏 Banner 广告

```ts
// 隐藏 Banner 广告
(window as any).mySdk.hideBannerAd();
```

### 销毁 Banner 广告

```ts
// 销毁 Banner 广告
(window as any).mySdk.destroyBannerAd();
```

## 3. 原生广告

原生广告以更自然的方式融入游戏界面，提供更好的用户体验。

### 创建原生广告

```ts
// 创建原生广告实例
const nativeAd = (window as any).mySdk.createNativeAd({
    adUnitId: "YOUR_NATIVE_AD_UNIT_ID", // 替换为你的广告单元 ID
});

// 监听广告事件
nativeAd.onLoad(() => {
    console.log('原生广告加载成功');
});

nativeAd.onError((err: any) => {
    console.error('原生广告出错', err);
});
```

### 展示原生广告

```ts
// 展示原生广告
(window as any).mySdk.showNativeAd();
```

### 隐藏原生广告

```ts
// 隐藏原生广告
(window as any).mySdk.hideNativeAd();
```

### 销毁原生广告

```ts
// 销毁原生广告
(window as any).mySdk.destroyNativeAd();
```