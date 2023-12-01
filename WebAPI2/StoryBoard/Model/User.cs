using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

using Dto;
using Microsoft.EntityFrameworkCore;
using Model.EncodeDecode.IService;
using Model.EncodeDecode.Service;

namespace Model;

public class User
{
    public int Id { get; private set; }
    public string Name { get; private set; }
    public string Login { get; private set; }
    public string Password { get; private set; }
    public bool Active { get; private set; }
    public bool Adm { get; private set; }
    public string Salt { get; private set; }
    
    public User()
    {
    }

    public User(string name, string login, string password, bool active, bool adm, string salt)
    {
        this.Name = name;
        this.Login = login;
        this.Password = password;
        this.Active = active;
        this.Adm = adm;
        this.Salt = salt;
    }

    public static User Create(string Name, string Login, string Password, bool Active, bool Adm, string Salt)
    {
        var usuario = new User(Name, Login, Password, Active, Adm, Salt);

        return usuario;
    }

    public static User Create(UserDto dto)
    {
        var encodeDecodeService = new EncodeDecodeService();
        
        var user = encodeDecodeService.GenerateHashedUser(dto);

        var userHashed = new User(user.Name, user.Login, user.Password, user.Active, user.Adm, user.Salt);

        return userHashed;
    }

    public static async Task<User> GetUserAsync(LoginDto dto)
    {
        using var context = new Context();

        var encodeDecodeService = new EncodeDecodeService();

        var users = await context.User
            .Where(x => x.Login == dto.Login).ToListAsync();

        var user = users.Where(x => encodeDecodeService.VerifyPassword(dto.Password, x.Salt, x.Password) == true).First();

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

    public static User GetUserLikeEmail(string email)
    {
        using var context = new Context();

        var user = context.User
            .FirstOrDefault(x => x.Login == email);

        return user;
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

    public async static Task<User> UpdateUserAsync(UserDto dto)
    {
        using var context = new Context();

        var transaction = await context.Database.BeginTransactionAsync();
        try
        {
            var userDb = context.User
            .First(x => x.Id == dto.Id);

            if (dto.Name != userDb.Name) userDb.Name = dto.Name;
            if (dto.Active != userDb.Active) userDb.Active = dto.Active;
            if (dto.Adm != userDb.Adm) userDb.Adm = dto.Adm;

            await context.SaveChangesAsync();
            await transaction.CommitAsync();

            return userDb;
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}

