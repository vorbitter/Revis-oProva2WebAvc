namespace API.Models;

public class Produto
{    public int ProdutoId { get; set; }
    public string Nome { get; set; }
    public double Preco { get; set; }
    public string Descricao { get; set; }
    public int Quantidade { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;

    public override string ToString() =>
        $"Nome: {Nome} | Preço: {Preco.ToString("C2")} | Criado em: {CriadoEm}";
}