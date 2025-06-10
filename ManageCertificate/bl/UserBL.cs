using System.Collections.Generic;
using System.Threading.Tasks;
using BL.Interfaces;
using Entites;
using DAL.Interfaces;
namespace BL
{
    public class UserBL : IUserBL
    {
        private readonly IUserDAL userDAL;

        public UserBL(IUserDAL userDAL)
        {
            this.userDAL = userDAL;
        }

        // Asynchronous method to get all users
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await userDAL.GetAllUsers();
        }

        // POST: Create a new user
        public async Task<Entites.User> CreateUser(User newUser)
        {


            return await userDAL.CreateUser(newUser);
        }

        // PUT: Update an existing user
        public async Task<bool> UpdateUser(int id, User updatedUser)
        {
            return await userDAL.UpdateUser(id, updatedUser);
        }
    }
}