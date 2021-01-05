using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineBusTicketBookingSystem.Models
{
    public class Bus
    {
        public int BusId { get; set; }
        public int TotalSeat { get; set; }
        public string BusType { get; set; }
        public string BusName { get; set; }
        public string BusStatus { get; set; }
        public double PerSeatFair { get; set; }
        public int? VendorId { get; set; }
        //[JsonIgnore]
        public virtual Vendor Vendor { get; set; }
        public virtual ICollection<Trip> Trips { get; set; }
    }
}