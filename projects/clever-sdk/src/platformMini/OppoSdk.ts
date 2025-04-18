import {CleverSdk} from "../CleverSdk.js";
import {qgCreateRewardedVideoAd, RewardedVideo} from "../models/CreateRewardedVideoAd.js";
import {qgCreateBannerAd} from "../models/CreateBannerAd.js";
import {OppoLoginData} from "../models/LoginData.js";
import {qgCreateNativeAd} from "../models/CreateNativeAd.js";

// 硬核联盟全局对象
export declare const qg: any;


export class OppoSdk extends CleverSdk {
    protected videoAd: any = null
    protected bannerAd: any = null
    protected customAd: any = null

    async initialize(config: Record<string, any>): Promise<boolean> {
        console.info("OPPO 全局对象:", qg)
        return Promise.resolve(true);
    }

    async login(): Promise<OppoLoginData> {
        // https://ie-activity-cn.heytapimage.com/static/minigame/CN/docs/index.html#/develop/feature/account?id=qgloginobject
        return new Promise((resolve, reject) => {
            qg.login({
                success: function (fine: OppoLoginData) {
                    console.log("Oppo 登录成功")
                    resolve({
                        ...fine,
                        openid: fine.uid
                    })
                },
                fail: function (fail: any) {
                    console.log("Oppo 登录失败", fail)
                },
            });
        })
    }

    createRewardedVideoAd(adInfo: qgCreateRewardedVideoAd): Promise<RewardedVideo> {
        // https://ie-activity-cn.heytapimage.com/static/minigame/CN/docs/index.html#/develop/ad/video-ad
        console.log("创建OPPO激励视频广告");
        this.videoAd = qg.createRewardedVideoAd({
            adUnitId: adInfo.adUnitId
        });
        return new Promise((resolve, reject) => {
            let fn = '';
            if (typeof (this.videoAd.show) !== 'undefined') {
                fn = 'show';
            } else if (typeof (this.videoAd.load) !== 'undefined') {
                fn = 'load';
            } else {
                console.error('unsupported createRewardedVideoAd');
                return;
            }

            this.videoAd.onError((err: any) => {
                console.error('广告异常', JSON.stringify(err));
                adInfo.onError?.(err)
            });

            // 视频关闭
            this.videoAd.onClose((res: any) => {
                console.log(JSON.stringify(res));
                if ((res && res.isEnded) || res === undefined) {
                    res = res || {
                        isEnded: true,
                        count: 1
                    };
                    res.count = res.count || 1;
                    console.info('广告观看结束，此处添加奖励代码', JSON.stringify(res));
                    resolve(res);
                } else {
                    console.error('广告没看完，不能获奖', JSON.stringify(res));
                    resolve(res);
                }
            });

            try {
                this.videoAd[fn](adInfo);
            } catch (e: any) {
                console.error('show videoAd err:', JSON.stringify(e));
            }
        })
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

    async destroyBannerAd() {
        if (this.bannerAd != null) {
            this.bannerAd.destroy();
            this.bannerAd = null;
        }
        return true
    }

    // https://ie-activity-cn.heytapimage.com/static/minigame/CN/docs/index.html#/develop/ad/native-template-ad?id=qgcreatecustomadobject-object
    async createNativeAd(adInfo: qgCreateNativeAd): Promise<object> {
        this.customAd = qg.createCustomAd(adInfo);
        return this.customAd
    }

    // https://ie-activity-cn.heytapimage.com/static/minigame/CN/docs/index.html#/develop/ad/native-template-ad?id=customadshow
    async showNativeAd(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.customAd.show()
            .then(() => {
                resolve(true)
            })
            .catch((err: any) => {
                reject(err)
            })
        })
    }

    // https://ie-activity-cn.heytapimage.com/static/minigame/CN/docs/index.html#/develop/ad/native-template-ad?id=customadhide
    async hideNativeAd(): Promise<boolean> {
        return this.customAd.hide();
    }

    // 不支持
    // async addShortcut(options: AddShortcut): Promise<object> {
    //     return super.addShortcut(options);
    // }

    // 不支持
    // async addCommonUse(): Promise<void> {
    //     super.addCommonUse();
    // }


    async shareAppMessage(param: any): Promise<boolean> {
        console.log("不支持")
        return false
    }
}
