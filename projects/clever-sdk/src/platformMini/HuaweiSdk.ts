import {CleverSdk} from "../CleverSdk.js";
import {hwCreateRewardedVideoAd, RewardedVideo} from "../models/CreateRewardedVideoAd.js";
import {HuaweiLoginData} from "../models/LoginData.js";

declare const qg: any;
declare const account: any;

export class HuaweiSdk extends CleverSdk {
    private videoAd: any = null

    async login(): Promise<HuaweiLoginData> {
        // https://developer.huawei.com/consumer/cn/doc/quickApp-Guides/quickapp-access-account-kit-0000001079648144
        return new Promise((resolve, reject) => {
            account.authorize({
                appid: this.game_id,
                type: "token",
                state: "feedbeef",
                scope: "scope.baseProfile",
                success(fine: HuaweiLoginData) {
                    resolve(fine)
                },
                fail(data: any, code: any) {
                    reject(data)
                }
            });
        })
    }

    // https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-ad-0000001130711971#section9772146486
    async createRewardedVideoAd(adInfo: hwCreateRewardedVideoAd): Promise<RewardedVideo> {
        await new Promise((resolve, reject) => {
            this.videoAd = qg.createRewardedVideoAd({
                adUnitId: adInfo.adUnitId,
                multiton: adInfo.multiton || false,
                success: (_: any) => {
                    resolve(null)
                },
                fail: (data: any, code: any) => {
                    console.error(`错误代码: ${code}`)
                    reject(data)
                },
                complete: () => {
                    adInfo.onComplete?.()
                }
            })
        })
        return this.videoAd
    }
}
