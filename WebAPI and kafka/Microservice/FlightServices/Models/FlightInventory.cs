﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServices.Models
{
    public class FlightInventory
    {
        public int ID { get; set; }
        public int FlightNumber { get; set; }

        public int AirlineID { get; set; }

        public string FromPlace { get; set; }

        public string ToPlace { get; set; }

        public DateTime StartDateTime { get; set; }

        public DateTime EndDateTime { get; set; }

        public string ScheduleDays { get; set; }

        public string InstrumentUsed { get; set; }

        public int BussinesSteatsCount { get; set; }

        public int NonBussinesSeatCount { get; set; }

        public decimal TicketCost { get; set; }

        public int NoofRows { get; set; }

        public string MealType { get; set; }
    }
}
