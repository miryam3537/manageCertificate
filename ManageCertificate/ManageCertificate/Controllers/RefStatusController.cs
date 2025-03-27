
using Microsoft.AspNetCore.Mvc;

using Entites;
using BL;
using DAL;
namespace manageCertificate;


[Route("api/[controller]")]
[ApiController]



public class RefStatusController : Controller
{
    ILogger<RefStatusController> logger;
    IRefStatusBL RefStatusBL;
    public RefStatusController(IRefStatusBL RefStatusBL, ILogger<RefStatusController> logger)
    {
        this.RefStatusBL = RefStatusBL;
        this.logger = logger;
    }
   
    [HttpGet]
    public async Task<ActionResult<IEnumerable<RefStatus>>> Get()
    {
        IEnumerable<RefStatus> refStatus = await RefStatusBL.Get();
        return Ok(refStatus);
    }
}