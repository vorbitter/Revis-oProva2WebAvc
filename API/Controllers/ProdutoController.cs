using Microsoft.AspNetCore.Mvc;
using API.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using API.Models;

namespace API.Controllers;

[ApiController]
[Route("api/produto")]
public class ProdutoController : ControllerBase
{
    private readonly IProdutoRepository _produtoRepository;

    public ProdutoController(IProdutoRepository produtoRepository)
    {
        _produtoRepository = produtoRepository;
    }

    // GET: api/produto/listar
    [HttpGet("listar")]
    [Authorize(Roles = "USUARIO,ADMIN")]
    public async Task<IActionResult> Index()
    {
        var produtos = await _produtoRepository.BuscarTodosProdutos();
        return Ok(produtos);
    }

    // GET: api/produto/listar/5
    [HttpGet("listar/{produtoId:int}")]
    [Authorize(Roles = "USUARIO,ADMIN")]
    public async Task<IActionResult> BuscarPorId(int produtoId)
    {
        var produto = await _produtoRepository.BuscarProdutoPorId(produtoId);
        return Ok(produto);
    }

    // POST: api/produto/cadastrar
    [Authorize(Roles = "USUARIO,ADMIN")]
    [HttpPost("cadastrar")]
    public async Task<IActionResult> CriarProduto([FromBody] Produto produto)
    {
        await _produtoRepository.CriarProduto(produto);
        return Created();
    }

    // PUT: api/produto/atualizar/5
    [Authorize(Roles = "USUARIO,ADMIN")]
    [HttpPut("atualizar/{produtoId:int}")]
    public async Task<IActionResult> AtualizarProduto([FromBody] Produto produto, int produtoId)
    {
        var produtoAtualizado = await _produtoRepository.AtualizarProduto(produto, produtoId);
        return Ok(produtoAtualizado);
    }

    // DELETE: api/produtos/deletar/5
    [Authorize(Roles = "ADMIN")]
    [HttpDelete("deletar/{produtoId:int}")]
    public async Task<IActionResult> RemoverProduto(int produtoId)
    {
        await _produtoRepository.RemoverProdutoPorId(produtoId);
        return NoContent();
    }
}
