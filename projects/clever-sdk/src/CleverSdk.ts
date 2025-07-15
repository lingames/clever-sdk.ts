/* eslint-disable no-unused-vars */
import {PlayRewardedVideo, VideoReward} from './models/PlayRewardedVideo';
import {CreateBannerAd} from './models/CreateBannerAd.js';
import {SdkInitialize} from './models/SdkInitialize.js';
import {AddShortcut} from './models/AddShortcut.js';
import {LoginData} from './models/LoginData.js';
import {CreateNativeAd} from './models/CreateNativeAd.js';
import {ShareAppMessage} from "./models/ShareAppMessage";


export class CleverSdk {
    // 平台名称
    protected project_id: string;
    protected platform: string;
    // game_id 游戏编号，每个游戏 game_id 唯一
    protected game_id: string;
    protected sdk_url: string;
    protected sdk_key: string;

    // protected adUnitId: string = '';
    protected sdk_login_url: string = '';
    protected session_key: string = '';

    constructor(platform: string, project_id: string, game_id: string) {
        this.platform = platform;
        this.project_id = project_id;
        this.game_id = game_id;
    }

    /** 初始化平台参数
     * @param config 平台特有参数
     * @returns 是否初始化成功
     * */
    public async initialize(config: SdkInitialize): Promise<boolean> {
        return true;
    }


    public async login(): Promise<LoginData> {
        console.log('dummy-sdk login');
        return {};
    }

    // async update(){"dummy-sdk update"}
    public async checkSession(): Promise<boolean> {
        return false;
    }

    /**
     * 播放激励广告
     */
    public async playRewardedVideo(adInfo: PlayRewardedVideo): Promise<VideoReward> {
        return {
            isEnded: false,
            count: 0
        };
    }

    // 广告接口
    public async createBannerAd(adInfo: CreateBannerAd): Promise<VideoReward> {
        return this.showBannerAd();
    }

    public async showBannerAd(): Promise<VideoReward> {
        return {
            isEnded: false,
            count: 0
        };
    }

    public async hideBannerAd(): Promise<boolean> {
        return true;
    }

    public async destroyBannerAd(): Promise<boolean> {
        return true;
    }


    // 原生广告接口
    public async createNativeAd(adInfo: CreateNativeAd): Promise<object> {
        return {};
    }

    public async showNativeAd(): Promise<boolean> {
        return false;
    }

    public async hideNativeAd(): Promise<boolean> {
        return true;
    }

    public async destroyNativeAd(): Promise<boolean> {
        return true;
    }

    // 设为常用
    public async addCommonUse() {
        throw new Error(`${this.platform} 平台不支持 'addCommonUse'`);
    }

    public async checkCommonUse(): Promise<any> {
        return Promise.resolve({
            isSupport: false,
            isCommonUse: false
        });
    }

    // 加桌
    public async addShortcut(options: AddShortcut): Promise<object> {
        throw new Error(`${this.platform} 平台不支持 'addCommonUse'`);
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
    public async shareAppMessage(share: ShareAppMessage): Promise<boolean> {
        return Promise.resolve(false);
    }

    // 获取用户信息
    public async getUserInfo(options: any): Promise<any> {
        return Promise.resolve({});
    }

    public async reportEvent(id: string, data: Record<string, any>): Promise<boolean> {
        return Promise.resolve(false);
    }
}


