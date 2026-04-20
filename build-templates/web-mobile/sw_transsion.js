/* 占位：传音/广告脚本可能注册 Service Worker；缺失时预览/构建根目录会 404。
 * 构建后随模板拷到输出根目录，消除无文件导致的注册失败（非业务 SW 逻辑）。 */
self.addEventListener("install", (e) => {
    e.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", (e) => {
    e.waitUntil(self.clients.claim());
});
