using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class CategoriaRepository : ICategoriaRepository
{
    private readonly AppDBContext _db;

    public CategoriaRepository(AppDBContext db)
    {
        _db = db;
    }

    public async Task<Categoria?> BuscarCategoriaPorId(int categoriaId) => await _db.Categorias.FirstOrDefaultAsync(p => p.CategoriaId == categoriaId);
    public async Task<List<Categoria>> BuscarTodosCategorias() => await _db.Categorias.ToListAsync();
    public async Task CriarCategoria(Categoria categoria) => await _db.Categorias.AddAsync(categoria);
    public async Task<Categoria?> AtualizarCategoria(Categoria categoria, int categoriaId)
    {
        var categoriaASerModificada = await _db.Categorias.FirstOrDefaultAsync(p => p.CategoriaId == categoriaId);
        if (categoriaASerModificada is null)
            return null;

        _db.Entry(categoriaASerModificada).CurrentValues.SetValues(categoria);
        await _db.SaveChangesAsync();

        return categoriaASerModificada; // Já foi modificado
    }

    public async Task RemoverCategoriaPorId(int categoriaId)
    {
        var categoria = await _db.Categorias.FirstOrDefaultAsync(p => p.CategoriaId == categoriaId);
        if (categoria is null) return;
        _db.Categorias.Remove(categoria);
        await _db.SaveChangesAsync();
    }
}