using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServices.Models
{
    public class Airline
    {
        public bool IsBlocked { get; set; }
        public int ID { get; set; }
        public string Name { get; set; }
        public long ContactNumber { get; set; }

        public string Address { get; set; }


    }
}
