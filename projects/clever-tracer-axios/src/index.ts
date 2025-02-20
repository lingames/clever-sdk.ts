import {CeTracer} from "@lingames/clever-tracer";

/**
See {@link https://api.clever-tracer.com/v1/report/version events}.
*/
export enum ProjectAChannels {

	WECHAT = 'hash-xxx',

}

/**
See {@link https://api.clever-tracer.com/v1/report/version events}.
*/
export enum ProjectAVersions {

	V_1_0 = 'hash-xxx',

	V_2_0 = 'hash-yyy',

}

/**
See {@link https://api.clever-tracer.com/v1/report/version events}.
*/
export enum ProjectAEvents {

	AA_SS = 'hash-xx',

	CC_DD = 'hash-yy',

}

/**
@description
upload_data
@example
```ts
const tracer = new ProjectATracer()
tracer.version = ProjectAVersions.v1_0
tracer.channel = ProjectAChannels.WECHAT

tracer.reportEventAa()
```
*/
export class ProjectATracer extends CeTracer {
	public override channel?: ProjectAChannels | string = undefined
	public override version?: ProjectAVersions | string = undefined


	/**
	* report the AA_SS event
	* @param custom custom
	*/
	reportAaSs(custom?: any) {
		this.callEventReport(ProjectAEvents.AA_SS, custom)
	}

	/**
	* report the CC_DD event
	* @param custom custom
	*/
	reportCcDd(custom?: any) {
		this.callEventReport(ProjectAEvents.CC_DD, custom)
	}

}

const tracer = new ProjectATracer()
tracer.version = ProjectAVersions.v1_0_0
tracer.channel = ProjectAChannels.WECHAT

tracer.reportCustomEvent({})