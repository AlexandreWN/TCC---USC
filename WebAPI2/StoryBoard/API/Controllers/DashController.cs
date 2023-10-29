using Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;

namespace Controllers;

[ApiController]
[Route("[controller]")]
public class DashController
{
    [HttpGet]
    [Route("SprintPerformance/{key}")]
    public async Task<object> GetAllProjects(int key)
    {
        var dash = new Dash(); // Crie uma instância da classe Dash
        var projects = await dash.GetSprintStatusAsync(key);

        return projects;
    }
}