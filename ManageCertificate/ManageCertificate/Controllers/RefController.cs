
using Microsoft.AspNetCore.Mvc;

using Entites;

using BL.Interfaces;
using BL;
namespace manageCertificate;


[Route("api/[controller]")]
[ApiController]

public class RefController : Controller
{
    ILogger<RefController> logger;
    IRefBL RefBL;
    public RefController(IRefBL RefBL, ILogger<RefController> logger)
    {
        this.RefBL = RefBL;
        this.logger = logger;
    }

    [HttpGet("/api/RefStatus")]
    public async Task<ActionResult<IEnumerable<RefStatus>>> GetAllStatus()
    {
        IEnumerable<RefStatus> refStatus = await RefBL.GetAllStatus();
        return Ok(refStatus);
    }
    [HttpGet("/GetAllInventory")]
    public async Task<ActionResult<IEnumerable<RefInventory>>> GetAllInventory()
    {
        IEnumerable<RefInventory> inventories = await RefBL.GetAllInventory();
        return Ok(inventories);
    }
    [HttpGet("/GetInventoryById")]
    public async Task<ActionResult<IEnumerable<RefInventory>>> GetInventoryById(int id)
    {
        RefInventory inventory = await RefBL.GetInventoryById(id);
        return Ok(inventory);
        
    }
}