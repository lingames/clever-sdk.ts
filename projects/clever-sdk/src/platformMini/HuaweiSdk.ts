import {CleverSdk} from '../CleverSdk.js';
import {hwCreateRewardedVideoAd, RewardedVideo} from '../models/CreateRewardedVideoAd.js';
import {HuaweiLoginData} from '../models/LoginData.js';

declare const qg: any;

export class HuaweiSdk extends CleverSdk {
    private videoAd: any = null;

    // https://developer.huawei.com/consumer/cn/doc/quickApp-Guides/quickgame-runtime-account-kit-0000001113458340
    async login(): Promise<HuaweiLoginData> {
        return new Promise((resolve, reject) => {
            qg.gameLoginWithReal({
                forceLogin: 1,
                appid: this.game_id,
                success: function (data: any) {
                    // 登录成功后，可以存储账号信息。
                    console.log(' game login with real success:' + JSON.stringify(data));
                    resolve(data);
                },
                fail: function (data: any, code: number) {
                    console.log('game login with real fail:' + data + ', code:' + code);
                    //根据状态码处理游戏的逻辑。
                    //状态码为7004或者2012，表示玩家取消登录。
                    //此时，建议返回游戏界面，可以让玩家重新进行登录操作。
                    if (code == 7004 || code == 2012) {
                        console.log('玩家取消登录，返回游戏界面让玩家重新登录。');
                    }
                    //状态码为7021表示玩家取消实名认证。
                    //在中国大陆的情况下，此时需要禁止玩家进入游戏。
                    if (code == 7021) {
                        console.log('The player has canceled identity verification. Forbid the player from entering the game.');
                    }
                    reject(data);
                }
            });
        });
    }

    // https://developer.huawei.com/consumer/cn/doc/quickApp-References/quickgame-api-ad-0000001130711971#section9772146486
    async createRewardedVideoAd(adInfo: hwCreateRewardedVideoAd): Promise<RewardedVideo> {
        return new Promise((resolve, reject) => {
            this.videoAd = qg.createRewardedVideoAd({
                adUnitId: adInfo.adUnitId,
                multiton: adInfo.multiton || false,
                success: (_: any) => {
                    resolve({
                        isEnded: true,
                        count: 1
                    });
                },
                fail: (data: any, code: any) => {
                    console.error(`错误代码: ${code}`);
                    reject(data);
                },
                complete: () => {
                    adInfo.onComplete?.();
                }
            });
            try {
                this.videoAd.show(adInfo);
            } catch (e: any) {
                console.error('show videoAd err:', e);
            }
        });
    }
}
