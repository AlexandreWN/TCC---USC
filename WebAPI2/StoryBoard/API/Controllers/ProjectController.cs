using Microsoft.AspNetCore.Mvc;
using Dto;
using Model;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class ProjectController : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> RegisterProject([FromBody] ProjectDto dto)
    {
        var project = await Project
            .Create(dto)
            .SaveAsync();

        return Ok(project.Id);
    }

    [HttpGet]
    [Route("getProjects")]
    public async Task<IActionResult> GetAllProjects()
    {
        var projects = await Project
            .GetProjects();

        return Ok(projects);
    }

    [HttpGet]
    [Route("getProjectLikeId/{id}")]
    public async Task<IActionResult> GetProjectByName(int id)
    {
        var project = await Project.GetProjectById(id);

        return Ok(project);
    }

    [HttpGet]
    [Route("getProjectsLikeName/{name}")]
    public async Task<IActionResult> GetProjectByName(string name)
    {
        var projects = await Project.GetProjectLike(c =>
            c.Name.Contains(name));

        return Ok(projects);
    }


    [HttpPut]
    [Route("updateProject")]
    public async Task<IActionResult> UpdateProject([FromBody] ProjectDto dto)
    {
        var project = await Project
            .UpdateProjectAsync(dto);

        return Ok(project);
    }
}

