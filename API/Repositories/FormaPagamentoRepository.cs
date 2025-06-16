using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class FormaPagamentoRepository : IFormaPagamentoRepository
{
    private readonly AppDBContext _db;

    public FormaPagamentoRepository(AppDBContext db)
    {
        _db = db;
    }

    public async Task<FormaPagamento?> BuscarFormaPagamentoPorId(int formaPagamentoId) => await _db.FormaPagamentos.FirstOrDefaultAsync(p => p.FormaPagamentoId == formaPagamentoId);
    public async Task<List<FormaPagamento>> BuscarTodosFormaPagamentos() => await _db.FormaPagamentos.ToListAsync();
    public async Task CriarFormaPagamento(FormaPagamento formaPagamento) => await _db.FormaPagamentos.AddAsync(formaPagamento);
    public async Task<FormaPagamento?> AtualizarFormaPagamento(FormaPagamento formaPagamento, int formaPagamentoId)
    {
        var formaPagamentoASerModificada = await _db.FormaPagamentos.FirstOrDefaultAsync(p => p.FormaPagamentoId == formaPagamentoId);
        if (formaPagamentoASerModificada is null)
            return null;

        _db.Entry(formaPagamentoASerModificada).CurrentValues.SetValues(formaPagamento);
        await _db.SaveChangesAsync();

        return formaPagamentoASerModificada; // Já foi modificado
    }

    public async Task RemoverFormaPagamentoPorId(int formaPagamentoId)
    {
        var formaPagamento = await _db.FormaPagamentos.FirstOrDefaultAsync(p => p.FormaPagamentoId == formaPagamentoId);
        if (formaPagamento is null) return;
        _db.FormaPagamentos.Remove(formaPagamento);
        await _db.SaveChangesAsync();
    }
}