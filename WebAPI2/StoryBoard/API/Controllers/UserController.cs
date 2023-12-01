using Microsoft.AspNetCore.Mvc;
using Dto;
using Model;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> RegisterUsuario([FromBody] UserDto dto)
    {
        var user = await Model.User
            .Create(dto)
            .SaveAsync();

        return Ok(user.Id);
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> GetUsuario([FromBody] LoginDto dto)
    {
        var usuario = await Model.User
            .GetUserAsync(dto);

        return Ok(usuario);
    }

    [HttpGet]
    [Route("getUsers")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await Model.User
            .GetUsers();

        return Ok(users);
    }

    [HttpGet]
    [Route("getUsersLikeName/{name}")]
    public async Task<IActionResult> GetUserByName(string name)
    {
        var users = await Model.User.GetUserLikeName(c =>
            c.Name.Contains(name));

        return Ok(users);
    }


    [HttpPut]
    [Route("updateUser")]
    public async Task<IActionResult> UpdateUser([FromBody] UserDto dto)
    {
        var user = await Model.User
            .UpdateUserAsync(dto);

        return Ok(user);
    }
}

