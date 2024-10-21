import {SdkInitialize} from "./SdkInitialize.js";

export type DynamicSdkConfig = MyConfig & SdkInitialize;

export type MyConfig = {
    platform: string,
    sdk_url: string,
    sdk_key: string,
    game_id: number
}

