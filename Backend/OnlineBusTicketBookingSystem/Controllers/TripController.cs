using OnlineBusTicketBookingSystem.Attributes;
using OnlineBusTicketBookingSystem.Models;
using OnlineBusTicketBookingSystem.Models.PostModels;
using OnlineBusTicketBookingSystem.Models.ResponseModel;
using OnlineBusTicketBookingSystem.Repositories;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OnlineBusTicketBookingSystem.Controllers
{
    [RoutePrefix("api/trips"),BasicAuth]
    public class TripController : ApiController
    {
        private TripRepository tripRepository = new TripRepository();

        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(this.tripRepository.GetAll());
        }

        [Route("{id}")]
        public IHttpActionResult GetByTripId(int id)
        {
            Trip trip = this.tripRepository.Get(id);
            if(trip != null)
            {
                return Ok(trip);
            }
            return StatusCode(HttpStatusCode.NotFound);
        }

        [Route("{id}/passanger-reporting")]
        public IHttpActionResult GetPassangerReportingByTripId(int id)
        {
            PassangerReporting passangerReporting = this.tripRepository.GetPassangerReporting(id);
            if (passangerReporting != null)
            {
                return Ok(passangerReporting);
            }
            return StatusCode(HttpStatusCode.NotFound);
        }

        [Route("")]
        public IHttpActionResult Post(TripAdd trip)
        {
            if (ModelState.IsValid)
            {
                var keyValuePairs = this.tripRepository.AddTrip(trip, Request.Properties["vendor"] as Vendor);

                if (keyValuePairs.ContainsKey("Success"))
                {
                    return Created("", keyValuePairs["Success"]);
                }
                else if (keyValuePairs.ContainsKey("Errors"))
                {
                    return Content(HttpStatusCode.Conflict, new { Errors = keyValuePairs["Errors"] });
                }
                else
                {
                    return StatusCode(HttpStatusCode.BadRequest);
                }
            }
            else
            {
                var errors = new Hashtable();
                foreach (var pair in ModelState)
                {
                    if (pair.Value.Errors.Count > 0)
                    {
                        errors[pair.Key] = pair.Value.Errors.Select(error => error.ErrorMessage).ToList().ElementAt(0);
                    }
                }
                return Content(HttpStatusCode.BadRequest, new { Errors = errors });
            }
        }

        [Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            Trip trip = this.tripRepository.Get(id);
            if(trip == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                Vendor vendor = Request.Properties["vendor"] as Vendor;
                if (trip.Bus.VendorId != vendor.VendorId)
                {
                    return Unauthorized();
                }
                else
                {
                    int booked = trip.Bookings.Count;
                    if(booked == 0)
                    {
                        this.tripRepository.Delete(id);
                        return StatusCode(HttpStatusCode.NoContent);
                    }
                    else
                    {
                        int reserved = trip.Bookings.Where(b => b.SeatStatus == "reserved").ToList().Count;
                        if((booked - reserved) == 0)
                        {
                            this.tripRepository.Delete(id);
                            return StatusCode(HttpStatusCode.NoContent);
                        }
                        else
                        {
                            return Unauthorized();
                        }

                    }
                    
                }
            }
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
            //List<Trip> trips = tripRepository.GetAll().ToList();
            return Ok(trips);
        }

        [Route("~/api/vendors/{id}/trips/active")]
        public IHttpActionResult GetTripsByVendorId(int id)
        {
            Vendor vendor = Request.Properties["vendor"] as Vendor;
            List<Trip> trips = tripRepository.GetAll().Where(t => t.Bus.VendorId == vendor.VendorId && t.Timing > DateTime.Now).ToList();

            BusRepository busRepository = new BusRepository();

            //foreach(var trip in trips)
            //{
            //    trip.Bus = busRepository.Get((int)trip.BusId);
            //}
            if (trips.Count > 0)
            {
                return Ok(trips);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }
        [Route("~/api/vendors/{id}/trips/history")]
        public IHttpActionResult GetTripHistoryByVendorId(int id)
        {
            Vendor vendor = Request.Properties["vendor"] as Vendor;
            List<Trip> trips = this.tripRepository.GetAll().Where(t => t.Bus.VendorId == vendor.VendorId && t.Timing <= DateTime.Now).ToList();
            if (trips.Count > 0)
            {
                return Ok(trips);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }
    }
}
