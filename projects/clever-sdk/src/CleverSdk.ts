import {CreateRewardedVideoAd} from "./models/CreateRewardedVideoAd.js";
import {CreateBannerAd} from "./models/CreateBannerAd.js";
import {SdkInitialize} from "./models/SdkInitialize.js";
import {AddShortcut} from "./models/AddShortcut.js";


export class CleverSdk {
    // 平台名称
    protected platform: string;
    // game_id 游戏编号，每个游戏 game_id 唯一
    protected game_id: number;
    protected sdk_url: string;
    protected sdk_key: string;
    // protected adUnitId: string = '';
    protected sdk_login_url: string = '';
    protected session_key: string = '';

    constructor(platform: string, sdk_url: string, sdk_key: string, game_id: number) {
        this.platform = platform;
        this.sdk_url = sdk_url;
        this.sdk_key = sdk_key;
        this.game_id = game_id;

        let t_sdk_url = this.sdk_url;
        if (t_sdk_url) {
            if (t_sdk_url[t_sdk_url.length - 1] == '/') {
                t_sdk_url = t_sdk_url.substring(0, t_sdk_url.length - 1);
            }
            console.log('登录链接:', t_sdk_url)
            if (platform == 'WECHAT_GAME') {
                this.sdk_login_url = t_sdk_url + '/weChatLogin';
            } else if (platform == 'douyingame') {
                this.sdk_login_url = t_sdk_url + '/byteDanceLogin';
            } else if (platform == 'kuaishou') {
                this.sdk_login_url = t_sdk_url + '/kuaishouLogin';
            } else if (platform == 'bilibili') {
                this.sdk_login_url = t_sdk_url + '/bilibiliLogin';
            } else if (platform == 'oppo') {
                this.sdk_login_url = t_sdk_url + '/oppoLogin';
            } else {
                this.sdk_login_url = t_sdk_url + '/devLogin';
            }
        }
    }

    /** 初始化平台参数
     * @param config 平台特有参数
     * @returns 是否初始化成功
     * */
    public async initialize(config: SdkInitialize): Promise<boolean> {
        return true;
    }


    public async login(): Promise<any> {
        console.log('dummy-sdk login');
    }

    // async update(){"dummy-sdk update"}
    public async checkSession(): Promise<boolean> {
        return false;
    }

    public createRewardedVideoAd(adInfo: CreateRewardedVideoAd): Promise<object> {
        return Promise.resolve({});
    }

    public async loadRewardedVideoAd(): Promise<boolean> {
        return false
    }

    public async showRewardedVideoAd(): Promise<boolean> {
        return false
    }

    public async destroyRewardedVideoAd(): Promise<boolean> {
        return true
    }

    // 广告接口
    public async createBannerAd(adInfo: CreateBannerAd): Promise<object> {
        return {}
    }

    public async showBannerAd(): Promise<boolean> {
        return false
    }

    public async hideBannerAd(): Promise<boolean> {
        return true
    }

    public async destroyBannerAd(): Promise<boolean> {
        return true
    }

    // 设为常用
    public async addCommonUse() {
        throw new Error(`${this.platform} 平台不支持 'addCommonUse'`)
    }

    public async checkCommonUse(): Promise<any> {
        return Promise.resolve({
            isSupport: false,
            isCommonUse: false
        });
    }

    // 加桌
    public async addShortcut(options: AddShortcut): Promise<object> {
        throw new Error(`${this.platform} 平台不支持 'addCommonUse'`)
    }

    public async checkShortcut(): Promise<any> {
        return Promise.resolve({
            isSupport: false,
            exist: true,
            needUpdate: false
        });
    }

    // 侧边栏复访
    // 确认当前宿主版本是否支持跳转某个小游戏入口场景，目前仅支持「侧边栏」场景。
    public async checkScene(): Promise<any> {
        return Promise.resolve({
            isSupport: false,
            isScene: false
        });
    }

    public async navigateToScene() {
    }

    // 分享
    public async shareAppMessage(param: any): Promise<boolean> {
        return Promise.resolve(false);
    }

    // 获取用户信息
    public async getUserInfo(options: any): Promise<any> {
        return Promise.resolve({});
    }


    // cb 玩家看广告结束的回调， isEnd: 广告是否看完, true:看完，false:中途退出
    // get_game_url(): string {
    //     // const useLocalNet = GGameData.GlobalData.get(GlobalDataType.UseLocalNet, false);
    //     const useLocalNet = true;
    //     if (useLocalNet)
    //         return "ws://localhost:8089/ws";
    //     return "wss://lingame.cn/ws/";
    //     // return "ws://124.222.91.167/ws/";
    // }
}


