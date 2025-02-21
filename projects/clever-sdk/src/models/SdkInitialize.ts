export type SdkInitialize = {} & wxInitialize & ttInitialize & ksInitialize & ggInitialize;

export interface ttInitialize {
}

export interface ksInitialize {
}


export type wxInitialize = {
    wx: any
}

export interface ggInitialize {
    adSenseId: string
}
