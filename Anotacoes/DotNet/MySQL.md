Primeiro abra o XAMPP e inicie o MySQL e Apache.

Crie um DbContext:

```c#
public class AppDataContext : DbContext
{
    public AppDataContext(DbContextOptions options) :
        base(options)
    { }
    public DbSet<Product> Products { get; set; }
    public DbSet<User> Usuarios { get; set; }
}
```

Em `appsettings.json`, adicione:

```json
  "ConnectionStrings": {
    "DefaultConnection": "server=localhost;database=revisao;user=root;password=mysqlpassword123;port=3307"
  },
```

Em `Program.cs` adicione:

```c#
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContext<AppDataContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
```