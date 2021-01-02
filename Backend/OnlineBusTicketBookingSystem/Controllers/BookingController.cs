using OnlineBusTicketBookingSystem.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OnlineBusTicketBookingSystem.Controllers
{
    public class BookingController : ApiController
    {
        private BookingRepository bookingRepository = new BookingRepository();

        public IHttpActionResult GetByPassangerId(int id)
        {
            return Ok(this.bookingRepository.GetAll().Where(b=>b.PassangerId==id).ToList());
        }
    }
}
