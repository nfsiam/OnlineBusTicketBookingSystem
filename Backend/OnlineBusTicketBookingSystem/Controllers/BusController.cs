using OnlineBusTicketBookingSystem.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OnlineBusTicketBookingSystem.Controllers
{
    public class BusController : ApiController
    {
        private BusRepository busRepository = new BusRepository();
        public IHttpActionResult Get()
        {
            return Ok(this.busRepository.GetAll());
        }
    }
}
