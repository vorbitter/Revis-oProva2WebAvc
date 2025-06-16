using API.Models;

namespace API.Repositories.Interfaces;

public interface IUsuarioRepository
{
    Task<List<Usuario>> BuscarTodosUsuarios();
    Task<Usuario?> BuscarUsuarioPorEmailESenha(string email, string senha);
    Task Cadastrar(Usuario usuario);
}