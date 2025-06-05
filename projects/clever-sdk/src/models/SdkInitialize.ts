export type SdkInitialize =
    | {}
    | wxInitialize
    | ttInitialize
    | ksInitialize
    | ggInitialize
    | m4399Initialize
    | mockInitialize;

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
    // Ahagame SDK 配置参数
    appKey?: string;
    gaId?: string;
    adFrequencyHint?: string;
    adChannel?: string;
    /** 与官方壳 index 中 `data-adbreak-test: "on"` 一致，联调测试广告时开启；上线务必关闭 */
    adBreakTest?: boolean;
    pauseCallback?: () => void;
    resumeCallback?: () => void;
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
