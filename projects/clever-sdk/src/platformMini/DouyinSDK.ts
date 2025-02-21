import {CleverSdk} from "../CleverSdk.js";

declare const tt: any;

type DouyinInitialize = {
    // 广告位 id，后续可以在平台基于广告位 id 看数
    adUnitId: string,
    // 是否开启进度提醒，开启时广告文案为【再看N个获得xx】，关闭时为【 再看1个获得xx】。
    //
    // N 表示玩家当前还需额外观看广告的次数。
    progressTip?: boolean,
}

interface CheckScene {
    isExist: boolean
}

export class DouyinSDK extends CleverSdk {
    async initialize(config: DouyinInitialize): Promise<boolean> {
        console.info("抖音全局对象:", tt)
        // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/tt-create-rewarded-video-ad
        // 全局只能有一个视频广告实例，重复创建没有用
        this.videoAd = tt.createRewardedVideoAd({
            adUnitId: config.adUnitId,
            progressTip: config.progressTip || false
        })
        return true
    }

    createRewardedVideoAd(): Promise<boolean> {
        // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/rewarded-video-ad/rewarded-video-ad-load
        this.videoAd.load()
        // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/rewarded-video-ad/rewarded-video-ad-show
        this.videoAd.show()
        return Promise.resolve(true)
    }


    public override async checkScene(): Promise<CheckScene> {
        // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/sidebar-capacity/tt-check-scene
        return tt.checkScene({scene: "sidebar"})
    }


    async createBannerAd(): Promise<void> {
        await super.createBannerAd();
    }

}

