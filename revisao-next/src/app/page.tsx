export default function Home() {
  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Painel de Navegação</h1>
      <ul className="space-y-3 text-lg">
        <li>
          <a href="/usuario/cadastrar" className="text-blue-600 hover:underline">Cadastrar Usuário</a>
        </li>
        <li>
          <a href="/usuario/login" className="text-blue-600 hover:underline">Login</a>
        </li>
        <li>
          <a href="/produto/listar" className="text-blue-600 hover:underline">Listar Produtos</a>
        </li>
        <li>
          <a href="/produto/cadastrar" className="text-blue-600 hover:underline">Cadastrar Produto</a>
        </li>
        <li>
          <a href="/produto/atualizar" className="text-blue-600 hover:underline">Atualizar Produto</a>
        </li>
        <li>
          <a href="/produto/deletar" className="text-blue-600 hover:underline">Deletar Produto</a>
        </li>
      </ul>
    </main>
  );
}
