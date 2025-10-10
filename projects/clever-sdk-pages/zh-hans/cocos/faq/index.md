# 常见问题 (FAQ)

## 1. SDK 初始化失败

* **问题描述**: 调用 `SdkManager.initSdk` 后，控制台输出错误或 SDK 功能无法正常使用。
* **可能原因**: 
    * `sdk_url`, `sdk_key`, `game_id` 配置错误。
    * 网络连接问题，无法访问 SDK 服务器。
    * 平台参数 `platform` 填写错误，导致无法匹配到正确的 SDK 实现。
    * 对于 Google AdSense，`adSenseId` 配置错误或未通过审核。
* **解决方案**: 
    * 仔细核对初始化参数，确保与你在 Clever SDK 后台配置的信息一致。
    * 检查网络连接，确保设备可以访问 SDK 服务器。
    * 检查控制台输出的错误信息，根据错误提示进行排查。
    * 确保 `adSenseId` 是有效的 Google AdSense 发布商 ID。

## 2. 广告无法展示

* **问题描述**: 调用 `showRewardedVideoAd` 或 `showBannerAd` 后，广告没有显示。
* **可能原因**: 
    * `adUnitId` 配置错误或广告单元无效。
    * 广告单元未通过平台审核。
    * 广告填充不足，即当前没有可用的广告。
    * 网络问题，无法加载广告资源。
    * 平台限制，例如某些平台对广告展示频率有限制。
* **解决方案**: 
    * 检查 `adUnitId` 是否正确，并确保广告单元已在广告平台创建并生效。
    * 登录广告平台后台，检查广告单元的审核状态和填充情况。
    * 尝试在不同网络环境下测试。
    * 查阅对应平台的广告政策和限制。

## 3. 激励视频广告观看后未获得奖励

* **问题描述**: 用户观看完激励视频广告后，游戏内未发放奖励。
* **可能原因**: 
    * `onClose` 回调中 `res.isEnded` 为 `false`，表示用户未完整观看广告。
    * 奖励发放逻辑存在问题，例如服务器验证失败。
    * 网络延迟导致奖励发放请求未及时到达服务器。
* **解决方案**: 
    * 确保在 `onClose` 回调中，只有当 `res.isEnded` 为 `true` 时才发放奖励。
    * 检查奖励发放的后端逻辑，确保其正确性。
    * 对于重要的奖励，建议采用服务器端验证的方式，防止作弊。

## 4. 登录失败

* **问题描述**: 调用 `login` 方法后，无法获取到用户信息或登录凭证。
* **可能原因**: 
    * 平台登录接口调用失败，例如用户取消授权。
    * SDK 服务器登录接口返回错误，例如 `session_key` 获取失败。
    * 网络问题。
* **解决方案**: 
    * 检查控制台输出的错误信息，根据平台返回的错误码进行排查。
    * 确保用户已授权游戏获取用户信息。
    * 检查 SDK 服务器的登录接口是否正常工作。

## 5. 某些 SDK 功能不支持

* **问题描述**: 调用 `addCommonUse`, `addShortcut` 等功能时，抛出“平台不支持”的错误。
* **可能原因**: 
    * 当前游戏运行的平台确实不支持该功能。Clever SDK 会根据平台特性自动禁用或抛出错误。
* **解决方案**: 
    * 在调用这些功能之前，可以使用 `checkCommonUse`, `checkShortcut` 等方法检查平台是否支持。
    * 对于不支持的功能，可以在 UI 上隐藏相关入口或给出提示。

## 6. Cocos Creator 中 `GAME_PLATFORM` 宏未定义

* **问题描述**: 在使用静态编译法时，编译报错提示 `GAME_PLATFORM` 未定义。
* **可能原因**: 
    * 未在 Cocos Creator 项目设置中添加 `GAME_PLATFORM` 宏。
    * 宏名称拼写错误。
* **解决方案**: 
    * 在 Cocos Creator 编辑器中，进入 `项目 -> 项目设置 -> 宏`，添加一个名为 `GAME_PLATFORM` 的宏，并设置其值为当前平台（例如 `WECHAT_GAME`）。

## 7. 如何更新 SDK

* **问题描述**: 如何获取最新版本的 Clever SDK 并更新到项目中。
* **解决方案**: 
    * 联系技术支持获取最新版本的 SDK 包。
    * 替换项目中旧的 SDK 文件。
    * 根据新版本 SDK 的更新日志，检查是否有 API 变更或需要调整的配置。

## 8. 如何获取用户 OpenID

* **问题描述**: 如何在登录后获取用户的唯一标识 OpenID。
* **解决方案**: 
    * 登录成功后，`login` 方法返回的 `LoginData` 对象中会包含 `openid` 字段。例如：
    ```ts
    (window as any).mySdk.login().then((data: LoginData) => {
        console.log('用户 OpenID:', data.openid);
    });
    ```

## 9. 如何处理网络请求失败

* **问题描述**: SDK 内部的网络请求失败，例如登录、数据上报等。
* **解决方案**: 
    * 大部分 SDK 接口都返回 `Promise`，你可以使用 `.catch()` 来捕获错误并进行相应的处理，例如重试、提示用户网络异常等。
    * 确保游戏已获得网络访问权限。

## 10. 如何在 H5 平台集成 Google AdSense

* **问题描述**: 在 H5 平台集成 Google AdSense 广告。
* **解决方案**: 
    * 在初始化 SDK 时，`platform` 参数设置为 `google`，并提供 `adSenseId`。
    * 确保你的 HTML 页面中包含一个用于显示广告的容器元素，例如：
    ```html
    <div id="adsense-container" style="width: 100%; height: 100px;"></div>
    ```
    * Clever SDK 会自动处理 Google AdSense 的加载和展示逻辑。

