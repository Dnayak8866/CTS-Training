using FlightServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServices.Interfaces
{
    public interface IAirlineRepository
    {
        /// <summary>
        ///  interface to add a airline
        /// </summary>
        /// <param name="airline"></param>
        bool AddAirline(Airline airline);
        List<Airline> GetAirlines();

        Airline GetAirlineByID(int airlineID);

        bool AddFlightInventory(FlightInventory flightInventory);
        List<FlightInventory> GetFlightInventories();

        List<FlightInventory> SearchFlights(string from = "", string to = "", DateTime? onboarddate = null, DateTime? returnDate = null);


        bool BlockAirline(int airlineId, bool isBlock);

        FlightInventory GetFlightInventoryById(int id);
    }
}
