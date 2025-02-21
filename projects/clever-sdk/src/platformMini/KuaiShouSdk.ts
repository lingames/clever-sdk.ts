import {CleverSdk} from "../CleverSdk.js";
import {ksCreateRewardedVideoAd} from "../models/CreateRewardedVideoAd.js";
import {ksCreateBannerAd} from "../models/CreateBannerAd.js";
import {ksInitialize} from "../models/SdkInitialize.js";

export declare const ks: any;

export var videoAd: any = null;
export var bannerAd: any = null;


export class KuaiShouSdk extends CleverSdk {

    async initialize(config: ksInitialize): Promise<boolean> {
        console.info("快手全局对象:", ks)
        return true
    }

    // https://open.kuaishou.com/docs/develop/api-next/ad/ks.createRewardedVideoAd.html
    // 全局只能有一个视频广告实例，重复创建没有用
    createRewardedVideoAd(adInfo: ksCreateRewardedVideoAd): Promise<object> {
        videoAd = ks.createRewardedVideoAd({
            type: adInfo.type,
            unitId: adInfo.adUnitId
        })
        return Promise.resolve(videoAd)
    }

    async loadRewardedVideoAd(): Promise<boolean> {
        videoAd?.load()
        return true
    }

    async showRewardedVideoAd(): Promise<boolean> {
        videoAd?.show()
        return true
    }

    async destroyRewardedVideoAd(): Promise<boolean> {
        videoAd?.destroy()
        return true
    }

    createBannerAd(adInfo: ksCreateBannerAd): Promise<object> {
        return super.createBannerAd(adInfo);
    }

    async showBannerAd(): Promise<boolean> {
        return super.showBannerAd();
    }

    async hideBannerAd(): Promise<boolean> {
        bannerAd?.hide()
        return true
    }

    async destroyBannerAd(): Promise<boolean> {
        bannerAd?.destroy()
        return true
    }

    public async checkScene(): Promise<any> {
        console.error("快手不支持该能力")
    }
}