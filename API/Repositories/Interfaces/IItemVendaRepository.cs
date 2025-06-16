using API.Models;

namespace API.Repositories;

public interface IItemVendaRepository
{
    Task<ItemVenda> BuscarTodosItemVendas();
}