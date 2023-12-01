using Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Model;
using Model.Hubs;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class TaskController : ControllerBase
{
    private readonly IHubContext<TaskHub> hubContext;

    public TaskController(IHubContext<TaskHub> hubContext)
    {
        this.hubContext = hubContext;
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> RegisterStory([FromBody] TaskDto dto)
    {
        var task = await Model.Task
            .Create(dto)
            .SaveAsync();

        await hubContext.Clients.All.SendAsync("TaskRegistered", task);

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

    [HttpPost]
    [Route("delete")]
    public async Task<IActionResult> DeleteTaskAsync([FromBody] TaskDeleteDto dto)
    {
        var task = await Model.Task
            .DeleteTaskAsync(dto);

        return Ok(task);
    }
}
