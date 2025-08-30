import {build_sdk_head} from '../helper';
import {CleverSdk} from '../CleverSdk';
import {VideoReward, wxCreateRewardedVideoAd} from '../models/PlayRewardedVideo';
import {CreateBannerAd} from '../models/CreateBannerAd';
import {wxInitialize} from '../models/SdkInitialize';
import {wxGetUserInfo, wxLoginData, wxUserInfoCallback} from '../models/LoginData';
import {wxShareAppMessage} from '../models/ShareAppMessage';
import {wxNavigateToScene} from '../models/NavigateToScene';

/// 微信全局对象
export declare const wx: any;

export class WeChatSdk extends CleverSdk {
    protected inner: any;
    private videoAd: any = null;
    private bannerAd: any = null;

    override async login(): Promise<wxLoginData> {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res: any) => {
                    if (res.code) {
                        const body = {
                            platform: this.platform,
                            project_id: this.project_id,
                            login_code: res.code,
                            Fields: {
                                grant_type: 'authorization_code'
                            }
                        };
                        const head = build_sdk_head(this.sdk_key, JSON.stringify(body));
                        // https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
                        wx.request({
                            url: this.sdk_login_url,
                            method: 'POST',
                            header: head,
                            data: body,
                            dataType: 'json',
                            success: (fine: any) => {
                                console.warn('微信登成功: ', fine);
                                this.session_key = fine.data.session_key;
                                resolve(fine.data);
                            },
                            fail: (fail: any) => {
                                console.warn('微信登录失败: ', fail);
                                reject(fail);
                            }
                        });
                    } else {
                        console.warn('微信登录失败！', res.errMsg);
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

    async initialize(config: wxInitialize): Promise<boolean> {
        this.sdk_login_url = config.sdk_login_url ?? 'https://api.salesagent.cc/game-analyzer/player/login';
        if (config.enableShare !== false) {
            wx.showShareMenu({
                menus: ['shareAppMessage', 'shareTimeline']
            });
        }
        console.info('微信全局对象:', wx);
        return true;
    }

    // 建议每秒调用一次，不需要太频繁
    // async update(){
    //     if (this.sdk_login_url){
    //         try {
    //             await promisify_wx(this.inner.checkSession)();
    //         }catch (e){
    //             await this.login()
    //             console.warn("the secret key expired")
    //         }
    //     }
    // }
    // true表示session_key已经过期
    override async checkSession(): Promise<boolean> {
        try {
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * https://developers.weixin.qq.com/minigame/dev/api/ad/wx.createRewardedVideoAd.html
     */
    public override playRewardedVideo(adInfo: wxCreateRewardedVideoAd): Promise<VideoReward> {
        if (this.videoAd == null) {
            // console.log('微信快手激励视频广告');
            this.videoAd = wx.createRewardedVideoAd({
                adUnitId: adInfo.wxUnitId || adInfo.adUnitId,
                multiton: adInfo.multiton,
                disableFallbackSharePage: adInfo.disableFallbackSharePage,
                // multitonRewardTimes: adInfo.multitonTimes,
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
                console.log(`微信播放异常 ${JSON.stringify(error)}`);
                reject(error);
            });
        });
    }

    /// https://developers.weixin.qq.com/minigame/dev/api/ad/wx.createBannerAd.html
    async createBannerAd(adInfo: CreateBannerAd): Promise<VideoReward> {
        if (this.bannerAd == null) {
            this.bannerAd = wx.createBannerAd({adUnitId: adInfo.adUnitId});
        }
        return this.showBannerAd();
    }

    /// https://developers.weixin.qq.com/minigame/dev/api/ad/BannerAd.show.html
    async showBannerAd(): Promise<VideoReward> {
        return super.showBannerAd();
    }


    /// https://developers.weixin.qq.com/minigame/dev/api/ad/BannerAd.hide.html
    async hideBannerAd(): Promise<boolean> {
        if (this.bannerAd != null) {
            this.bannerAd.hide();
        }
        return true;
    }

    /// https://developers.weixin.qq.com/minigame/dev/api/ad/BannerAd.destroy.html
    async destroyBannerAd(): Promise<boolean> {
        if (this.bannerAd != null) {
            this.bannerAd.destroy();
            this.bannerAd = null;
        }
        return true;
    }

    // 微信不支持
    // async checkCommonUse(): Promise<any> {
    //     return super.checkCommonUse();
    // }

    // 微信不支持
    // async addCommonUse(): Promise<void> {
    //     super.addCommonUse();
    // }

    public async checkShortcut(): Promise<any> {
        console.error('不支持checkShortcut');
        return {
            isSupport: false,
            exist: true,
            needUpdate: false
        };
    }


    // 抖音侧边栏访问功能
    public async checkScene(): Promise<any> {
        console.error('不支持checkScene');
        return {
            isSupport: false,
            isScene: false
        };
    }

    public async navigateToScene(scene: wxNavigateToScene) {
        console.error('微信不支持 navigateToScene');
        return false;
    }

    // https://developers.weixin.qq.com/minigame/dev/api/share/wx.shareAppMessage.html
    public async shareAppMessage(share: wxShareAppMessage): Promise<boolean> {
        wx.shareAppMessage(share);
        return true;
    }

    public async getUserInfo(param: wxGetUserInfo): Promise<wxUserInfoCallback> {
        // https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserInfo.html
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                ...param,
                success: (fine: wxUserInfoCallback) => {
                    resolve(fine);
                },
                fail: (err: any) => {
                    reject(err);
                }
            });
        });
    }
}