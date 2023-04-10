using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Model
{
    public class Context : DbContext
    {
        public DbSet<User> User { get; set; }

        public Context() : base()
        {
        }

        public Context(DbContextOptions<Context> options, IConfiguration configuration) : base(options)
        {
            Context.Configuration = configuration;
        }

        public static IConfiguration Configuration { get; private set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");
                entity.HasKey(us => us.Id);
                entity.Property(us => us.Name);
                entity.Property(us => us.Login);
                entity.Property(us => us.Password);
                entity.Property(us => us.Active);
                entity.Property(us => us.Adm);
            });
        }
    }
}