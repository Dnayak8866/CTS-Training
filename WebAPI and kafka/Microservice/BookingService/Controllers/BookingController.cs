using BookingService.DBContext;
using BookingService.Interfaces;
using BookingService.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace BookingService.Controllers
{

    [Route("api/Bookings/")]
    [ApiController]
    public class BookingController : ControllerBase
    {

        private readonly IBookingRepository _bookingRepo;
        public BookingController(IBookingRepository bookingRepo)
        {
            _bookingRepo = bookingRepo;
        }

        [Route("AddDiscount")]
        [HttpPost]
        public IActionResult CreateDiscounts(Discount discnt)
        {
            try
            {
                this._bookingRepo.CreateDiscount(discnt);
                return Ok();
            }
            catch (Exception)
            {
                return new StatusCodeResult(500);
            }
          
        }

        [Route("GetAllDiscounts")]
        [HttpGet]
        public IActionResult GetDiscounts()
        {
            try
            {
                return Ok(this._bookingRepo.GetAllDiscounts());
            }
            catch (Exception ex)
            {

                return new StatusCodeResult(500);
            }
           
        }


        [Route("GetDiscountById/{disocuntId}")]
        [HttpGet]
        public IActionResult GetDiscountByID(int disocuntId)
        {

            try
            {
                return Ok(this._bookingRepo.GetDiscountByID(disocuntId));
            }
            catch (Exception)
            {
                return new StatusCodeResult(500);
            }
        }


        [HttpPost("{filghtIDs}")]
        public void BookFlight(string filghtIDs)
        {
            
            this._bookingRepo.BookFlight(filghtIDs);
        }


        //[HttpPost("bookticket/{filghtIDs}")]
        //public string BookTicket(string filghtIDs,[FromBody] List<BookingTicket> tickets)
        //{
          
        //    this._bookingRepo.BookTickets(filghtIDs,tickets);
        //    return "Tickets are booked successfully.";
        //}

        [HttpPost("bookticket")]
        public IActionResult BookTicket( [FromBody] List<BookingTicket> tickets)
        {

            this._bookingRepo.BookTickets(tickets);
            return StatusCode(Convert.ToInt32(HttpStatusCode.OK), new { message ="Ticket booked.", });
        }

        [Route("history/{emailId}")]
        [HttpGet]
        public List<BookingTicket> GetBookings(string emailId)
        {
            return this._bookingRepo.GetBookings(emailId);
        }


        [Route("GetBookingsByUser/{userid}")]
        [HttpGet]
        public List<BookingTicket> GetBookingsByuser(int userid)
        {
            return this._bookingRepo.GetBookingByuser(userid);
        }



        [Route("ticket/{pnr}")]
        [HttpGet]
        public BookingTicket GetTicket(Guid pnr)
        {
            return this._bookingRepo.GetTicket(pnr);
        }


        [Route("cancel/{pnr}")]
        [HttpDelete]
        public StatusCodeResult CancelTicket(Guid pnr)
        {
            bool result = this._bookingRepo.CancelBooking(pnr);

            if (result)
            {
                return Ok();
            }

            return new StatusCodeResult(404);
        }


    }

}
