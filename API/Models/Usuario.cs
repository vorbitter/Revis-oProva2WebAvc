
namespace API.Models;

public class Usuario
{
    public int UsuarioId { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; }
    public Permissao Permissao { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;
}
