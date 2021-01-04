namespace OnlineBusTicketBookingSystem.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class VendorModelChange : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Vendors", "UserId", c => c.Int());
            CreateIndex("dbo.Vendors", "UserId");
            AddForeignKey("dbo.Vendors", "UserId", "dbo.Users", "UserId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Vendors", "UserId", "dbo.Users");
            DropIndex("dbo.Vendors", new[] { "UserId" });
            DropColumn("dbo.Vendors", "UserId");
        }
    }
}
