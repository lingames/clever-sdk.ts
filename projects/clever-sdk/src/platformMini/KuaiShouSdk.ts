import {CleverSdk} from "../CleverSdk.js";
import {ksCreateRewardedVideoAd} from "../models/CreateRewardedVideoAd.js";
import {ksCreateBannerAd} from "../models/CreateBannerAd.js";
import {ksInitialize} from "../models/SdkInitialize.js";

declare const ks: any;


export class KuaiShouSdk extends CleverSdk {
    async initialize(config: ksInitialize): Promise<boolean> {
        console.info("快手全局对象:", ks)
        return true
    }

    // https://open.kuaishou.com/docs/develop/api-next/ad/ks.createRewardedVideoAd.html
    // 全局只能有一个视频广告实例，重复创建没有用
    createRewardedVideoAd(adInfo: ksCreateRewardedVideoAd): Promise<object> {
        this.videoAd = ks.createRewardedVideoAd({
            type: adInfo.type,
            unitId: adInfo.adUnitId
        })
        //         // https://open.kuaishou.com/docs/develop/api-next/ad/RewardedVideoAd/RewardedVideoAd.load.html
        //         this.videoAd.load()
        //         // https://open.kuaishou.com/docs/develop/api-next/ad/RewardedVideoAd/RewardedVideoAd.show.html
        //         this.videoAd.show()
        return Promise.resolve(this.videoAd)
    }

    createBannerAd(adInfo: ksCreateBannerAd): Promise<object> {
        return super.createBannerAd(adInfo);
    }

    public async checkScene(): Promise<any> {
        console.error("快手不支持该能力")
    }
}