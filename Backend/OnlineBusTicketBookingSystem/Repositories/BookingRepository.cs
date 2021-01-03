using OnlineBusTicketBookingSystem.Models;
using OnlineBusTicketBookingSystem.Models.PostModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineBusTicketBookingSystem.Repositories
{
    public class BookingRepository:Repository<Booking>
    {
        private TripRepository tripRepository = new TripRepository();
        public string ConfirmBooking(BookingSeat bookingSeat,User user)
        {
            if(bookingSeat.TripId > 0 && bookingSeat.Seats.Count > 0)
            {
                Trip trip = tripRepository.Get(bookingSeat.TripId);
                if(trip != null)
                {
                    if(trip.Timing > DateTime.Now)
                    {
                        foreach(string seat in bookingSeat.Seats)
                        {
                            if(this.GetAll().Where(b => b.TripId == trip.TripId && b.Seat == seat).ToList().Count > 0)
                            {
                                return "already booked";
                            }
                        }
                        foreach (string seat in bookingSeat.Seats)
                        {
                            Booking booking = new Booking();

                            booking.Seat = seat;
                            booking.TripId = trip.TripId;
                            booking.BookingTime = DateTime.Now;
                            booking.PassangerId = user.UserId;

                            this.Insert(booking);
                            return "success";
                        }
                    }
                    return "invalid request";
                }
                return "invalid request";
            }
            return "invalid request";
        }
    }
}