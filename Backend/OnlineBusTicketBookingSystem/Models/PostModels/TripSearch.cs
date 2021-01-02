using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineBusTicketBookingSystem.Models.PostModels
{
    public class TripSearch
    {
        public string LocationFrom { get; set; }
        public string LocationTo { get; set; }
        public DateTime JourneyDate { get; set; }
    }
}