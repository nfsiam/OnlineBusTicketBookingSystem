using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OnlineBusTicketBookingSystem.Models.PostModels
{
    public class BusAdd
    {
        [Required]
        public int TotalSeat { get; set; }
        [Required]
        public string BusType { get; set; }
        [Required]
        public string BusName { get; set; }
        [Required,Range(1,4000)]
        public double PerSeatFair { get; set; }
    }
}