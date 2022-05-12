using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthServices.Model
{
    public class User
    {
        public int UserID { get; set; }
        public string EmailID { get; set; }

        public string Password { get; set; }

        public bool IsActive { get; set; }

        public string Role { get; set; }
    }
}
