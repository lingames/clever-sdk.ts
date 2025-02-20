灵境引擎追踪器
===========

在网页上自动生成如下映射代码:

```ts
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
    reportLoginIn(custom?: any) {
        this.callEventReport(MyGameEvents.LOGIN_IN, custom)
    }
    reportRecharge(custom?: any) {
        this.callEventReport(MyGameEvents.RECHARGE, custom)
    }
    reportLoginOut(custom?: any) {
        this.callEventReport(MyGameEvents.LOGIN_OUT, custom)
    }
}
```

使用时只需初始化并调用 tracer 上的函数即可

```ts
const tracer = new MyGameTracer()
// 使用宏或者环境变量设置渠道和版本
tracer.version = MyGameVersions.V1_0_0
tracer.channel = MyGameChannels.WECHAT
// 报告充值事件
tracer.reportRecharge({money: 100})
```
