using BL;
using Entites;
using Microsoft.AspNetCore.Mvc;

namespace ManageCertificate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfficeInventoryController: ControllerBase
    {

        [HttpGet("/GetAllOfficeInventory")]
        public async Task<ActionResult<IEnumerable<OfficeInventory>>> GetAllOfficeInventory()
        {
            IEnumerable<OfficeInventory> OfficeInventory = await councilBL.GetAllcouncil();
            return Ok(refcouncils);
        }
    }
}
