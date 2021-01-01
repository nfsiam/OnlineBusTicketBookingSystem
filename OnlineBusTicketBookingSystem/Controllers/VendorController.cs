using OnlineBusTicketBookingSystem.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OnlineBusTicketBookingSystem.Controllers
{
    public class VendorController : ApiController
    {
        private VendorRepository vendorRepository = new VendorRepository();
        public IHttpActionResult Get()
        {
            return Ok(this.vendorRepository.GetAll());
        }
    }
}
