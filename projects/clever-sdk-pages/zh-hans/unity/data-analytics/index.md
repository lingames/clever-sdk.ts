# Clever SDK Unity 数据埋点指南

本指南将详细介绍如何在 Unity 项目中利用 Clever SDK 进行数据埋点，以便收集用户行为数据并进行分析。

## 1. 用户属性设置

您可以设置用户的属性，例如用户 ID、等级、注册时间等，这些属性将与用户上报的事件关联。

### 1.1 设置用户 ID

建议在用户登录或注册成功后立即设置用户 ID，以便追踪特定用户的行为。

```csharp
using UnityEngine;
using CleverSDK;

public class UserProfileManager : MonoBehaviour
{
    public void SetUserId(string userId)
    {
        CleverSDK.SetUserId(userId);
        Debug.Log($"用户 ID 已设置为: {userId}");
    }

    // 示例：在用户登录成功后调用
    public void OnUserLoginSuccess(string userId)
    {
        SetUserId(userId);
    }
}
```

### 1.2 设置用户属性

您可以设置多个用户属性，例如用户昵称、性别、等级、VIP 等级等。

```csharp
using UnityEngine;
using CleverSDK;
using System.Collections.Generic;

public class UserProfileManager : MonoBehaviour
{
    public void SetUserProperties(Dictionary<string, object> properties)
    {
        CleverSDK.SetUserProperties(properties);
        Debug.Log($"用户属性已设置: {JsonUtility.ToJson(properties)}");
    }

    // 示例：设置用户等级和注册时间
    public void UpdateUserLevelAndRegisterTime(int level, string registerTime)
    {
        Dictionary<string, object> properties = new Dictionary<string, object>
        {
            { "level", level },
            { "register_time", registerTime }
        };
        SetUserProperties(properties);
    }
}
```

## 2. 事件上报

事件上报是数据埋点的核心，您可以上报各种用户行为事件，例如点击按钮、完成任务、购买商品等。

### 2.1 上报普通事件

上报一个不带参数的事件：

```csharp
using UnityEngine;
using CleverSDK;

public class EventTracker : MonoBehaviour
{
    public void ReportSimpleEvent(string eventName)
    {
        CleverSDK.ReportEvent(eventName);
        Debug.Log($"上报事件: {eventName}");
    }

    // 示例：上报游戏开始事件
    public void OnGameStart()
    {
        ReportSimpleEvent("game_start");
    }
}
```

### 2.2 上报带参数事件

上报一个带参数的事件，参数以 Dictionary 形式传递：

```csharp
using UnityEngine;
using CleverSDK;
using System.Collections.Generic;

public class EventTracker : MonoBehaviour
{
    public void ReportEventWithProperties(string eventName, Dictionary<string, object> properties)
    {
        CleverSDK.ReportEvent(eventName, properties);
        Debug.Log($"上报事件: {eventName}, 参数: {JsonUtility.ToJson(properties)}");
    }

    // 示例：上报购买商品事件
    public void OnPurchaseItem(string itemId, string itemName, int price, int quantity)
    {
        Dictionary<string, object> properties = new Dictionary<string, object>
        {
            { "item_id", itemId },
            { "item_name", itemName },
            { "price", price },
            { "quantity", quantity }
        };
        ReportEventWithProperties("purchase_item", properties);
    }

    // 示例：上报关卡完成事件
    public void OnLevelComplete(int levelNumber, int score, bool isSuccess)
    {
        Dictionary<string, object> properties = new Dictionary<string, object>
        {
            { "level_number", levelNumber },
            { "score", score },
            { "is_success", isSuccess }
        };
        ReportEventWithProperties("level_complete", properties);
    }
}
```

**参数命名建议：**

*   使用小写字母和下划线组合 (snake_case)。
*   避免使用特殊字符和空格。
*   参数名应具有描述性，能够清晰表达其含义。

## 3. 页面事件上报

Clever SDK 通常会自动收集页面（场景）的进入和退出事件。如果您需要手动控制或上报自定义页面事件，可以使用以下方法：

### 3.1 上报页面进入事件

```csharp
using UnityEngine;
using CleverSDK;

public class PageTracker : MonoBehaviour
{
    public void ReportPageEnter(string pageName)
    {
        CleverSDK.ReportPageEnter(pageName);
        Debug.Log($"进入页面: {pageName}");
    }

    // 示例：在场景加载完成后调用
    void Start()
    {
        ReportPageEnter(UnityEngine.SceneManagement.SceneManager.GetActiveScene().name);
    }
}
```

### 3.2 上报页面退出事件

```csharp
using UnityEngine;
using CleverSDK;

public class PageTracker : MonoBehaviour
{
    public void ReportPageLeave(string pageName)
    {
        CleverSDK.ReportPageLeave(pageName);
        Debug.Log($"离开页面: {pageName}");
    }

    // 示例：在场景卸载前调用
    void OnDestroy()
    {
        ReportPageLeave(UnityEngine.SceneManagement.SceneManager.GetActiveScene().name);
    }
}
```

通过合理地设置用户属性和上报事件，您可以全面地了解用户行为，为产品优化和运营决策提供数据支持。