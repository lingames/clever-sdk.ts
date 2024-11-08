mergeInto(LibraryManager.library, {
    CleverSdk_WxLogin: function (gameObjectNamePtr, methodNamePtr, callbackIdPtr) {
        var gameObjectName = UTF8ToString(gameObjectNamePtr);
        var methodName = UTF8ToString(methodNamePtr);
        var callbackId = UTF8ToString(callbackIdPtr);

        var send = function (obj) {
            var payload = callbackId + "|" + JSON.stringify(obj);
            if (typeof unityInstance !== 'undefined' && unityInstance && unityInstance.SendMessage) {
                unityInstance.SendMessage(gameObjectName, methodName, payload);
                return;
            }
            if (typeof SendMessage !== 'undefined') {
                SendMessage(gameObjectName, methodName, payload);
            }
        };

        if (typeof wx === 'undefined' || !wx || typeof wx.login !== 'function') {
            send({ ok: false, errMsg: 'wx.login not available' });
            return;
        }

        wx.login({
            success: function (res) {
                if (res && res.code) {
                    send({ ok: true, code: res.code });
                } else {
                    send({ ok: false, errMsg: (res && res.errMsg) ? res.errMsg : 'wx.login missing code' });
                }
            },
            fail: function (err) {
                var msg = (err && (err.errMsg || err.message)) ? (err.errMsg || err.message) : 'wx.login failed';
                send({ ok: false, errMsg: msg });
            }
        });
    },

    CleverSdk_WxRequest: function (urlPtr, headersJsonPtr, bodyJsonPtr, gameObjectNamePtr, methodNamePtr, callbackIdPtr) {
        var url = UTF8ToString(urlPtr);
        var headersJson = UTF8ToString(headersJsonPtr);
        var bodyJson = UTF8ToString(bodyJsonPtr);
        var gameObjectName = UTF8ToString(gameObjectNamePtr);
        var methodName = UTF8ToString(methodNamePtr);
        var callbackId = UTF8ToString(callbackIdPtr);

        var send = function (obj) {
            var payload = callbackId + "|" + JSON.stringify(obj);
            if (typeof unityInstance !== 'undefined' && unityInstance && unityInstance.SendMessage) {
                unityInstance.SendMessage(gameObjectName, methodName, payload);
                return;
            }
            if (typeof SendMessage !== 'undefined') {
                SendMessage(gameObjectName, methodName, payload);
            }
        };

        var headers = {};
        try {
            headers = JSON.parse(headersJson || '{}');
        } catch (e) {
            headers = {};
        }

        if (typeof wx !== 'undefined' && wx && typeof wx.request === 'function') {
            wx.request({
                url: url,
                method: 'POST',
                header: headers,
                data: JSON.parse(bodyJson),
                dataType: 'json',
                success: function (fine) {
                    send({ ok: true, response: JSON.stringify(fine) });
                },
                fail: function (fail) {
                    var msg = (fail && (fail.errMsg || fail.message)) ? (fail.errMsg || fail.message) : 'wx.request failed';
                    send({ ok: false, errMsg: msg });
                }
            });
            return;
        }

        if (typeof fetch === 'function') {
            fetch(url, {
                method: 'POST',
                headers: headers,
                body: bodyJson
            })
                .then(function (r) { return r.text(); })
                .then(function (text) { send({ ok: true, response: text }); })
                .catch(function (e) { send({ ok: false, errMsg: (e && e.message) ? e.message : 'fetch failed' }); });
            return;
        }

        send({ ok: false, errMsg: 'no wx.request or fetch' });
    }
    ,

    CleverSdk_TtLogin: function (gameObjectNamePtr, methodNamePtr, callbackIdPtr) {
        var gameObjectName = UTF8ToString(gameObjectNamePtr);
        var methodName = UTF8ToString(methodNamePtr);
        var callbackId = UTF8ToString(callbackIdPtr);

        var send = function (obj) {
            var payload = callbackId + "|" + JSON.stringify(obj);
            if (typeof unityInstance !== 'undefined' && unityInstance && unityInstance.SendMessage) {
                unityInstance.SendMessage(gameObjectName, methodName, payload);
                return;
            }
            if (typeof SendMessage !== 'undefined') {
                SendMessage(gameObjectName, methodName, payload);
            }
        };

        if (typeof tt === 'undefined' || !tt || typeof tt.login !== 'function') {
            send({ ok: false, errMsg: 'tt.login not available' });
            return;
        }

        tt.login({
            force: false,
            success: function (res) {
                if (res && res.code) {
                    send({ ok: true, code: res.code });
                } else {
                    send({ ok: false, errMsg: (res && res.errMsg) ? res.errMsg : 'tt.login missing code' });
                }
            },
            fail: function (err) {
                var msg = (err && (err.errMsg || err.message)) ? (err.errMsg || err.message) : 'tt.login failed';
                send({ ok: false, errMsg: msg });
            }
        });
    },

    CleverSdk_TtRequest: function (urlPtr, headersJsonPtr, bodyJsonPtr, gameObjectNamePtr, methodNamePtr, callbackIdPtr) {
        var url = UTF8ToString(urlPtr);
        var headersJson = UTF8ToString(headersJsonPtr);
        var bodyJson = UTF8ToString(bodyJsonPtr);
        var gameObjectName = UTF8ToString(gameObjectNamePtr);
        var methodName = UTF8ToString(methodNamePtr);
        var callbackId = UTF8ToString(callbackIdPtr);

        var send = function (obj) {
            var payload = callbackId + "|" + JSON.stringify(obj);
            if (typeof unityInstance !== 'undefined' && unityInstance && unityInstance.SendMessage) {
                unityInstance.SendMessage(gameObjectName, methodName, payload);
                return;
            }
            if (typeof SendMessage !== 'undefined') {
                SendMessage(gameObjectName, methodName, payload);
            }
        };

        var headers = {};
        try {
            headers = JSON.parse(headersJson || '{}');
        } catch (e) {
            headers = {};
        }

        if (typeof tt !== 'undefined' && tt && typeof tt.request === 'function') {
            var dataObj = null;
            try {
                dataObj = JSON.parse(bodyJson);
            } catch (e2) {
                dataObj = bodyJson;
            }

            tt.request({
                url: url,
                method: 'POST',
                header: headers,
                data: dataObj,
                dataType: 'json',
                success: function (fine) {
                    send({ ok: true, response: JSON.stringify(fine) });
                },
                fail: function (fail) {
                    var msg = (fail && (fail.errMsg || fail.message)) ? (fail.errMsg || fail.message) : 'tt.request failed';
                    send({ ok: false, errMsg: msg });
                }
            });
            return;
        }

        if (typeof fetch === 'function') {
            fetch(url, {
                method: 'POST',
                headers: headers,
                body: bodyJson
            })
                .then(function (r) { return r.text(); })
                .then(function (text) { send({ ok: true, response: text }); })
                .catch(function (e) { send({ ok: false, errMsg: (e && e.message) ? e.message : 'fetch failed' }); });
            return;
        }

        send({ ok: false, errMsg: 'no tt.request or fetch' });
    }
});
