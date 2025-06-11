using BL;
using BL.Interfaces;
using DAL.Interfaces;
using Entites;

using Microsoft.AspNetCore.Mvc;

namespace ManageCertificate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfficeInventoryController: ControllerBase
    {
        private readonly IOfficeInventoryBL OfficeInventoryBL;

        public OfficeInventoryController(IOfficeInventoryBL officeInventoryBL)
        {
            this.OfficeInventoryBL = officeInventoryBL;
        }

        [HttpGet("/GetAllOfficeInventory2")]
        public async Task<ActionResult<IEnumerable<RefOfficeInventory>>> GetAllOfficeInventory()
        {
            IEnumerable<OfficeInventory> OfficeInventory = await OfficeInventoryBL.GetAllOfficeInventory();
            return Ok(OfficeInventory);
           
        }
    }
}
