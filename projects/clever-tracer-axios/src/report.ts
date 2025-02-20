import {CeTracer as FetchTracer} from "@lingames/clever-tracer";
import {Method} from 'axios';

export abstract class CeTracer extends FetchTracer {
    public override async apiRequest<O>(method: Method, endPoint: string, data: any): Promise<O | undefined> {
        try {
            const response = await fetch(`${this.host}/${endPoint}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': this.bearer
                },
                body: data ? JSON.stringify(data) : undefined
            });
            if (!response.ok) {
                console.error(response.statusText);
                return undefined;
            }
            const result = await response.json();
            if (result.code < 0) {
                console.error(result.message);
                return undefined;
            } else {
                return result.data;
            }
        } catch (error) {
            console.error("Axios error:", error);
            return undefined;
        }
    }
}
