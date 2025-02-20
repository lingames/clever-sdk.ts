import axios, {Method} from 'axios';

export interface OnEvent {
    /**
     * 事件 id 形如 "event-xxx"
     */
    event_id: string;
    /**
     * 玩家 uuid, 优先使用
     */
    player_id?: string;
    /**
     * 未注册用户(外部用户名), 给与随机 player_id
     * @type {string}
     * @memberof OnEvent
     */
    player_anonymous?: string;
    /**
     * Semantic64，渠道 uuid, 可匿名上报
     * @type {string}
     * @memberof OnEvent
     */
    channel_id?: string;
    /**
     * Semantic64，版本 uuid, 可匿名上报  如果 server_id 非空, 则查询 server 关联的版本
     * @type {string}
     * @memberof OnEvent
     */
    version_id?: {
        type: "auto",
        name: "v0.0.1"
    };
    /**
     * 用户设备信息
     * @type {string}
     * @memberof OnEvent
     */
    user_agent?: string;
    /**
     * 按钮触发时间  - null 表示使用服务器时间
     * @type {string}
     * @memberof OnEvent
     */
    time?: string;
    /**
     *
     * @type {string}
     * @memberof OnEvent
     */
    custom?: string;
}


export abstract class CeTracer {
    public host = 'https://api.salesagent.cc/game-logger';
    public bearer = '';
    public channel?: any = undefined
    public version?: any = undefined

    constructor() {

    }

    /**
     * 调用事件上报接口
     *
     * 此方法用于向游戏日志系统报告一个事件它构造了事件数据对象，并调用 callGameLogger 方法进行上报
     *
     * @param method 事件ID，标识特定的事件
     * @param endPoint 可选的自定义数据，用于提供额外的事件信息
     * @param data 事件数据对象，包含事件ID、自定义数据等属性
     */
    public async callGameLogger<O>(method: Method, endPoint: string, data: any): Promise<O | null> {
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
    }

    /**
     * 调用事件上报接口
     *
     * 此方法用于向游戏日志系统报告一个事件它构造了事件数据对象，并调用callGameLogger方法进行上报
     *
     * @param id 事件ID，标识特定的事件
     * @param custom 可选的自定义数据，用于提供额外的事件信息
     */
    public callEventReport(id: string, custom: any): void {
        const data: OnEvent = {
            event_id: '',
            channel_id: this.channel || '',
            version_id: this.version || '',
            custom: custom || {}
        }
        this.callGameLogger('POST', 'event', data)
        .catch((e) => console.error(e))
    }
}
