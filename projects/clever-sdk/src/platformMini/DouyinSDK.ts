import {CleverSdk} from "../CleverSdk";


type DouyinInitialize = {}

export class DouyinSDK extends CleverSdk {
    async initialize(config: DouyinInitialize): Promise<boolean> {
        return true
    }
}