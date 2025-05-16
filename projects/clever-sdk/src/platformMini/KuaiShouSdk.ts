import {CleverSdk} from '../CleverSdk.js';
import {ksCreateRewardedVideoAd, VideoReward} from '../models/PlayRewardedVideo';
import {ksCreateBannerAd} from '../models/CreateBannerAd.js';
import {ksInitialize} from '../models/SdkInitialize.js';
import {LoginData} from '../models/LoginData.js';
import {build_sdk_head} from '../helper.js';

export declare const ks: any;

export var bannerAd: any = null;


export class KuaiShouSdk extends CleverSdk {
    videoAd: any = null;

    async initialize(config: ksInitialize): Promise<boolean> {
        console.info('快手全局对象:', ks);
        return true;
    }

    async login(): Promise<LoginData> {
        return new Promise((resolve, reject) => {
            ks.login({
                success: (res: any) => {
                    if (res.code) {
                        const body = {
                            game_id: this.game_id,
                            session_id: res.code,
                            Fields: {
                                grant_type: 'authorization_code'
                            }
                        };
                        const head = build_sdk_head(this.sdk_key, JSON.stringify(body));
                        // https://open.kuaishou.com/docs/develop/api/network/request/request.html#ks-request
                        ks.request({
                            url: this.sdk_login_url,
                            method: 'POST',
                            header: head,
                            data: body,
                            dataType: 'json',
                            success: (fine: any) => {
                                console.warn('快手登录成功: ', fine);
                                this.session_key = fine.data.session_key;
                                resolve(fine.data);
                            },
                            fail: (fail: any) => {
                                console.warn('快手登录失败: ', fail);
                                reject(fail);
                            }
                        });
                    } else {
                        console.warn('快手获取登录凭证失败:', res.errMsg);
                        reject(res.errMsg);
                    }
                },
                fail(err: any) {
                    console.warn('微信登录凭证失败: ', err);
                    reject(err);
                }
            });
        });
    }

    /**
     * 创建激励广告对象并播放
     * 全局只能有一个视频广告实例，重复创建没有用
     * https://open.kuaishou.com/miniGameDocs/gameDev/api/ad/rewardAd/ks.createRewardedVideoAd.html
     */
    playRewardedVideo(adInfo: ksCreateRewardedVideoAd): Promise<VideoReward> {
        if (this.videoAd == null) {
            // console.log('创建快手激励视频广告');
            this.videoAd = ks.createRewardedVideoAd({
                adUnitId: adInfo.ksUnitId || adInfo.adUnitId,
                multiton: adInfo.multiton,
                multitonRewardMsg: adInfo.multitonMessage,
                multitonRewardTimes: adInfo.multitonTimes,
            });
        }
        return new Promise((resolve, reject) => {
            this.videoAd.show().then(function (result: any) {
                console.log(`快手播放成功 ${JSON.stringify(result)}`);
                if (result && result.isEnded) {
                    // 正常播放结束，可以下发游戏奖励
                    resolve({
                        isEnded: true,
                        count: 1
                    });
                } else {
                    // 播放中途退出，不下发游戏奖励
                    resolve({
                        isEnded: false,
                        count: 0
                    });
                }
            }).catch(function (error: any) {
                console.log(`快手播放异常 ${JSON.stringify(error)}`);
                reject(error);
            });
        });
    }

    createBannerAd(adInfo: ksCreateBannerAd): Promise<VideoReward> {
        return super.createBannerAd(adInfo);
    }

    async showBannerAd(): Promise<VideoReward> {
        return super.showBannerAd();
    }

    async hideBannerAd(): Promise<boolean> {
        bannerAd?.hide();
        return true;
    }

    async destroyBannerAd(): Promise<boolean> {
        bannerAd?.destroy();
        return true;
    }

    public async checkScene(): Promise<any> {
        console.error('快手不支持该能力');
    }
}