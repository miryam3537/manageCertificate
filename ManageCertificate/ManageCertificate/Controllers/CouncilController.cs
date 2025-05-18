using Microsoft.AspNetCore.Mvc;
using BL;
using BL.Interfaces;
using Entites;
[ApiController]
[Route("api/[controller]")]
public class CouncilController : ControllerBase
{
    private readonly ICouncilBL councilBL;

    public CouncilController(ICouncilBL councilBL)
    {
        this.councilBL = councilBL;
    }


    [HttpGet("/GetAllRefCouncil")]
    public async Task<ActionResult<IEnumerable<RefCouncil>>> GetAllcouncil()
    {
        IEnumerable<RefCouncil> refcouncils = await councilBL.GetAllcouncil();
        return Ok(refcouncils);
    }



}



