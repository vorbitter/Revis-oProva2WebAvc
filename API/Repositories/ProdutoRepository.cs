using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using API.Repositories.Interfaces;

namespace API.Repositories;

public class ProdutoRepository : IProdutoRepository
{
    private readonly AppDBContext _db;

    public ProdutoRepository(AppDBContext db)
    {
        _db = db;
    }

    public async Task<Produto?> BuscarProdutoPorId(int produtoId) => await _db.Produtos.FirstOrDefaultAsync(p => p.ProdutoId == produtoId);
    public async Task<List<Produto>> BuscarTodosProdutos() => await _db.Produtos.ToListAsync();
    public async Task CriarProduto(Produto produto) => await _db.Produtos.AddAsync(produto);
    public async Task<Produto?> AtualizarProduto(Produto produto, int produtoId)
    {
        var produtoASerModificado = await _db.Produtos.FirstOrDefaultAsync(p => p.ProdutoId == produtoId);
        if (produtoASerModificado is null)
            return null;

        _db.Entry(produtoASerModificado).CurrentValues.SetValues(produto);
        await _db.SaveChangesAsync();

        return produtoASerModificado; // Já foi modificado
    }

    public async Task RemoverProdutoPorId(int produtoId)
    {
        var produto = await _db.Produtos.FirstOrDefaultAsync(p => p.ProdutoId == produtoId);
        if (produto is null) return;
        _db.Produtos.Remove(produto);
        await _db.SaveChangesAsync();
    }
}