using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OnlineBusTicketBookingSystem.Models.PostModels
{
    public class TripAdd
    {
        [Required]
        public string LocationFrom { get; set; }
        [Required]
        public string LocationTo { get; set; }
        [Required]
        public DateTime Timing { get; set; }
        [Required]
        public int BusId { get; set; }
    }
}