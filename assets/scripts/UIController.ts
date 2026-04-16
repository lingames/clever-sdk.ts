import {
    _decorator,
    Color,
    Component,
    director,
    EventTouch,
    Graphics,
    Input,
    Label,
    Node,
    UITransform,
    UIOpacity,
    Vec3,
    Widget,
    input,
} from "cc";
import { getCleverSdk } from "./CleverSdkGlobals";

const { ccclass, property } = _decorator;

/**
 * CleverSdk2D：挂在 Canvas；演示按钮在 onLoad/start 延后一帧创建。
 * SDK 注入：`import { bindCleverSdk, SdkManager } from "./CleverSdkGlobals"`。
 *
 * 说明：编辑器里 Scene 面板出现的 `[Scene]`、`wasm` 等多为引擎/场景视图日志；
 * 游戏脚本的 `console.log` 只在「预览/构建运行」时出现，且浏览器预览时往往在 Chrome 开发者工具 Console。
 */
@ccclass("UIController")
export class UIController extends Component {
    @property({ tooltip: "运行时自动生成四个演示按钮" })
    autoCreateDemoButtons = true;

    @property({
        tooltip:
            "在画面底部显示一行字，用于确认游戏脚本已执行（不依赖控制台是否显示 TS 日志）",
    })
    showRuntimeDebugOnScreen = true;

    /** 演示按钮命中区（用全局 input + UITransform.hitTest，避免节点级触摸未派发） */
    private readonly _demoButtonHits: {
        tf: UITransform;
        nodeName: string;
        text: string;
        onClick: () => void;
    }[] = [];

    onLoad() {
        // 单行输出：须在游戏「预览/运行」里看；与 Scene 面板里 [Scene] 引擎日志不是同一通道。
        console.log(
            `[CleverDemo] UIController.onLoad node=${this.node.name} scene=${director.getScene()?.name ?? "(none)"} autoCreateDemoButtons=${this.autoCreateDemoButtons}`,
        );
        console.warn("[CleverDemo] UIController.onLoad（warn 便于在 Creator 里过滤 Log 时仍可见）");
        if (this.showRuntimeDebugOnScreen) {
            this.ensureRuntimeDebugBanner();
        }
        this.scheduleDemoUiBuild();
    }

    onEnable(): void {
        input.on(Input.EventType.TOUCH_END, this.onGlobalTouchEnd, this);
    }

    onDisable(): void {
        input.off(Input.EventType.TOUCH_END, this.onGlobalTouchEnd, this);
    }

    start() {
        this.scheduleDemoUiBuild();
    }

    private scheduleDemoUiBuild() {
        const allowAuto =
            this.autoCreateDemoButtons === undefined || this.autoCreateDemoButtons === true;
        if (!allowAuto) {
            return;
        }
        if (this.node.getChildByName("CleverSdkDemoButtons")) {
            return;
        }
        this.scheduleOnce(() => {
            if (!this.isValid || !this.node.isValid) {
                return;
            }
            if (this.node.getChildByName("CleverSdkDemoButtons")) {
                return;
            }
            console.log("[CleverDemo] UIController 构建演示 UI，当前场景:", director.getScene()?.name);
            this.setupDemoButtons();
        }, 0);
    }

    public onPlayRewardedVideo() {
        console.log("[CleverDemo] playRewardedVideo");
        const s = getCleverSdk();
        if (s) {
            s.playRewardedVideo({
                wxUnitId: "adunit-dd09002f9d38454f",
                ttUnitId: "d7g9e4b4kh1h95be6k",
                adUnitId: "",
            });
        } else {
            console.warn("[CleverDemo] 未注入 cleverSdk（请 import { bindCleverSdk } from \"./CleverSdkGlobals\"）");
        }
    }

    public onCreateBannerAd() {
        console.log("[CleverDemo] createBannerAd");
        const s = getCleverSdk();
        if (s) {
            s.createBannerAd({ adUnitId: "" });
        } else {
            console.warn("[CleverDemo] 未注入 cleverSdk");
        }
    }

    public onCreateNativeAd() {
        console.log("[CleverDemo] createNativeAd");
        const s = getCleverSdk();
        if (s) {
            s.createNativeAd({ adUnitId: "" });
        } else {
            console.warn("[CleverDemo] 未注入 cleverSdk");
        }
    }

    public onTestLogin() {
        void (async () => {
            console.log("[CleverDemo] testLogin");
            const s = getCleverSdk();
            if (!s) {
                console.warn("[CleverDemo] 未注入 cleverSdk");
                return;
            }
            const player = await s.login();
            const openId =
                player && typeof player === "object" && "open_id" in player
                    ? String((player as { open_id?: string }).open_id ?? "")
                    : "";
            s.reportContext({ player_anonymous: openId });
        })();
    }

    private setupDemoButtons() {
        if (this.node.getChildByName("CleverSdkDemoButtons")) {
            return;
        }
        console.log("[CleverDemo] 创建演示 UI（Graphics + Label）");
        console.warn("[CleverDemo] 创建演示 UI（同上，仅预览/运行时输出）");
        this.buildGraphicsDemoUi();
    }

