using Dto;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class StoryController : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> RegisterStory([FromBody] StoryDto dto)
    {
        var story = await Story
            .Create(dto)
            .SaveAsync();

        return Ok(story);
    }

    [HttpGet]
    [Route("getStoryBySprintId/{id}")]
    public async Task<IActionResult> GetStorBySprintId(int id)
    {
        var story = await Story.GetStoryLike(s =>
            s.IdSprint == id);

        return Ok(story);
    }
}
