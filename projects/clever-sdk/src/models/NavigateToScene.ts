export type NavigateToScene = {} | wxNavigateToScene | ksNavigateToScene;

export interface wxNavigateToScene {}

// https://open.kuaishou.com/miniGameDocs/gameDev/api/siderBar/navigateToScene.html
export interface ksNavigateToScene {
    /** 需要确认的入口场景 */
    scene: string;
}
