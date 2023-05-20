using Microsoft.AspNetCore.Mvc;
using Dto;
using Model;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class UserProjectController : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> RegisterUserProject([FromBody] UserProjectDto dto)
    {
        var userProject = await UserProject
            .Create(dto)
            .SaveAsync();

        return Ok(userProject.Id);
    }

    [HttpGet]
    [Route("getUserProjects")]
    public async Task<IActionResult> GetAllUserProjects()
    {
        var userProject = await UserProject
            .GetUserProjects();

        return Ok(userProject);
    }

    [HttpGet]
    [Route("getUserProjectsLikeUserName/{name}")]
    public async Task<IActionResult> GetUserProjectsLikeUserName(string name)
    {
        var userProject = await UserProject.GetUserProjectLike(c =>
            c.User.Name.Contains(name));

        return Ok(userProject);
    }

    [HttpGet]
    [Route("getUserProjectsLikeUserId/{id}/{userType}")]
    public async Task<IActionResult> GetUserProjectByUserId(int id, string userType)
    {
        var userProject = await UserProject.GetUserProjectLike(c =>
            c.IdUser == id && c.UserType == userType);

        return Ok(userProject);
    }

    [HttpPut]
    [Route("updateUserProject")]
    public async Task<IActionResult> UpdateUserProject([FromBody] UserProjectDto dto)
    {
        var userProject = await UserProject
            .UpdateUserProjectAsync(dto);

        return Ok(userProject);
    }
}