using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineBusTicketBookingSystem.Models.PostModels
{
    public class BookingSeat
    {
        public int TripId { get; set; }
        public List<string> Seats { get; set; }
    }
}