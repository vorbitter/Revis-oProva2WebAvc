using API.Models;

namespace API.Repositories.Interfaces;

public interface IProdutoRepository
{
    Task<Produto?> BuscarProdutoPorId(int produtoId);
    Task<List<Produto>> BuscarTodosProdutos();
    Task CriarProduto(Produto produto);
    Task<Produto?> AtualizarProduto(Produto produto, int produtoId);
    Task RemoverProdutoPorId(int produtoId);
}