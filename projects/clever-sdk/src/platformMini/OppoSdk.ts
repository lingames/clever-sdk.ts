import {CleverSdk} from "../CleverSdk.js";
import {hwCreateRewardedVideoAd, qgCreateRewardedVideoAd} from "../models/CreateRewardedVideoAd.js";
import {qgCreateBannerAd} from "../models/CreateBannerAd.js";

// 硬核联盟全局对象
export declare const qg: any;

export class OppoSdk extends CleverSdk {
    protected videoAd: any = null
    protected bannerAd: any = null

    async initialize(config: Record<string, any>): Promise<boolean> {
        console.info("OPPO 全局对象:", qg)
        return Promise.resolve(true);
    }

    async login(): Promise<any> {
        qg.login({
            success: function (res: any) {
                console.log("Oppo 登录")
                const data = JSON.stringify(res.data);
                console.log(data);
            },
            fail: function (res: any) {
                console.log("Oppo 登录失败")
                console.log(JSON.stringify(res));
            },
        });
        return Promise.resolve(true)
    }

    createRewardedVideoAd(adInfo: qgCreateRewardedVideoAd): Promise<object> {
        // https://ie-activity-cn.heytapimage.com/static/minigame/CN/docs/index.html#/develop/ad/video-ad
        this.videoAd = qg.createRewardedVideoAd({
            adUnitId: adInfo.adUnitId,
        });
        return Promise.resolve(this.videoAd)
    }

    async createBannerAd(adInfo: qgCreateBannerAd) {
        // https://ie-activity-cn.heytapimage.com/static/minigame/CN/docs/index.html#/develop/ad/banner-ad?id=qgcreatebanneradobject
        this.bannerAd = qg.createBannerAd({
            adUnitId: adInfo.adUnitId,
            style: adInfo.style
        });
        return this.bannerAd
    }

    async showBannerAd() {
        if (this.bannerAd != null) {
            this.bannerAd.show();
            return true
        } else {
            console.warn("未调用 createBannerAd")
            return false
        }
    }

    async hideBannerAd() {
        if (this.bannerAd != null) {
            this.bannerAd.hide();
        }
        return true
    }

    async destroyBannerAd(): Promise<boolean> {
        if (this.bannerAd != null) {
            this.bannerAd.destroy();
            this.bannerAd = null;
        }
        return true
    }

    // 不支持
    // async addShortcut(options: AddShortcut): Promise<object> {
    //     return super.addShortcut(options);
    // }

    // 不支持
    // async addCommonUse(): Promise<void> {
    //     super.addCommonUse();
    // }
}
