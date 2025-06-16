# Início do Projeto

Para criar uma solução:
```bash
dotnet new sln --name NomeDaSolucao
```

Para criar uma web api nova em ASP.NET Core com o padrão MVC:
```bash
dotnet new webapi -n NomeDoProjeto --no-https --use-controllers
```

Para adicionar um projeto a solução:
```bash
dotnet sln [<SOLUTION_FILE>] add [--in-root] [-s|--solution-folder <PATH>]
```

Adaptado para os nomes acima: 
```bash
dotnet sln NomeDaSolucao.sln add NomeDoProjeto
```
Caso isso dê erro, tente especificar o caminho completo do `.csproj` do seu projeto, algo como `NomeDoProjeto/NomeDoProjeto.csproj`.

Depois, adicione os pacotes do mysql, ef core e jwt respectivamente ao projeto:
```bash
dotnet add package Pomelo.EntityFrameworkCore.MySql --version 8.*
dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.*
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version: 8.*
```

---

---
## Migrations

```bash
dotnet ef migrations add NomeDaMigration
```

---
## Database
```bash
dotnet ef database update
```

```bash
dotnet ef database drop
```

---

---

---
# Tipos
## Decimal

Literais do tipo `decimal` usam o sufixo `m` ou `M`:
```c#
decimal myDecimal = 14m
```

---
# Git
## Remover entradas utilizando `git config`
You can use the `--unset` flag of `git config` to do this like so:

```bash
git config --global --unset user.name
git config --global --unset user.email
```

If you have more variables for one config you can use:

```bash
git config --global --unset-all user.name
```

---
# Erros Comuns 
## Cors
```c#
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

---
## Referências Cíclicas

Existem algumas opções, a mais fácil para prova é ignorar ciclos globalmente:
```c#
using System.Text.Json.Serialization;

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

//se o código acima não funcionar, tente
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
{
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.SerializerOptions.WriteIndented = true;
});
```
## Usando DTOs
Instead of exposing your entity models directly, use **DTOs or ViewModels** that flatten or reshape the data:
```c#
public class ParentDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<ChildDto> Children { get; set; }
}

public class ChildDto
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```
## JsonIgnore
If one side of the navigation is not necessary during serialization (e.g., you don’t need to return the parent in the child object), you can ignore it:

```c#
public class Parent
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Child> Children { get; set; }
}

public class Child
{
    public int Id { get; set; }
    public string Name { get; set; }

    [JsonIgnore] // Prevents infinite loop
    public Parent Parent { get; set; }
}
```
Use `System.Text.Json.Serialization.JsonIgnore` if you're using the default .NET serializer.

---
## Métodos HTTP(Ok, Unauthorized, Created, etc...)
As vezes, pode ocorrer dos métodos do título não serem identificados corretamente, saiba que todos vêm da class ControllerBase, então ControllerBase.Ok, ControllerBase.Unauthorized...

---

## Porta do MySQL
Verifique a porta do mysql, geralmente nos pcs da faculdade ele roda na porta 3307. 