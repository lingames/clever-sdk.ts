import {CeTracer} from "@lingames/clever-tracer";

/**
See {@link https://api.clever-tracer.com/v1/report/version events}.
*/
export enum MyGameChannels {

	DOUYIN = 'hash-y',

}

/**
See {@link https://api.clever-tracer.com/v1/report/version events}.
*/
export enum MyGameVersions {

	V_1_0_0 = 'hash-xx',

	V_1_1_0 = 'hash-yy',

	V_2_0_0 = 'hash-zz',

}

/**
See {@link https://api.clever-tracer.com/v1/report/version events}.
*/
export enum MyGameEvents {

	LOGIN_IN = 'hash-xxx',

	RECHARGE = 'hash-yyy',

	LOGIN_OUT = 'hash-zzz',

}

/**
@description
upload_data
@example
```ts
const tracer = new MyGameTracer()
// Use environment variables or macros to dispatch
tracer.version = MyGameVersions.v1_0_0
tracer.channel = MyGameChannels.WECHAT
// report the event
tracer.reportCustomEvent({})
```
*/
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