import {CleverSdk} from '../CleverSdk.js';
import {ksCreateRewardedVideoAd, VideoReward} from '../models/CreateRewardedVideoAd.js';
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

    // https://open.kuaishou.com/docs/develop/api-next/ad/ks.createRewardedVideoAd.html
    // 全局只能有一个视频广告实例，重复创建没有用
    createRewardedVideoAd(adInfo: ksCreateRewardedVideoAd): Promise<VideoReward> {
        if (this.videoAd == null) {
            console.log('创建快手激励视频广告');
            this.videoAd = ks.createRewardedVideoAd({
                type: adInfo.type,
                unitId: adInfo.adUnitId
            });
        }
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
                // adInfo.onError?.(err)
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
        });
    }

    async loadRewardedVideoAd(): Promise<boolean> {
        this.videoAd?.load();
        return true;
    }

    async showRewardedVideoAd(): Promise<VideoReward> {
        return super.showRewardedVideoAd();
    }

    async destroyRewardedVideoAd(): Promise<boolean> {
        this.videoAd?.destroy();
        return true;
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