import {CleverSdk} from "../CleverSdk.js";
import {ksCreateRewardedVideoAd} from "../models/CreateRewardedVideoAd.js";
import {ksCreateBannerAd} from "../models/CreateBannerAd.js";
import {ksInitialize} from "../models/SdkInitialize.js";
import {LoginData} from "../models/LoginData.js";
import {build_sdk_head} from "../helper.js";

export declare const ks: any;

export var videoAd: any = null;
export var bannerAd: any = null;


export class KuaiShouSdk extends CleverSdk {

    async initialize(config: ksInitialize): Promise<boolean> {
        console.info("快手全局对象:", ks)
        return true
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
                        const head = build_sdk_head(this.sdk_key, JSON.stringify(body))
                        // https://open.kuaishou.com/docs/develop/api/network/request/request.html#ks-request
                        ks.request({
                            url: this.sdk_login_url,
                            method: 'POST',
                            header: head,
                            data: body,
                            dataType: 'json',
                            success: (fine: any) => {
                                console.warn("快手登录成功: ", fine);
                                this.session_key = fine.data.session_key
                                resolve(fine.data)
                            },
                            fail: (fail: any) => {
                                console.warn("快手登录失败: ", fail)
                                reject(fail)
                            }
                        })
                    } else {
                        console.warn('快手获取登录凭证失败:', res.errMsg)
                        reject(res.errMsg)
                    }
                },
                fail(err: any) {
                    console.warn("微信登录凭证失败: ", err)
                    reject(err)
                }
            })
        });
    }

    // https://open.kuaishou.com/docs/develop/api-next/ad/ks.createRewardedVideoAd.html
    // 全局只能有一个视频广告实例，重复创建没有用
    createRewardedVideoAd(adInfo: ksCreateRewardedVideoAd): Promise<object> {
        videoAd = ks.createRewardedVideoAd({
            type: adInfo.type,
            unitId: adInfo.adUnitId
        })
        return Promise.resolve(videoAd)
    }

    async loadRewardedVideoAd(): Promise<boolean> {
        videoAd?.load()
        return true
    }

    async showRewardedVideoAd(): Promise<boolean> {
        videoAd?.show()
        return true
    }

    async destroyRewardedVideoAd(): Promise<boolean> {
        videoAd?.destroy()
        return true
    }

    createBannerAd(adInfo: ksCreateBannerAd): Promise<object> {
        return super.createBannerAd(adInfo);
    }

    async showBannerAd(): Promise<boolean> {
        return super.showBannerAd();
    }

    async hideBannerAd(): Promise<boolean> {
        bannerAd?.hide()
        return true
    }

    async destroyBannerAd(): Promise<boolean> {
        bannerAd?.destroy()
        return true
    }

    public async checkScene(): Promise<any> {
        console.error("快手不支持该能力")
    }
}