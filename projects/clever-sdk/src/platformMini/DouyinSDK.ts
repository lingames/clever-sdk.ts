import {CleverSdk} from "../CleverSdk.js";
import {ttCreateRewardedVideoAd} from "../models/CreateRewardedVideoAd.js";
import {qgCreateBannerAd} from "../models/CreateBannerAd.js";
import {ttInitialize} from "../models/SdkInitialize.js";
import {ttAddShortcut} from "../models/AddShortcut.js";

/// 抖音全局对象
export declare const tt: any;


interface CheckSceneResult {
    isExist: boolean
}



export class DouyinSDK extends CleverSdk {
    async initialize(config: ttInitialize): Promise<boolean> {
        console.info("抖音全局对象:", tt)
        return true
    }

    // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/tt-create-rewarded-video-ad
    // 全局只能有一个视频广告实例，重复创建没有用
    createRewardedVideoAd(config: ttCreateRewardedVideoAd): Promise<object> {
        this.videoAd = tt.createRewardedVideoAd({
            adUnitId: config.adUnitId,
            progressTip: config.progressTip || false
        })
        // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/rewarded-video-ad/rewarded-video-ad-load
        // this.videoAd.load()
        // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/rewarded-video-ad/rewarded-video-ad-show
        // this.videoAd.show()
        return Promise.resolve(this.videoAd)
    }


    public override async checkScene(): Promise<CheckSceneResult> {
        // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/sidebar-capacity/tt-check-scene
        return tt.checkScene({scene: "sidebar"})
    }

    async createBannerAd(adInfo: qgCreateBannerAd): Promise<object> {
        return super.createBannerAd(adInfo);
    }

    /// https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/shortcut/add-shortcut
    async addShortcut(options: ttAddShortcut): Promise<object> {
        return new Promise(
            (resolve, reject) => {
                tt.addShortcut({
                    success() {
                        resolve({})
                    },
                    fail(err: any) {
                        reject(err.errMsg)
                    },
                    complete() {
                        options?.complete?.()
                    }
                })
            }
        )
    }
}

