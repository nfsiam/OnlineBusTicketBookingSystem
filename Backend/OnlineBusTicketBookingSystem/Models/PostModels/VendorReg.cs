using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OnlineBusTicketBookingSystem.Models.PostModels
{
    public class VendorReg
    {
        [Required, MinLength(4)]
        public string Username { get; set; }
        [Required, RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "Please give a proper Email Address")]
        public string Email { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string VendorName { get; set; }
        [Required, MinLength(4)]
        public string Password { get; set; }
    }
}