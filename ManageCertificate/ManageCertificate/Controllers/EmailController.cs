using Microsoft.AspNetCore.Mvc;
using BL;
[ApiController]
[Route("api/[controller]")]
public class EmailController : ControllerBase
{
    private readonly EmailBL emailBL;

    public EmailController()
    {
        emailBL = new EmailBL(); // ניתן להשתמש ב-DI במקום
    }

    [HttpPost("send")]
    public IActionResult SendEmail([FromBody] EmailRequest request)
    {
        try
        {
            emailBL.SendEmail(request.ToEmail, request.Subject, request.Body);
            return Ok("Email sent successfully!");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Failed to send email: {ex.Message}");
        }
    }
}

public class EmailRequest
{
    public string ToEmail { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
}

