using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServices.Models
{
    public class Booking
    {
        public int UserID { get; set; }
        public string FlightInvID { get; set; }

        public string JourneyType { get; set; }

        public Guid Pnr { get; set; }

        public bool isCancelled { get; set; }
    }
}
