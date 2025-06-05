/**
 * Clever SDK 全局引用（纯逻辑，不 import `cc`）。
 * 供 `UIController` 与其它启动脚本使用；注入请用 `bindCleverSdk` 或 `SdkManager.bind`。
 */
let cleverSdkRef: any = null;

export function getCleverSdk(): any {
    return cleverSdkRef;
}

export function bindCleverSdk(sdk: any): void {
    cleverSdkRef = sdk;
    console.log("[CleverDemo] cleverSdk 已注入（CleverSdkGlobals）");
}

export const SdkManager = {
    get sdk(): any {
        return cleverSdkRef;
    },
    bind(sdk: any): void {
        bindCleverSdk(sdk);
    },
};
