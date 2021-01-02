using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineBusTicketBookingSystem.Models
{
    public class Vendor
    {
        public int VendorId { get; set; }
        public string VendorName { get; set; }
        [JsonIgnore]
        public virtual ICollection<Bus> Buses { get; set; }
    }
}