using DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Model;

public class Project
{
    public int Id { get; private set; }
    public string Name { get; private set; } = default!;
    public string Description { get; private set; } = default!;
    public string UrlImage { get; private set; } = default!;
    public DateTime CreationDate { get; private set; }

    public Project()
    {

    }

    public Project(string name, string description, string urlImage, DateTime creationDate)
    {
        this.Name = name;
        this.Description = description;
        this.UrlImage = urlImage;
        this.CreationDate = creationDate;
    }

    public static Project Create(string Name, string Description, string UrlImage, DateTime CreationDate)
    {
        var project = new Project(Name, Description, UrlImage, CreationDate);

        return project;
    }

    public static Project Create(ProjectDto dto)
    {
        var project = new Project(dto.Name, dto.Description, dto.UrlImage, dto.CreationDate);

        return project;
    }

    public static async Task<Project> GetProjectAsync(Expression<Func<Project, bool>> filter)
    {
        using var context = new Context();

        var project = await context.Project
            .FirstAsync(filter);

        return project;
    }

    public static async Task<Project> GetProjectById(int id)
    {
        using var context = new Context();

        var project = await context.Project
            .Where(x => x.Id == id)
            .FirstAsync();

        return project;
    }

    public static async Task<List<Project>> GetProjects()
    {
        using var context = new Context();

        var projects = await context.Project
            .ToListAsync();

        return projects;
    }

    public static async Task<List<Project>> GetProjectLike(Expression<Func<Project, bool>> filter)
    {
        using var context = new Context();

        var projects = await context.Project
            .Where(filter)
            .ToListAsync();

        return projects;
    }

    public async Task<Project> SaveAsync()
    {
        using var context = new Context();

        var transaction = await context.Database.BeginTransactionAsync();
        try
        {
            if (this.Id == 0)
            {
                await context.Project.AddAsync(this);
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

    public async static Task<Project> UpdateProjectAsync(ProjectDto dto)
    {
        using var context = new Context();

        var transaction = await context.Database.BeginTransactionAsync();
        try
        {
            var projectDb = context.Project
           .First(x => x.Id == dto.Id);

            if (dto.Name != projectDb.Name) projectDb.Name = dto.Name;
            if (dto.Description != projectDb.Description) projectDb.Description = dto.Description;
            if (dto.UrlImage != projectDb.UrlImage) projectDb.UrlImage = dto.UrlImage;

            await context.SaveChangesAsync();
            await transaction.CommitAsync();

            return projectDb;
        }
        catch (Exception) 
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}
