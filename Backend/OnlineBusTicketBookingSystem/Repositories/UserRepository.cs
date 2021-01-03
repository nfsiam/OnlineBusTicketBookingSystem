using OnlineBusTicketBookingSystem.Models;
using OnlineBusTicketBookingSystem.Models.PostModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineBusTicketBookingSystem.Repositories
{
    public class UserRepository: Repository<User>
    {
        public User ValidateUser(string username, string password)
        {
            User user = this.GetAll().Where(u => u.Username == username && u.Password == password).FirstOrDefault();
            if (user == null)
            {
                return null;
            }
            else
            {
                return user;
            }
        }

        public Dictionary<string,Dictionary<string,string>> RegisterUser(UserReg user)
        {
            Dictionary<string, Dictionary<string, string>> keyValuePairs = new Dictionary<string, Dictionary<string,string>>();
            Dictionary<string,string> errors = new Dictionary<string, string>();
            if(this.GetAll().Where(u=>u.Username == user.Username).FirstOrDefault() != null)
            {
                errors.Add("user.Username","Username is already taken");
            }
            if (this.GetAll().Where(u => u.Email == user.Email).FirstOrDefault() != null)
            {
                errors.Add("user.Email", "Email is already used");
            }
            if(errors.Count == 0)
            {
                User _user = new User();
                _user.Username = user.Username;
                _user.Email = user.Email;
                _user.Name = user.Name;
                _user.Password = user.Password;
                _user.UserType = "passanger";

                this.Insert(_user);
                keyValuePairs.Add("Success", new Dictionary<string,string>() { { "Msg", "Account created successfullu" } });
            }
            else
            {
                keyValuePairs.Add("Errors", errors);
            }
            return keyValuePairs;
        }
    }
}