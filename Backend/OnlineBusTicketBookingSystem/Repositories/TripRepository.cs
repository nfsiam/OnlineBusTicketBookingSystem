using OnlineBusTicketBookingSystem.Models;
using OnlineBusTicketBookingSystem.Models.PostModels;
using OnlineBusTicketBookingSystem.Models.ResponseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineBusTicketBookingSystem.Repositories
{
    public class TripRepository:Repository<Trip>
    {
        public Dictionary<string, Dictionary<string, string>> AddTrip(TripAdd trip, Vendor vendor)
        {
            Dictionary<string, Dictionary<string, string>> keyValuePairs = new Dictionary<string, Dictionary<string, string>>();
            Dictionary<string, string> errors = new Dictionary<string, string>();
            Bus bus = new BusRepository().Get(trip.BusId);
            if(bus == null)
            {
                errors.Add("user.BusId", "Invalid Bus");
            }
            else if (bus.VendorId != vendor.VendorId)
            {
                errors.Add("user.BusId", "Invalid Bus");
            }
            if(trip.Timing <= DateTime.Now)
            {
                errors.Add("user.Timing", "Can not shedule a trip on a past date");
            }
            if(trip.LocationTo == trip.LocationFrom)
            {
                errors.Add("user.LocationTo", "Can not shedule a trip on same terminal");
            }
            if (errors.Count == 0)
            {
                Trip _trip = new Trip();
                _trip.BusId = trip.BusId;
                _trip.LocationFrom = trip.LocationFrom;
                _trip.LocationTo = trip.LocationTo;
                _trip.Timing = trip.Timing;

                this.Insert(_trip);
                keyValuePairs.Add("Success", new Dictionary<string, string>() { { "Msg", "Trip Scheduled successfully" } });
            }
            else
            {
                keyValuePairs.Add("Errors", errors);
            }
            return keyValuePairs;
        }

        public PassangerReporting GetPassangerReporting(int id)
        {
            Trip trip = this.Get(id);
            PassangerReporting passangerReporting = new PassangerReporting();
            passangerReporting.Bus = trip.Bus.Vendor.VendorName + " " + trip.Bus.BusName + " [" + trip.Bus.BusId + "] " + " - " + trip.TripId;
            passangerReporting.JourneyDateTime = trip.Timing.ToString("dddd, dd MMMM yyyy");
            passangerReporting.Path = trip.LocationFrom + " to " + trip.LocationTo;
            passangerReporting.SoldSeat = trip.Bookings.Where(b => b.SeatStatus != "reserved").ToList().Count.ToString() + " / " + trip.Bus.TotalSeat;

            passangerReporting.PassangerSeats = new List<PassangerSeat>();

            var bookings = trip.Bookings.Where(b => b.SeatStatus != "reserved").ToList();
            List<int> pids = new List<int>();

            foreach(var booking in bookings)
            {
                if(!pids.Contains((int)booking.PassangerId))
                {
                    pids.Add((int)booking.PassangerId);
                }
            }
            foreach(int pid in pids)
            {
                List<Booking> _pbookings = bookings.Where(b => b.PassangerId == pid).ToList();

                PassangerSeat passangerSeat = new PassangerSeat();
                passangerSeat.PassangerName = _pbookings.ElementAt(0).Passanger.Name;
                passangerSeat.Seats = new List<string>();

                foreach(var _pb in _pbookings)
                {
                    if(!passangerSeat.Seats.Contains(_pb.Seat))
                    {
                        passangerSeat.Seats.Add(_pb.Seat);
                    }
                }
                passangerReporting.PassangerSeats.Add(passangerSeat);
            }

            return passangerReporting;
        }
    }
}