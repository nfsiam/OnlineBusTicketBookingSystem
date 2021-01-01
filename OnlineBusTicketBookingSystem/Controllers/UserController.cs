using OnlineBusTicketBookingSystem.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OnlineBusTicketBookingSystem.Controllers
{
    public class UserController : ApiController
    {
        private UserRepository userRepository = new UserRepository();

        public IHttpActionResult Get()
        {
            return Ok(this.userRepository.GetAll());
        }
    }
}
