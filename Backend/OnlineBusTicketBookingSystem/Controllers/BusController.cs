using OnlineBusTicketBookingSystem.Attributes;
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
    [RoutePrefix("api/buses"),BasicAuth]
    public class BusController : ApiController
    {
        private BusRepository busRepository = new BusRepository();
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(this.busRepository.GetAll());
        }

        [Route("~/api/vendors/{id}/buses")]
        public IHttpActionResult GetAllByVendorId(int id)
        {
            return Ok(this.busRepository.GetAll().Where(b => b.VendorId == id && b.BusStatus != "archived"));
        }
        
        [Route("archive")]
        public IHttpActionResult PutBusIntoArchive(Bus bus)
        {
            if(bus == null)
            {
                return BadRequest();
            }
            else if(bus.BusId < 1)
            {
                return BadRequest();
            }
            return StatusCode(this.busRepository.ArchiveBus(bus, Request.Properties["vendor"] as Vendor));
        }
    }
}
