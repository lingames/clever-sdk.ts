# SDK 功能

Clever SDK 提供了丰富的功能，帮助你快速开发和运营游戏。

## 1. 登录

SDK 提供了统一的登录接口，支持多种平台登录方式。

```ts
import {LoginData} from "@lingames/clever-sdk/src/models/LoginData";

(window as any).mySdk.login().then((data: LoginData) => {
    console.log('登录成功', data);
    // data 中包含 openid, session_key 等信息
}).catch((err: any) => {
    console.error('登录失败', err);
});
```

## 2. 会话检查

用于检查当前用户会话是否有效。

```ts
(window as any).mySdk.checkSession().then((isValid: boolean) => {
    if (isValid) {
        console.log('会话有效');
    } else {
        console.log('会话无效，需要重新登录');
    }
});
```

## 3. 添加到常用/桌面

部分平台支持将游戏添加到用户的常用列表或桌面快捷方式。

### 添加到常用

```ts
(window as any).mySdk.addCommonUse().then(() => {
    console.log('添加到常用成功');
}).catch((err: any) => {
    console.error('添加到常用失败', err);
});
```

### 检查是否已添加到常用

```ts
(window as any).mySdk.checkCommonUse().then((res: any) => {
    if (res.isSupport && res.isCommonUse) {
        console.log('已添加到常用');
    } else {
        console.log('未添加到常用或不支持');
    }
});
```

### 添加到桌面快捷方式

```ts
import {AddShortcut} from "@lingames/clever-sdk/src/models/AddShortcut";

(window as any).mySdk.addShortcut({
    title: "我的游戏",
    imageUrl: "http://example.com/icon.png"
}).then(() => {
    console.log('添加到桌面成功');
}).catch((err: any) => {
    console.error('添加到桌面失败', err);
});
```

### 检查是否已添加到桌面

```ts
(window as any).mySdk.checkShortcut().then((res: any) => {
    if (res.isSupport && res.exist) {
        console.log('已添加到桌面');
    } else {
        console.log('未添加到桌面或不支持');
    }
});
```

## 4. 场景检查与跳转

用于检查当前宿主版本是否支持跳转某个小游戏入口场景，目前仅支持「侧边栏」场景。

### 检查场景

```ts
(window as any).mySdk.checkScene().then((res: any) => {
    if (res.isSupport && res.isScene) {
        console.log('当前在支持的场景中');
    } else {
        console.log('当前不在支持的场景中或不支持');
    }
});
```

### 跳转场景

```ts
(window as any).mySdk.navigateToScene().then(() => {
    console.log('跳转场景成功');
}).catch((err: any) => {
    console.error('跳转场景失败', err);
});
```

## 5. 分享

分享游戏给好友或社交平台。

```ts
(window as any).mySdk.shareAppMessage({
    title: "快来玩我的游戏！",
    imageUrl: "http://example.com/share_image.png",
    query: "foo=bar&baz=qux" // 分享参数
}).then((success: boolean) => {
    if (success) {
        console.log('分享成功');
    } else {
        console.log('分享失败');
    }
});
```

## 6. 获取用户信息

获取用户的基本信息，如昵称、头像等。

```ts
(window as any).mySdk.getUserInfo().then((userInfo: any) => {
    console.log('获取用户信息成功', userInfo);
}).catch((err: any) => {
    console.error('获取用户信息失败', err);
});
```