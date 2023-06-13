using Dto;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Model;

public class Story
{
    public int Id { get; private set; }
    public string Name { get; private set; } = default!;
    public string Description { get; private set; } = default!;
    public DateTime CreationDate { get; private set; }
    public int IdSprint { get; private set; }

    public Sprint? Sprint { get; private set; } = default!;

    public Story()
    {

    }

    public Story(string name, string description, DateTime creationDate, int idSprint)
    {
        this.Name = name;
        this.Description = description;
        this.CreationDate = creationDate;
        this.IdSprint = idSprint;
    }

    public static Story Create(StoryDto dto)
    {
        var story = new Story(dto.Name, dto.Description, dto.CreationDate, dto.IdSprint);

        return story;
    }

    public static async Task<List<Story>> GetStoryLike(Expression<Func<Story, bool>> filter)
    {
        using var context = new Context();

        var projects = await context.Story
            .Where(filter)
            .ToListAsync();

        return projects;
    }

    public static async Task<Story> DeleteTaskAsync(StoryDeleteDto dto)
    {
        using var context = new Context();

        var story = await context.Story
            .FirstAsync(x => x.Id == dto.Id);

        //foreach(var task in story.Tasks)
        //{
        //    context.Task.Remove
        //}

        context.RemoveRange(story);
        await context.SaveChangesAsync();

        return story;
    }

    public async Task<Story> SaveAsync()
    {
        using var context = new Context();

        var transaction = await context.Database.BeginTransactionAsync();
        try
        {
            if (this.Id == 0)
            {
                await context.Story.AddAsync(this);
            }

            await context.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }

        return this;
    }
}
