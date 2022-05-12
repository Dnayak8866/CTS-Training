using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingService.Models
{
    public class BookingTicket
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

        public int TotalCost { get; set; }
    }
}
