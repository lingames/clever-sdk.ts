# Clever SDK Unity 功能指南

本指南将介绍 Clever SDK 在 Unity 平台提供的其他常用功能。

## 1. 用户登录与授权

Clever SDK 提供了用户登录和授权功能，方便您获取用户基本信息。

### 1.1 登录

```csharp
using UnityEngine;
using CleverSDK;

public class AuthManager : MonoBehaviour
{
    public void Login()
    {
        CleverSDK.Login((success, userInfo, error) =>
        {
            if (success)
            {
                Debug.Log("登录成功！");
                Debug.Log($"用户 OpenID: {userInfo.OpenId}");
                Debug.Log($"用户昵称: {userInfo.NickName}");
                Debug.Log($"用户头像: {userInfo.AvatarUrl}");
                // 可以在这里处理登录成功后的逻辑，例如进入游戏主界面
            }
            else
            {
                Debug.LogError("登录失败: " + error);
            }
        });
    }
}
```

**`UserInfo` 对象包含的常见字段：**

*   `OpenId`: 用户的唯一标识符。
*   `NickName`: 用户昵称。
*   `AvatarUrl`: 用户头像 URL。
*   `Gender`: 用户性别。
*   `Country`: 用户国家。
*   `Province`: 用户省份。
*   `City`: 用户城市。

### 1.2 获取用户 OpenID

在某些情况下，您可能只需要获取用户的 OpenID 而不进行完整的登录流程。

```csharp
using UnityEngine;
using CleverSDK;

public class AuthManager : MonoBehaviour
{
    public void GetOpenId()
    {
        string openId = CleverSDK.GetOpenId();
        if (!string.IsNullOrEmpty(openId))
        {
            Debug.Log($"当前用户 OpenID: {openId}");
        }
        else
        {
            Debug.LogWarning("未能获取到用户 OpenID，可能尚未登录或 SDK 未初始化。");
        }
    }
}
```

## 2. 分享功能

Clever SDK 支持将游戏内容分享到社交平台。

### 2.1 分享文本和图片

```csharp
using UnityEngine;
using CleverSDK;

public class ShareManager : MonoBehaviour
{
    public void ShareContent(string title, string content, string imageUrl)
    {
        CleverSDK.Share(title, content, imageUrl, (success, error) =>
        {
            if (success)
            {
                Debug.Log("分享成功！");
            }
            else
            {
                Debug.LogError("分享失败: " + error);
            }
        });
    }

    // 示例：分享游戏截图
    public void ShareGameScreenshot()
    {
        // 假设您已经有一个截图的 URL 或本地路径
        string screenshotUrl = "http://yourgame.com/screenshot.png";
        ShareContent("我的游戏高分！", "快来挑战我的新纪录！", screenshotUrl);
    }
}
```

**参数说明：**

*   `title`: 分享标题。
*   `content`: 分享内容。
*   `imageUrl`: 分享图片的 URL 或本地路径。
*   `callback`: 分享完成后的回调函数。

## 3. 支付功能

Clever SDK 提供了统一的支付接口，方便您在游戏中集成内购。

### 3.1 发起支付

```csharp
using UnityEngine;
using CleverSDK;
using System.Collections.Generic;

public class PaymentManager : MonoBehaviour
{
    public void MakePayment(string productId, string productName, float price, string orderId)
    {
        Dictionary<string, object> productInfo = new Dictionary<string, object>
        {
            { "productId", productId },
            { "productName", productName },
            { "price", price },
            { "orderId", orderId }
        };

        CleverSDK.Pay(productInfo, (success, result, error) =>
        {
            if (success)
            {
                Debug.Log("支付成功！");
                Debug.Log($"支付结果: {JsonUtility.ToJson(result)}");
                // 可以在这里处理支付成功后的逻辑，例如发放道具
            }
            else
            {
                Debug.LogError("支付失败: " + error);
            }
        });
    }

    // 示例：购买金币包
    public void BuyCoinPack()
    {
        MakePayment("coin_pack_1", "金币大礼包", 9.99f, "ORDER_ID_12345");
    }
}
```

**参数说明：**

*   `productInfo`: 包含商品信息的 Dictionary，至少应包含 `productId`、`productName`、`price` 和 `orderId`。
*   `callback`: 支付完成后的回调函数。

## 4. 其他实用功能

### 4.1 获取设备信息

```csharp
using UnityEngine;
using CleverSDK;

public class DeviceInfoManager : MonoBehaviour
{
    public void GetDeviceInfo()
    {
        DeviceInfo info = CleverSDK.GetDeviceInfo();
        if (info != null)
        {
            Debug.Log("设备信息：");
            Debug.Log($"设备型号: {info.DeviceModel}");
            Debug.Log($"操作系统: {info.OSVersion}");
            Debug.Log($"SDK 版本: {info.SDKVersion}");
            Debug.Log($"网络类型: {info.NetworkType}");
            // 更多设备信息...
        }
    }
}
```

### 4.2 显示 Toast 消息

```csharp
using UnityEngine;
using CleverSDK;

public class UIManager : MonoBehaviour
{
    public void ShowToast(string message, int duration = 2000) // duration in milliseconds
    {
        CleverSDK.ShowToast(message, duration);
    }

    // 示例：显示一个简单的提示
    public void ShowGameSavedToast()
    {
        ShowToast("游戏已保存！");
    }
}
```

这些功能可以帮助您在 Unity 游戏中更便捷地实现用户管理、社交互动和商业化等需求。