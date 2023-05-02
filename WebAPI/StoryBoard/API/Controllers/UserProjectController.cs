using Microsoft.AspNetCore.Mvc;
using DTO;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class UserProjectProjectController : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> registerUsuario([FromBody] UserProjectDto dto)
    {
        var user = await Model.UserProject
            .Create(dto)
            .SaveAsync();

        return Ok(user.Id);
    }

    [HttpGet]
    [Route("getUserProjects")]
    public async Task<IActionResult> getAllUserProjects()
    {
        var users = await Model.UserProject
            .GetUserProjects();

        return Ok(users);
    }

    [HttpGet]
    [Route("getUserProjectsLikeUserName/{name}")]
    public async Task<IActionResult> getUserProjectByName(string name)
    {
        var users = await Model.UserProject.GetUserProjectLike(c =>
            c.User.Name.Contains(name));

        return Ok(users);
    }


    [HttpPut]
    [Route("updateUserProject")]
    public async Task<IActionResult> updateUserProject([FromBody] UserProjectDto dto)
    {
        var user = await Model.UserProject
            .UpdateUserProjectAsync(dto);

        return Ok(user);
    }
}