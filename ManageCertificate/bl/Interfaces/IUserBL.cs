using Entites;

namespace BL.Interfaces
{
    public interface IUserBL
    {
        Task<User> CreateUser(User newUser);
        Task<IEnumerable<User>> GetAllUsers();
        Task<bool> UpdateUser(int id, User updatedUser);
    }
}