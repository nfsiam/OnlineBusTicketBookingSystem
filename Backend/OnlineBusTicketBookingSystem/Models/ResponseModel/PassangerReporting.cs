using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineBusTicketBookingSystem.Models.ResponseModel
{
    public class PassangerSeat
    {
        public string PassangerName { get; set; }
        public List<string> Seats { get; set; }
    }
    public class PassangerReporting
    {
        public string Bus { get; set; }
        public string Path { get; set; }
        public string SoldSeat { get; set; }
        public string JourneyDateTime { get; set; }
        public List<PassangerSeat> PassangerSeats { get; set; }

    }
}