namespace OnlineBusTicketBookingSystem.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Buses",
                c => new
                    {
                        BusId = c.Int(nullable: false, identity: true),
                        TotalSeat = c.Int(nullable: false),
                        BusType = c.String(),
                        PerSeatFair = c.Double(nullable: false),
                        VendorId = c.Int(),
                    })
                .PrimaryKey(t => t.BusId)
                .ForeignKey("dbo.Vendors", t => t.VendorId, cascadeDelete: true)
                .Index(t => t.VendorId);
            
            CreateTable(
                "dbo.Vendors",
                c => new
                    {
                        VendorId = c.Int(nullable: false, identity: true),
                        VendorName = c.String(),
                    })
                .PrimaryKey(t => t.VendorId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Buses", "VendorId", "dbo.Vendors");
            DropIndex("dbo.Buses", new[] { "VendorId" });
            DropTable("dbo.Vendors");
            DropTable("dbo.Buses");
        }
    }
}
