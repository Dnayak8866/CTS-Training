using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingService.Models
{
    public class Discount
    {
        public int ID { get; set; }
        public string DiscountCode { get; set; }
        public int  DiscountValue { get; set; }
    }
}
