export type PlayRewardedVideo = {}
    & wxCreateRewardedVideoAd
    & ttCreateRewardedVideoAd
    & ksCreateRewardedVideoAd
    & ggCreateRewardedVideoAd;

export interface VideoReward {
    isEnded: Boolean,
    count: number
}

export interface wxCreateRewardedVideoAd {
    // 通用广告单元 id
    adUnitId?: string,
    // 微信专用广告 id
    wxUnitId?: string,
    // 是否启用多例模式，默认为false
    multiton?: boolean,
    // 是否禁用分享页，默认为 false
    disableFallbackSharePage?: boolean,
}

// https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/tt-create-rewarded-video-ad
export interface ttCreateRewardedVideoAd {
    // 通用广告单元 id
    adUnitId?: string,
    // 抖音专用广告 id
    ttUnitId?: string,

    /**
     * 是否开启再得广告模式
     */
    multiton?: boolean,
    /**
     * multiton 为 true 时必填
     * 再得广告的奖励文案，玩家每看完一个广告会展示，如【再看1个获得xx】；xx就multitonRewardMsg中的文案，按顺序依次展示，单个文案最大长度为 7
     */
    multitonMessage?: string[],
    /**
     * multiton 为 true 时必填
     * 额外观看广告的次数，合法的数据范围为 1-4
     */
    multitonTimes?: 1 | 2 | 3 | 4,

    // 是否开启进度提醒，开启时广告文案为【再看N个获得xx】，关闭时为【 再看1个获得xx】。
    //
    // N 表示玩家当前还需额外观看广告的次数。
    progressTip?: boolean,
}

/**
 * https://open.kuaishou.com/miniGameDocs/gameDev/api/ad/rewardAd/ks.createRewardedVideoAd.html
 */
export interface ksCreateRewardedVideoAd {
    /**
     * 通用广告单元 id, ksUnitId 为 `undefined` 时必填
     */
    adUnitId?: string
    /**
     * 快手专用广告 id
     */
    ksUnitId?: string,
    /**
     * 是否开启再得广告模式
     */
    multiton?: boolean,
    /**
     * multiton 为 true 时必填
     * 再得广告的奖励文案，玩家每看完一个广告会展示，如【再看1个获得xx】；xx就multitonRewardMsg中的文案，按顺序依次展示，单个文案最大长度为 7
     */
    multitonMessage?: string[],
    /**
     * multiton 为 true 时必填
     * 额外观看广告的次数，合法的数据范围为 1-4
     */
    multitonTimes?: 1 | 2 | 3 | 4,
}

/// 快应用
export interface hwCreateRewardedVideoAd {
    /**
     * 通用广告单元 id
     */
    adUnitId?: string,
    /**
     * 华为专用广告 id
     */
    hwUnitId?: string,
    /**
     * 是否启用多例模式
     */
    multiton?: boolean,
    onComplete?: () => void,
}

export interface qgCreateRewardedVideoAd {
    // adSenseId: string
    adUnitId?: string,
    onClose?: (e: qgOnClose) => void,
    onClick?: (e: qgOnClick) => void,
    onError?: (e: qgOnError) => void
}

export interface qgOnClose {
    isEnded: boolean
}

export interface qgOnError {

}

export interface qgOnClick {
    code: number,
    msg: string
}

export interface ggCreateRewardedVideoAd {
    // adSenseId: string
    adUnitId: string
}
