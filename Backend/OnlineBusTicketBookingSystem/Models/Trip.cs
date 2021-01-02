using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineBusTicketBookingSystem.Models
{
    public class Trip
    {
        public int TripId { get; set; }
        public string LocationFrom { get; set; }
        public string LocationTo { get; set; }
        public DateTime Timing { get; set; }
        public int? BusId { get; set; }
        public virtual Bus Bus { get; set; }
        //[JsonIgnore]
        public virtual ICollection<Booking> Bookings { get; set; }
    }
}