using FlightServices.Interfaces;
using FlightServices.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FlightServices.Controllers
{
    [Route("api/airline/")]
    [ApiController]

    public class AirlineController : ControllerBase   //For managing admin related operations over airline
    {
        private readonly IAirlineRepository _airlineRepo;

        public AirlineController(IAirlineRepository airlineRepo)
        {
            this._airlineRepo = airlineRepo;
        }


        // GET: api/<AirlineController>       
        [HttpGet]
        [Route("GetAirlines")]
        public IActionResult GetAirlines()
        {
            try
            {

                return Ok(_airlineRepo.GetAirlines());
            }
            catch (Exception)
            {

                return new StatusCodeResult(500);
            }

        }


        // GET: api/<AirlineController>       
        [HttpGet]
        [Route("GetHello")]
        public string GetList()
        {
       

                return "Hello Word";
          
           

        }


        [HttpGet]
        [Route("SearchFlights")]
        public IActionResult GetAvailableFlights(string from = "", string to = "", DateTime? onboarddate = null)
        {
            try
            {

                return Ok(this._airlineRepo.SearchFlights(from, to, onboarddate));
            }
            catch (Exception)
            {

                return new StatusCodeResult(500);
            }

        }

        // GET: api/<AirlineController>
        [Route("AddAirlines")]
        [HttpPost]
        public IActionResult AddAirlines([FromBody] Airline airline)
        {
            try
            {
                if (!_airlineRepo.AddAirline(airline))
                    return new ObjectResult(new { Message = "Airline Exists.." }) { StatusCode = 400 };

                return Ok();
            }

            catch (Exception)
            {
                return new StatusCodeResult(500);
            }

        }

        [Route("BlockAirline/{airlineId}/{isBlock}")]
        [HttpPost]
        public IActionResult BlockAirline(int airlineId, bool isBlock = false)
        {
            try
            {
                this._airlineRepo.BlockAirline(airlineId, isBlock);
                return Ok();
            }
            catch (Exception)
            {

                return new StatusCodeResult(500);
            }
        }



        [Route("GetAirlineById/{airlineId}")]
        [HttpGet]
        public IActionResult GetAirlineByID(int airlineId)
        {

            try
            {
                return Ok(this._airlineRepo.GetAirlineByID(airlineId));
            }
            catch (Exception)
            {
                return new StatusCodeResult(500);
            }
        }



        [Route("AddFlightInventory")]
        [HttpPost]
        public IActionResult AddFlightInventory([FromBody] FlightInventory flightInv)
        {

            try
            {
                #region Input validation
                if (flightInv.StartDateTime > flightInv.EndDateTime || flightInv.StartDateTime == flightInv.EndDateTime)
                {
                    return new ObjectResult(new { Message = "Startdatetime should  not be greater or equal to enddatetime." }) { StatusCode = Convert.ToInt32(HttpStatusCode.ExpectationFailed) };
                }
                else if (flightInv.FromPlace.ToLower() == flightInv.ToPlace.ToLower())
                {
                    return new ObjectResult(new { Message = "From place and to Place should not same." }) { StatusCode = Convert.ToInt32(HttpStatusCode.ExpectationFailed) };
                }
                #endregion
                _airlineRepo.AddFlightInventory(flightInv);
                return Ok();
            }            
            catch (Exception)
            {
                return new StatusCodeResult(500);
            }
        }


        [HttpGet]
        [Route("GetFlightInventory")]
        public IActionResult GetFlightInventory()
        {
            try
            {                
                return Ok(_airlineRepo.GetFlightInventories());
            }
            catch (Exception)
            {

                return new StatusCodeResult(500);
            }
          
        }

        [Route("GetFlightInventory/{inventoryId}")]
        [HttpGet]
        public IActionResult GetFlightInventoryById(int inventoryId)
        {

            try
            {
                return Ok(this._airlineRepo.GetFlightInventoryById(inventoryId));
            }
            catch (Exception)
            {
                return new StatusCodeResult(500);
            }
        }

        // GET api/<AirlineController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AirlineController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<AirlineController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AirlineController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
