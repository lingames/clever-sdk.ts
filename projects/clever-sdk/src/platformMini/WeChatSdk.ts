import {build_sdk_req, parse_sdk_resp, promisify_request, promisify_wx} from "../helper.js";
import {CleverSdk} from "../CleverSdk.js";
import {wxCreateRewardedVideoAd} from "../models/CreateRewardedVideoAd.js";
import {wxCreateBannerAd} from "../models/CreateBannerAd.js";
import {wxInitialize} from "../models/SdkInitialize.js";
import {wxGetUserInfo, wxUserInfoCallback} from "../models/UserProfile.js";
import {wxShareAppMessage} from "../models/ShareAppMessage.js";

/// 微信全局对象
export declare const wx: any;

export class WeChatSdk extends CleverSdk {
    protected inner: any;
    private videoAd: any = null;
    private bannerAd: any = null;

    override async login() {
        const login_ret: any = await promisify_wx('login')();
        console.log('third-sdk login ret:', login_ret);
        if (!login_ret.code) {
            console.error('third-sdk login error:', login_ret.errMsg);
            return;
        }
        console.log('third-sdk login ok:', login_ret.code);

        const [req_body, req_header] = build_sdk_req(this.game_id, this.sdk_key, login_ret.code);
        const req = {
            url: this.sdk_login_url,
            data: req_body,
            method: 'POST',
            header: req_header
        };
        console.log('my-sdk ready to code2session:', this.sdk_login_url, JSON.stringify(req));

        // const ret: any = await promisify_wx2(this.inner.request)(req);
        // const sdkResp: any = await http_request("POST", this.sdk_login_url, req_header, req_body)();
        const ret = await promisify_request()(req);
        // if (!ret.data){
        //     throw new Error("fail to login sdk")
        // }
        console.log('my-sdk login resp:', ret);

        const sdkResp = parse_sdk_resp(ret);
        this.session_key = sdkResp.session_key;

        return sdkResp;
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
            await promisify_wx('checkSession')();
            return true;
        } catch (e) {
            return false;
        }
    }

    // adInfo{adUnitId:广告单元id} 广告单元id需要在小程序后台 流量主界面创建
    // cb 玩家看广告结束的回调， isEnd: 广告是否看完, true:看完，false:中途退出
    public override createRewardedVideoAd(adInfo: wxCreateRewardedVideoAd): Promise<any> {
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
                adInfo.onError?.(err)
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
        this.bannerAd = wx.createBannerAd({adUnitId: adInfo.adUnitId})
        return this.bannerAd
    }

    /// https://developers.weixin.qq.com/minigame/dev/api/ad/BannerAd.show.html
    async showBannerAd(): Promise<boolean> {
        if (this.bannerAd != null) {
            this.bannerAd.show();
            return true;
        } else {
            console.warn("未调用 createBannerAd")
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
        return true
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
        wx.shareAppMessage(param)
        return true;
    }

    public async getUserInfo(param: wxGetUserInfo): Promise<wxUserInfoCallback> {
        // https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserInfo.html
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                ...param,
                success: (fine: wxUserInfoCallback) => {
                    resolve(fine)
                },
                fail: (err: any) => {
                    reject(err)
                }
            })
        });
    }
}