using Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Model;

public class Sprint
{
    public int Id { get; private set; }
    public string Name { get; private set; } = default!;
    public string Description { get; private set; } = default!;
    public DateTime CreationDate { get; private set; }
    public DateTime InitionDate { get; private set; }
    public DateTime EndDate { get; private set; }
    public int IdProject { get; private set; }

    public Project Project { get; private set; } = default!;

    public Sprint()
    {

    }

    public Sprint(string name, string description, DateTime creationDate, DateTime initionDate, DateTime endDate, int idProject)
    {
        this.Name = name;
        this.Description = description;
        this.CreationDate = creationDate;
        this.InitionDate = initionDate;
        this.EndDate = endDate;
        this.IdProject = idProject;
    }

    public static Sprint Create(string Name, string Description, DateTime CreationDate, DateTime InitionDate, DateTime EndDate, int IdProject)
    {
        var sprint = new Sprint(Name, Description, CreationDate, InitionDate, EndDate, IdProject);

        return sprint;
    }

    public static Sprint Create(SprintDto dto)
    {
        var sprint = new Sprint(dto.Name, dto.Description, dto.CreationDate, dto.InitionDate, dto.EndDate, dto.IdProject);

        return sprint;
    }

    public static async Task<List<Sprint>> GetSprintAsync(Expression<Func<Sprint, bool>> filter)
    {
        using var context = new Context();

        var sprint = await context.Sprint
            .Where(filter)
            .ToListAsync();

        return sprint;
    }

    public async Task<Sprint> SaveAsync()
    {
        using var context = new Context();

        var transaction = await context.Database.BeginTransactionAsync();
        try
        {
            if (this.Id == 0)
            {
                await context.Sprint.AddAsync(this);
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
