using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

using DTO;
using Microsoft.EntityFrameworkCore;

namespace Model;

public class User
{
    public int Id { get; private set; }
    public string Name { get; private set; }
    public string Login { get; private set; }
    public string Password { get; private set; }
    public bool Active { get; private set; }
    public bool Adm { get; private set; }
    
    public User()
    {

    }

    public User(string name, string login, string password, bool active, bool adm)
    {
        this.Name = name;
        this.Login = login;
        this.Password = password;
        this.Active = active;
        this.Adm = adm;
    }

    public static User Create(string Name, string Login, string Password, bool Active, bool Adm)
    {
        var usuario = new User(Name, Login, Password, Active, Adm);

        return usuario;
    }

    public static User Create(UserDto dto)
    {
        var usuario = new User(dto.Name, dto.Login, dto.Password, dto.Active, dto.Adm);

        return usuario;
    }

    public static async Task<User> GetUserAsync(Expression<Func<User, bool>> filter)
    {
        using var context = new Context();

        var user = await context.User
            .FirstAsync(filter);

        return user;
    }

    public static async Task<User> GetUserById(int id)
    {
        using var context = new Context();

        var user = await context.User
            .Where(x => x.Id == id)
            .FirstAsync();

        return user;
    }

    public static async Task<List<User>> GetUsers()
    {
        using var context = new Context();

        var users = await context.User
            .ToListAsync();

        return users;
    }

    public static async Task<List<User>> GetUserLikeName(Expression<Func<User, bool>> filter)
    {
        using var context = new Context();

        var users = await context.User
            .Where(filter)
            .ToListAsync();

        return users;
    }

    public async Task<User> SaveAsync()
    {
        using var context = new Context();

        var transaction = await context.Database.BeginTransactionAsync();
        try
        {
            if(this.Id == 0)
            {
                await context.User.AddAsync(this);
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

    public static User UpdateUser(UserDto dto)
    {
        var context = new Context();

        var userDb = context.User
            .First(x => x.Id == dto.Id);

        if (dto.Name != userDb.Name)
        {
            userDb.Name = dto.Name;
        }

        if (dto.Active != userDb.Active)
        {
            userDb.Active = dto.Active;
        }

        if (dto.Adm != userDb.Adm)
        {
            userDb.Adm = dto.Adm;
        }

        return userDb;
    }
}

