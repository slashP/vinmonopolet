using System.ComponentModel.DataAnnotations;

namespace Vinmonopolet.Models.AccountViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
