import { CleverSdk, createSdk } from "@lingames/clever-sdk";

/**
 * Clever SDK 管理器
 * 负责初始化和管理 Clever SDK
 * 单例模式，不需要挂到任何节点
 */
export class SdkManager {
    private static _instance: SdkManager;

    /**
     * 获取单例实例
     */
    static get instance() {
        if (this._instance == null) {
            this._instance = new SdkManager();
        }
        return this._instance;
    }

    /**
     * Clever SDK 实例
     */
    public _sdk: CleverSdk | undefined;

    /**
     * 构造函数
     */
    private constructor() {
        this.initializeSDK();
    }

    /**
     * 初始化 Clever SDK
     */
    private async initializeSDK() {
        try {
            this._sdk = await createSdk({
                project_id: "project-21gopcht44cg",
                sdk_login_url: "https://localhost:9000/v1/login",
                wx_game_id: "wxaca03d90e8b6d2af",
                ks_game_id: "ks689050744914449252",
                tt_game_id: "tta451d2ec3b5c55fb02",
                minigame_game_id: "",
                // 用于单平台，已明确不同游戏平台 id 时，此项可省略
                game_id: "",
            });
            console.log('Clever SDK 初始化成功');
        } catch (error) {
            console.error('Clever SDK 初始化失败:', error);
        }
    }

    /**
     * 播放激励视频广告
     */
    public playRewardedVideo() {
        if (this._sdk) {
            this._sdk.playRewardedVideo({
                wxUnitId: "adunit-dd09002f9d38454f",
                ttUnitId: "d7g9e4b4kh1h95be6k",
                // 用于单平台，已明确不同游戏平台 id 时，此项可省略
                adUnitId: "",
            });
        }
    }

    /**
     * 创建横幅广告
     */
    public createBannerAd() {
        if (this._sdk) {
            this._sdk.createBannerAd({
                // 用于单平台，已明确不同游戏平台 id 时，此项可省略
                adUnitId: "",
            });
        }
    }

    /**
     * 创建原生广告
     */
    public createNativeAd() {
        if (this._sdk) {
            this._sdk.createNativeAd({
                // 用于单平台，已明确不同游戏平台 id 时，此项可省略
                adUnitId: "",
            });
        }
    }

    /**
     * 测试登录
     */
    public async testLogin() {
        if (this._sdk) {
            const player = await this._sdk.login();
            // 初始化后报告上下文
            if (this._sdk) {
                this._sdk.reportContext({
                    player_anonymous: player?.open_id || ""
                });
            }
        }
    }
}