## 11. 参数配置相关问题

### 11.1 platform 参数配置错误

* **问题描述**: 初始化时 `platform` 参数配置错误，导致 SDK 功能异常。
* **可能原因**: 
    * `platform` 参数值与实际运行平台不匹配。
    * 自建服务器时未正确配置 `platform` 参数。
* **解决方案**: 
    * 确保 `platform` 参数与实际运行平台一致（如：`wechat`、`huawei`、`google` 等）。
    * 对于自建服务器，可以根据后端路由需求自定义 `platform` 值。
    * 参考 [安装配置文档](../install/) 中的平台参数说明。

### 11.2 project_id 获取和配置问题

* **问题描述**: 不知道如何获取或配置 `project_id` 参数。
* **解决方案**: 
    * `project_id` 用于 SDK 服务器识别项目，需要从 Clever SDK 管理后台获取。
    * 登录 Clever SDK 管理后台，在项目设置中查看项目 ID。
    * 确保 `project_id` 与后台配置的项目 ID 完全一致。

### 11.3 game_id 配置问题

* **问题描述**: `game_id` 配置错误导致平台登录失败。
* **可能原因**: 
    * `game_id` 与平台开发者后台配置不一致。
    * 不同平台的 `game_id` 格式要求不同。
* **解决方案**: 
    * **微信小游戏**: 使用微信公众平台分配的 AppID。
    * **华为快游戏**: 使用华为开发者联盟分配的应用 ID。
    * **字节跳动小游戏**: 使用字节跳动开发者平台的 App ID。
    * **快手小游戏**: 使用快手开放平台的应用 ID。
    * 参考相关平台文档获取游戏 ID 申请说明。

### 11.4 sdk_login_url 配置问题

* **问题描述**: SDK 登录失败，提示服务器连接错误。
* **可能原因**: 
    * `sdk_login_url` 配置错误或服务器不可访问。
    * 网络环境限制访问 SDK 服务器。
* **解决方案**: 
    * 检查 `sdk_login_url` 是否正确，确保 URL 格式完整（包含协议、域名、端口）。
    * 测试服务器连通性，确保网络环境可以访问 SDK 服务器。
    * 联系技术支持确认正确的 SDK 服务器地址。

### 11.5 动态配置与静态配置选择

* **问题描述**: 不确定应该使用动态配置还是静态配置方式。
* **解决方案**: 
    * **动态配置** (`createSdk`): 适用于需要支持多平台的项目，运行时根据环境自动选择 SDK。
    * **静态配置** (直接实例化): 适用于单一平台部署，编译时确定 SDK 类型，性能更优。
    * 参考 [安装文档](../install/) 中的配置方式对比。

### 11.6 参数验证失败

* **问题描述**: SDK 初始化时提示参数验证失败。
* **解决方案**: 
    * 检查所有必需参数是否都已提供且格式正确。
    * 确保参数值不包含特殊字符或空格。
    * 使用开发者工具检查参数传递是否正确：
    ```ts
    console.log('SDK 配置参数:', {
        platform: 'your_platform',
        project_id: 'your_project_id',
        game_id: 'your_game_id',
        sdk_login_url: 'your_sdk_url'
    });
    ```

### 11.7 多环境配置管理

* **问题描述**: 如何在开发、测试、生产环境中管理不同的配置参数。
* **解决方案**: 
    * 使用环境变量或配置文件管理不同环境的参数：
    ```ts
    const config = {
        development: {
            platform: 'wechat',
            project_id: 'dev_project_id',
            game_id: 'dev_game_id',
            sdk_login_url: 'https://dev-sdk.example.com'
        },
        production: {
            platform: 'wechat',
            project_id: 'prod_project_id', 
            game_id: 'prod_game_id',
            sdk_login_url: 'https://sdk.example.com'
        }
    };
    
    const currentConfig = config[process.env.NODE_ENV || 'development'];
    ```

### 11.8 Mock 平台使用

* **问题描述**: 如何在开发环境中使用 Mock 平台进行测试。
* **解决方案**: 
    * Mock 平台提供完整的 SDK 功能模拟，适用于开发和测试环境：
    ```ts
    const mockConfig: DynamicSdkConfig = {
        platform: "mock",
        project_id: "test_project",
        game_id: "mock_game_id",
        sdk_login_url: "https://mock-api.example.com",
        sdk_event_key: "mock_key",
        mockConfig: {
            enableMockAds: true,        // 启用模拟广告
            mockAdDelay: 1000,          // 1秒延迟
            mockAdSuccessRate: 0.8,     // 80%成功率
            enableConsoleLog: true      // 启用日志
        }
    };
    ```
    * Mock SDK 会在控制台输出详细的操作日志，方便调试。
    * 可以通过 `mockConfig` 参数调整模拟行为，如广告成功率、延迟时间等。

### 11.9 Mock 广告测试

* **问题描述**: 如何测试广告功能而不依赖真实的广告平台。
* **解决方案**: 
    * 使用 Mock 平台可以模拟各种广告场景：
    ```ts
    // 配置不同的广告成功率进行测试
    mockSdk.configureMock({
        mockAdSuccessRate: 0.5  // 50% 成功率，模拟网络不稳定
    });
    
    // 测试广告加载
    mySdk.playRewardedVideo().then(() => {
        console.log('广告播放成功');
    }).catch(err => {
        console.log('广告播放失败', err);
    });
    ```
    * Mock 广告会显示可视化的模拟界面，帮助验证 UI 集成。
    * 支持横幅广告、原生广告等多种广告类型的模拟。