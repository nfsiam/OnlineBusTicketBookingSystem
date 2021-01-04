using OnlineBusTicketBookingSystem.Attributes;
using OnlineBusTicketBookingSystem.Models;
using OnlineBusTicketBookingSystem.Models.PostModels;
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
    [RoutePrefix("api/buses"),BasicAuth]
    public class BusController : ApiController
    {
        private BusRepository busRepository = new BusRepository();
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(this.busRepository.GetAll());
        }

        [Route("")]
        public IHttpActionResult Post(BusAdd bus)
        {
            if (ModelState.IsValid)
            {
                Dictionary<string, Dictionary<string, string>> keyValuePairs = this.busRepository.AddBus(bus, Request.Properties["vendor"] as Vendor);
                if (keyValuePairs.ContainsKey("Success"))
                {
                    return Created("", keyValuePairs["Success"]);
                }
                else if (keyValuePairs.ContainsKey("Errors"))
                {
                    return Content(HttpStatusCode.BadRequest, new { Errors = keyValuePairs["Errors"] });
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

        [Route("~/api/vendors/{id}/buses/actives")]
        public IHttpActionResult GetAllByVendorId(int id)
        {
            return Ok(this.busRepository.GetAll().Where(b => b.VendorId == id && b.BusStatus != "archived"));
        }

        [Route("~/api/vendors/{id}/buses/archives")]
        public IHttpActionResult GetArchivedBuses(int id)
        {
            return Ok(this.busRepository.GetAll().Where(b => b.VendorId == id && b.BusStatus == "archived"));
        }

        [Route("~/api/vendors/{id}/buses/archives")]
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

        [Route("~/api/vendors/{id}/buses/restore")]
        public IHttpActionResult PutRestoreFromArchive(Bus bus)
        {
            if (bus == null)
            {
                return BadRequest();
            }
            else if (bus.BusId < 1)
            {
                return BadRequest();
            }
            return StatusCode(this.busRepository.RestoreBus(bus, Request.Properties["vendor"] as Vendor));
        }
    }
}
