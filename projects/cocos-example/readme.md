# Cocos Example 集成 Clever SDK

## 项目结构

```
├── assets/
│   ├── scripts/
│   │   ├── CleverSdkGlobals.ts      # bindCleverSdk / SdkManager（无 cc 依赖）
│   │   └── UIController.ts          # 场景 Canvas 挂载；从 CleverSdkGlobals 取 SDK
│   └── scenes/
│       └── CleverSdk2D.scene      # 演示场景（Canvas 已挂 UIController）
├── package.json                     # 项目配置文件
└── tsconfig.json                    # TypeScript 配置文件
```

## 集成步骤

1. **构建 Clever SDK**
   - 进入 `projects/clever-sdk` 目录
   - 执行 `pnpm install` 安装依赖
   - 执行 `pnpm run build` 构建 SDK

2. **添加依赖**
   - 已在 package.json 中添加了 `@lingames/clever-sdk` 依赖
   - 执行 `pnpm install` 安装依赖

3. **在 Cocos Creator 中设置场景**

   ### 3.1 打开演示场景（推荐）
   - 打开 Cocos Creator 3.8.7，以仓库根目录或 `projects/cocos-example` 作为工程打开（`assets` 指向仓库根 `assets/`）
   - 在资源管理器中打开 `assets/scenes/CleverSdk2D.scene`：根节点为 **Main Camera** + **Canvas**，**Canvas 已挂载 `UIController`**，`start` 时会自动生成四个演示按钮
   - 菜单 **项目 → 项目设置 → 通用** 里可将 **默认预览场景** 设为 `CleverSdk2D`（或在构建发布里勾选为首场景）

   ### 3.2 手动集成（可选）
   - 在场景中创建一个空节点，命名为 `CleverSDKManager`
   - 给此节点添加 `CleverSDKManager` 组件

   ### 3.3 添加 UI 按钮（若不用 CleverSdk2D 自动生成）
   - 创建一个 Canvas 节点，并挂上 `UIController`（与 CleverSdk2D 一致时可挂在 Canvas 上）
   - 在 Canvas 下创建四个按钮，分别命名为：
     - `PlayRewardedVideoButton`
     - `CreateBannerAdButton`
     - `CreateNativeAdButton`
     - `TestLoginButton`

   ### 3.4 绑定事件（使用 CleverSdk2D 时可跳过：按钮与点击已在 `UIController` 代码里接好）
   - 选择挂载了 `UIController` 的节点（CleverSdk2D 中为 **Canvas**）
   - 在 Inspector 面板中，将 `CleverSDKManager` 节点拖到 `sdkManager` 属性上
   - 选择每个按钮，在 Inspector 面板中添加点击事件：
     - `PlayRewardedVideoButton` -> `UIController` -> `onPlayRewardedVideo`
     - `CreateBannerAdButton` -> `UIController` -> `onCreateBannerAd`
     - `CreateNativeAdButton` -> `UIController` -> `onCreateNativeAd`
     - `TestLoginButton` -> `UIController` -> `onTestLogin`

4. **运行测试**
   - 运行场景
   - 查看控制台输出，确认 SDK 初始化成功
   - 点击各个按钮，测试功能

## 功能说明

- **播放激励视频**：点击按钮调用 `CleverSDK.playRewardedVideo()`
- **创建横幅广告**：点击按钮调用 `CleverSDK.createBannerAd()`
- **创建原生广告**：点击按钮调用 `CleverSDK.createNativeAd()`
- **测试登录**：点击按钮调用 `CleverSDK.login()`

## 注意事项

- 确保 Clever SDK 已正确构建
- 确保 pnpm workspace 配置正确
- 在实际使用中，需要根据具体平台和游戏配置调整初始化参数
