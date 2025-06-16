using API.Models;

namespace API.Repositories;

public interface ICategoriaRepository
{
    public Task<Categoria?> BuscarCategoriaPorId(int categoriaId);
    public Task<List<Categoria>> BuscarTodosCategorias();
    public Task CriarCategoria(Categoria categoria);
    public Task<Categoria?> AtualizarCategoria(Categoria categoria, int categoriaId);
    public Task RemoverCategoriaPorId(int categoriaId);
}