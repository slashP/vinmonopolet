using Vinmonopolet.Models;

namespace Vinmonopolet.Data
{
    public class UserStorePreference
    {
        public int Id { get; set; }

        public string ApplicationUserId { get; set; }

        public virtual ApplicationUser User { get; set; }

        public string StoreId { get; set; }

        public virtual Store Store { get; set; }
    }
}