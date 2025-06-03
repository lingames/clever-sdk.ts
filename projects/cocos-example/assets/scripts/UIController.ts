import { _decorator, Component, Node, Button } from "cc";
import { SdkManager } from "./SdkManager";

const { ccclass, property } = _decorator;

/**
 * UI 控制器
 * 处理按钮点击事件
 */
@ccclass("UIController")
export class UIController extends Component {
    /**
     * 播放激励视频广告
     */
    public onPlayRewardedVideo() {
        SdkManager.instance.playRewardedVideo();
    }

    /**
     * 创建横幅广告
     */
    public onCreateBannerAd() {
        SdkManager.instance.createBannerAd();
    }

    /**
     * 创建原生广告
     */
    public onCreateNativeAd() {
        SdkManager.instance.createNativeAd();
    }

    /**
     * 测试登录
     */
    public onTestLogin() {
        SdkManager.instance.testLogin();
    }
}
