using System;
using System.Globalization;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using CleverSDK.Internal;
using CleverSDK.Models;
using UnityEngine;
using UnityEngine.Networking;

namespace CleverSDK
{
    public class CleverSdkWeChat : BaseCleverSdk<WeChatSdkConfig>
    {
        [Serializable]
        private sealed class GrantFields
        {
            public string grant_type = "authorization_code";
        }

        [Serializable]
        private sealed class WeChatLoginRequest
        {
            public string platform;
            public string project_id;
            public string login_code;
            public GrantFields Fields = new GrantFields();
        }

        [Serializable]
        private sealed class WeChatLoginResponse
        {
            public WeChatLoginData data;
        }

        [Serializable]
        private sealed class EventReportRequest
        {
            public string player_anonymous;
            public string player_id;
            public string channel_id;
            public string version_id;
            public string event_id;
            public string custom_json;
        }

        [Serializable]
        private sealed class JsResult
        {
            public bool ok;
            public string code;
            public string errMsg;
            public string response;
        }

#if UNITY_WEBGL && !UNITY_EDITOR
        [DllImport("__Internal")]
        private static extern void CleverSdk_WxLogin(string gameObjectName, string methodName, string callbackId);

        [DllImport("__Internal")]
        private static extern void CleverSdk_WxRequest(string url, string headersJson, string bodyJson, string gameObjectName, string methodName, string callbackId);
#endif

        public CleverSdkWeChat(WeChatSdkConfig config) : base(config)
        {
        }

        public override async Task<LoginData> LoginAsync()
        {
            if (string.IsNullOrWhiteSpace(Config.project_id))
                throw new ArgumentException("project_id is required");
            if (string.IsNullOrWhiteSpace(Config.sdk_key))
                throw new ArgumentException("sdk_key is required");
            if (string.IsNullOrWhiteSpace(Config.sdk_login_url))
                throw new ArgumentException("sdk_login_url is required");

            var loginCode = await GetWeChatLoginCodeAsync().ConfigureAwait(false);

            var req = new WeChatLoginRequest
            {
                platform = Config.platform,
                project_id = Config.project_id,
                login_code = loginCode
            };

            var reqBody = JsonUtility.ToJson(req);
            var ts = DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(CultureInfo.InvariantCulture);
            var authorization = Sha256HexLower(Config.sdk_key + "&POST&" + ts + "&" + reqBody);

            var loginResponseJson = await PostJsonAsync(
                    Config.sdk_login_url,
                    reqBody,
                    ts,
                    authorization
                )
                .ConfigureAwait(false);

            var resp = JsonUtility.FromJson<WeChatLoginResponse>(loginResponseJson);
            if (resp == null || resp.data == null)
            {
                throw new InvalidOperationException("Invalid login response");
            }

            return resp.data;
        }

        public override async Task<bool> ReportEventAsync(string eventId, string customJson)
        {
            if (string.IsNullOrWhiteSpace(eventId))
                throw new ArgumentException("eventId is required");

            var endpoint = Config.event_endpoint;

            var req = new EventReportRequest
            {
                player_anonymous = Context?.player_anonymous,
                player_id = Context?.player_id,
                channel_id = Context?.channel_id,
                version_id = Context?.version_id,
                event_id = eventId,
                custom_json = customJson
            };

            var baseJson = JsonUtility.ToJson(req);
            var bodyJson = baseJson.Replace("\"custom_json\":", "\"custom\":");

            await PostJsonAsync(endpoint, bodyJson).ConfigureAwait(false);
            return true;
        }

        private Task<string> GetWeChatLoginCodeAsync()
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            var tcs = new TaskCompletionSource<string>();
            var bridge = CleverSdkBridge.Instance;
            var id = bridge.RegisterCallback(body =>
            {
                try
                {
                    var result = JsonUtility.FromJson<JsResult>(body);
                    if (result == null || !result.ok || string.IsNullOrWhiteSpace(result.code))
                    {
                        tcs.TrySetException(new InvalidOperationException(result?.errMsg ?? "wx.login failed"));
                        return;
                    }

                    tcs.TrySetResult(result.code);
                }
                catch (Exception e)
                {
                    tcs.TrySetException(e);
                }
                finally
                {
                    bridge.UnregisterCallback(id);
                }
            });

            CleverSdk_WxLogin(bridge.gameObject.name, nameof(CleverSdkBridge.CleverSdkInvoke), id);
            return tcs.Task;
#else
            return Task.FromException<string>(new PlatformNotSupportedException("WeChat login requires WebGL or WeChat runtime"));
#endif
        }

        private async Task<string> PostJsonAsync(string url, string bodyJson, string unixTs = null, string authorization = null)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            var tcs = new TaskCompletionSource<string>();
            var bridge = CleverSdkBridge.Instance;
            var id = bridge.RegisterCallback(body =>
            {
                try
                {
                    var result = JsonUtility.FromJson<JsResult>(body);
                    if (result == null || !result.ok || string.IsNullOrWhiteSpace(result.response))
                    {
                        tcs.TrySetException(new InvalidOperationException(result?.errMsg ?? "request failed"));
                        return;
                    }

                    tcs.TrySetResult(result.response);
                }
                catch (Exception e)
                {
                    tcs.TrySetException(e);
                }
                finally
                {
                    bridge.UnregisterCallback(id);
                }
            });

            var headersJson = "{\"content-type\":\"application/json\"";
            if (!string.IsNullOrEmpty(authorization)) headersJson += ",\"Authorization\":\"" + EscapeJson(authorization) + "\"";
            if (!string.IsNullOrEmpty(unixTs)) headersJson += ",\"X-MARS-Timestamp\":\"" + EscapeJson(unixTs) + "\"";
            headersJson += "}";

            CleverSdk_WxRequest(url, headersJson, bodyJson, bridge.gameObject.name, nameof(CleverSdkBridge.CleverSdkInvoke), id);
            return await tcs.Task.ConfigureAwait(false);
#else
            using var req = new UnityWebRequest(url, "POST");
            var bytes = Encoding.UTF8.GetBytes(bodyJson);
            req.uploadHandler = new UploadHandlerRaw(bytes);
            req.downloadHandler = new DownloadHandlerBuffer();
            req.SetRequestHeader("content-type", "application/json");
            if (!string.IsNullOrEmpty(authorization)) req.SetRequestHeader("Authorization", authorization);
            if (!string.IsNullOrEmpty(unixTs)) req.SetRequestHeader("X-MARS-Timestamp", unixTs);

            var op = req.SendWebRequest();
            while (!op.isDone)
            {
                await Task.Yield();
            }

            if (req.result != UnityWebRequest.Result.Success)
            {
                throw new InvalidOperationException(req.error ?? "request failed");
            }

            return req.downloadHandler.text;
#endif
        }

        private static string Sha256HexLower(string input)
        {
            using var sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(input);
            var hash = sha.ComputeHash(bytes);
            var sb = new StringBuilder(hash.Length * 2);
            for (var i = 0; i < hash.Length; i++)
            {
                sb.Append(hash[i].ToString("x2", CultureInfo.InvariantCulture));
            }

            return sb.ToString();
        }

        private static string EscapeJson(string s)
        {
            if (string.IsNullOrEmpty(s)) return "";
            return s.Replace("\\", "\\\\").Replace("\"", "\\\"");
        }
    }
}
