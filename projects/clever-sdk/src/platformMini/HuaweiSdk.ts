import {CleverSdk} from "../CleverSdk.js";
import {hwCreateRewardedVideoAd} from "../models/CreateRewardedVideoAd.js";

declare const qg: any;

export class HuaweiSdk extends CleverSdk {
    private videoAd: any = null

    // async login(): Promise<any> {
    //     qg.login({
    //         success: function (res: any) {
    //             console.log("Oppo 登录")
    //             const data = JSON.stringify(res.data);
    //             console.log(data);
    //         },
    //         fail: function (res: any) {
    //             console.log("Oppo 登录失败")
    //             console.log(JSON.stringify(res));
    //         },
    //     });
    //     return Promise.resolve(true)
    // }

    // https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-ad-0000001130711971#section9772146486
    async createRewardedVideoAd(adInfo: hwCreateRewardedVideoAd): Promise<object> {
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
