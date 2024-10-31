import {SdkInitialize} from './SdkInitialize.js';

export type DynamicSdkConfig = MyConfig & SdkInitialize;
export {PlayRewardedVideo, VideoReward} from './PlayRewardedVideo';
export {EventData} from './events';

export type MyConfig = {
    platform: string,
    sdk_url: string,
    sdk_key: string,
    game_id: string
}


export const EventEndPoint = 'https://api.salesagent.cc/game-logger/event';

