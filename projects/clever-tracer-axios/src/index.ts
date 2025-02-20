import axios, {Method} from "axios";
import {CeTracer} from "./report";

export * from "./report";


export enum ProjectAChannel {
    wechat = 'wechat',
}

export enum ProjectVersion {
    v1_0 = 'v1.0',
    v2_0 = 'v2.0',
}


export class MyTracer extends CeTracer {


    public override channel?: ProjectAChannel = undefined
    public override version?: ProjectVersion = undefined

    public override async callGameLogger<O>(method: Method, endPoint: string, data: any): Promise<O | null> {
        try {
            const response = await axios({
                method: method,
                url: `${this.host}/${endPoint}`,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': this.bearer
                },
                data: data
            });
            if (response.status !== 200) {
                console.error(response.statusText);
                return null;
            }
            const result = response.data;
            if (result.code < 0) {
                console.error(result.message);
                return null;
            } else {
                return result.data;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * 追踪 event-aa 事件
     * @param custom 自定义数据
     */
    report_event_aa(custom?: any) {
        this.callEventReport('aa', custom)
    }
}


export const tracer = new MyTracer()
tracer.version = ProjectVersion.v2_0
tracer.channel = ProjectAChannel.wechat

tracer.report_event_aa()
tracer.report_event_aa()
