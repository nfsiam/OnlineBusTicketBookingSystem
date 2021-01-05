namespace OnlineBusTicketBookingSystem.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedTripsinBus : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Trips", "BusId", "dbo.Buses");
            AddForeignKey("dbo.Trips", "BusId", "dbo.Buses", "BusId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Trips", "BusId", "dbo.Buses");
            AddForeignKey("dbo.Trips", "BusId", "dbo.Buses", "BusId");
        }
    }
}
