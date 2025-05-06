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
                    console.log('华为登录成功' + JSON.stringify(data));
                    data.openid = data.playerId;
                    data.code = 0;
                    resolve(data);
                },
                fail: function (data: any, code: number) {
                    console.log('华为登录失败:' + data + ', code:' + code);
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
        if (this.videoAd == null) {
            this.videoAd = qg.createRewardedVideoAd({
                adUnitId: adInfo.adUnitId,
                multiton: adInfo.multiton || false,
                success: (data: any) => {
                    console.log(`广告创建成功: ${JSON.stringify(data)}`);
                },
                fail: (data: any, code: any) => {
                    console.error(`广告创建失败 ${code}: ${JSON.stringify(data)}`);
                },
            });
            this.videoAd.onLoad(() => {
                console.log('广告已加载');
                this.videoAd.show();
            });
        }
        return new Promise((resolve, reject) => {
            this.videoAd.onClose((res: any) => {
                console.log('激励结束: ' + JSON.stringify(res));
                resolve({
                    isEnded: res.isEnded,
                    count: res.isEnded ? 1 : 0
                });
            });
            this.videoAd.onError((e: any) => {
                console.error('激励错误:' + JSON.stringify(e));
                reject(e);
            });
            try {
                this.videoAd.load();
            } catch (e: any) {
                console.error('show videoAd err:', e);
                reject(e);
            }
        });
    }
}
