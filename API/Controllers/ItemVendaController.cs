using API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/itemvenda")]
public class ItemVendaController : ControllerBase
{
    private readonly IItemVendaRepository _itemVendaRepository;

    public ItemVendaController(IItemVendaRepository itemVendasRepository)
    {
        _itemVendaRepository = itemVendasRepository;
    }
}