package com.lingames.sdk.m4399;

import android.util.Log;
import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;

/**
 * Clever SDK 4399 自动化桥接类
 * 此文件位于 SDK 的 native 目录下，Cocos 构建时会自动包含它
 */
public class M4399Bridge {
    private static final String TAG = "M4399Bridge";

    public static void init(String appId, String appKey) {
        CocosHelper.getActivity().runOnUiThread(() -> {
            Log.d(TAG, "M4399 SDK Initializing via Automation: " + appId);
            // 调用 4399 SDK 初始化
        });
    }

    public static void login() {
        CocosHelper.getActivity().runOnUiThread(() -> {
            Log.d(TAG, "M4399 Login via Automation");
            // 模拟登录成功回调
            String result = "{\"uid\":\"4399_user_123\", \"token\":\"session_abc\"}";
            sendToJS("window.onM4399LoginSuccess('" + result + "')");
        });
    }

    private static void sendToJS(final String jsCode) {
        CocosHelper.runOnGameThread(new Runnable() {
            @Override
            public void run() {
                CocosJavascriptJavaBridge.evalString(jsCode);
            }
        });
    }
}
