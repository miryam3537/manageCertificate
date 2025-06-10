using Microsoft.AspNetCore.Mvc;
using BL.Interfaces;
using Entites;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class UserController : Controller
{
    private readonly IUserBL userBL;

    public UserController(IUserBL userBL)
    {
        this.userBL = userBL;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
    {
        IEnumerable<User> users = await userBL.GetAllUsers();
        return Ok(users);
    }

    // POST: api/User
    [HttpPost]
    public async Task<ActionResult<User>> CreateUser([FromBody] User newUser)
    {
        if (newUser == null)
        {
            return BadRequest("User data is null.");
        }

        User createdUser = await userBL.CreateUser(newUser);
        return CreatedAtAction(nameof(GetAllUsers), new { id = createdUser.Id }, createdUser);
    }

    // PUT: api/User/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
    {
        if (updatedUser == null || id != updatedUser.Id)
        {
            return BadRequest("Invalid user data.");
        }

        bool isUpdated = await userBL.UpdateUser(id, updatedUser);
        if (!isUpdated)
        {
            return NotFound($"User with ID {id} not found.");
        }

        return NoContent();
    }
}

