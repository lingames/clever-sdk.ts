# Clever SDK Unity 广告接入指南

本指南将详细介绍如何在 Unity 项目中接入 Clever SDK 的各种广告类型。

## 1. 激励视频广告

激励视频广告通常用于奖励用户观看完整视频后获得游戏内物品或特权。

### 1.1 创建激励视频广告

```csharp
using UnityEngine;
using CleverSDK;

public class RewardedAdManager : MonoBehaviour
{
    private CleverSDK.RewardedAd rewardedAd;

    void Start()
    {
        // 替换为您的激励视频广告位 ID
        string adUnitId = "YOUR_REWARDED_AD_UNIT_ID";
        rewardedAd = CleverSDK.RewardedAd.Create(adUnitId);

        // 注册广告事件回调
        rewardedAd.OnAdLoaded += HandleRewardedAdLoaded;
        rewardedAd.OnAdFailedToLoad += HandleRewardedAdFailedToLoad;
        rewardedAd.OnAdOpened += HandleRewardedAdOpened;
        rewardedAd.OnAdClosed += HandleRewardedAdClosed;
        rewardedAd.OnUserEarnedReward += HandleUserEarnedReward;
        rewardedAd.OnAdFailedToShow += HandleRewardedAdFailedToShow;

        // 加载广告
        rewardedAd.LoadAd();
    }

    public void ShowRewardedAd()
    {
        if (rewardedAd.IsLoaded())
        {
            rewardedAd.Show();
        }
        else
        {
            Debug.LogWarning("激励视频广告尚未加载完成。");
        }
    }

    // 广告加载成功
    private void HandleRewardedAdLoaded()
    {
        Debug.Log("激励视频广告加载成功");
    }

    // 广告加载失败
    private void HandleRewardedAdFailedToLoad(string error)
    {
        Debug.LogError("激励视频广告加载失败: " + error);
    }

    // 广告打开
    private void HandleRewardedAdOpened()
    {
        Debug.Log("激励视频广告已打开");
    }

    // 广告关闭
    private void HandleRewardedAdClosed()
    {
        Debug.Log("激励视频广告已关闭");
        // 广告关闭后可以重新加载广告
        rewardedAd.LoadAd();
    }

    // 用户获得奖励
    private void HandleUserEarnedReward(string type, int amount)
    {
        Debug.Log($"用户获得奖励: 类型 = {type}, 数量 = {amount}");
        // 在这里发放奖励给用户
    }

    // 广告展示失败
    private void HandleRewardedAdFailedToShow(string error)
    {
        Debug.LogError("激励视频广告展示失败: " + error);
    }

    void OnDestroy()
    {
        // 销毁广告实例，释放资源
        if (rewardedAd != null)
        {
            rewardedAd.Destroy();
        }
    }
}
```

## 2. Banner 广告

Banner 广告通常显示在屏幕的顶部或底部，以横幅形式展示。

### 2.1 创建 Banner 广告

```csharp
using UnityEngine;
using CleverSDK;

public class BannerAdManager : MonoBehaviour
{
    private CleverSDK.BannerAd bannerAd;

    void Start()
    {
        // 替换为您的 Banner 广告位 ID
        string adUnitId = "YOUR_BANNER_AD_UNIT_ID";
        // 设置 Banner 广告的位置，例如：AdPosition.BOTTOM, AdPosition.TOP
        AdPosition position = AdPosition.BOTTOM;

        bannerAd = CleverSDK.BannerAd.Create(adUnitId, position);

        // 注册广告事件回调
        bannerAd.OnAdLoaded += HandleBannerAdLoaded;
        bannerAd.OnAdFailedToLoad += HandleBannerAdFailedToLoad;
        bannerAd.OnAdOpened += HandleBannerAdOpened;
        bannerAd.OnAdClosed += HandleBannerAdClosed;

        // 加载广告
        bannerAd.LoadAd();
    }

    public void ShowBannerAd()
    {
        if (bannerAd != null)
        {
            bannerAd.Show();
        }
    }

    public void HideBannerAd()
    {
        if (bannerAd != null)
        {
            bannerAd.Hide();
        }
    }

    // 广告加载成功
    private void HandleBannerAdLoaded()
    {
        Debug.Log("Banner 广告加载成功");
        bannerAd.Show(); // 广告加载成功后自动显示
    }

    // 广告加载失败
    private void HandleBannerAdFailedToLoad(string error)
    {
        Debug.LogError("Banner 广告加载失败: " + error);
    }

    // 广告打开
    private void HandleBannerAdOpened()
    {
        Debug.Log("Banner 广告已打开");
    }

    // 广告关闭
    private void HandleBannerAdClosed()
    {
        Debug.Log("Banner 广告已关闭");
    }

    void OnDestroy()
    {
        // 销毁广告实例，释放资源
        if (bannerAd != null)
        {
            bannerAd.Destroy();
        }
    }
}
```

## 3. 原生广告

原生广告允许您自定义广告的布局和样式，使其更好地融入游戏界面。

### 3.1 创建原生广告

```csharp
using UnityEngine;
using CleverSDK;

public class NativeAdManager : MonoBehaviour
{
    private CleverSDK.NativeAd nativeAd;

    void Start()
    {
        // 替换为您的原生广告位 ID
        string adUnitId = "YOUR_NATIVE_AD_UNIT_ID";
        // 设置原生广告的尺寸和位置
        Rect adRect = new Rect(0, 0, 300, 250); // x, y, width, height

        nativeAd = CleverSDK.NativeAd.Create(adUnitId, adRect);

        // 注册广告事件回调
        nativeAd.OnAdLoaded += HandleNativeAdLoaded;
        nativeAd.OnAdFailedToLoad += HandleNativeAdFailedToLoad;
        nativeAd.OnAdOpened += HandleNativeAdOpened;
        nativeAd.OnAdClosed += HandleNativeAdClosed;

        // 加载广告
        nativeAd.LoadAd();
    }

    public void ShowNativeAd()
    {
        if (nativeAd != null)
        {
            nativeAd.Show();
        }
    }

    public void HideNativeAd()
    {
        if (nativeAd != null)
        {
            nativeAd.Hide();
        }
    }

    // 广告加载成功
    private void HandleNativeAdLoaded(NativeAdData adData)
    {
        Debug.Log("原生广告加载成功");
        Debug.Log($"原生广告标题: {adData.Title}");
        Debug.Log($"原生广告描述: {adData.Description}");
        // 您可以根据 adData 中的信息来渲染原生广告的 UI
        nativeAd.Show(); // 广告加载成功后自动显示
    }

    // 广告加载失败
    private void HandleNativeAdFailedToLoad(string error)
    {
        Debug.LogError("原生广告加载失败: " + error);
    }

    // 广告打开
    private void HandleNativeAdOpened()
    {
        Debug.Log("原生广告已打开");
    }

    // 广告关闭
    private void HandleNativeAdClosed()
    {
        Debug.Log("原生广告已关闭");
    }

    void OnDestroy()
    {
        // 销毁广告实例，释放资源
        if (nativeAd != null)
        {
            nativeAd.Destroy();
        }
    }
}
```