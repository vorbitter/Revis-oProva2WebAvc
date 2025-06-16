namespace API.Models;

public class FormaPagamento
{
    public int FormaPagamentoId { get; set; }

    public string MetodoPagamento { get; set; }

    public string OpcaoPagamento { get; set; }

    public DateTime CriadoEm { get; set; } = DateTime.Now;
}