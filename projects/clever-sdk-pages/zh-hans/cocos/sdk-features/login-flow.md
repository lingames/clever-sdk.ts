# 登录流程详解

Clever SDK 提供统一的登录接口 `mySdk.login()`，支持三种不同的登录模式。所有登录模式都使用相同的接口调用方式，区别在于初始化配置和后续处理流程。

## 统一登录接口

```ts
import {LoginData} from "@lingames/clever-sdk/src/models/LoginData";

// 所有登录模式都使用相同的接口
(window as any).mySdk.login().then((data: LoginData) => {
    console.log('登录成功', data);
    // 根据不同登录模式进行后续处理
}).catch((err: any) => {
    console.error('登录失败', err);
});
```

## 三种登录模式

### 1. 运行时登录（Platform Login）

**适用场景**: 直接使用平台原生登录，如华为快游戏、微信小游戏等。

**特点**: 
- 不需要后端服务器参与
- 只需要配置 `game_id`
- 直接获取平台用户信息

**配置示例**:
```ts
// 华为快游戏运行时登录
const config = {
    platform: 'huawei',
    game_id: 'your_huawei_app_id', // 华为开发者联盟分配的应用ID
    // 不需要 project_id 和 sdk_login_url
};

const sdk = createSdk(config);
await sdk.initialize();

// 使用统一接口登录
const loginData = await sdk.login();
console.log('华为用户信息:', loginData.openid);
```

**流程说明**:
1. 调用 `mySdk.login()`
2. SDK 直接调用华为平台登录 API
3. 返回华为平台的用户信息
4. 游戏直接使用返回的用户数据

### 2. SDK 登录（SDK Login）

**适用场景**: 使用 Clever SDK 服务器统一处理登录逻辑。

**特点**:
- SDK 服务器承担后端登录工作
- 需要配置 `project_id` 和 `sdk_login_url`
- 统一处理多平台登录差异

**配置示例**:
```ts
// SDK 登录配置
const config = {
    platform: 'wechat',
    project_id: 'your_project_id',
    game_id: 'your_wechat_appid',
    sdk_login_url: 'https://sdk.example.com/api/login'
};

const sdk = createSdk(config);
await sdk.initialize();

// 使用统一接口登录
const loginData = await sdk.login();
console.log('SDK 登录成功:', loginData);
```

**流程说明**:
1. 调用 `mySdk.login()`
2. SDK 先进行平台登录获取临时凭证
3. SDK 将凭证发送到 SDK 服务器验证
4. SDK 服务器返回统一格式的用户信息
5. 游戏使用标准化的用户数据

### 3. 后端登录（Backend Login）

**适用场景**: 游戏有自己的后端服务器，需要自定义登录逻辑。

**特点**:
- 需要游戏后端参与登录流程
- 需要配置后端登录相关参数
- 完全自定义登录和用户管理

**配置示例**:
```ts
// 后端登录配置
const config = {
    platform: 'custom', // 自定义平台标识
    project_id: 'your_project_id',
    game_id: 'your_game_id',
    backend_login_id: 'your_backend_login_id', // 后端登录标识
    backend_url: 'https://your-game-server.com/api'
};

const sdk = createSdk(config);
await sdk.initialize();

// 使用统一接口登录
const loginData = await sdk.login();

// 后续需要与游戏后端交互
const response = await fetch(`${config.backend_url}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        openid: loginData.openid,
        platform: config.platform,
        login_id: config.backend_login_id
    })
});

const gameUserData = await response.json();
console.log('游戏用户数据:', gameUserData);
```

**流程说明**:
1. 调用 `mySdk.login()`
2. SDK 进行基础平台登录
3. 游戏获取基础登录信息
4. 游戏将登录信息发送到自己的后端
5. 游戏后端验证并返回完整用户数据

## 登录模式对比

| 特性 | 运行时登录 | SDK 登录 | 后端登录 |
|------|------------|----------|----------|
| 接口调用 | `mySdk.login()` | `mySdk.login()` | `mySdk.login()` |
| 后端依赖 | 无 | SDK 服务器 | 游戏后端 |
| 配置复杂度 | 简单 | 中等 | 复杂 |
| 自定义程度 | 低 | 中等 | 高 |
| 适用场景 | 简单游戏 | 多平台游戏 | 复杂游戏系统 |

## 最佳实践

### 1. 选择合适的登录模式

- **运行时登录**: 适合单平台、功能简单的小游戏
- **SDK 登录**: 适合需要多平台支持的中等复杂度游戏
- **后端登录**: 适合有复杂用户系统、需要深度自定义的大型游戏

### 2. 错误处理

```ts
try {
    const loginData = await (window as any).mySdk.login();
    // 处理登录成功
} catch (error) {
    if (error.code === 'USER_CANCEL') {
        console.log('用户取消登录');
    } else if (error.code === 'NETWORK_ERROR') {
        console.log('网络错误，请重试');
    } else {
        console.error('登录失败:', error);
    }
}
```

### 3. 登录状态管理

```ts
// 检查登录状态
if (await (window as any).mySdk.checkSession()) {
    console.log('用户已登录');
} else {
    // 需要重新登录
    await (window as any).mySdk.login();
}
```

## 常见问题

### Q: 如何选择登录模式？
A: 根据游戏复杂度和后端需求选择：
- 简单游戏 → 运行时登录
- 多平台游戏 → SDK 登录  
- 复杂用户系统 → 后端登录

### Q: 可以混合使用多种登录模式吗？
A: 不建议在同一个项目中混合使用，应该根据项目需求选择一种模式并保持一致。

### Q: 登录失败如何处理？
A: 检查配置参数是否正确，网络是否正常，并根据错误码进行相应处理。参考 [FAQ 文档](../faq/) 获取详细的错误处理方案。