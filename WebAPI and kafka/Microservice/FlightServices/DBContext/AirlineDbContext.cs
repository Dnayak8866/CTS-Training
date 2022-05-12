using FlightServices.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServices.DBContext
{
    public class AirlineDbContext : DbContext
    {
        public AirlineDbContext(DbContextOptions<AirlineDbContext> options) : base(options)
        {
        }
        public DbSet<Airline> Airlines { get; set; }

       public  DbSet<FlightInventory> FlightInventory { get; set; }

    }
}
