export type SdkInitialize =
    | {}
    | wxInitialize
    | ttInitialize
    | ksInitialize
    | ggInitialize
    | m4399Initialize
    | mockInitialize
    | minigameInitialize;

export interface m4399Initialize {
    sdk_login_url?: string;
}

export interface ttInitialize {
    sdk_login_url?: string;
}

export interface ksInitialize {
    sdk_login_url?: string;
}

export type wxInitialize = {
    sdk_login_url?: string;
    // 启用分享功能, 默认启用
    // https://developers.weixin.qq.com/minigame/dev/guide/open-ability/share/share.html
    enableShare?: boolean;
};

export interface ggInitialize {
    adSenseId: string;
}

export interface minigameInitialize {
    sdk_login_url?: string;
    /** SDK脚本地址，PREVIEW模式下动态加载 */
    sdk_script_url?: string;
}

export interface mockInitialize {
    mockConfig?: {
        enableMockAds?: boolean;
        mockAdDelay?: number;
        mockAdSuccessRate?: number;
        enableMockLogin?: boolean;
        mockUserInfo?: {
            nickname?: string;
            avatar?: string;
        };
        enableConsoleLog?: boolean;
    };
}
