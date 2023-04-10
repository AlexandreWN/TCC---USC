using Microsoft.AspNetCore.Mvc;
using DTO;
using System.Reflection;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> registerUsuario([FromBody] UserDto dto)
    {
        var user = await Model.User
            .Create(dto)
            .SaveAsync();

        return Ok(user.Id);
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> getUsuario([FromBody] LoginDto dto)
    {
        var usuario = await Model.User
            .GetUserAsync(u => u.Login == dto.Login && u.Password == dto.Password);

        return Ok(usuario);
    }

    [HttpGet]
    [Route("getUsers")]
    public async Task<IActionResult> getAllUsers()
    {
        var users = await Model.User
            .GetUsers();

        return Ok(users);
    }

    [HttpGet]
    [Route("getUsersLikeName/{name}")]
    public async Task<IActionResult> getUserByName(string name)
    {
        var users = await Model.User.GetUserLikeName(c =>
            c.Name.Contains(name));

        return Ok(users);
    }


    [HttpPut]
    [Route("updateUser")]
    public async Task<IActionResult> updateUser([FromBody] UserDto dto)
    {
        var user = await Model.User
            .UpdateUser(dto)
            .SaveAsync();

        return Ok(user);
    }
}

