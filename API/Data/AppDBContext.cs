using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data;

public class AppDBContext : DbContext
{
    public AppDBContext(DbContextOptions options) :
        base(options)
    { }
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Venda> Vendas { get; set; }
    public DbSet<ItemVenda> ItemVendas { get; set; }
    public DbSet<FormaPagamento> FormaPagamentos { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
}