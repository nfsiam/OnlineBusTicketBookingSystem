using OnlineBusTicketBookingSystem.Models;
using OnlineBusTicketBookingSystem.Models.PostModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace OnlineBusTicketBookingSystem.Repositories
{
    public class BusRepository:Repository<Bus>
    {
        public HttpStatusCode ArchiveBus(Bus bus, Vendor vendor)
        {
            Bus _bus = this.Get(bus.BusId);
            if (_bus == null)
            {
                return HttpStatusCode.NotFound;
            }
            else if(_bus.VendorId != vendor.VendorId)
            {
                return HttpStatusCode.Unauthorized;
            }
            else
            {
                _bus.BusStatus = "archived";
                this.Update(_bus);
                return HttpStatusCode.OK;
            }
        }

        public HttpStatusCode RestoreBus(Bus bus, Vendor vendor)
        {
            Bus _bus = this.Get(bus.BusId);
            if (_bus == null)
            {
                return HttpStatusCode.NotFound;
            }
            else if (_bus.VendorId != vendor.VendorId)
            {
                return HttpStatusCode.Unauthorized;
            }
            else
            {
                _bus.BusStatus = "";
                this.Update(_bus);
                return HttpStatusCode.OK;
            }
        }

        public Dictionary<string, Dictionary<string, string>> AddBus(BusAdd bus, Vendor vendor)
        {
            Dictionary<string, Dictionary<string, string>> keyValuePairs = new Dictionary<string, Dictionary<string, string>>();
            Dictionary<string, string> errors = new Dictionary<string, string>();
            if(bus.TotalSeat == 32 || bus.TotalSeat == 40)
            {

            }
            else
            {
                errors.Add("user.TotalSeat", "Total Seat count must be 32 or 40");
            }
            if (errors.Count == 0)
            {
                Bus _bus = new Bus();
                _bus.TotalSeat = bus.TotalSeat;
                _bus.BusType = bus.BusType;
                _bus.BusName = bus.BusName;
                _bus.PerSeatFair = bus.PerSeatFair;
                _bus.VendorId = vendor.VendorId;
                this.Insert(_bus);

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