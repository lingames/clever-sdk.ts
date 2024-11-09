export * from './platformH5/index.js';
export * from './platformMini/index.js';
export * from './platformNative/index.js';
import {BilibiliSdk, DouyinSDK, HuaweiSdk, KuaiShouSdk, OppoSdk, WeChatSdk} from './platformMini';
import {M4399Sdk} from './platformNative';
import {CleverSdk} from './CleverSdk.js';
import {AdSenseSdk, MockSdk} from './platformH5';
import {DynamicSdkConfig} from './models';

export {CleverSdk};

export async function createSdk(config: DynamicSdkConfig): Promise<CleverSdk> {
    if (config.platform == 'wechat') {
        let sdk = new WeChatSdk(config.platform, config.project_id, '');
        await sdk.initialize({
            sdk_login_url: config.sdk_login_url
        });
        return sdk;
    }
    if (config.platform == 'dou-yin') {
        let sdk = new DouyinSDK(config.platform, config.project_id, '');
        await sdk.initialize({
            sdk_login_url: config.sdk_login_url
        });
        return sdk;
    }
    if (config.platform == 'kuai-shou') {
        let sdk = new KuaiShouSdk(config.platform, config.project_id, '');
        await sdk.initialize({
            sdk_login_url: config.sdk_login_url
        });
        return sdk;
    }
    if (config.platform == 'bilibili') {
        return new BilibiliSdk(config.platform, config.sdk_login_url, config.project_id.toString());
    }
    if (config.platform == 'hua-wei') {
        return new HuaweiSdk(config.platform, config.sdk_login_url, config.project_id.toString());
    }
    if (config.platform == 'oppo') {
        return new OppoSdk(config.platform, config.sdk_login_url, config.project_id.toString());
    }
    if (config.platform == 'google') {
        let sdk = new AdSenseSdk(config.platform, config.sdk_login_url, config.project_id.toString());
        await sdk.initialize({adSenseId: ''});
        return sdk;
    }
    if (config.platform == 'm4399') {
        let sdk = new M4399Sdk(config.platform, config.project_id, config.game_id || '');
        await sdk.initialize({
            sdk_login_url: config.sdk_login_url
        });
        return sdk;
    }
    if (config.platform == 'mock') {
        let sdk = new MockSdk(config.platform, config.project_id, config.game_id || 'mock_game_id');
        const mockInit = config as any;
        await sdk.initialize(mockInit.mockConfig || {});
        return sdk;
    }
    return new MockSdk(config.platform, config.sdk_login_url, config.project_id.toString());
}
