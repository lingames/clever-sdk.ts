using System;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using CleverSDK.Internal;
using CleverSDK.Models;
using UnityEngine;
using UnityEngine.Networking;

namespace CleverSDK
{
    public class CleverSdkDouyin : BaseCleverSdk<DouyinSdkConfig>
    {
        [Serializable]
        private sealed class DouyinLoginRequest
        {
            public string project_id;
            public string platform;
            public string login_code;
        }

        [Serializable]
        private sealed class DouyinLoginResponse
        {
            public DouyinLoginData data;
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
        private static extern void CleverSdk_TtLogin(string gameObjectName, string methodName, string callbackId);

        [DllImport("__Internal")]
        private static extern void CleverSdk_TtRequest(string url, string headersJson, string bodyJson, string gameObjectName, string methodName, string callbackId);
#endif

        public CleverSdkDouyin(DouyinSdkConfig config) : base(config)
        {
        }

        public override async Task<LoginData> LoginAsync()
        {
            if (string.IsNullOrWhiteSpace(Config.project_id))
                throw new ArgumentException("project_id is required");
            if (string.IsNullOrWhiteSpace(Config.sdk_login_url))
                throw new ArgumentException("sdk_login_url is required");

            var code = await GetDouyinLoginCodeAsync().ConfigureAwait(false);

            var req = new DouyinLoginRequest
            {
                project_id = Config.project_id,
                platform = Config.platform,
                login_code = code,
            };

            var bodyJson = JsonUtility.ToJson(req);
            var respJson = await PostJsonAsync(Config.sdk_login_url, bodyJson).ConfigureAwait(false);
            var resp = JsonUtility.FromJson<DouyinLoginResponse>(respJson);
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

        private Task<string> GetDouyinLoginCodeAsync()
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
                        tcs.TrySetException(new InvalidOperationException(result?.errMsg ?? "tt.login failed"));
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

            CleverSdk_TtLogin(bridge.gameObject.name, nameof(CleverSdkBridge.CleverSdkInvoke), id);
            return tcs.Task;
#else
            return Task.FromException<string>(new PlatformNotSupportedException("Douyin login requires WebGL or Douyin runtime"));
#endif
        }

        private async Task<string> PostJsonAsync(string url, string bodyJson)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            var tcs = new TaskCompletionSource<string>();
            var bridge = CleverSdkBridge.Instance;
            var id = bridge.RegisterCallback(body =>
            {
                try
                {
                    var result = JsonUtility.FromJson<JsResult>(body);
                    if (result == null || !result.ok)
                    {
                        tcs.TrySetException(new InvalidOperationException(result?.errMsg ?? "request failed"));
                        return;
                    }

                    tcs.TrySetResult(result.response ?? "{}");
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

            var headersJson = "{\"content-type\":\"application/json\"}";
            CleverSdk_TtRequest(url, headersJson, bodyJson, bridge.gameObject.name, nameof(CleverSdkBridge.CleverSdkInvoke), id);
            return await tcs.Task.ConfigureAwait(false);
#else
            using var req = new UnityWebRequest(url, "POST");
            var bytes = Encoding.UTF8.GetBytes(bodyJson);
            req.uploadHandler = new UploadHandlerRaw(bytes);
            req.downloadHandler = new DownloadHandlerBuffer();
            req.SetRequestHeader("content-type", "application/json");

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
    }
}
