### 逻辑讲解

1. **根目录 `index.html`（壳页面）一般不要改**：已接入 `h5sdk`（`adsdk_*.js`）、Banner、iframe、以及 `postMessage` 与 `MIAD` / `MIAD_NEXT` 回调逻辑。
2. **`game/` 子目录**：放**你们的 H5 游戏构建产物**（整包替换或合并）；游戏在 **iframe 内**运行，通过 `window.parent` 与壳通信。

### 使用步骤（接入广告）

1. 将 **Web 构建后的游戏工程**整体放进 **`game/`**（需保留可在 iframe 中打开的入口页，常见为 `game/index.html`；若你们入口名不同，需改壳里 `index.html` 中 `iframe.src` 指向的路径）。
2. 在游戏代码里按 **`game/index.js`** 的方式调用：
   - **插屏**：`postMessage("next", "*")`，并在 **`window.parent.MIAD_NEXT`** 上设置 `_callback` / `_failback`。
   - **激励**：`postMessage("reward", "*")`，并在 **`window.parent.MIAD`** 上设置 `_callback` / `_failback`。
3. 本地联调：用**静态服务器**打开**仓库根目录下的壳**（即本目录的 **`index.html`**），不要只打开 `game/index.html` 单独文件，否则没有 `parent` 壳与 h5sdk。

### 测试广告开关（开屏 / 插屏等）

在 **根目录 `index.html`** 里，`h5sdk.init` 的 **adsense / adsence** 配置块中：

- 打开测试：保留或添加 `"data-adbreak-test": "on"`
- **上线前务必关闭**：注释或删除该行，避免一直走测试流量。

### Cocos Creator 导出 Web 时

1. 菜单 **项目 → 构建发布**，平台选 **Web Mobile**，构建得到 `build/web-mobile`（路径以实际为准）。
2. 将构建输出**复制进本目录下的 `game/`**（与示例的 `game/index.html`、`index.js` 同级或按你们入口调整壳中 iframe 路径）。
3. 用 TypeScript 时，在适当时机调用与 `index.js` 等价的逻辑（可封装成工具模块，避免在业务里散落字符串）。

若控制台出现 **`manifest_transsion.json` / `sw_transsion.js` 404**：多为广告脚本尝试注册 PWA/Service Worker。**编辑器预览**（localhost:7456）根目录无法随意加文件，404 可暂忽略；**正式 Web 构建**可在工程根目录使用 **`build-templates/web-mobile/`**（与本仓库 Cocos 工程同级）放入同名占位文件，构建时会拷到输出根目录，减少 404。

### Git 初始化与发布（仅作参考，以公司仓库为准）

在**包含本 `game` 目录与根 `index.html` 的项目根**执行：

```bash
git init
git add .
git commit -m "init"
git remote add origin git@game-gitlab.ahagamecenter.com:game-h5/xxx/xxx.git
git push origin master
git tag -a "v202507241132" -m "申请代码发布-xxx"
git push origin --tags
```

打 tag 前确认：**测试开关已关**、`appKey` / AdSense 等与**线上环境**一致。

### 与仓库内 Clever SDK（`@lingames/clever-sdk`）的关系

- **`game/` + 根 `index.html`**：传音官方推荐的 **iframe + postMessage** H5 接入方式。
- **Cocos 里 `AhagameSdk`**：在同一套 `h5sdk` 上直接调 `adBreak`，适用于**非 iframe** 或自研壳；与本文 `game/` 模板二选一或分渠道使用即可。
