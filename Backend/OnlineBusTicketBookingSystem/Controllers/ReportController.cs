using OnlineBusTicketBookingSystem.Attributes;
using OnlineBusTicketBookingSystem.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OnlineBusTicketBookingSystem.Controllers
{
    [RoutePrefix("api/reports"),BasicAuth]
    public class ReportController : ApiController
    {
        [Route("vendors/{id}/sales")]
        public IHttpActionResult GetSales(int id)
        {
            Dictionary<string, double> keyValuePairs = new Dictionary<string, double>();
            BookingRepository bookingRepository = new BookingRepository();
            var bookings = bookingRepository.GetAll().Where(b => b.BookingTime <= DateTime.Now && b.Trip.Bus.VendorId == id);
            foreach (var booking in bookings)
            {
                var str = booking.BookingTime.Date.ToShortDateString();
                if (keyValuePairs.ContainsKey(str))
                {
                    keyValuePairs[str] += booking.Trip.Bus.PerSeatFair;
                }
                else
                {
                    keyValuePairs.Add(str, booking.Trip.Bus.PerSeatFair);
                }
            }
            var dates = keyValuePairs.Keys;
            var sales = keyValuePairs.Values;


            keyValuePairs = new Dictionary<string, double>();
            bookingRepository = new BookingRepository();
            bookings = bookingRepository.GetAll().Where(b => b.Trip.Bus.VendorId == 1);
            BusRepository busRepository = new BusRepository();

            var buses = busRepository.GetAll().Where(b => b.VendorId == 1);

            List<string> busList = new List<string>();
            List<double> earning = new List<double>();

            foreach (var bus in buses)
            {
                var b = bus.BusName + "[" + bus.BusId.ToString() + "]";
                var d = 0.0;
                var trp = bus.Trips;
                foreach (var t in trp)
                {
                    int pti = t.Bookings.Where(x => x.SeatStatus != "reserved").ToList().Count;
                    d += pti * t.Bus.PerSeatFair;
                }
                //busList.Add(b);
                //earning.Add(d);
                keyValuePairs.Add(b, d);
            }

            var ordered = keyValuePairs.OrderByDescending(x => x.Value).Take(10).ToDictionary(x => x.Key, x => x.Value);

            int n = ordered.Count < 3 ? ordered.Count : 3;

            for (int i = 0; i < n; i++)
            {
                busList.Add(ordered.Keys.ElementAt(i));
                earning.Add(ordered.Values.ElementAt(i));
            }


            return Ok(new
            {
                dates,
                sales,
                busList,
                earning
            });
        }

        [Route("vendors/{id}/sales-per-bus")]
        public IHttpActionResult GetSalesPerBus(int id)
        {
            Dictionary<string, double> keyValuePairs = new Dictionary<string, double>();
            BookingRepository bookingRepository = new BookingRepository();
            var bookings = bookingRepository.GetAll().Where(b=>b.Trip.Bus.VendorId == 1);
            BusRepository busRepository = new BusRepository();

            var buses = busRepository.GetAll().Where(b => b.VendorId == 1);

            List<string> busList = new List<string>();
            List<double> earning = new List<double>();

            foreach (var bus in buses)
            {
                var b = bus.BusName + "[" + bus.BusId.ToString() + "]";
                var d = 0.0;
                var trp = bus.Trips;
                foreach(var t in trp)
                {
                    int pti = t.Bookings.Where(x => x.SeatStatus != "reserved").ToList().Count;
                    d += pti * t.Bus.PerSeatFair;
                }
                //busList.Add(b);
                //earning.Add(d);
                keyValuePairs.Add(b, d);
            }

            var ordered = keyValuePairs.OrderByDescending(x => x.Value).Take(10).ToDictionary(x => x.Key, x => x.Value);

            int n = ordered.Count < 3 ? ordered.Count : 3;

            for(int i = 0; i< n; i++)
            {
                busList.Add(ordered.Keys.ElementAt(i));
                earning.Add(ordered.Values.ElementAt(i));
            }

            return Ok(new
            {
                busList,
                earning
            });
        }
    }
}
