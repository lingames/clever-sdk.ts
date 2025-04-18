import {CleverSdk} from "../CleverSdk.js";
import {build_sdk_req, generateRandomString} from "../helper.js";
import {CreateRewardedVideoAd, RewardedVideo} from "../models/CreateRewardedVideoAd.js";

declare namespace cc {
    const sys: {
        localStorage: any;
    }
}

export class BrowserSdk extends CleverSdk {
    override async login() {
        let old_guid = cc.sys.localStorage.getItem('MARS_LOCAL_GUID');
        if (old_guid) {
            console.log('load guid from cache', old_guid);
        } else {
            old_guid = generateRandomString(16);
            cc.sys.localStorage.setItem('MARS_LOCAL_GUID', old_guid);
            console.log('load guid from create', old_guid);
        }
        const [req_body, req_header] = build_sdk_req(this.game_id, this.sdk_key, old_guid);
        console.log('my-sdk login url:', old_guid, this.sdk_login_url, req_body);

        return {
            error_code: 0,
            openid: old_guid,
            login_time: new Date().getTime(),
        };
    }

    createRewardedVideoAd(adInfo: CreateRewardedVideoAd): Promise<RewardedVideo> {
        throw new Error('浏览器不支持广告');
    }
}

