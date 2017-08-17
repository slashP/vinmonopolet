using System.ComponentModel.DataAnnotations;

namespace Vinmonopolet.Models.AccountViewModels
{
    public class ExternalLoginViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
