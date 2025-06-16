# 🌱 Entity Framework Core - Resumo Rápido e Eficaz

## 🧱 Conceitos Básicos
- **DbContext**: Classe que representa a sessão com o banco.
- **DbSet<T>**: Representa uma tabela.
```csharp
public class AppDbContext : DbContext {
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
}
```

## 🔍 Métodos de Consulta

### 🔹 `Find()`
- Busca por chave primária (PK).
```csharp
var produto = await _db.Produtos.FindAsync(1);
```

### 🔹 `FirstOrDefault()`
- Retorna o primeiro que satisfaz a condição (ou null).
```csharp
var produto = await _db.Produtos.FirstOrDefaultAsync(p => p.Preco > 10);
```

### 🔹 `Where()` + `ToList()`
```csharp
var baratos = await _db.Produtos.Where(p => p.Preco < 50).ToListAsync();
```

## 🔄 Navegação e Relacionamentos

### 🔹 Include (Eager Loading)
- Carrega entidades relacionadas.
```csharp
var produtos = await _db.Produtos
    .Include(p => p.Categoria)
    .ToListAsync();
```

### 🔹 Navigation Property
```csharp
public class Produto {
    public int ProdutoId { get; set; }
    public string Nome { get; set; }
    public Categoria Categoria { get; set; }
    public int CategoriaId { get; set; } // FK
}
```

## 💾 Inserção com Relacionamento

### Criar um produto e linkar a categoria:
```csharp
var produto = new Produto {
    Nome = "Teclado",
    CategoriaId = 2 // Categoria existente
};
await _db.Produtos.AddAsync(produto);
await _db.SaveChangesAsync();
```

## ✏️ Atualização
```csharp
var produto = await _db.Produtos.FindAsync(1);
if (produto != null) {
    produto.Preco = 199.99;
    await _db.SaveChangesAsync();
}
```

## ❌ Remoção
```csharp
var produto = await _db.Produtos.FindAsync(1);
if (produto != null) {
    _db.Produtos.Remove(produto);
    await _db.SaveChangesAsync();
}
```

## ⚠️ Dicas
- Sempre use `await` com métodos assíncronos (`FindAsync`, `ToListAsync`, etc).
- Evite modificar a PK (`ProdutoId`), isso causa erros.
- `Include` é essencial para carregar entidades relacionadas (não é automático!).