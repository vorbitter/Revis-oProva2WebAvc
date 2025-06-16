using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Repositories.Interfaces;
using API.Services;

[ApiController]
[Route("api/usuario")]
public class UsuarioController : ControllerBase
{
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly TokenService _tokenService;

    public UsuarioController(IUsuarioRepository usuarioRepository, TokenService tokenService)
    {
        _usuarioRepository = usuarioRepository;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Usuario usuarioCredentials)
    {
        var usuarioExistente = await _usuarioRepository
            .BuscarUsuarioPorEmailESenha(usuarioCredentials.Email, usuarioCredentials.Senha);

        if (usuarioExistente is null)
            return Unauthorized(new { message = "Credenciais inválidas" });

        var token = _tokenService.GerarToken(usuarioExistente);

        return Ok(token);
    }

    [HttpPost("cadastrar")]
    public async Task<IActionResult> Cadastrar([FromBody] Usuario usuario)
    {
        await _usuarioRepository.Cadastrar(usuario);
        return Created("", usuario);
    }

    [HttpGet("listar")]
    public async Task<IActionResult> GetUsuarios()
    {
        var usuarios = await _usuarioRepository.BuscarTodosUsuarios();
        if (!usuarios.Any()) return NoContent();
        return Ok(usuarios);
    }
}