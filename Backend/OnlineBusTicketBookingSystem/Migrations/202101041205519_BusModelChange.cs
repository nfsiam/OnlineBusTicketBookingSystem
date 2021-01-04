namespace OnlineBusTicketBookingSystem.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class BusModelChange : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Buses", "BusName", c => c.String());
            AddColumn("dbo.Buses", "BusStatus", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Buses", "BusStatus");
            DropColumn("dbo.Buses", "BusName");
        }
    }
}
