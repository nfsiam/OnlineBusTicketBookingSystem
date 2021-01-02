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
            return Ok(user);
        }
    }
}
