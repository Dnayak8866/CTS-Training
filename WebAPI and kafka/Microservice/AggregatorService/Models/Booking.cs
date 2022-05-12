using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AggregatorService.Models
{
    public class Booking
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public int FlightInvID { get; set; }

        public string JourneyType { get; set; }

        public Guid Pnr { get; set; }

        public bool isCancelled { get; set; }

        public List<Passenger> passengers { get; set; }

        public int NoofSeats { get; set; }

        public string MealPreference { get; set; }
    }
}
