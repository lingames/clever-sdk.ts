import { CleverSdk } from "../CleverSdk.js";
import { ttCreateRewardedVideoAd, VideoReward } from "../models/PlayRewardedVideo";
import { ttCreateBannerAd } from "../models/CreateBannerAd";
import { ttCreateInterstitialAd } from "../models/CreateInterstitialAd";
import { ttInitialize } from "../models/SdkInitialize";
import { ttAddShortcut } from "../models/AddShortcut";
import { LoginData } from "../models/LoginData";
import { ttShareAppMessage } from "../models/ShareAppMessage";
import { EventEndPoint, LoginEndPoint } from "../models";
import { CreateNativeAd } from "../models/CreateNativeAd";

// @ts-ignore
const TTMinis = (globalThis as any).TTMinis;

interface CheckSceneResult {
    isSupport: boolean;
    isScene: boolean;
}

export class TiktokSdk extends CleverSdk {
    protected videoAd: any = null;
    protected bannerAd: any = null;
    protected interstitialAd: any = null;

    async initialize(config: ttInitialize): Promise<boolean> {
        this.sdk_login_url = config.sdk_login_url ?? LoginEndPoint;
        console.info("TikTok 全局对象:", TTMinis);
        return true;
    }

    // https://developers.tiktok.com/doc/mini-games-sdk-login?enter_method=left_navigation
    async login(): Promise<LoginData> {
        return new Promise((resolve, reject) => {
            TTMinis.login({
                force: false,
                success: (res: any) => {
                    if (res.code) {
                        const body = {
                            project_id: this.project_id,
                            platform: "tik-tok",
                            login_code: res.code,
                        };
                        // https://developers.tiktok.com/doc/mini-games-sdk-login?enter_method=left_navigation
                        TTMinis.request({
                            url: this.sdk_login_url,
                            method: "POST",
                            data: body,
                            dataType: "json",
                            success: (fine: any) => {
                                this.session_key = fine.data.session_key;
                                resolve(fine.data);
                            },
                            fail: (fail: any) => {
                                console.warn("TikTok 登录失败: ", fail);
                                reject(fail);
                            },
                        });
                    } else {
                        console.warn("TikTok 获取登录凭证失败:", res.errMsg);
                        reject(res.errMsg);
                    }
                },
                fail(err: any) {
                    console.warn("TikTok 登录凭证失败: ", err);
                    reject(err);
                },
            });
        });
    }

    // https://developers.tiktok.com/doc/mini-games-sdk-iaa?enter_method=left_navigation
    playRewardedVideo(config: ttCreateRewardedVideoAd): Promise<VideoReward> {
        if (this.videoAd == null) {
            console.log("创建 TikTok 激励视频广告");
            this.videoAd = TTMinis.game.createRewardedVideoAd({
                adUnitId: config.ttUnitId || config.adUnitId,
                multiton: config.multiton,
                multitonRewardMsg: config.multitonMessage,
                multitonRewardTimes: config.multitonTimes,
            });
        }
        return new Promise((resolve, reject) => {
            this.videoAd.onClose((res: any) => {
                if (res && res.isEnded) {
                    resolve({
                        isEnded: true,
                        count: 1,
                    });
                } else {
                    resolve({
                        isEnded: false,
                        count: 0,
                    });
                }
            });
            this.videoAd.show().catch((error: any) => {
                console.log(`TikTok 播放异常 ${JSON.stringify(error)}`);
                reject(error);
            });
        });
    }

    public override async checkScene(): Promise<CheckSceneResult> {
        return new Promise((resolve, reject) => {
            TTMinis.checkScene({
                scene: "sidebar",
                success: (res: any) => {
                    resolve({
                        isSupport: true,
                        isScene: res.isExist,
                    });
                },
                fail: (err: any) => {
                    console.warn("侧边栏检测失败: ", err);
                    resolve({
                        isSupport: true,
                        isScene: false,
                    });
                },
            });
        });
    }

    // https://developers.tiktok.com/doc/mini-games-sdk-iaa?enter_method=left_navigation
    async createBannerAd(adInfo: ttCreateBannerAd): Promise<VideoReward> {
        this.bannerAd = TTMinis.game.createBannerAd({
            adUnitId: adInfo.adUnitId,
            adIntervals: adInfo.adIntervals,
            style: adInfo.style,
        });
        return super.createBannerAd(this.bannerAd);
    }

    async showBannerAd(): Promise<VideoReward> {
        return super.showBannerAd();
    }

    async hideBannerAd(): Promise<boolean> {
        if (this.bannerAd != null) {
            this.bannerAd.hide();
        }
        return true;
    }

    async destroyBannerAd(): Promise<boolean> {
        if (this.bannerAd != null) {
            this.bannerAd.destroy();
        }
        return true;
    }

    // https://developers.tiktok.com/doc/mini-games-sdk-iaa?enter_method=left_navigation
    async showInterstitialAd(adInfo: ttCreateInterstitialAd): Promise<VideoReward> {
        if (this.interstitialAd == null) {
            this.interstitialAd = TTMinis.game.createInterstitialAd({
                adUnitId: adInfo.ttUnitId || adInfo.adUnitId,
            });
        }

        return new Promise((resolve) => {
            this.interstitialAd
                .show()
                .then(() => {
                    resolve({
                        isEnded: true,
                        count: 1,
                    });
                })
                .catch((error: any) => {
                    console.log(`Tiktok插屏播放异常 ${JSON.stringify(error)}`);
                    resolve({
                        isEnded: false,
                        count: 0,
                    });
                });
        });
    }

    async shareAppMessage(share: ttShareAppMessage): Promise<boolean> {
        return new Promise((resolve, reject) => {
            TTMinis.shareAppMessage({
                desc: share.description,
                ...share,
                success: (res: any) => {
                    console.log("TikTok 分享成功", res);
                    resolve(true);
                },
                fail: (res: any) => {
                    console.log("TikTok 分享失败", res);
                    resolve(false);
                },
            });
        });
    }

    async addCommonUse(): Promise<boolean> {
        return super.addCommonUse();
    }

    async addShortcut(options: ttAddShortcut): Promise<boolean> {
        return new Promise((resolve, reject) => {
            TTMinis.addShortcut({
                ...options,
                success() {
                    resolve(true);
                },
                fail(err: any) {
                    reject(err.errMsg);
                },
            });
        });
    }

    async checkShortcut(): Promise<any> {
        return new Promise((resolve, reject) => {
            TTMinis.checkShortcut({
                success(fine: any) {
                    resolve({
                        isSupport: true,
                        exist: fine.status.exist,
                        needUpdate: fine.status.needUpdate,
                    });
                },
                fail(fail: any) {
                    reject(fail.errMsg);
                },
            });
        });
    }

    async reportEvent(id: string, custom: Record<string, any>): Promise<boolean> {
        return TTMinis.request({
            url: EventEndPoint,
            method: "POST",
            data: {
                player_anonymous: this.player_anonymous,
                player_id: this.player_id,
                channel_id: this.channel_id,
                version_id: this.version_id,
                event_id: id,
                custom: custom,
            },
        });
    }
}
