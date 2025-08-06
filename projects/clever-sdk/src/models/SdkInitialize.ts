export type SdkInitialize = {} | wxInitialize | ttInitialize | ksInitialize | ggInitialize;

export interface ttInitialize {
    sdk_login_url?: string;
}

export interface ksInitialize {
    sdk_login_url?: string;
}

export type wxInitialize = {
    sdk_login_url: string;
    wx: any,
    // 启用分享功能, 默认启用
    // https://developers.weixin.qq.com/minigame/dev/guide/open-ability/share/share.html
    enableShare?: boolean,
}

export interface ggInitialize {
    adSenseId: string
}
