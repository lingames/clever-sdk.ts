export type CreateRewardedVideoAd = {}
    & wxCreateRewardedVideoAd
    & ttCreateRewardedVideoAd
    & ksCreateRewardedVideoAd
    & ggCreateRewardedVideoAd;

export interface wxCreateRewardedVideoAd {
    // 广告单元 id
    adUnitId: string,
    onError?: (e: any) => void,
    onClose?: (e: any) => void,
}

// https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/tt-create-rewarded-video-ad
export interface ttCreateRewardedVideoAd {
    // 广告位 id，后续可以在平台基于广告位 id 看数
    adUnitId: string,
    // 是否开启进度提醒，开启时广告文案为【再看N个获得xx】，关闭时为【 再看1个获得xx】。
    //
    // N 表示玩家当前还需额外观看广告的次数。
    progressTip?: boolean,
}

// https://open.kuaishou.com/docs/develop/api-next/ad/ks.createRewardedVideoAd.html
export interface ksCreateRewardedVideoAd {
    // 广告类型
    type: number,
    // 广告单元 id
    adUnitId: number
}

/// 快应用
export interface hwCreateRewardedVideoAd {
    // 广告单元 id
    adUnitId: string,
    // 是否启用多例模式
    multiton?: boolean,
    onComplete?: () => void,
}

export interface qgCreateRewardedVideoAd {
    // adSenseId: string
    adUnitId: string
}

export interface ggCreateRewardedVideoAd {
    // adSenseId: string
    adUnitId: string
}
