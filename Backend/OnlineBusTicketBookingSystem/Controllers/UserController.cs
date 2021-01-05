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
    [RoutePrefix("api/users"),BasicAuth]
    public class UserController : ApiController
    {
        private UserRepository userRepository = new UserRepository();

        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(this.userRepository.GetAll());
        }

        [Route("~api/admin/dashborad/vendor-applicatons")]
        public IHttpActionResult GetVendorApplications()
        {
            UserRepository userRepository = new UserRepository();
            return Ok(userRepository.GetAll().Where(u => u.UserType == "pvendor"));
        }
        [Route("~api/admin/dashborad/vendor-applicatons/{id}/approve")]
        public IHttpActionResult PutApproveVendor(int id)
        {
            UserRepository userRepository = new UserRepository();
            User user = userRepository.Get(id);
            user.UserType = "vendor";
            userRepository.Update(user);
            return Ok();
        }
        [Route("~api/admin/dashborad/vendor-applicatons/{id}/reject")]
        public IHttpActionResult DeleteRejectVendor(int id)
        {
            UserRepository userRepository = new UserRepository();
            userRepository.Delete(id);
            VendorRepository vendorRepository = new VendorRepository();

            Vendor vendor = vendorRepository.GetAll().Where(v => v.UserId == id).FirstOrDefault();
            if(vendor == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                vendorRepository.Delete(vendor.VendorId);
                return StatusCode(HttpStatusCode.NoContent);
            }

        }

    }
}
