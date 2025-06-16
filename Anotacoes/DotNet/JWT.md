>AVISO: ESSE TUTORIAL ASSUME QUE O JWT JÁ ESTÁ INSTALADO

Primeiro, gere uma chave para a assinatura (Windows):
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

Unix:
```bash
openssl rand -base64 32
```

Agora, vá para o `appsettings.json` e acrescente a seguinte secção:
```json
"JwtSettings": { 
	"SecretKey": "o-valor-da-chave-aqui" 
}
```

Em `Program.cs` configure o JWT:
```c#
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var chaveJwt = builder.Configuration["JwtSettings:SecretKey"];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,                // Ignora o emissor do token
            ValidateAudience = false,              // Ignora o público do token
            ValidateLifetime = true,               // Verifica se o token está expirado
            ClockSkew = TimeSpan.Zero,             // opcional: remove tolerância de 5 min
            ValidateIssuerSigningKey = true,       // Garante que a assinatura do token é válida
            IssuerSigningKey = new SymmetricSecurityKey(
    Encoding.UTF8.GetBytes(chaveJwt!)) // Chave secreta usada para validar o token
        };
    });

builder.Services.AddAuthorization();
```
E adicione:
```c#
app.UseAuthentication(); 
app.UseAuthorization();
```

Um controller de usuários com login simples:
```c#
[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IUserRepository _userRepository;

    public UserController(IConfiguration configuration, IUserRepository userRepository)
    {
        _configuration = configuration;
        _userRepository = userRepository;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] User userCredentials)
    {
        var existingUser = _userRepository
            .GetUserByEmailAndPwd(userCredentials.Email, userCredentials.Password);

        if (existingUser is null)
            return Unauthorized(new { message = "Credenciais inválidas" });

        var token = GenerateToken(existingUser);
        return Ok(token);
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] User usuario)
    {
        _userRepository.Register(usuario);
        return Created("", usuario);
    }

    [HttpGet("listar")]
    public IActionResult GetUsers()
    {
        return Ok(_userRepository.GetUsers());
    }

    [ApiExplorerSettings(IgnoreApi = true)]
    public string GenerateToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var chave = Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]!);

        var signature = new SigningCredentials(
            new SymmetricSecurityKey(chave),
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: signature
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
```
