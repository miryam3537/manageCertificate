
using Microsoft.AspNetCore.Mvc;

using Entites;
using BL;
namespace manageCertificate;


[Route("api/[controller]")]
[ApiController]



public class TestController : Controller
{
    ILogger<TestController> logger;
    ITestBL testBL;
    public TestController(ITestBL testBL, ILogger<TestController> logger)
    {
        this.testBL = testBL;
        this.logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Request>>> Exmple()
    {
        logger.LogInformation("exmple");
        logger.LogCritical("exmple");
        IEnumerable<Request> requests = await testBL.Exmple();
        return Ok(requests);
    }
}