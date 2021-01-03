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
        private VendorRepository vendorRepository = new VendorRepository();
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

        public Dictionary<string, Dictionary<string, string>> RegisterVendor(VendorReg vendor)
        {
            Dictionary<string, Dictionary<string, string>> keyValuePairs = new Dictionary<string, Dictionary<string, string>>();
            Dictionary<string, string> errors = new Dictionary<string, string>();
            if (this.GetAll().Where(u => u.Username == vendor.Username).FirstOrDefault() != null)
            {
                errors.Add("vendor.Username", "Username is already taken");
            }
            if (this.GetAll().Where(u => u.Email == vendor.Email).FirstOrDefault() != null)
            {
                errors.Add("vendor.Email", "Email is already used");
            }

            if (this.vendorRepository.GetAll().Where(v => v.VendorName == vendor.VendorName).FirstOrDefault() != null)
            {
                errors.Add("vendor.Vendorname", "Vendor Name is already used");
            }


            if (errors.Count == 0)
            {
                User _user = new User();
                _user.Username = vendor.Username;
                _user.Email = vendor.Email;
                _user.Name = vendor.Name;
                _user.Password = vendor.Password;
                _user.UserType = "pvendor";

                this.Insert(_user);

                Vendor _vendor = new Vendor();
                _vendor.VendorName = vendor.VendorName;

                this.vendorRepository.Insert(_vendor);

                keyValuePairs.Add("Success", new Dictionary<string, string>() { { "Msg", "Account created successfully" } });
            }
            else
            {
                keyValuePairs.Add("Errors", errors);
            }
            return keyValuePairs;
        }
    }
}