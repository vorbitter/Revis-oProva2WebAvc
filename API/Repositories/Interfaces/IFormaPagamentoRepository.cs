using API.Models;

namespace API.Repositories;

public interface IFormaPagamentoRepository
{
    Task<FormaPagamento?> BuscarFormaPagamentoPorId(int formaPagamentoId);
    Task<List<FormaPagamento>> BuscarTodosFormaPagamentos();
    Task CriarFormaPagamento(FormaPagamento formaPagamento);
    Task<FormaPagamento?> AtualizarFormaPagamento(FormaPagamento formaPagamento, int formaPagamentoId);
    Task RemoverFormaPagamentoPorId(int formaPagamentoId);
}