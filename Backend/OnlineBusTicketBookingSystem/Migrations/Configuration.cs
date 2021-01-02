namespace OnlineBusTicketBookingSystem.Migrations
{
    using OnlineBusTicketBookingSystem.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<OnlineBusTicketBookingSystem.Models.OnlineBusTicketBookingSystemDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(OnlineBusTicketBookingSystem.Models.OnlineBusTicketBookingSystemDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.

            context.Users.AddOrUpdate(x => x.UserId,
                new User() { UserId = 1, Username = "jane", Name = "Jane Austen", Password = "1234" , UserType = "passanger"},
                new User() { UserId = 2, Username = "charles", Name = "Charles Dickens", Password = "1234" , UserType = "passanger"},
                new User() { UserId = 3, Username = "miguel", Name = "Miguel de Cervantes", Password = "1234" ,UserType = "vendor"},
                new User() { UserId = 4, Username = "siam", Name = "Nafiz Fuad Siam", Password = "1234", UserType = "admin" }
            );


            context.Vendors.AddOrUpdate(v => v.VendorId,
                new Vendor() { VendorId = 1, VendorName = "AB Travels" },
                new Vendor() { VendorId = 2, VendorName = "CD Travels" },
                new Vendor() { VendorId = 3, VendorName = "EF Travels" }
            );

            context.Buses.AddOrUpdate(b => b.BusId,
                new Bus()
                {
                    BusId = 1,
                    TotalSeat = 20,
                    PerSeatFair = 300,
                    BusType = "NON AC",
                    VendorId = 1
                },
                new Bus()
                {
                    BusId = 2,
                    TotalSeat = 20,
                    PerSeatFair = 500,
                    BusType = "AC",
                    VendorId = 2
                },
                new Bus()
                {
                    BusId = 3,
                    TotalSeat = 20,
                    PerSeatFair = 600,
                    BusType = "AC",
                    VendorId = 3
                },
                new Bus()
                {
                    BusId = 4,
                    TotalSeat = 20,
                    PerSeatFair = 300,
                    BusType = "NON AC",
                    VendorId = 1
                }
            );

            context.Trips.AddOrUpdate(t => t.TripId,
                new Trip()
                {
                    TripId = 1,
                    BusId = 1,
                    LocationFrom = "Sherpur",
                    LocationTo = "Dhaka",
                    Timing = new DateTime(2021, 1, 5)
                },
                new Trip()
                {
                    TripId = 2,
                    BusId = 2,
                    LocationFrom = "Sherpur",
                    LocationTo = "Dhaka",
                    Timing = new DateTime(2021, 1, 5)
                }
            );
            context.Bookings.AddOrUpdate(b => b.BookingId,
                new Booking()
                {
                    BookingId = 1,
                    PassangerId = 1,
                    TripId = 1,
                    BookingTime = new DateTime(2020, 1, 5),
                    Seat = "A1"
                },
                new Booking()
                {
                    BookingId = 2,
                    PassangerId = 2,
                    TripId = 1,
                    BookingTime = new DateTime(2020, 1, 5),
                    Seat = "A2"
                },
                new Booking()
                {
                    BookingId = 3,
                    PassangerId = 1,
                    TripId = 1,
                    BookingTime = new DateTime(2020, 1, 5),
                    Seat = "A3"
                },
                new Booking()
                {
                    BookingId = 4,
                    PassangerId = 1,
                    TripId = 2,
                    BookingTime = new DateTime(2020, 1, 5),
                    Seat = "A4"
                }
            );
        }
    }
}
