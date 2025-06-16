# TypeScript – Interfaces e Tipos Permitidos

## ✅ O que é uma Interface?
Uma interface define a **estrutura de um objeto**, descrevendo nomes e tipos de propriedades. Serve para tipar objetos, funções e classes.

### Sintaxe básica:
```ts
interface Produto {
  nome: string;
  preco: number;
  descricao?: string; // Propriedade opcional
}
```

---

## ✅ Principais Tipos Permitidos

### 🔹 Tipos Primitivos
```ts
string, number, boolean, null, undefined, symbol, bigint
```

### 🔹 Tipos Literais
```ts
type Status = "aberto" | "fechado";
```

### 🔹 Tipos de Array
```ts
string[], Array<number>
```

### 🔹 Tipos de Tupla
```ts
type Coordenada = [number, number];
```

### 🔹 Tipos de Objeto (via interface ou type)
```ts
interface Usuario {
  nome: string;
  idade: number;
}
```

### 🔹 Enum (valores nomeados)
```ts
enum Permissao {
  USUARIO,
  ADMIN
}
```

### 🔹 Tipos Union e Intersection
```ts
type Id = string | number;
type UsuarioAdmin = Usuario & { permissao: Permissao.ADMIN };
```

### 🔹 Tipos de função
```ts
interface Somador {
  (a: number, b: number): number;
}
```

---

## ✅ Recursos de Interface

### Herança
```ts
interface Pessoa {
  nome: string;
}
interface Funcionario extends Pessoa {
  salario: number;
}
```

### Readonly
```ts
interface Produto {
  readonly id: number;
  nome: string;
}
```

### Index Signature
```ts
interface Dicionario {
  [chave: string]: string;
}
```

---

## ✅ Interface vs Type

| Interface                  | Type                        |
|---------------------------|-----------------------------|
| Pode ser extendida        | Pode ser combinada com `&`  |
| Preferível para objetos   | Mais flexível (uniões, etc) |
| Permite declaração múltipla | Não permite                 |

---

## ✅ Interface em Classes

```ts
interface Animal {
  nome: string;
  emitirSom(): void;
}

class Cachorro implements Animal {
  nome: string;
  constructor(nome: string) {
    this.nome = nome;
  }
  emitirSom() {
    console.log("Au au!");
  }
}
```

---

## ✅ Interface para resposta de API

```ts
interface Produto {
  produtoId: number;
  nome: string;
  preco: number;
  quantidade: number;
  descricao: string;
}
```

---

## ⚠️ Dicas Rápidas

- Use `?` para propriedades opcionais.
- Use interfaces para tipar objetos.
- Use `type` quando precisar de union (`A | B`) ou tuple (`[number, string]`).
- Prefira `interface` para objetos que serão estendidos ou implementados por classes.