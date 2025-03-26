using BL;
using manageCertificate;
using Microsoft.AspNetCore.Mvc;

namespace ManageCertificate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class RefStatusController : Controller
    {
        ILogger<RequestsController> logger;
        IRequestBL RequestBL;
        public RefStatusController(IRequestBL RequestBL, ILogger<RequestsController> logger)
        {
            this.RequestBL = RequestBL;
            this.logger = logger;
        }
    }
}
