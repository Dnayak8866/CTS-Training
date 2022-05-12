using BookingService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingService.Interfaces
{
    public interface IBookingRepository
    {
        bool CreateDiscount(Discount discount);

        List<Discount> GetAllDiscounts();

        Discount GetDiscountByID(int id);

        void BookFlight(string flightInvtIDs);

        List<BookingTicket> GetBookings(string emailid);

        BookingTicket GetTicket(Guid pnr);

        bool CancelBooking(Guid pnr);

        public void BookTickets(List<BookingTicket> bookedTickets);
        public List<BookingTicket> GetBookingByuser(int userid);


    }
}
