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
using System.Web.Http.ModelBinding;

namespace OnlineBusTicketBookingSystem.Controllers
{
    [RoutePrefix("api/registration")]
    public class RegistrationController : ApiController
    {
        private UserRepository userRepository = new UserRepository();
        
        [Route("")]
        public IHttpActionResult PostRegUser(UserReg user)
        {
            Dictionary<string,Dictionary<string,string>> keyValuePairs =  this.userRepository.RegisterUser(user);
            if(ModelState.IsValid)
            {
                if(keyValuePairs.ContainsKey("Success"))
                {
                    return Created("", keyValuePairs["Success"]);
                }
                else if(keyValuePairs.ContainsKey("Errors"))
                {
                    return Content(HttpStatusCode.Conflict, new { Errors = keyValuePairs["Errors"] });
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


        [Route("vendor")]
        public IHttpActionResult PostRegVendor(VendorReg vendor)
        {
            Dictionary<string, Dictionary<string, string>> keyValuePairs = this.userRepository.RegisterVendor(vendor);
            if (ModelState.IsValid)
            {
                if (keyValuePairs.ContainsKey("Success"))
                {
                    return Created("", keyValuePairs["Success"]);
                }
                else if (keyValuePairs.ContainsKey("Errors"))
                {
                    return Content(HttpStatusCode.Conflict, new { Errors = keyValuePairs["Errors"] });
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
    }
}
