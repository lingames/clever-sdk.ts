using System;
using System.Collections.Generic;
using UnityEngine;

namespace CleverSDK.Internal
{
    internal sealed class CleverSdkBridge : MonoBehaviour
    {
        private static CleverSdkBridge _instance;

        private readonly Queue<Action> _mainThread = new Queue<Action>();
        private readonly Dictionary<string, Action<string>> _callbacks = new Dictionary<string, Action<string>>();

        public static CleverSdkBridge Instance
        {
            get
            {
                if (_instance != null)
                {
                    return _instance;
                }

                var go = new GameObject("CleverSdkBridge");
                DontDestroyOnLoad(go);
                _instance = go.AddComponent<CleverSdkBridge>();
                return _instance;
            }
        }

        public string RegisterCallback(Action<string> callback)
        {
            var id = Guid.NewGuid().ToString("N");
            _callbacks[id] = callback;
            return id;
        }

        public void UnregisterCallback(string id)
        {
            _callbacks.Remove(id);
        }

        public void CleverSdkInvoke(string payload)
        {
            if (string.IsNullOrEmpty(payload))
            {
                return;
            }

            var sep = payload.IndexOf('|');
            if (sep <= 0)
            {
                return;
            }

            var id = payload.Substring(0, sep);
            var body = payload.Substring(sep + 1);

            if (!_callbacks.TryGetValue(id, out var cb))
            {
                return;
            }

            lock (_mainThread)
            {
                _mainThread.Enqueue(() => cb(body));
            }
        }

        private void Update()
        {
            while (true)
            {
                Action action = null;
                lock (_mainThread)
                {
                    if (_mainThread.Count == 0)
                    {
                        break;
                    }

                    action = _mainThread.Dequeue();
                }

                action?.Invoke();
            }
        }
    }
}

