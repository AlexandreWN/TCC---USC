using Dto;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Runtime.CompilerServices;

namespace Model;

public class Task
{
    public int Id { get; private set; }
    public string Name { get; private set; } = default!;
    public string Description { get; private set; } = default!;
    public DateTime CreationDate { get; private set; }
    public DateTime EndDate { get; private set; }
    public int DurationTime { get; private set; }
    public string Status { get; private set; } = default!;
    public int IdStory { get; private set; }

    public Story Story { get; private set; } = default!;

    public Task()
    {

    }

    public Task(string name, string description, DateTime creationDate, DateTime endDate, int durationTime, string status, int idStory)
    {
        this.Name = name;
        this.Description = description;
        this.CreationDate = creationDate;
        this.EndDate = endDate;
        this.DurationTime = durationTime;
        this.Status = status;
        this.IdStory = idStory;
    }

    public static Task Create(TaskDto dto)
    {
        var story = new Task(dto.Name, dto.Description, dto.CreationDate, dto.EndDate, dto.DurationTime, dto.Status, dto.IdStory);

        return story;
    }

    public static async Task<List<Task>> GetTaskLike(Expression<Func<Task, bool>> filter)
    {
        using var context = new Context();

        var projects = await context.Task
            .Where(filter)
            .ToListAsync();

        return projects;
    }

    public static async Task<Task> DeleteTaskAsync(TaskDeleteDto dto)
    {
        using var context = new Context();

        var task = await context.Task.FirstAsync(x => x.Id == dto.Id);

        context.Remove(task);
        await context.SaveChangesAsync();

        return task;
    }

    public async Task<Task> SaveAsync()
    {
        using var context = new Context();

        var transaction = await context.Database.BeginTransactionAsync();
        try
        {
            if (this.Id == 0)
            {
                await context.Task.AddAsync(this);
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

    public async static Task<Task> UpdateTaskAsync(TaskDto dto)
    {
        using var context = new Context();

        var transaction = await context.Database.BeginTransactionAsync();
        try
        {
            var taskDb = context.Task
           .First(x => x.Id == dto.Id);

            if (dto.Name != taskDb.Name) taskDb.Name = dto.Name;
            if (dto.Description != taskDb.Description) taskDb.Description = dto.Description;
            if (dto.EndDate != taskDb.EndDate) taskDb.EndDate = dto.EndDate;
            if (dto.DurationTime != taskDb.DurationTime) taskDb.DurationTime = dto.DurationTime;
            if (dto.Status != taskDb.Status) taskDb.Status = dto.Status;

            if (dto.Status != "done")
            {
                taskDb.EndDate = default;
            }
            await context.SaveChangesAsync();
            await transaction.CommitAsync();

            return taskDb;
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}