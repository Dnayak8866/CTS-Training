using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AggregatorService.Models
{
    public class Passenger
    {
        public int ID { get; set; }

        public int BookingID { get; set; }  // this is foreign key hence name should be prefix as Parent Model class i.e BookingTicket + ID
        public string Name { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
    }
}
