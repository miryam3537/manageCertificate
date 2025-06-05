
using Microsoft.AspNetCore.Mvc;
using DTO;
using Entites;
using AutoMapper;
using BL.Interfaces;
using BL;
using System.Collections.Generic;
namespace manageCertificate;


[Route("api/[controller]")]
[ApiController]



public class RequestsController : Controller
{
    IMapper mapper;
    ILogger<RequestsController> logger;
    IRequestBL RequestBL;
    public RequestsController(IRequestBL RequestBL, ILogger<RequestsController> logger,IMapper mapper)
    {
        this.mapper = mapper;
        this.RequestBL = RequestBL;
        this.logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Request>>> GetAllRequest()
    {
        logger.LogInformation("e" +
            "xmple");
        logger.LogCritical("exmple");

        IEnumerable<Request> requests = await RequestBL.GetAllRequest();
        IEnumerable<RequestDTO> requestDto = mapper.Map<IEnumerable<RequestDTO>>(requests);
        return Ok(requestDto);
    }

    [HttpGet("GetCouncilId/{requestId}")]
    public async Task<IActionResult> GetCouncilId(int requestId)
    {
        try
        {
            // קריאה לפונקציה בשכבת ה-BL
            int councilId = await RequestBL.GetCouncilIdByRequestIdAsync(requestId);

            // החזרת התוצאה למשתמש
            return Ok(councilId);
        }
        catch (Exception ex)
        {
            // טיפול בשגיאות והחזרת הודעה מתאימה
            return NotFound(new { Message = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<RequestDTO>> Get(int id)
    {
        RequestDTO request = await RequestBL.Get(id);
        return Ok(request);
    }
    [HttpPut("{id}")]
    public async Task<ActionResult<RequestDTO>> PutRequestStatus(int id, [FromQuery] int? previousStatusId, [FromBody] RequestDTO PutRequest)
    {
        RequestDTO requestDTO = await RequestBL.PutRequest(id, previousStatusId, PutRequest);

        if (requestDTO != null)
        {
            return Ok(new { success = true, data = requestDTO });
        }
        else
        {
            return BadRequest(new { success = false});
        }
    }


}