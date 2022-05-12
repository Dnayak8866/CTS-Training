using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace AggregatorService.Controllers
{

    [Route("api/Aggregator/")]
    public class CommonController : Controller
    {
        
        public CommonController()
        {
           
        }

        [Route("GetBookingByUser/{userid}")]
        [HttpGet]
        public async Task<object> GetBookingsByUserId(int userid)
        {
            try
            {

                var bookingsData = new DataTable();
                var flights = new DataTable();

                #region Get Bookings Details
                using (var client = new HttpClient())
                {
                  
                    client.BaseAddress = new Uri("http://localhost:9004/");

                  
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                   
                    HttpResponseMessage response = new HttpResponseMessage();

                
                    response = await client.GetAsync("api/Bookings/GetBookingsByUser/" + userid).ConfigureAwait(false);

              
                    if (response.IsSuccessStatusCode)
                    {
                     
                        string res = response.Content.ReadAsStringAsync().Result;
                        bookingsData = JsonConvert.DeserializeObject<DataTable>(res);
                    }


                }
                #endregion

                #region Get Flight Inventory
                flights =await this.GetFlightInventories();
                var result = from dtRow1 in flights.AsEnumerable()
                             join dtRow2 in bookingsData.AsEnumerable()
                             on dtRow1.Field<Int64>("ID") equals dtRow2.Field<Int64>("FlightInvID")
                             select new
                             {
                                 FlightNumber = dtRow1.Field<Int64>("FlightNumber"),
                                 FromPlace = dtRow1.Field<string>("FromPlace"),
                                 ToPlace = dtRow1.Field<string>("ToPlace"),
                                 StartDateTime = dtRow1.Field<DateTime>("StartDateTime"),
                                 Pnr = dtRow2.Field<string>("Pnr"),
                                 isCancelled = dtRow2.Field<bool>("isCancelled"),
                             };

                //todo linq joins....
                #endregion
                return result;
            }
            catch ( Exception ex)
            {

                throw;
            }
        
        }


        public async Task<DataTable> GetFlightInventories()
        {
            var flights = new DataTable();
            using (var client = new HttpClient())
            {
                // Setting Base address.  
                client.BaseAddress = new Uri("http://localhost:9003/");

                // Setting content type.  
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                // Initialization.  
                HttpResponseMessage response = new HttpResponseMessage();

                // HTTP GET  
                response = await client.GetAsync("api/airline/GetFlightInventory").ConfigureAwait(false);

                // Verification  
                if (response.IsSuccessStatusCode)
                {
                    // Reading Response.  
                    string result = response.Content.ReadAsStringAsync().Result;
                    flights = JsonConvert.DeserializeObject<DataTable>(result);
                }
                return flights;


            }
        }
    }
}