    /** 画面内证明 onLoad 已跑；仅编辑场景不跑脚本时不会出现此行。 */
    private ensureRuntimeDebugBanner(): void {
        const bannerName = "CleverRuntimeDebugBanner";
        if (this.node.getChildByName(bannerName)) {
            return;
        }
        const uiLayer = this.node.layer;
        const n = new Node(bannerName);
        n.layer = uiLayer;
        n.setParent(this.node);
        n.setSiblingIndex(this.node.children.length - 1);

        const tf = n.addComponent(UITransform);
        tf.setContentSize(920, 72);
        const w = n.addComponent(Widget);
        w.isAlignBottom = true;
        w.isAlignHorizontalCenter = true;
        w.bottom = 12;
        w.horizontalCenter = 0;
        w.alignMode = 2;

        const lab = n.addComponent(Label);
        lab.string =
            "脚本已执行：UIController.onLoad（若能看到本行=游戏在跑；Scene 里 [Scene]/wasm 是引擎日志，不是 TS 的 console）";
        lab.fontSize = 15;
        lab.lineHeight = 20;
        lab.color = new Color(255, 230, 120, 255);
        lab.horizontalAlign = Label.HorizontalAlign.CENTER;
        lab.verticalAlign = Label.VerticalAlign.CENTER;
        const lf = lab as Label & { useSystemFont?: boolean };
        if (typeof lf.useSystemFont === "boolean") {
            lf.useSystemFont = true;
        }
    }

    private buildGraphicsDemoUi() {
        this._demoButtonHits.length = 0;
        const uiLayer = this.node.layer;

        const root = new Node("CleverSdkDemoButtons");
        root.layer = uiLayer;
        root.setParent(this.node);
        root.setSiblingIndex(this.node.children.length - 1);

        const rootTf = root.addComponent(UITransform);
        rootTf.setContentSize(720, 420);
        root.setPosition(new Vec3(0, 0, 0));
        root.addComponent(UIOpacity).opacity = 255;
        const rootWidget = root.addComponent(Widget);
        rootWidget.isAlignHorizontalCenter = true;
        rootWidget.isAlignVerticalCenter = true;

        const title = new Node("DemoTitle");
        title.layer = uiLayer;
        title.setParent(root);
        const ttf = title.addComponent(UITransform);
        ttf.setContentSize(700, 80);
        title.setPosition(new Vec3(0, 170, 0));
        const tlab = title.addComponent(Label);
        tlab.string = "Clever SDK 演示\n（未注入 SDK 时按钮仅打日志）";
        tlab.fontSize = 22;
        tlab.lineHeight = 28;
        tlab.color = Color.WHITE;
        tlab.horizontalAlign = Label.HorizontalAlign.CENTER;
        tlab.verticalAlign = Label.VerticalAlign.CENTER;
        const tlf = tlab as Label & { useSystemFont?: boolean };
        if (typeof tlf.useSystemFont === "boolean") {
            tlf.useSystemFont = true;
        }

        const specs: { name: string; label: string; onClick: () => void }[] = [
            { name: "PlayRewardedVideoButton", label: "激励视频", onClick: () => this.onPlayRewardedVideo() },
            { name: "CreateBannerAdButton", label: "横幅广告", onClick: () => this.onCreateBannerAd() },
            { name: "CreateNativeAdButton", label: "原生广告", onClick: () => this.onCreateNativeAd() },
            { name: "TestLoginButton", label: "测试登录", onClick: () => this.onTestLogin() },
        ];

        let y = 100;
        for (const s of specs) {
            const btn = this.makeGraphicsButton(s.name, s.label, uiLayer, () => s.onClick());
            btn.setParent(root);
            btn.setPosition(new Vec3(0, y, 0));
            y -= 76;
            const tf = btn.getComponent(UITransform);
            if (tf) {
                this._demoButtonHits.push({
                    tf,
                    nodeName: s.name,
                    text: s.label,
                    onClick: () => s.onClick(),
                });
            }
        }
    }

    private makeGraphicsButton(nodeName: string, text: string, uiLayer: number, onClick: () => void): Node {
        const n = new Node(nodeName);
        n.layer = uiLayer;
        n.addComponent(UIOpacity).opacity = 255;

        const tf = n.addComponent(UITransform);
        tf.setContentSize(320, 60);

        const g = n.addComponent(Graphics);
        g.fillColor = new Color(37, 99, 235, 255);
        g.rect(-160, -30, 320, 60);
        g.fill();
        g.enabled = true;

        const labNd = new Node("Txt");
        labNd.layer = uiLayer;
        labNd.setParent(n);
        const ltf = labNd.addComponent(UITransform);
        ltf.setContentSize(320, 60);
        labNd.setPosition(Vec3.ZERO);
        const lab = labNd.addComponent(Label);
        lab.string = text;
        lab.fontSize = 24;
        lab.lineHeight = 28;
        lab.color = Color.WHITE;
        lab.horizontalAlign = Label.HorizontalAlign.CENTER;
        lab.verticalAlign = Label.VerticalAlign.CENTER;
        const lf = lab as Label & { useSystemFont?: boolean };
        if (typeof lf.useSystemFont === "boolean") {
            lf.useSystemFont = true;
        }

        return n;
    }

    /** 与引擎 Button 一致：用屏幕坐标 hitTest（见 cocos Button._onTouchMove） */
    private onGlobalTouchEnd = (event: EventTouch): void => {
        const touch = event.touch;
        if (!touch || this._demoButtonHits.length === 0) {
            return;
        }
        const loc = touch.getLocation();
        const wid = event.windowId ?? 0;
        for (let i = this._demoButtonHits.length - 1; i >= 0; i--) {
            const row = this._demoButtonHits[i];
            if (!row.tf.node.isValid || !row.tf.enabled) {
                continue;
            }
            if (row.tf.hitTest(loc, wid)) {
                console.log("[CleverDemo] 按钮点击", `name=${row.nodeName}`, `label=${row.text}`);
                row.onClick();
                break;
            }
        }
    };
}
