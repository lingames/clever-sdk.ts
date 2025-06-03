export type LoginData = wxLoginData | HuaweiLoginData | OppoLoginData;

export interface wxLoginData {
    open_id: string;
    union_id: string;
    session_key: string;
}

export interface OppoLoginData {
    /** 统一登录 id */
    openid: string;
    /** 大厅 uid */
    uid: string;
    /** 大厅头像 */
    avatar: string;
    /** 实际头像 · 不建议使用 */
    actualAvatar?: string;
    /** 大厅昵称 */
    nickName: string;
    /** 实际昵称 · 不建议使用 */
    actualNickName?: string;
    /** 性别 */
    sex: string;
    /** 年龄 */
    age: string;
    /** 生日 */
    birthday: string;
    /** 平台 token */
    token: string;
    /** 城市 省或市或其他 */
    location: string;
    /** 星座 */
    constellation: string;
    /** 个人签名 */
    sign: string;
    /** 电话号码 */
    phoneNum: string;
    /** 是否游客 · 不建议使用 */
    isTourist?: string;
    /** 不建议使用 */
    confirmTransform?: string;
    /** 时间戳 */
    time: number;
    /** code · 不建议使用 */
    code?: number;
}

// 响应数据接口
export interface HuaweiLoginData {
    /** 请求时同字段指定的任意值 */
    state: string;

    /** 授权码模式下可用，返回的授权码 */
    code?: string;

    /** 简化模式下可用，返回的访问令牌 */
    accessToken?: string;

    /** 简化模式下可用，访问令牌类型 */
    tokenType?: string;

    /** 简化模式下可用，访问令牌过期时间，单位为秒 */
    expiresIn?: number;

    /** 简化模式下可用，实际权限范围 */
    scope?: string;

    /** 用户的openid */
    openid?: string; // 1020+

    /** 用户在开放平台上的唯一标示符 */
    unionid?: string; // 1020+

    /** 用户的昵称，可能为空 */
    nickname?: string; // 1020+

    /** 用户的头像图片地址，可能为空 */
    avatar?: {
        default?: string; // 默认头像
        [resolution: string]: string | undefined; // 其他分辨率的头像
    }; // 1020+

    /** 用户绑定的Email地址，如果未绑定Email，此处可能为空 */
    email?: string; // 1060+
}

// 接口可选参数
export interface wxGetUserInfo {
    /** 是否带上登录态信息。当 withCredentials 为 true 时，要求此前有调用过 wx.login 且登录态尚未过期，此时返回的数据会包含 encryptedData, iv 等敏感信息；当 withCredentials 为 false 时，不要求有登录态，返回的数据不包含 encryptedData, iv 等敏感信息。 */
    withCredentials?: boolean;

    /** 显示用户信息的语言 */
    lang?: "en" | "zh_CN" | "zh_TW"; // 合法值：en（英文）、zh_CN（简体中文）、zh_TW（繁体中文）

    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: () => void;
}

// https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/UserInfo.html
export interface wxUserInfo {
    /** 用户昵称 */
    nickName: string;

    /** 用户头像图片的 URL */
    avatarUrl: string;

    /** 用户的性别，值为 1 时是男性，值为 2 时是女性，值为 0 时是未知 */
    gender: 0 | 1 | 2;

    /** 用户所在国家 */
    country: string;

    /** 用户所在省份 */
    province: string;

    /** 用户所在城市 */
    city: string;

    /** 用户的语言，简体中文为 zh_CN */
}

// 接口调用成功的回调函数参数
export interface wxUserInfoCallback {
    /** 用户信息对象，不包含 openid 等敏感信息 */
    userInfo: wxUserInfo;

    /** 不包括敏感信息的原始数据字符串，用于计算签名 */
    rawData: string;

    /** 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息 */
    signature: string;

    /** 包括敏感数据在内的完整用户信息的加密数据 */
    encryptedData: string;

    /** 加密算法的初始向量 */
    iv: string;

    /** 敏感数据对应的云 ID，开通云开发的小程序才会返回 */
    cloudID?: string; // 仅在版本 2.7.0 及以上可用
}
