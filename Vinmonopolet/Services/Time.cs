using System;
using NodaTime;
using NodaTime.Extensions;

namespace Vinmonopolet.Services
{
    public class Time : ITime
    {
        public DateTime OsloDate => SystemClock.Instance
                                    .InZone(DateTimeZoneProviders.Tzdb["Europe/Oslo"])
                                    .GetCurrentDate().ToDateTimeUnspecified().Date;
    }
}