
using Microsoft.AspNetCore.Mvc;

using Entites;
using BL;
namespace manageCertificate;


[Route("api/[controller]")]
[ApiController]



public class TestController : Controller
{
    ITestBL testBL;
    public TestController(ITestBL testBL)
    {
        this.testBL = testBL;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Request>>> Exmple()
    {
        IEnumerable<Request> requests = await testBL.Exmple();
        return Ok(requests);
    }
}