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
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        private UserRepository userRepository = new UserRepository();

        public IHttpActionResult Post(User user)
        {
            User _user = userRepository.ValidateUser(user.Username, user.Password);
            if (_user == null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

            user.UserType = _user.UserType;
            user.UserId = _user.UserId;

            if(user.UserType == "vendor")
            {
                var vendor = new
                {
                    UserId = _user.UserId,
                    Username = _user.Username,
                    UserType = _user.UserType,
                    VendorId = new VendorRepository().GetAll().Where(v => v.UserId == _user.UserId).FirstOrDefault().VendorId
                };
                return Ok(vendor);
            }
            return Ok(user);
        }
    }
}
