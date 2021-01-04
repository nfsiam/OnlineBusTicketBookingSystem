using OnlineBusTicketBookingSystem.Attributes;
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
    [RoutePrefix("api/bookings"),BasicAuth]
    public class BookingController : ApiController
    {
        private BookingRepository bookingRepository = new BookingRepository();

        [Route("{pid}")]
        public IHttpActionResult GetByPassangerId(int pid)
        {
            return Ok(this.bookingRepository.GetAll().Where(b=>b.PassangerId==pid).ToList());
        }
        
        [Route("")]
        public IHttpActionResult Post(BookingSeat bookingSeat)
        {
            var res = bookingRepository.ConfirmBooking(bookingSeat, Request.Properties["user"] as User);
            if(res == "invalid request")
            {
                return StatusCode(HttpStatusCode.BadRequest);
            }
            else if(res == "already booked")
            {
                return StatusCode(HttpStatusCode.Conflict);
            }
            else
            {
                return Ok(bookingSeat);
            }
        }
        [Route("reserve")]
        public IHttpActionResult PostReserveSeat(BookingSeat bookingSeat)
        {
            var res = bookingRepository.ConfirmReserving(bookingSeat, Request.Properties["vendor"] as Vendor);
            if(res == "invalid request")
            {
                return StatusCode(HttpStatusCode.BadRequest);
            }
            else if(res == "already booked")
            {
                return StatusCode(HttpStatusCode.Conflict);
            }
            else
            {
                return Ok(bookingSeat);
            }
        }

        [Route("release")]
        public IHttpActionResult PostReleaseSeat(BookingSeat bookingSeat)
        {
            var res = bookingRepository.ConfirmReleasing(bookingSeat, Request.Properties["vendor"] as Vendor);
            if (res == "invalid request")
            {
                return StatusCode(HttpStatusCode.BadRequest);
            }
            else if (res == "already booked")
            {
                return StatusCode(HttpStatusCode.Conflict);
            }
            else
            {
                return Ok(bookingSeat);
            }
        }
    }
}
