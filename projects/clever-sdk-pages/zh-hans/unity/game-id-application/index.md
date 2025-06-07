# Clever SDK Unity 小游戏 ID 申请指南

本指南将详细介绍如何在 Unity 平台为小游戏申请和配置 ID，以便与 Clever SDK 集成。

## 1. 了解小游戏平台

小游戏 ID 的申请通常与特定的平台相关联，例如微信小游戏、QQ 小游戏、字节跳动小游戏等。每个平台都有其独立的开发者注册和应用创建流程。

## 2. 申请流程概述

以下是申请小游戏 ID 的通用步骤：

1.  **选择目标小游戏平台**：确定您的 Unity 游戏将发布到哪个小游戏平台。
2.  **注册开发者账号**：在选定的平台注册成为开发者。
3.  **创建小游戏应用**：在开发者后台创建新的小游戏应用，并填写相关信息。
4.  **获取 AppID/GameID**：应用创建成功后，您将获得一个唯一的 AppID (或 GameID)，这是集成 Clever SDK 所必需的。
5.  **配置 Clever SDK**：将获取到的 AppID 配置到您的 Unity 项目中。
6.  **提交审核**：完成游戏开发和 SDK 集成后，提交小游戏进行平台审核。

## 3. 以微信小游戏为例

### 3.1 注册微信开发者账号

访问 [微信公众平台](https://mp.weixin.qq.com/)，注册并完成开发者资质认证。

### 3.2 创建小游戏应用

1.  登录微信公众平台。
2.  在左侧导航栏选择 `开发` > `开发管理`。
3.  点击 `小程序设置`，然后选择 `基本设置`。
4.  在这里您可以找到您的 `AppID(小程序ID)`。

### 3.3 配置 Unity 项目

将获取到的微信小游戏 AppID 配置到您的 Unity 项目中，通常是在 Clever SDK 的初始化代码中：

```csharp
using UnityEngine;
using CleverSDK;

public class CleverSDKInitializer : MonoBehaviour
{
    void Awake()
    {
        // 替换为您的微信小游戏 App ID 和 App Key
        string appId = "YOUR_WECHAT_MINIGAME_APP_ID";
        string appKey = "YOUR_WECHAT_MINIGAME_APP_KEY"; // 如果微信小游戏有 App Key

        CleverSDK.Initialize(appId, appKey, (success, message) =>
        {
            if (success)
            {
                Debug.Log("Clever SDK 初始化成功！");
            }
            else
            {
                Debug.LogError("Clever SDK 初始化失败: " + message);
            }
        });
    }
}
```

## 4. 常见问题

*   **Q: 为什么我无法获取到 AppID？**
    *   A: 请确保您已完成开发者注册和资质认证，并且已在对应平台成功创建了小游戏应用。

*   **Q: AppID 和 AppKey 有什么区别？**
    *   A: AppID 是应用的唯一标识符，用于识别您的应用。AppKey 通常是用于签名或验证的密钥，用于保障通信安全。不同平台可能只提供 AppID 或同时提供两者。

*   **Q: Clever SDK 是否支持所有小游戏平台？**
    *   A: Clever SDK 致力于支持主流小游戏平台。具体支持列表请查阅 Clever SDK 的官方文档或联系技术支持。

*   **Q: 我在 Unity 中配置了 AppID，但 SDK 初始化失败怎么办？**
    *   A: 请检查 AppID 和 AppKey 是否正确，网络连接是否正常，以及 SDK 版本是否与平台要求兼容。同时，查看 Unity 控制台的错误日志以获取更多信息。