# Clever SDK Unity 广告监测指南

本指南将详细介绍如何在 Unity 项目中利用 Clever SDK 进行广告监测，包括归因和事件上报。

## 1. 广告归因

广告归因是衡量广告效果的关键。Clever SDK 提供了接口来帮助您进行广告归因。

### 1.1 获取归因信息

您可以在 SDK 初始化成功后，通过以下方式获取归因信息：

```csharp
using UnityEngine;
using CleverSDK;

public class AdAttributionManager : MonoBehaviour
{
    void Start()
    {
        // 确保 SDK 已经初始化成功
        CleverSDK.Initialize("YOUR_APP_ID", "YOUR_APP_KEY", (success, message) =>
        {
            if (success)
            {
                Debug.Log("Clever SDK 初始化成功！");
                GetAttributionInfo();
            }
            else
            {
                Debug.LogError("Clever SDK 初始化失败: " + message);
            }
        });
    }

    private void GetAttributionInfo()
    {
        CleverSDK.GetAttributionInfo((attributionInfo) =>
        {
            if (attributionInfo != null)
            {
                Debug.Log("广告归因信息：");
                Debug.Log($"渠道: {attributionInfo.Channel}");
                Debug.Log($"广告系列: {attributionInfo.Campaign}");
                Debug.Log($"广告组: {attributionInfo.AdGroup}");
                Debug.Log($"广告: {attributionInfo.Ad}");
                Debug.Log($"创意: {attributionInfo.Creative}");
                Debug.Log($"点击时间: {attributionInfo.ClickTime}");
                Debug.Log($"安装时间: {attributionInfo.InstallTime}");
                // 更多归因信息...
            }
            else
            {
                Debug.LogWarning("未能获取到广告归因信息。");
            }
        });
    }
}
```

**`AttributionInfo` 对象包含的常见字段：**

*   `Channel`: 广告渠道名称。
*   `Campaign`: 广告系列名称。
*   `AdGroup`: 广告组名称。
*   `Ad`: 广告名称。
*   `Creative`: 创意名称。
*   `ClickTime`: 广告点击时间戳。
*   `InstallTime`: 应用安装时间戳。
*   `IsOrganic`: 是否为自然量（非广告带来）。

## 2. 广告事件上报

除了自动归因，您还可以手动上报一些关键的广告相关事件，以便更精细地分析广告效果。

### 2.1 上报广告展示事件

当广告成功展示给用户时，您可以上报此事件：

```csharp
using UnityEngine;
using CleverSDK;

public class AdEventManager : MonoBehaviour
{
    public void ReportAdShowEvent(string adType, string adUnitId, string placement)
    {
        // adType: 广告类型 (例如: "rewarded_video", "banner", "interstitial", "native")
        // adUnitId: 广告位 ID
        // placement: 广告展示位置 (例如: "level_start", "game_over")
        CleverSDK.ReportAdShow(adType, adUnitId, placement);
        Debug.Log($"上报广告展示事件: 类型={adType}, 广告位={adUnitId}, 位置={placement}");
    }
}
```

### 2.2 上报广告点击事件

当用户点击广告时，您可以上报此事件：

```csharp
using UnityEngine;
using CleverSDK;

public class AdEventManager : MonoBehaviour
{
    public void ReportAdClickEvent(string adType, string adUnitId, string placement)
    {
        CleverSDK.ReportAdClick(adType, adUnitId, placement);
        Debug.Log($"上报广告点击事件: 类型={adType}, 广告位={adUnitId}, 位置={placement}");
    }
}
```

### 2.3 上报激励视频广告奖励发放事件

当用户观看完激励视频并获得奖励时，您可以上报此事件：

```csharp
using UnityEngine;
using CleverSDK;

public class AdEventManager : MonoBehaviour
{
    public void ReportRewardedAdRewardEvent(string adUnitId, string rewardType, int rewardAmount)
    {
        // adUnitId: 激励视频广告位 ID
        // rewardType: 奖励类型 (例如: "coin", "gem")
        // rewardAmount: 奖励数量
        CleverSDK.ReportRewardedAdReward(adUnitId, rewardType, rewardAmount);
        Debug.Log($"上报激励视频广告奖励事件: 广告位={adUnitId}, 奖励类型={rewardType}, 奖励数量={rewardAmount}");
    }
}
```

### 2.4 自定义广告事件参数

如果您需要上报更详细的广告事件信息，可以使用自定义事件接口并添加相关参数：

```csharp
using UnityEngine;
using CleverSDK;
using System.Collections.Generic;

public class AdEventManager : MonoBehaviour
{
    public void ReportCustomAdEvent(string eventName, Dictionary<string, object> parameters)
    {
        CleverSDK.ReportEvent(eventName, parameters);
        Debug.Log($"上报自定义广告事件: 事件名={eventName}, 参数={JsonUtility.ToJson(parameters)}");
    }

    // 示例：上报一个带有自定义参数的广告加载失败事件
    public void ReportAdLoadFailedWithDetails(string adType, string adUnitId, string errorCode, string errorMessage)
    {
        Dictionary<string, object> parameters = new Dictionary<string, object>
        {
            { "ad_type", adType },
            { "ad_unit_id", adUnitId },
            { "error_code", errorCode },
            { "error_message", errorMessage }
        };
        ReportCustomAdEvent("ad_load_failed", parameters);
    }
}
```

通过以上接口，您可以全面地监测和分析 Unity 项目中的广告表现，为广告优化提供数据支持。