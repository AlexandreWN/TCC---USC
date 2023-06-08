using Dto;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class TaskController : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> RegisterStory([FromBody] TaskDto dto)
    {
        var task = await Model.Task
            .Create(dto)
            .SaveAsync();

        return Ok(task);
    }

    [HttpGet]
    [Route("getTaskByStoryId/{id}")]
    public async Task<IActionResult> GetTaskByStoryId(int id)
    {
        var task = await Model.Task.GetTaskLike(t =>
            t.IdStory == id) ;

        return Ok(task);
    }

    [HttpPut]
    [Route("updateTask")]
    public async Task<IActionResult> UpdateTaskAsync([FromBody] TaskDto dto)
    {
        var task = await Model.Task
            .UpdateTaskAsync(dto);

        return Ok(task);
    }
}
