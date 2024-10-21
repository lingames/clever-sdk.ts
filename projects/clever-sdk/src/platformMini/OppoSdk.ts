import {CleverSdk} from "../CleverSdk.js";
import {qgCreateRewardedVideoAd} from "../models/CreateRewardedVideoAd.js";
import {qgCreateBannerAd} from "../models/CreateBannerAd.js";

// 硬核联盟全局对象
export declare const qg: any;

export class OppoSdk extends CleverSdk {
    protected videoAd: any = null

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

    createBannerAd(adInfo: qgCreateBannerAd): Promise<object> {
        // https://ie-activity-cn.heytapimage.com/static/minigame/CN/docs/index.html#/develop/ad/banner-ad?id=qgcreatebanneradobject
        const bannerAd = qg.createBannerAd({
            adUnitId: adInfo.adUnitId,
        });
        return Promise.resolve(bannerAd)
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
