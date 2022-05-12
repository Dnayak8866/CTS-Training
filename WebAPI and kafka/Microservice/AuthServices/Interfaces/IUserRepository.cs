using AuthServices.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthServices.Interfaces
{
    public interface IUserRepository
    {
        List<User> GetUsers();

        bool ValidateUser(string email, string password);

        User GetUser(string username);
    }
}
