using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OnlineBusTicketBookingSystem.Models
{
    public class Booking
    {
        public int BookingId { get; set; }
        public DateTime BookingTime { get; set; }
        [ForeignKey("Passanger")]
        public int? PassangerId { get; set; }
        [JsonIgnore]
        public virtual User Passanger { get; set; }
        public int? TripId { get; set; }
        //[JsonIgnore]
        public virtual Trip Trip { get; set; }
        public string Seat { get; set; }
        public string SeatStatus { get; set; }
    }
}