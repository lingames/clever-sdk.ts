export type SdkInitialize = {} & wxInitialize & ttInitialize & ksInitialize & ggInitialize;

export interface ttInitialize {
}

export interface ksInitialize {
}


export type wxInitialize = {
    wx: any,
    // 启用分享功能, 默认启用
    // https://developers.weixin.qq.com/minigame/dev/guide/open-ability/share/share.html
    enableShare?: boolean,
}

export interface ggInitialize {
    adSenseId: string
}
