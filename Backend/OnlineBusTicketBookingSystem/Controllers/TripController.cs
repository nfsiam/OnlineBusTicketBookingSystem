using OnlineBusTicketBookingSystem.Models;
using OnlineBusTicketBookingSystem.Models.PostModels;
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

        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(this.tripRepository.GetAll());
        }
        public IHttpActionResult GetByTripId(int id)
        {
            return Ok(this.tripRepository.Get(id));
        }
        [Route("~/api/passangers/{id}/trips/active")]
        public IHttpActionResult GetActiveTripsByPassangerId(int id)
        {
            BookingRepository bookingRepository = new BookingRepository();
            List<Booking> bookings =  bookingRepository.GetAll().Where(b => b.PassangerId == id && b.Trip.Timing > DateTime.Now).ToList();
            List<Trip> trips = new List<Trip>();
            //List<Trip> trips = tripRepository.GetAll().Where(t=>t.Bookings.Contains())

            foreach(var booking in bookings)
            {
                if(!trips.Contains(booking.Trip))
                {
                    trips.Add(booking.Trip);
                }
            }
            return Ok(trips);
        }
        [Route("~/api/passangers/{id}/trips/history")]
        public IHttpActionResult GetTripHistoryByPassangerId(int id)
        {
            BookingRepository bookingRepository = new BookingRepository();
            List<Booking> bookings = bookingRepository.GetAll().Where(b => b.PassangerId == id && b.Trip.Timing <= DateTime.Now).ToList();
            List<Trip> trips = new List<Trip>();
            //List<Trip> trips = tripRepository.GetAll().Where(t=>t.Bookings.Contains())

            foreach (var booking in bookings)
            {
                if (!trips.Contains(booking.Trip))
                {
                    trips.Add(booking.Trip);
                }
            }
            return Ok(trips);
        }

        //[Route("search")]
        [Route("~/api/trips/search")]
        public IHttpActionResult PostSeacrhTrips(TripSearch trip)
        {
            List<Trip> trips = tripRepository.GetAll().Where(t => t.LocationFrom == trip.LocationFrom && t.LocationTo == trip.LocationTo && t.Timing == trip.JourneyDate).ToList();
            return Ok(trips);
        }
    }
}
