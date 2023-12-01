using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Model
{
    public class Context : DbContext
    {
        public DbSet<User> User { get; set; }
        public DbSet<Project> Project { get; set; }
        public DbSet<UserProject> UserProject { get; set; }
        public DbSet<Sprint> Sprint { get; set; }
        public DbSet<Dash> Dash { get; set; }
        public DbSet<Story> Story { get; set; }
        public DbSet<Task> Task { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=tcp:storyboard.database.windows.net,1433;Initial Catalog=StoryBoard;Persist Security Info=False;User ID=Story.Board;Password=Pokemonavg123*;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            //optionsBuilder.UseSqlServer("Data Source=(LocalDb)\\MSSQLLocalDB;Initial Catalog=StoryBoard; Integrated Security=SSPI;TrustServerCertificate=True");
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
                entity.Property(us => us.Salt);
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.ToTable("Project");
                entity.HasKey(p => p.Id);
                entity.Property(p => p.Name);
                entity.Property(p => p.Description);
                entity.Property(p => p.UrlImage);
                entity.Property(p => p.CreationDate);
            });

            modelBuilder.Entity<UserProject>(entity =>
            {
                entity.ToTable("UserProject");
                entity.HasKey(up => up.Id);
                entity.Property(up => up.UserType);
                entity.Property(up => up.AvailabilityTime);
                entity.Property(up => up.IdUser);
                entity.Property(up => up.IdProject);

                entity.HasOne(u => u.User)
                    .WithMany()
                    .HasForeignKey(u => u.IdUser);

                entity.HasOne(p => p.Project)
                    .WithMany()
                    .HasForeignKey(p => p.IdProject);
            });

            modelBuilder.Entity<Sprint>(entity =>
            {
                entity.ToTable("Sprint");
                entity.HasKey(s => s.Id);
                entity.Property(s => s.Name);
                entity.Property(s => s.CreationDate);
                entity.Property(s => s.InitionDate);
                entity.Property(s => s.EndDate);

                entity.HasOne(p => p.Project)
                    .WithMany()
                    .HasForeignKey(p => p.IdProject);
            });

            modelBuilder.Entity<Dash>(entity =>
            {
                entity.ToTable("Dash");
                entity.HasKey(d => d.Id);
                entity.Property(d => d.ActualDate);
                entity.Property(d => d.ActualTime);
                entity.Property(d => d.RevewTime);
                entity.Property(d => d.DreamTime);
                entity.Property(d => d.IdSprint);
                entity.Property(d => d.IdUserProject);

                ///Gambiarra OnDelete para ignorar restição de chave estrangeira CUIDADO
                entity.HasOne(s => s.Sprint)
                    .WithMany()
                    .HasForeignKey(s => s.IdSprint)
                    .OnDelete(DeleteBehavior.NoAction);

                ///Gambiarra OnDelete para ignorar restição de chave estrangeira CUIDADO
                entity.HasOne(up => up.UserProject)
                    .WithMany()
                    .HasForeignKey(up => up.IdUserProject)
                    .OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Story>(entity =>
            {
                entity.ToTable("Story");
                entity.HasKey(st => st.Id);
                entity.Property(st => st.Name);
                entity.Property(st => st.Description);
                entity.Property(st => st.CreationDate);
                entity.Property(st => st.IdSprint);

                entity.HasOne(s => s.Sprint)
                    .WithMany()
                    .HasForeignKey(s => s.IdSprint);
            });

            modelBuilder.Entity<Task>(entity =>
            {
                entity.ToTable("Task");
                entity.HasKey(t => t.Id);
                entity.Property(t => t.Name);
                entity.Property(t => t.Description);
                entity.Property(t => t.CreationDate);
                entity.Property(t => t.EndDate);
                entity.Property(t => t.DurationTime);
                entity.Property(t => t.Status);
                entity.Property(t => t.IdStory);

                entity.HasOne(s => s.Story)
                    .WithMany()
                    .HasForeignKey(s => s.IdStory);
            });
        }
    }
}