import {build_sdk_head} from '../helper.js';
import {CleverSdk} from '../CleverSdk.js';
import {VideoReward, wxCreateRewardedVideoAd} from '../models/CreateRewardedVideoAd.js';
import {wxCreateBannerAd} from '../models/CreateBannerAd.js';
import {wxInitialize} from '../models/SdkInitialize.js';
import {wxGetUserInfo, wxUserInfoCallback} from '../models/LoginData.js';
import {wxShareAppMessage} from '../models/ShareAppMessage.js';

/// 微信全局对象
export declare const wx: any;

export interface wxLoginData {

}

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
                            game_id: this.game_id,
                            session_id: res.code,
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

    async initialize(info: wxInitialize): Promise<boolean> {
        this.inner = wx;
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

    // adInfo{adUnitId:广告单元id} 广告单元id需要在小程序后台 流量主界面创建
    // cb 玩家看广告结束的回调， isEnd: 广告是否看完, true:看完，false:中途退出
    public override createRewardedVideoAd(adInfo: wxCreateRewardedVideoAd): Promise<VideoReward> {
        let videoAd = this.videoAd['adUnitId'];
        console.log('createRewardedVideoAd', adInfo, videoAd);
        if (!videoAd) {
            videoAd = this.inner.createRewardedVideoAd(adInfo);
            this.videoAd['adUnitId'] = videoAd;
        }

        return new Promise((resolve, reject) => {
            let fn = '';
            if (typeof (videoAd.show) !== 'undefined') {
                fn = 'show';
            } else if (typeof (videoAd.load) !== 'undefined') {
                fn = 'load';
            } else {
                console.error('unsupported createRewardedVideoAd');
                return;
            }

            videoAd.onError((err: any) => {
                console.error(err);
                adInfo.onError?.(err);
            });

            // 视频关闭
            videoAd.onClose((res: any) => {
                console.log(res);
                if ((res && res.isEnded) || res === undefined) {
                    res = res || {
                        isEnded: true,
                        count: 1
                    };
                    res.count = res.count || 1;
                    console.info('广告观看结束，此处添加奖励代码', res);
                    resolve(res);
                } else {
                    resolve(res);
                    console.error('广告没看完，不能获奖');
                }
            });

            try {
                videoAd[fn](adInfo);
            } catch (e: any) {
                console.error('show videoAd err:', e);
            }
        });
    }

    /// https://developers.weixin.qq.com/minigame/dev/api/ad/wx.createBannerAd.html
    async createBannerAd(adInfo: wxCreateBannerAd): Promise<object> {
        this.bannerAd = wx.createBannerAd({adUnitId: adInfo.adUnitId});
        return this.bannerAd;
    }

    /// https://developers.weixin.qq.com/minigame/dev/api/ad/BannerAd.show.html
    async showBannerAd(): Promise<boolean> {
        if (this.bannerAd != null) {
            this.bannerAd.show();
            return true;
        } else {
            console.warn('未调用 createBannerAd');
            return false;
        }
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

    public async navigateToScene() {
        console.error('不支持navigateToScene');
        return;
    }


    public async shareAppMessage(param: wxShareAppMessage): Promise<boolean> {
        // https://developers.weixin.qq.com/minigame/dev/api/share/wx.shareAppMessage.html
        wx.shareAppMessage(param);
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