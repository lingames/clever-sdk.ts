import {CleverSdk} from "../CleverSdk.js";
import {ksCreateRewardedVideoAd} from "../models/CreateRewardedVideoAd.js";
import {ksCreateBannerAd} from "../models/CreateBannerAd.js";
import {ksInitialize} from "../models/SdkInitialize.js";

declare const ks: any;


export class KuaiShouSdk extends CleverSdk {
    private videoAd: any = null
    private bannerAd: any = null

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
        return Promise.resolve(this.videoAd)
    }

    async loadRewardedVideoAd(): Promise<boolean> {
        this.videoAd?.load()
        return true
    }

    async showRewardedVideoAd(): Promise<boolean> {
        this.videoAd?.show()
        return true
    }

    createBannerAd(adInfo: ksCreateBannerAd): Promise<object> {
        return super.createBannerAd(adInfo);
    }

    async showBannerAd(): Promise<boolean> {
        return super.showBannerAd();
    }

    async hideBannerAd(): Promise<boolean> {
        this.bannerAd?.hide()
        return true
    }

    async destroyBannerAd(): Promise<boolean> {
        this.bannerAd?.destroy()
        return true
    }

    public async checkScene(): Promise<any> {
        console.error("快手不支持该能力")
    }
}