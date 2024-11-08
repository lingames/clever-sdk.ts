import {SdkInitialize} from './SdkInitialize.js';

export type DynamicSdkConfig = MyConfig & SdkInitialize;
export {PlayRewardedVideo, VideoReward} from './PlayRewardedVideo';
export {EventData} from './events';
export {AdvertiseStage} from './AdvertiseStage';
export type MyConfig = {
    project_id: string
    platform: string,
    sdk_login_url: string,
    sdk_event_key: string,
    game_id?: string,
}

export const EventEndPoint = 'https://api.salesagent.cc/game-logger/event';

