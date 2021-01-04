namespace OnlineBusTicketBookingSystem.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SeatStatusPropAddedToBooking : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Bookings", "SeatStatus", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Bookings", "SeatStatus");
        }
    }
}
