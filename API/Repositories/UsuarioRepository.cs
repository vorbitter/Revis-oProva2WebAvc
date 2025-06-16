using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using API.Repositories.Interfaces;

namespace API.Repositories;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly AppDBContext _db;

    public UsuarioRepository(AppDBContext db)
    {
        _db = db;
    }
    public async Task<Usuario?> BuscarUsuarioPorEmailESenha(string email, string senha) =>
        await _db.Usuarios.FirstOrDefaultAsync(u => u.Email.Equals(email) && u.Senha.Equals(senha));

    public async Task Cadastrar(Usuario usuario)
    {
        await _db.Usuarios.AddAsync(usuario);
        await _db.SaveChangesAsync();
    }
    public async Task<List<Usuario>> BuscarTodosUsuarios() => await _db.Usuarios.ToListAsync();
}