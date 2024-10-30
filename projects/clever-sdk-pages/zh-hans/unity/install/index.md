# Clever SDK Unity 安装指南

本指南将详细介绍如何在 Unity 项目中集成 Clever SDK。

## 1. 获取 SDK

请联系 Clever SDK 技术支持团队获取最新的 Unity SDK 包。

## 2. 项目集成

### 2.1 导入 Unity 包

1. 打开您的 Unity 项目。
2. 在 Unity 编辑器中，选择 `Assets` > `Import Package` > `Custom Package...`。
3. 浏览并选择您从 Clever SDK 技术支持团队获取的 `.unitypackage` 文件。
4. 在弹出的导入对话框中，确保所有文件都被选中，然后点击 `Import`。

### 2.2 配置 Android 项目 (如果需要)

如果您的 Unity 项目目标平台包含 Android，您可能需要进行额外的配置：

1. **配置 `build.gradle` (Project 级别)**
   确保您的项目级别的 `build.gradle` 文件中包含 Google 和 Maven Central 仓库：

   ```gradle
   allprojects {
       repositories {
           google()
           mavenCentral()
       }
   }
   ```

2. **配置 `build.gradle` (Module 级别)**
   在您的模块级别的 `build.gradle` 文件中，添加 Clever SDK 所需的依赖项。具体依赖项请参考 Clever SDK 提供的最新文档或联系技术支持。

   ```gradle
   dependencies {
       // Clever SDK 核心库
       implementation 'com.cleversdk:cleversdk-unity:x.y.z' // 替换为实际版本号
       // 其他可能需要的依赖，例如广告平台 SDK 等
   }
   ```

### 2.3 配置 iOS 项目 (如果需要)

如果您的 Unity 项目目标平台包含 iOS，您可能需要进行额外的配置：

1. **导出 Xcode 项目**
   在 Unity 中构建您的 iOS 项目，生成 Xcode 工程。

2. **配置 `Podfile`**
   在导出的 Xcode 项目根目录下的 `Podfile` 中，添加 Clever SDK 所需的 CocoaPods 依赖。具体依赖项请参考 Clever SDK 提供的最新文档或联系技术支持。

   ```ruby
   target 'UnityFramework' do
     pod 'CleverSDKUnity', '~> x.y.z' # 替换为实际版本号
     # 其他可能需要的 Pods，例如广告平台 SDK 等
   end
   ```

   然后运行 `pod install` 更新依赖。

## 3. 初始化 SDK

在您的 Unity 项目启动时，您需要初始化 Clever SDK。建议在游戏启动的早期阶段进行初始化，例如在某个 MonoBehaviour 的 `Awake` 或 `Start` 方法中。

```csharp
using UnityEngine;
using CleverSDK;

public class CleverSDKInitializer : MonoBehaviour
{
    void Awake()
    {
        // 替换为您的实际 App ID 和 App Key
        string appId = "YOUR_APP_ID";
        string appKey = "YOUR_APP_KEY";

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

**参数说明：**

*   `appId`: 您的应用在 Clever SDK 平台注册后获得的唯一标识符。
*   `appKey`: 您的应用在 Clever SDK 平台注册后获得的密钥。
*   `callback`: 初始化完成后的回调函数，`success` 表示是否成功，`message` 包含错误信息（如果失败）。

请确保将 `YOUR_APP_ID` 和 `YOUR_APP_KEY` 替换为您的实际应用 ID 和应用密钥。