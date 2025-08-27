import {CleverSdk} from '../CleverSdk.js';
import {ksCreateRewardedVideoAd, VideoReward} from '../models/PlayRewardedVideo';
import {ksCreateBannerAd} from '../models/CreateBannerAd.js';
import {ksInitialize} from '../models/SdkInitialize.js';
import {LoginData} from '../models/LoginData.js';
import {ksShareAppMessage} from '../models/ShareAppMessage';
import {AddShortcut} from '../models/AddShortcut';
import {ksNavigateToScene} from '../models/NavigateToScene';

export declare const ks: any;

export var bannerAd: any = null;


export class KuaiShouSdk extends CleverSdk {
    videoAd: any = null;

    async initialize(config: ksInitialize): Promise<boolean> {
        this.sdk_login_url = config.sdk_login_url ?? 'https://api.salesagent.cc/game-analyzer/player/login';
        console.info('快手全局对象:', ks);
        return true;
    }

    async login(): Promise<LoginData> {
        return new Promise((resolve, reject) => {
            ks.login({
                success: (res: any) => {
                    if (res.code) {
                        const body = {
                            project_id: this.project_id,
                            platform: 'kuai-shou',
                            login_code: res.code,
                            Fields: {
                                grant_type: 'authorization_code'
                            }
                        };
                        // https://open.kuaishou.com/docs/develop/api/network/request/request.html#ks-request
                        ks.request({
                            url: this.sdk_login_url,
                            method: 'POST',
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
                    console.warn('快手登录凭证失败: ', err);
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
            this.videoAd.onClose((res: any) => {
                if (res && res.isEnded) {
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
            });
            this.videoAd.show().catch((error: any) => {
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

    // https://ks-game-docs.kuaishou.com/minigame/api/open/repost/ks.shareAppMessage.html
    async shareAppMessage(share: ksShareAppMessage): Promise<boolean> {
        return new Promise((resolve, reject) => {
            ks.shareAppMessage({
                ...share,
                success: (res: any) => {
                    console.log('快手分享成功', res);
                    resolve(true);
                },
                fail: (res: any) => {
                    console.log('快手分享失败', res);
                    resolve(false);
                }
            });
        });
    }

    // https://ks-game-docs.kuaishou.com/minigame/api/open/shortcut/ks.addShortcut.html
    async addShortcut(options: AddShortcut): Promise<boolean> {
        return new Promise((resolve, reject) => {
            ks.addShortcut({
                success: (res: any) => {
                    console.log('快手加桌成功', res);
                    resolve(true);
                },
                fail: (res: any) => {
                    console.log('快手加桌失败', res);
                    resolve(false);
                }
            });
        });
    }

    // https://open.kuaishou.com/miniGameDocs/gameDev/open-function/siderBarRevisit.html
    // 不支持
    async addCommonUse(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            ks.addCommonUse({
                success: (res: any) => {
                    console.log('快手设为常用成功', res);
                    resolve(true);
                },
                fail: (res: any) => {
                    console.log('快手设为常用失败', res);
                    resolve(false);
                }
            });
        });
    }

    async navigateToScene(scene: ksNavigateToScene): Promise<boolean> {
        return new Promise((resolve, reject) => {
            ks.navigateToScene({
                ...scene,
                success: (res: any) => {
                    console.log('快手跳转成功', res);
                    resolve(true);
                },
                fail: (res: any) => {
                    console.log('快手跳转失败', res);
                    resolve(false);
                },
            });
        });
    }

    async checkSliderBarIsAvailable(): Promise<boolean> {
        return super.checkSliderBarIsAvailable();
    }

    async reportEvent(id: string, custom: Record<string, any>): Promise<boolean> {
        return ks.request({
            url: 'https://api.salesagent.cc/game-logger/event',
            method: 'POST',
            data: {
                player_anonymous: this.player_anonymous,
                player_id: this.player_id,
                channel_id: this.channel_id,
                version_id: this.version_id,
                event_id: id,
                custom: custom
            },
        });
    }
}