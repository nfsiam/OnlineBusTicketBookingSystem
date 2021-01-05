using OnlineBusTicketBookingSystem.Migrations;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace OnlineBusTicketBookingSystem.Models
{
    public class OnlineBusTicketBookingSystemDbContext : DbContext
    {
        public OnlineBusTicketBookingSystemDbContext():base("OnlineBusTicketBookingSystemDb")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<OnlineBusTicketBookingSystemDbContext, Configuration>());
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<Bus> Buses { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Bus>().HasKey<int>(k => k.BusId)
                .HasOptional(v => v.Vendor)
                .WithMany(k => k.Buses)
                .HasForeignKey(v => v.VendorId)
                .WillCascadeOnDelete(true)
                ;
            modelBuilder.Entity<Trip>().HasKey<int>(k => k.TripId)
                .HasOptional(v => v.Bus)
                .WithMany(k => k.Trips)
                .HasForeignKey(v => v.BusId)
                .WillCascadeOnDelete(true)
                ;
        }
    }
}