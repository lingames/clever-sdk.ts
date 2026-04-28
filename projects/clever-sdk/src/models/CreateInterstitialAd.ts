export interface dyCreateInterstitialAd {
    // 通用广告单元 id
    adUnitId?: string;
    // 抖音 / TikTok 专用广告 id
    ttUnitId?: string;
}

export interface ttCreateInterstitialAd {
    // 通用广告单元 id
    adUnitId?: string;
    // 抖音 / TikTok 专用广告 id
    ttUnitId?: string;
}

export type CreateInterstitialAd = dyCreateInterstitialAd & ttCreateInterstitialAd;
