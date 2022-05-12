using BookingService.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingService.DBContext
{
    public class BookingDbContext:DbContext
    {
        public BookingDbContext(DbContextOptions<BookingDbContext> options) : base(options)
        {
          
        }

        public DbSet<Discount> Discounts { get; set; }

        public DbSet<BookingTicket> Bookings { get; set; }

        public DbSet<Passenger> Passenger { get; set; }


    }
}
