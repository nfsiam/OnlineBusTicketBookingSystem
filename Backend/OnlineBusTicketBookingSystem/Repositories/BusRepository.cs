using OnlineBusTicketBookingSystem.Models;
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
    }
}