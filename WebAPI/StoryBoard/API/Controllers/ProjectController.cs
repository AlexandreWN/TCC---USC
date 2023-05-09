using Microsoft.AspNetCore.Mvc;
using DTO;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class ProjectController : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> registerProject([FromBody] ProjectDto dto)
    {
        var project = await Model.Project
            .Create(dto)
            .SaveAsync();

        return Ok(project.Id);
    }

    [HttpGet]
    [Route("getProjects")]
    public async Task<IActionResult> getAllProjects()
    {
        var projects = await Model.Project
            .GetProjects();

        return Ok(projects);
    }

    [HttpGet]
    [Route("getProjectLikeId/{id}")]
    public async Task<IActionResult> getProjectByName(int id)
    {
        var project = await Model.Project.GetProjectById(id);

        return Ok(project);
    }

    [HttpGet]
    [Route("getProjectsLikeName/{name}")]
    public async Task<IActionResult> getProjectByName(string name)
    {
        var projects = await Model.Project.GetProjectLike(c =>
            c.Name.Contains(name));

        return Ok(projects);
    }


    [HttpPut]
    [Route("updateProject")]
    public async Task<IActionResult> updateProject([FromBody] ProjectDto dto)
    {
        var project = await Model.Project
            .UpdateProjectAsync(dto);

        return Ok(project);
    }
}

