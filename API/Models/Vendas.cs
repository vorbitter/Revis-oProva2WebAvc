namespace API.Models;

public class Venda
{
    public Venda() => CriadoEm = DateTime.Now;
    public int VendaId { get; set; }
    public string NomeCliente { get; set; }
    public List<ItemVenda> Itens { get; set; }
    public FormaPagamento FormaPagamento { get; set; }
    public int FormaPagamentoId { get; set; }
    public DateTime CriadoEm { get; set; }
}