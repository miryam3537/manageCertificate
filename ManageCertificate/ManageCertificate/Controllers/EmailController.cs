using Microsoft.AspNetCore.Mvc;
using BL;
using BL.Interfaces;
using Entites;
[ApiController]
[Route("api/[controller]")]
public class EmailController : ControllerBase
{
    private readonly IEmailBL emailBL;

    public EmailController(IEmailBL emailBL)
    {
        this.emailBL = emailBL;
    }

    [HttpPost("send")]
    public IActionResult SendEmail([FromBody] EmailRequest request)
    {
        try
        {
            emailBL.SendEmail(request);
            return Ok(new { message = "Email sent successfully!" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = $"Failed to send email: {ex.Message}" });
        }
    }
}



