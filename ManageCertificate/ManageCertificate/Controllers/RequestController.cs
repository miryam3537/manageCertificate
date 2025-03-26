
using Microsoft.AspNetCore.Mvc;

using Entites;
using BL;
namespace manageCertificate;


[Route("api/[controller]")]
[ApiController]



public class RequestController : Controller
{
    ILogger<RequestController> logger;
    IRequestBL RequestBL;
    public RequestController(IRequestBL RequestBL, ILogger<RequestController> logger)
    {
        this.RequestBL = RequestBL;
        this.logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Request>>> Exmple()
    {
        logger.LogInformation("e" +
            "xmple");
        logger.LogCritical("exmple");
        IEnumerable<Request> requests = await RequestBL.Exmple();
        return Ok(requests);
    }
}