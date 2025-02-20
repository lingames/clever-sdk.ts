import {CleverSdk} from "../CleverSdk";

declare const tt: any;

type DouyinInitialize = {
    adUnitId: string
}

export class DouyinSDK extends CleverSdk {
    async initialize(config: DouyinInitialize): Promise<boolean> {
        console.info("抖音全局对象:", tt)
        // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/tt-create-rewarded-video-ad
        // 全局只能有一个视频广告实例，重复创建没有用
        this.videoAd = tt.createRewardedVideoAd({adUnitId: config.adUnitId})
        return true
    }

    createRewardedVideoAd(): Promise<boolean> {
        // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/rewarded-video-ad/rewarded-video-ad-load
        this.videoAd.load()
        // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/rewarded-video-ad/rewarded-video-ad-show
        this.videoAd.show()
        return Promise.resolve(true)
    }
}

