using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/[controller]")]
public class UserTestController : ControllerBase
{
    [HttpGet("current")]
    public IActionResult GetCurrentUser()
    {
        var userName = User.Identity?.Name; // e.g., "DOMAIN\\Username"
        return Ok(new { UserName = userName });
    }
}

