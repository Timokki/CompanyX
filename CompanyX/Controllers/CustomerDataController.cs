using CompanyX.Models;
using CompanyX.Services;
using Microsoft.AspNetCore.Mvc;

namespace CompanyX.Controllers;

/// <summary>
/// RESTful API implementation
/// </summary>
[ApiController]
[Route("ERPData")]
public class CustomDataController : ControllerBase
{
  FakeDataService dataSrv;
  public CustomDataController()
  {
    dataSrv = new FakeDataService();
  }

  [HttpGet]
  public ActionResult<List<CustomerErpRecord>> GetAll() => dataSrv.GetAll();

  [HttpGet("{id}")]
  public ActionResult<CustomerErpRecord> Get(int id)
  {
    var cDItem = dataSrv.Get(id);

    if (cDItem == null)
      return NotFound();

    return cDItem;
  }

  // POST action

  // PUT action

  // DELETE action
}