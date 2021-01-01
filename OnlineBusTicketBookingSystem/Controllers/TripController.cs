using OnlineBusTicketBookingSystem.Models;
using OnlineBusTicketBookingSystem.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OnlineBusTicketBookingSystem.Controllers
{
    [RoutePrefix("api/trips")]
    public class TripController : ApiController
    {
        private TripRepository tripRepository = new TripRepository();

        public IHttpActionResult Get()
        {
            return Ok(this.tripRepository.GetAll());
        }
        public IHttpActionResult GetByTripId(int id)
        {
            return Ok(this.tripRepository.Get(id));
        }
        [Route("~/api/passangers/{id}/trips")]
        public IHttpActionResult GetByPassangerId(int id)
        {
            BookingRepository bookingRepository = new BookingRepository();
            List<Booking> bookings =  bookingRepository.GetAll().Where(b => b.PassangerId == id).ToList();
            List<Trip> trips = new List<Trip>();
            foreach(var booking in bookings)
            {
                if(!trips.Contains(booking.Trip))
                {
                    trips.Add(booking.Trip);
                }
            }
            return Ok(trips);
        }
    }
}
