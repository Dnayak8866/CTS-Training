using FlightServices.DBContext;
using FlightServices.Interfaces;
using FlightServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServices.Repository
{
    public class AirlineRepository : IAirlineRepository
    {

        private List<Airline> _airlinesList;
        private List<FlightInventory> flightInventryList;
        private AirlineDbContext _airLineDbContext;
        public AirlineRepository(AirlineDbContext dbContext)
        {
            this._airlinesList = new List<Airline>();
            flightInventryList = new List<FlightInventory>();
            this._airLineDbContext = dbContext;
        }
        public bool AddAirline(Airline airline)
        {
            try
            {
                if (airline.ID>0)
                {
                   Airline air= this._airLineDbContext.Airlines. Where(a => a.ID == airline.ID).SingleOrDefault();
                    air.Name = airline.Name;
                    air.ContactNumber = airline.ContactNumber;
                    air.Address = airline.Address;
                   this._airLineDbContext.SaveChanges();
                    return true;
                }
                if (_airLineDbContext.Airlines.Where(a => a.Name == airline.Name).FirstOrDefault() == null)
                {
                    this._airLineDbContext.Add(airline);
                    this._airLineDbContext.SaveChanges();
                    return true;
                }
                
                return false;
            }
            catch (Exception ex)
            {
                throw;
            }
           
        }

        public bool AddFlightInventory(FlightInventory flightInventory)
        {
            try
            {
                if (flightInventory.ID > 0)
                {
                    FlightInventory inv = this._airLineDbContext.FlightInventory.Where(a => a.ID == flightInventory.ID).SingleOrDefault();
                    inv.AirlineID = flightInventory.AirlineID;
                    inv.BussinesSteatsCount = flightInventory.BussinesSteatsCount;
                    inv.EndDateTime = flightInventory.EndDateTime;
                    inv.StartDateTime = flightInventory.StartDateTime;
                    inv.FlightNumber = flightInventory.FlightNumber;
                    inv.FromPlace = flightInventory.FromPlace;
                    inv.ToPlace = flightInventory.ToPlace;
                    inv.TicketCost = flightInventory.TicketCost;
                    inv.InstrumentUsed = flightInventory.InstrumentUsed;
                    inv.MealType = flightInventory.MealType;
                    inv.NonBussinesSeatCount = flightInventory.NonBussinesSeatCount;
                    inv.NoofRows = flightInventory.NoofRows;
                    inv.ScheduleDays = flightInventory.ScheduleDays;                
                    this._airLineDbContext.SaveChanges();
                    return true;
                }
              
                this._airLineDbContext.Add(flightInventory);
                this._airLineDbContext.SaveChanges();
                return true;

            }
            catch (Exception)
            {

                throw;
            }

        }

        public List<Airline> GetAirlines()
        {
            try
            {
                return this._airLineDbContext.Airlines.ToList();
            }
            catch (Exception)
            {

                throw;
            }
           
        }

        public Airline GetAirlineByID(int id) {
            try
            {
                return this._airLineDbContext.Airlines.Where(a => a.ID == id).SingleOrDefault();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public FlightInventory GetFlightInventoryById(int id)
        {
            try
            {
                return this._airLineDbContext.FlightInventory.Where(a => a.ID == id).SingleOrDefault();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<FlightInventory> GetFlightInventories()
        {
            return this._airLineDbContext.FlightInventory.ToList();
        }

        public List<FlightInventory> SearchFlights(string fromPlace = "", string toPlace = "", DateTime? onboarddate = null, DateTime? returnDate = null)
        {
            return this._airLineDbContext.FlightInventory.Where(f => (String.IsNullOrEmpty(fromPlace) || fromPlace.ToLower() == f.FromPlace.ToLower())
            && (String.IsNullOrEmpty(toPlace) || toPlace.ToLower() == f.ToPlace.ToLower())
            && (onboarddate == null || f.StartDateTime.Date == Convert.ToDateTime( onboarddate).Date)
       //     && (returnDate == null || f.EndDateTime.Date == Convert.ToDateTime(returnDate).Date)
            ).ToList();

         
        }

        public bool BlockAirline(int airlineId, bool isBlock)
        {
            try
            {
                Airline air = this._airLineDbContext.Airlines.Where(a => a.ID == airlineId).SingleOrDefault();
                air.IsBlocked = isBlock;
                this._airLineDbContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
