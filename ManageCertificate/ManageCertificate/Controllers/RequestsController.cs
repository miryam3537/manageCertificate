
using Microsoft.AspNetCore.Mvc;
using DTO;
using Entites;
using BL;
using AutoMapper;
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
    public async Task<ActionResult<IEnumerable<Request>>> Exmple()
    {
        logger.LogInformation("e" +
            "xmple");
        logger.LogCritical("exmple");
        IEnumerable<Request> requests = await RequestBL.Exmple();
        return Ok(requests);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Request>> Get(int id)
    {
        Request request = await RequestBL.Get(id);
        RequestDTO requestDto = mapper.Map<RequestDTO>(request);
        return Ok(requestDto);
    }
}