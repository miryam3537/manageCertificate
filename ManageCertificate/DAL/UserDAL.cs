using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entites;
using DAL.Interfaces;

namespace DAL
{
    public class UserDAL : IUserDAL
    {
        private readonly DatotDbContext _context;

        public UserDAL(DatotDbContext context)
        {
            _context = context;
        }

        // GET: Retrieve all users
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // POST: Create a new user
        public async Task<User> CreateUser(User newUser)
        {
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            return newUser;
        }

        // PUT: Update an existing user
        public async Task<bool> UpdateUser(int id, User updatedUser)
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
            {
                return false; // User not found
            }

            // Update the user properties
            existingUser.Name = updatedUser.Name;
            existingUser.Email = updatedUser.Email;
            _context.Users.Update(existingUser);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
