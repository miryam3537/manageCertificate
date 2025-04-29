
using Microsoft.AspNetCore.Mvc;
using DTO;
using Entites;
using AutoMapper;
using BL.Interfaces;
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
        return Ok(requests);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Request>> GetById(int id)
    {
        Request request = await RequestBL.GetById(id);
        RequestDTO requestDto = mapper.Map<RequestDTO>(request);
        return Ok(requestDto);
    }
}