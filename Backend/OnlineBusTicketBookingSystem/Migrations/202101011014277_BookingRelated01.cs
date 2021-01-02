namespace OnlineBusTicketBookingSystem.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class BookingRelated01 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Bookings",
                c => new
                    {
                        BookingId = c.Int(nullable: false, identity: true),
                        BookingTime = c.DateTime(nullable: false),
                        PassangerId = c.Int(),
                        TripId = c.Int(),
                        Seat = c.String(),
                    })
                .PrimaryKey(t => t.BookingId)
                .ForeignKey("dbo.Users", t => t.PassangerId)
                .ForeignKey("dbo.Trips", t => t.TripId)
                .Index(t => t.PassangerId)
                .Index(t => t.TripId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        Username = c.String(),
                        Name = c.String(),
                        Password = c.String(),
                    })
                .PrimaryKey(t => t.UserId);
            
            CreateTable(
                "dbo.Trips",
                c => new
                    {
                        TripId = c.Int(nullable: false, identity: true),
                        LocationFrom = c.String(),
                        LocationTo = c.String(),
                        Timing = c.DateTime(nullable: false),
                        BusId = c.Int(),
                    })
                .PrimaryKey(t => t.TripId)
                .ForeignKey("dbo.Buses", t => t.BusId)
                .Index(t => t.BusId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Trips", "BusId", "dbo.Buses");
            DropForeignKey("dbo.Bookings", "TripId", "dbo.Trips");
            DropForeignKey("dbo.Bookings", "PassangerId", "dbo.Users");
            DropIndex("dbo.Trips", new[] { "BusId" });
            DropIndex("dbo.Bookings", new[] { "TripId" });
            DropIndex("dbo.Bookings", new[] { "PassangerId" });
            DropTable("dbo.Trips");
            DropTable("dbo.Users");
            DropTable("dbo.Bookings");
        }
    }
}
