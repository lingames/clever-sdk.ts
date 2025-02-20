import {CeTracer} from "@lingames/clever-tracer";

/**
 See {@link https://api.clever-tracer.com/v1/report/version events}.
 */
export enum MyGameChannels {
    WECHAT = 'hash-y',
    DOUYIN = 'hash-y',
}

/**
 See {@link https://api.clever-tracer.com/v1/report/version events}.
 */
export enum MyGameVersions {
    V1_0_0 = 'hash-xx',
    V1_1_0 = 'hash-yy',
    V2_0_0 = 'hash-zz',
}

/**
 See {@link https://api.clever-tracer.com/v1/report/version events}.
 */
export enum MyGameEvents {
    LOGIN_IN = 'hash-xxx',
    RECHARGE = 'hash-yyy',
    LOGIN_OUT = 'hash-zzz',
}

export class MyGameTracer extends CeTracer {
    public override channel?: MyGameChannels | string = undefined
    public override version?: MyGameVersions | string = undefined


    /**
     * report the LOGIN_IN event
     * @param custom custom
     */
    reportLoginIn(custom?: any) {
        this.callEventReport(MyGameEvents.LOGIN_IN, custom)
    }

    /**
     * report the RECHARGE event
     * @param custom custom
     */
    reportRecharge(custom?: any) {
        this.callEventReport(MyGameEvents.RECHARGE, custom)
    }

    /**
     * report the LOGIN_OUT event
     * @param custom custom
     */
    reportLoginOut(custom?: any) {
        this.callEventReport(MyGameEvents.LOGIN_OUT, custom)
    }
}


