using DTO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class StoryController : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> RegisterStory([FromBody] StoryDto dto)
    {
        var story = await Model.Story
            .Create(dto)
            .SaveAsync();

        return Ok(story);
    }

    [HttpGet]
    [Route("getStoryBySprintId/{id}")]
    public async Task<IActionResult> GetStorBySprintId(int id)
    {
        var story = await Model.Story.GetStoryLike(s =>
            s.IdSprint == id);

        return Ok(story);
    }
}
