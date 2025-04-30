
using Microsoft.AspNetCore.Mvc;
using DTO;
using Entites;
using AutoMapper;
using BL.Interfaces;
using BL;
using System.Collections.Generic;
namespace manageCertificate;


[Route("api/[controller]/[action]")]
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
        IEnumerable <RequestDTO> requestDto = mapper.Map< IEnumerable<RequestDTO>>(requests);
        return Ok(requestDto);
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Request>> GetById(int id)
    {
        Request request = await RequestBL.GetById(id);
        RequestDTO requestDto = mapper.Map<RequestDTO>(request);
        return Ok(requestDto);
    }
    //[HttpGet("{id}")]
    //public async Task<ActionResult<Request>> Put(int id,Request request)
    //{
    //    Request PutRequest = await RequestBL.Get(id);
    //    RequestDTO requestDto = mapper.Map<RequestDTO>(request);
    //    return Ok(requestDto);
    //}
    ////לשאול את יעל פה עשיתי את ההמרה בשכבת הBL
    //[HttpPut("{id}")]
    //public async Task<IActionResult> Put(int id, [FromBody] RequestDTO requestDTO)
    //{
    //    if (requestDTO == null)
    //    {
    //        return BadRequest("Request data is null.");
    //    }

    //    bool isUpdated = await RequestBL.Put(id, requestDTO);

    //    if (isUpdated)
    //    {
    //        return NoContent(); // 204 No Content
    //    }
    //    else
    //    {
    //        return NotFound($"Request with ID {id} not found.");
    //    }
    //}

}