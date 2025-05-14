
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


    [HttpGet("{id}")]
    public async Task<ActionResult<RequestDTO>> Get(int id)
    {
        RequestDTO request = await RequestBL.Get(id);
        return Ok(request);
    }
    [HttpPut("{id}")]
    public async Task<ActionResult> PutRequestStatus(int id, [FromQuery] int previousStatusId, [FromBody] RequestDTO PutRequest)
    {
        bool answer = await RequestBL.PutRequestStatus(id, previousStatusId, PutRequest);

        if (answer)
        {
            return Ok(new { success = true, message = "Request updated successfully." });
        }
        else
        {
            return BadRequest(new { success = false, message = "Failed to update request. Status mismatch or invalid data." });
        }
    }


}