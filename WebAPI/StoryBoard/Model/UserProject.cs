using DTO;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Model;

public class UserProject
{
    public int Id { get; private set; }
    public int IdUser { get; private set; }
    public int IdProject { get; private set; }
    public string UserType { get; private set; } = default!;
    public int AvailabilityTime { get; private set; }
    
    public User User { get; private set; } = default!;
    public Project Project { get; private set; } = default!;

    public UserProject()
    {

    }

    public UserProject(int idUser, int idProject, string userType, int availabilityTime)
    {
        this.IdUser = idUser;
        this.IdProject = idProject;
        this.UserType = userType;
        this.AvailabilityTime = availabilityTime;
    }

    public static UserProject Create(int IdUser, int IdProject, string UserType, int AvailabilityTime)
    {
        var userProject = new UserProject(IdUser, IdProject, UserType, AvailabilityTime);

        return userProject;
    }

    public static UserProject Create(UserProjectDto dto)
    {
        var userProject = new UserProject(dto.IdUser, dto.IdProject, dto.UserType, dto.AvailabilityTime);

        return userProject;
    }

    public static async Task<UserProject> GetUserProjectAsync(Expression<Func<UserProject, bool>> filter)
    {
        using var context = new Context();

        var userProject = await context.UserProject
            .FirstAsync(filter);

        return userProject;
    }

    public static async Task<UserProject> GetUserProjectById(int id)
    {
        using var context = new Context();

        var userProject = await context.UserProject
            .Where(x => x.Id == id)
            .FirstAsync();

        return userProject;
    }

    public static async Task<List<UserProject>> GetUserProjects()
    {
        using var context = new Context();

        var userProjects = await context.UserProject
            .ToListAsync();

        return userProjects;
    }

    public static async Task<List<UserProject>> GetUserProjectLike(Expression<Func<UserProject, bool>> filter)
    {
        using var context = new Context();

        var userProjects = await context.UserProject
            .Where(filter)
            .ToListAsync();

        return userProjects;
    }

    public async Task<UserProject> SaveAsync()
    {
        using var context = new Context();

        var transaction = await context.Database.BeginTransactionAsync();
        try
        {
            if (this.Id == 0)
            {
                await context.UserProject.AddAsync(this);
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

    public async static Task<UserProject> UpdateUserProjectAsync(UserProjectDto dto)
    {
        using var context = new Context();

        var transaction = await context.Database.BeginTransactionAsync();
        try
        {
            var userProjectDb = context.UserProject
           .First(x => x.Id == dto.Id);

            if (dto.IdUser != userProjectDb.IdUser) userProjectDb.IdUser = dto.IdUser;
            if (dto.IdProject != userProjectDb.IdProject) userProjectDb.IdProject = dto.IdProject;
            if (dto.UserType != userProjectDb.UserType) userProjectDb.UserType = dto.UserType;
            if (dto.AvailabilityTime != userProjectDb.AvailabilityTime) userProjectDb.AvailabilityTime = dto.AvailabilityTime;

            await context.SaveChangesAsync();
            await transaction.CommitAsync();

            return userProjectDb;
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}
