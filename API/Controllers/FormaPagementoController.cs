using API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/formapagamento")]
public class FormaPagamentoController : ControllerBase
{
    private readonly IFormaPagamentoRepository _formaPagamentoRepository;

    public FormaPagamentoController(IFormaPagamentoRepository formaPagamentosRepository)
    {
        _formaPagamentoRepository = formaPagamentosRepository;
    }
}