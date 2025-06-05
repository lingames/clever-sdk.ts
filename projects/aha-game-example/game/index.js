// 本文件展示插屏广告，激励广告调用示例

// 插屏
function showNext() {
    window.parent.postMessage("next", "*");
    // 定义iframe通信对象MIAD_NEXT
    window.parent.MIAD_NEXT = {};
    // 插屏广告播放成功
    window.parent.MIAD_NEXT._callback = function () {
        console.log("插屏广告观看完成");
    };
    // 插屏广告播放失败（注意原因可能是频次太快，建议在failback也能继续游戏流程）
    window.parent.MIAD_NEXT._failback = function () {
        console.log("插屏广告观看失败");
    };
}

// 激励
function showReward() {
    window.parent.postMessage("reward", "*");
    // 定义iframe通信对象MIAD
    window.parent.MIAD = {};
    // 定义激励视频播放完成 发放奖励
    window.parent.MIAD._callback = function () {
        console.log("激励视频观看完成");
    };
    // 定义激励视频播放失败 不发放奖励
    window.parent.MIAD._failback = function () {
        console.log("激励视频观看失败");
    };
}
