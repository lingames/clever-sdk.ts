import {CeTracer as FetchTracer} from "@lingames/clever-tracer";
import Taro from "@tarojs/taro";

export abstract class CeTracer extends FetchTracer {
    public override async apiRequest<O>(method: keyof Taro.request.Method, endPoint: string, data: any): Promise<O | undefined> {
        try {
            const response = await Taro.request({
                method: method,
                url: `${this.host}/${endPoint}`,
                header: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': this.bearer
                },
                data: data
            })
            if (response.statusCode != 200) {
                console.error(response.errMsg);
                return undefined;
            }
            const result = await response.data;
            if (result.code < 0) {
                console.error(result.message);
                return undefined;
            } else {
                return result.data;
            }
        } catch (error) {
            console.error("Taro error:", error);
            return undefined;
        }
    }
}
