import {CleverSdk} from '../CleverSdk.js';
import {ttCreateRewardedVideoAd, VideoReward} from '../models/PlayRewardedVideo';
import {ttCreateBannerAd} from '../models/CreateBannerAd';
import {ttInitialize} from '../models/SdkInitialize';
import {ttAddShortcut} from '../models/AddShortcut';
import {LoginData} from "../models/LoginData";

/// 抖音全局对象
export declare const tt: any;


interface CheckSceneResult {
    isSupport: boolean,
    isScene: boolean
}


export class DouyinSDK extends CleverSdk {

    private bannerAd: any = null;

    async initialize(config: ttInitialize): Promise<boolean> {
        this.sdk_login_url = config.sdk_login_url ?? 'https://api.salesagent.cc/game-analyzer/player/login';
        console.info('抖音全局对象:', tt);
        return true;
    }


    async login(): Promise<LoginData> {
        return new Promise((resolve, reject) => {
            tt.login({
                force: false,
                success: (res: any) => {
                    if (res.code) {
                        const body = {
                            project_id: this.project_id,
                            platform: 'dou-yin',
                            login_code: res.code,
                        };
                        console.trace('抖音登录请求鉴权', this.sdk_login_url);
                        // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/network/initiate-a-request/tt-request
                        tt.request({
                            url: this.sdk_login_url,
                            method: 'POST',
                            data: body,
                            dataType: 'json',
                            success: (fine: any) => {
                                console.warn('抖音登录成功: ', fine);
                                this.session_key = fine.data.session_key;
                                resolve(fine.data);
                            },
                            fail: (fail: any) => {
                                console.warn('抖音登录失败: ', fail);
                                reject(fail);
                            }
                        });
                    } else {
                        console.warn('抖音获取登录凭证失败:', res.errMsg);
                        reject(res.errMsg);
                    }
                },
                fail(err: any) {
                    console.warn('抖音登录凭证失败: ', err);
                    reject(err);
                }
            });
        });
    }

    // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/tt-create-rewarded-video-ad
    // 全局只能有一个视频广告实例，重复创建没有用
    playRewardedVideo(config: ttCreateRewardedVideoAd): Promise<VideoReward> {
        const videoAd = tt.createRewardedVideoAd({
            adUnitId: config.adUnitId,
            progressTip: config.progressTip || false
        });
        // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/rewarded-video-ad/rewarded-video-ad-load
        // this.videoAd.load()
        // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/rewarded-video-ad/rewarded-video-ad-show
        // this.videoAd.show()
        return Promise.resolve(videoAd);
    }

    public override async checkScene(): Promise<CheckSceneResult> {
        // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/sidebar-capacity/tt-check-scene
        return new Promise((resolve, reject) => {
            tt.checkScene({
                scene: 'sidebar',
                success: (res: any) => {
                    resolve({
                        isSupport: true,
                        isScene: res.isExist
                    });
                },
                fail: (err: any) => {
                    console.warn('侧边栏检测失败: ', err);
                    resolve({
                        isSupport: true,
                        isScene: false
                    });
                }
            });
        });
    }

    // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/tt-create-banner-ad
    async createBannerAd(adInfo: ttCreateBannerAd): Promise<VideoReward> {
        this.bannerAd = tt.createBannerAd({
            adUnitId: adInfo.adUnitId,
            adIntervals: adInfo.adIntervals,
            style: adInfo.style
        });
        return super.createBannerAd(this.bannerAd);
    }

    // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/banner-ad/banner-ad-show
    async showBannerAd(): Promise<VideoReward> {
        return super.showBannerAd();
    }

    // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/banner-ad/banner-ad-hide
    async hideBannerAd(): Promise<boolean> {
        if (this.bannerAd != null) {
            this.bannerAd.hide();

        }
        return true;
    }

    // https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/ads/banner-ad/banner-ad-destroy
    async destroyBannerAd(): Promise<boolean> {
        if (this.bannerAd != null) {
            this.bannerAd.destroy();
        }
        return true;
    }

    /// https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/open-capacity/shortcut/add-shortcut
    async addShortcut(options: ttAddShortcut): Promise<boolean> {
        return new Promise(
            (resolve, reject) => {
                tt.addShortcut({
                    ...options,
                    success() {
                        resolve(true);
                    },
                    fail(err: any) {
                        reject(err.errMsg);
                    },
                });
            }
        );
    }

    async reportEvent(id: string, custom: Record<string, any>): Promise<boolean> {
        return tt.request({
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

