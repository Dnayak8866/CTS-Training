using BookingService.DBContext;
using BookingService.Interfaces;
using BookingService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingService.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private List<Discount> _allDiscounts;
        private List<Booking> _allBookings;
        private List<BookingTicket> _bookedTickets;

        private readonly BookingDbContext _bookingDbContext;


        public BookingRepository(BookingDbContext dbContext)
        {
            this._allDiscounts = new List<Discount>();
            this._allBookings = new List<Booking>();
            this._bookingDbContext = dbContext;
        }

        public void BookFlight(string flightInvtIDs)
        {
            string journeyType = "OneWay";
            if (flightInvtIDs.Contains(','))
                journeyType = "TwoWay";
            foreach (var flightId in flightInvtIDs.Split(','))
            {

                _allBookings.Add(new Booking { Pnr = Guid.NewGuid(), FlightInvID = Convert.ToString(flightId), JourneyType = journeyType });
            }

        }

        //public void BookTickets(string flightIDs, List<BookingTicket> bookedTickets)
        //{
        //    //this._bookedTickets.AddRange(bookedTickets);
        //    var flightIds = flightIDs.ToCharArray();
        //    int index = 0;
        //    if (flightIDs.Length==bookedTickets.Count)
        //    {
        //        for (int i = 0; i < bookedTickets.Count; i++)
        //        {
        //            var bookingTicket = bookedTickets[i];
        //            bookingTicket.FlightInvID = Convert.ToInt32(flightIds[index]);
        //            bookingTicket.Pnr = Guid.NewGuid();

        //            foreach (var passenger in bookingTicket.passengers)
        //            {
        //                passenger.BookingTicketID = bookingTicket.ID;
        //            }
        //            _bookingDbContext.Bookings.Add(bookingTicket);

        //        }
        //        _bookingDbContext.SaveChanges();

        //    }       
        //}

        public void BookTickets(List<BookingTicket> bookedTickets)
        {
            for (int i = 0; i < bookedTickets.Count; i++)
            {
                var bookingTicket = bookedTickets[i];
                bookingTicket.Pnr = Guid.NewGuid();

                foreach (var passenger in bookingTicket.passengers)
                {
                    passenger.BookingTicketID = bookingTicket.ID;
                }
                _bookingDbContext.Bookings.Add(bookingTicket);

            }
            _bookingDbContext.SaveChanges();
        }

        public Boolean CreateDiscount(Discount discount)
        {
            try
            {

                if (discount.ID > 0)
                {
                    Discount discnt= this._bookingDbContext.Discounts.Where(a => a.ID == discount.ID).SingleOrDefault();
                    discnt.DiscountCode = discount.DiscountCode;
                    discnt.DiscountValue = discount.DiscountValue;

                    this._bookingDbContext.SaveChanges();
                    return true;
                }
                if (_bookingDbContext.Discounts.Where(a => a.DiscountCode == discount.DiscountCode).FirstOrDefault() == null)
                {
                     this._bookingDbContext.Add(discount);
                    this._bookingDbContext.SaveChanges();
                    return true;
                }

                return false;
               
            }
            catch (Exception)
            {

                throw;
            }

        }

        public List<Discount> GetAllDiscounts()
        {
            return this._bookingDbContext.Discounts.ToList();
        }

        public Discount GetDiscountByID(int id)
        {
            try
            {
                return this._bookingDbContext.Discounts.Where(a => a.ID == id).SingleOrDefault();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<BookingTicket> GetBookings(string emailid)
        {
            return this._bookingDbContext.Bookings.ToList();
        }

        public List<BookingTicket> GetBookingByuser(int userid)
        {
            return this._bookingDbContext.Bookings.Where(b=>b.UserID==userid).ToList();
        }

        public BookingTicket GetTicket(Guid pnr)
        {
            var ticket= this._bookingDbContext.Bookings.Where(b => b.Pnr == pnr).FirstOrDefault();
            var passengers = this._bookingDbContext.Passenger.Where(p => p.BookingTicketID == ticket.ID).ToList();
            ticket.passengers = passengers;

            return ticket;
        }

        public bool CancelBooking(Guid pnr)
        {

            int index = this._bookingDbContext.Bookings.ToList().FindIndex(b => b.Pnr == pnr && (!b.isCancelled));
            if (index < 0)
            {
                return false;
            }
            this._bookingDbContext.Bookings.ToList()[index].isCancelled = true;
            this._bookingDbContext.SaveChanges();
            return true;
        }
    }
}
