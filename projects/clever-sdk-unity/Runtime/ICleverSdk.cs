using System;
using System.Threading.Tasks;
using CleverSDK.Models;

namespace CleverSDK
{
    public interface ICleverSdk
    {
        string Platform { get; }
        Task<LoginData> LoginAsync();
        void ReportContext(EventReportContext context);
        Task<bool> ReportEventAsync(string eventId, string customJson);
    }

    [Serializable]
    public abstract class BaseCleverSdk<TConfig> : ICleverSdk where TConfig : SdkConfig
    {
        protected TConfig Config { get; }
        protected EventReportContext Context { get; private set; }

        public string Platform => Config.platform;

        protected BaseCleverSdk(TConfig config)
        {
            Config = config ?? throw new ArgumentNullException(nameof(config));
        }

        public abstract Task<LoginData> LoginAsync();

        public virtual void ReportContext(EventReportContext context)
        {
            Context = context;
        }

        public abstract Task<bool> ReportEventAsync(string eventId, string customJson);
    }
}
