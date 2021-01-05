namespace OnlineBusTicketBookingSystem.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class BookingCascadeDelete : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Bookings", "TripId", "dbo.Trips");
            AddForeignKey("dbo.Bookings", "TripId", "dbo.Trips", "TripId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Bookings", "TripId", "dbo.Trips");
            AddForeignKey("dbo.Bookings", "TripId", "dbo.Trips", "TripId");
        }
    }
}
