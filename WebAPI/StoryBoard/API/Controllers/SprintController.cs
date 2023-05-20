using DTO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class SprintController : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> RegisterUserProject([FromBody] SprintDto dto)
    {
        var userProject = await Model.Sprint
            .Create(dto)
            .SaveAsync();

        return Ok(userProject.Id);
    }

    [HttpGet]
    [Route("getSprintLikeProjectId/{id}")]
    public async Task<IActionResult> GetSprintLikeProjectId(int id)
    {
        var userProject = await Model.Sprint.GetSprintAsync(s =>
            s.IdProject == id);

        return Ok(userProject);
    }
}
