import { CleverSdk } from "../CleverSdk.js";
import { PlayRewardedVideo, VideoReward } from "../models/PlayRewardedVideo";
import { LoginData } from "../models/LoginData";

export class MockSdk extends CleverSdk {
    async login(): Promise<LoginData> {
        return Promise.resolve({
            open_id: "0",
            union_id: "0",
            session_key: "DEVELOPMENT_MODE",
        });
    }

    playRewardedVideo(adInfo: PlayRewardedVideo): Promise<VideoReward> {
        return Promise.resolve({
            isEnded: true,
            count: 1,
        });
    }
}
