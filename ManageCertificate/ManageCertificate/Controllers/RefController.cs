
using Microsoft.AspNetCore.Mvc;

using Entites;

using BL.Interfaces;
using BL;
using DTO;

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
    [HttpPut("/api/updateInventoryAmount")]
    public async Task<IActionResult> UpdateInventoryAmount([FromBody] UpdateInventoryDTO inventoryDto)
    {
        if (inventoryDto == null)
            return BadRequest();

        var result = await RefBL.UpdateInventoryAmountAsync(inventoryDto.InventoryId, inventoryDto.Inventory);
        if (result == null)
            return NotFound();

        return Ok(result); // מחזיר את האובייקט המעודכן
    }

    [HttpGet("/GetAllOfficeInventory")]
    public async Task<ActionResult<IEnumerable<RefOfficeInventory>>> GetAllOfficeInventory()
    {
        IEnumerable<RefOfficeInventory> OfficeInventory = await RefBL.GetAllOfficeInventory();
        return Ok(OfficeInventory);

    }
    [HttpGet("/api/RefStatus")]
    public async Task<ActionResult<IEnumerable<RefStatus>>> GetAllStatus()
    {
        IEnumerable<RefStatus> refStatus = await RefBL.GetAllStatus();
        return Ok(refStatus);
    }
    [HttpGet("/GetAllInventory")]
    public async Task<ActionResult<IEnumerable<RefInventoryDTO>>> GetAllInventory()
    {
        IEnumerable<RefInventoryDTO> inventories = await RefBL.GetAllInventory();
        return Ok(inventories);
    }
    [HttpGet("/GetInventoryById")]
    public async Task<ActionResult<RefInventoryDTO>> GetInventoryById(int concilId,  int certificateId)
    {
        RefInventoryDTO inventory = await RefBL.GetInventoryById(concilId, certificateId);
        return Ok(inventory);
        
    }
    [HttpGet("/GetAllCertificate")]
    public async Task<ActionResult<IEnumerable<CertificateDTO>>> GetAllCertificate()
    {
        IEnumerable<CertificateDTO> certificate = await RefBL.GetAllCertificate();
        return Ok(certificate);
    }
    [HttpGet("/GetAllCertificateType")]
    public async Task<ActionResult<IEnumerable<RefCertificateType>>> GetAllCertificateType()
    {
        IEnumerable<RefCertificateType> certificateType = await RefBL.GetAllCertificateType();
        return Ok(certificateType);
    }
}