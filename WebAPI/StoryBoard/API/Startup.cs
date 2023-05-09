using Microsoft.EntityFrameworkCore;
using Model;

namespace API;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();

        IConfiguration configuration = Configuration.GetSection("ConnectionStrings");

        services.AddDbContext<Context>(options =>
            options.UseSqlServer(configuration["DefaultConnection"]));

        services.AddSwaggerGen();

        services.AddCors(p => p.AddPolicy("corsapp", builder =>
        {
            builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
        }));
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetService<Context>();
            //dbContext.Database.EnsureDeleted();
            dbContext.Database.EnsureCreated();
        }

        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseRouting();
        app.UseCors("corsapp");

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
