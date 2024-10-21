import {CleverSdk} from "../CleverSdk.js";
import {qgCreateRewardedVideoAd} from "../models/CreateRewardedVideoAd.js";

declare const qg: any;

export class HuaweiSdk extends CleverSdk {
    protected videoAd: any = null


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

    createRewardedVideoAd(adInfo: qgCreateRewardedVideoAd): Promise<object> {
        // https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-ad-0000001130711971#section443419211957
        this.videoAd = qg.createRewardedVideoAd({
            adUnitId: adInfo.adUnitId,
            success: (code: any) => {
                console.log("ad demo : loadAndShowVideoAd createRewardedVideoAd: success");
            },
            fail: (data: any, code: any) => {
                console.log("ad demo : loadAndShowVideoAd createRewardedVideoAd fail: " + data + "," + code);
            },
            complete: () => {
                console.log("ad demo : loadAndShowVideoAd createRewardedVideoAd complete");
            }
        });
        return Promise.resolve(this.videoAd)
    }
}