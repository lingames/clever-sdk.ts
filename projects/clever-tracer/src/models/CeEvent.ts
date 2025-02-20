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