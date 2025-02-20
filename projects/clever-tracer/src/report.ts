import {Method} from 'axios';

export interface CeEvent {
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
     */
    player_anonymous?: string;
    /**
     * Semantic64，渠道 uuid, 可匿名上报
     */
    channel_id?: string;
    /**
     * Semantic64，版本 uuid, 可匿名上报  如果 server_id 非空, 则查询 server 关联的版本
     */
    version_id?: string;
    version_name?: string;
    /**
     * 用户设备信息
     */
    user_agent?: string;
    /**
     * 事件的触发时间
     *
     * - undefined 表示使用服务器时间
     */
    time?: string;
    /**
     * 自定义信息
     */
    custom?: any;
}

export abstract class CeTracer {
    public host = 'https://api.salesagent.cc/game-logger';
    public bearer = '';
    public channel?: any = undefined
    public version?: any = undefined
    /**
     * Auto create version id by version name
     */
    public autoVersion = false

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
    public async apiRequest<O>(method: Method, endPoint: string, data: any): Promise<O | undefined> {
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
            console.error("Fetch error:", error);
            return undefined;
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
        const data: CeEvent = {
            event_id: id,
            channel_id: this.channel || '',
            custom: custom || {},
            time: new Date().toISOString()
        }
        if (this.autoVersion) {
            data.version_name = this.version
        } else {
            data.version_id = this.version
        }
        this.apiRequest('POST', 'event', data)
        .catch((e) => console.error(e))
    }
}
