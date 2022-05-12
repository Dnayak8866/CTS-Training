using AuthServices.DBContext;
using AuthServices.Interfaces;
using AuthServices.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthServices.Repository
{
    /// <summary>
    /// Class UserRepository 
    /// </summary>
    public class UserRepository : IUserRepository
    {
        private UserDbContext userDbContext;

        public UserRepository(UserDbContext dbContext)
        {
            this.userDbContext = dbContext;
        }

        public bool ValidateUser(string email, string password)
        {
            try
            {
                if (this.userDbContext.User.Where(u => u.EmailID == email && u.Password == password).SingleOrDefault() != null)
                    return true;
                return false;

            }
            catch (Exception)
            {
                return false;
                throw;
            }
        }

        public List<User> GetUsers()
        {
            try
            {
                return this.userDbContext.User.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public User GetUser(string username)
        {
            try
            {
                return this.userDbContext.User.Where(u => u.EmailID == username).SingleOrDefault();
            }
            catch (Exception)
            {

                throw;
            };
        }
    }
}
