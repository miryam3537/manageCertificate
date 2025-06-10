using Entites;

namespace DAL.Interfaces
{
    public interface IUserDAL
    {
        Task<User> CreateUser(User newUser);
        Task<IEnumerable<User>> GetAllUsers();
        Task<bool> UpdateUser(int id, User updatedUser);
    }
}