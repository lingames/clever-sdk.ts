import {CleverSdk} from "../CleverSdk.js";
import {ttCreateRewardedVideoAd} from "../models/CreateRewardedVideoAd.js";
import {ttCreateBannerAd} from "../models/CreateBannerAd.js";
import {ttInitialize} from "../models/SdkInitialize.js";
import {ttAddShortcut} from "../models/AddShortcut.js";

/// 抖音全局对象
export declare const tt: any;


interface CheckSceneResult {
    isSupport: boolean,
    isScene: boolean
}


export class DouyinSDK extends CleverSdk {

    private bannerAd: any = null

    async initialize(config: ttInitialize): Promise<boolean> {
        console.info("抖音全局对象:", tt)
        return true
    }

    // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/tt-create-rewarded-video-ad
    // 全局只能有一个视频广告实例，重复创建没有用
    createRewardedVideoAd(config: ttCreateRewardedVideoAd): Promise<object> {
        const videoAd = tt.createRewardedVideoAd({
            adUnitId: config.adUnitId,
            progressTip: config.progressTip || false
        })
        // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/rewarded-video-ad/rewarded-video-ad-load
        // this.videoAd.load()
        // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/rewarded-video-ad/rewarded-video-ad-show
        // this.videoAd.show()
        return Promise.resolve(videoAd)
    }


    public override async checkScene(): Promise<CheckSceneResult> {
        // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/sidebar-capacity/tt-check-scene
        return new Promise((resolve, reject) => {
            tt.checkScene({
                scene: "sidebar",
                success: (res: any) => {
                    resolve({
                        isSupport: true,
                        isScene: res.isExist
                    })
                },
                fail: (err: any) => {
                    resolve({
                        isSupport: true,
                        isScene: false
                    })
                }
            })
        })
    }

    // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/tt-create-banner-ad
    async createBannerAd(adInfo: ttCreateBannerAd): Promise<object> {
        this.bannerAd = tt.createBannerAd({
            adUnitId: adInfo.adUnitId,
            adIntervals: adInfo.adIntervals,
            style: adInfo.style
        })
        return super.createBannerAd(this.bannerAd);
    }

    // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/banner-ad/banner-ad-show
    async showBannerAd(): Promise<boolean> {
        if (this.bannerAd != null) {
            this.bannerAd.show()
            return true
        } else {
            console.warn("未调用 createBannerAd")
            return false
        }
    }

    // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/banner-ad/banner-ad-hide
    async hideBannerAd(): Promise<boolean> {
        if (this.bannerAd != null) {
            this.bannerAd.hide()

        }
        return true
    }

    // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/banner-ad/banner-ad-destroy
    async destroyBannerAd(): Promise<boolean> {
        if (this.bannerAd != null) {
            this.bannerAd.destroy()
        }
        return true
    }

    /// https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/shortcut/add-shortcut
    async addShortcut(options: ttAddShortcut): Promise<object> {
        return new Promise(
            (resolve, reject) => {
                tt.addShortcut({
                    ...options,
                    success() {
                        resolve({})
                    },
                    fail(err: any) {
                        reject(err.errMsg)
                    },
                })
            }
        )
    }
}

