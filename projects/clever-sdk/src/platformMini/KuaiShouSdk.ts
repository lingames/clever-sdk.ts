import {CleverSdk} from "../CleverSdk.js";

declare const ks: any;

type KuaiShouInitialize = {
    // 广告类型
    type: number,
    // 广告单元 id
    unitId: number
}

export class KuaiShouSdk extends CleverSdk {
    async initialize(config: KuaiShouInitialize): Promise<boolean> {
        console.info("抖音全局对象:", ks)
        // https://open.kuaishou.com/docs/develop/api-next/ad/ks.createRewardedVideoAd.html
        // 全局只能有一个视频广告实例，重复创建没有用
        this.videoAd = ks.createRewardedVideoAd({
            type: config.type,
            unitId: config.unitId
        })
        return true
    }

    createRewardedVideoAd(): Promise<boolean> {
        // https://open.kuaishou.com/docs/develop/api-next/ad/RewardedVideoAd/RewardedVideoAd.load.html
        this.videoAd.load()
        // https://open.kuaishou.com/docs/develop/api-next/ad/RewardedVideoAd/RewardedVideoAd.show.html
        this.videoAd.show()
        return Promise.resolve(true)
    }


    public async checkScene(): Promise<any> {
        console.error("快手不支持该能力")
    }


    async createBannerAd(): Promise<void> {
        await super.createBannerAd();
    }
}