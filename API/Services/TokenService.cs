using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using API.Models;

namespace API.Services;

public class TokenService
{

    private readonly IConfiguration _configuration;
    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GerarToken(Usuario usuario)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, usuario.Email),
            new Claim(ClaimTypes.Role, usuario.Permissao.ToString())
        };

        var chave = Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]!);

        var signature = new SigningCredentials(
            new SymmetricSecurityKey(chave),
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddMinutes(120), //tempo de expiração do token
            signingCredentials: signature
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}