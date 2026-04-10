# Cocos Example 集成 Clever SDK

## 项目结构

```
├── assets/
│   ├── scripts/
│   │   ├── CleverSDKManager.ts     # Clever SDK 管理器
│   │   └── UIController.ts          # UI 控制器
│   └── scenes/
│       └── (场景文件)
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

   ### 3.1 创建场景
   - 打开 Cocos Creator 3.8.7
   - 导入此项目
   - 创建一个新场景

   ### 3.2 添加节点
   - 在场景中创建一个空节点，命名为 `CleverSDKManager`
   - 给此节点添加 `CleverSDKManager` 组件

   ### 3.3 添加 UI 按钮
   - 创建一个 Canvas 节点
   - 在 Canvas 下创建一个空节点，命名为 `UIController`
   - 给此节点添加 `UIController` 组件
   - 在 Canvas 下创建四个按钮，分别命名为：
     - `PlayRewardedVideoButton`
     - `CreateBannerAdButton`
     - `CreateNativeAdButton`
     - `TestLoginButton`

   ### 3.4 绑定事件
   - 选择 `UIController` 节点
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
