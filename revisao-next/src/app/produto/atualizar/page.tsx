'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import Produto from '@/types/Produto';

export default function ProdutoEditar() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState(0);
    const [quantidade, setQuantidade] = useState(0);

    // Buscar produtos
    useEffect(() => {
        api.get<Produto[]>('/produto/listar')
            .then(res => setProdutos(res.data))
            .catch(err => console.error(err));
    }, []);

    // Quando selecionar um produto, preencher os campos
    const handleProdutoChange = (id: number) => {
        const selecionado = produtos.find(p => p.produtoId === id);
        if (selecionado) {
            setProdutoSelecionado(selecionado);
            setNome(selecionado.nome);
            setDescricao(selecionado.descricao);
            setPreco(selecionado.preco);
            setQuantidade(selecionado.quantidade);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!produtoSelecionado) {
            alert("Selecione um produto.");
            return;
        }

        try {
            await api.put(`/produto/atualizar/${produtoSelecionado.produtoId}`, {
                nome,
                descricao,
                preco,
                quantidade
            });
            alert('Produto atualizado com sucesso!');
        } catch (err) {
            console.error(err);
            alert('Erro ao atualizar o produto.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <h1 className="text-2xl font-bold mb-6">Editar Produto</h1>

            <select
                className="mb-4 w-full max-w-md border rounded p-2"
                onChange={(e) => handleProdutoChange(Number(e.target.value))}
                defaultValue=""
            >
                <option value="" disabled>Selecione um produto</option>
                {produtos.map(prod => (
                    <option key={prod.produtoId} value={prod.produtoId}>
                        {prod.nome}
                    </option>
                ))}
            </select>

            {produtoSelecionado && (
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
                >
                    <div className="mb-4">
                        <label htmlFor="nome" className="block mb-1">Nome</label>
                        <input
                            id="nome"
                            className="w-full border rounded p-2"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="descricao" className="block mb-1">Descrição</label>
                        <textarea
                            id="descricao"
                            className="w-full border rounded p-2"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="preco" className="block mb-1">Preço</label>
                        <input
                            type="number"
                            id="preco"
                            className="w-full border rounded p-2"
                            value={preco}
                            onChange={e => setPreco(parseFloat(e.target.value))}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="quantidade" className="block mb-1">Quantidade</label>
                        <input
                            type="number"
                            id="quantidade"
                            className="w-full border rounded p-2"
                            value={quantidade}
                            onChange={e => setQuantidade(parseInt(e.target.value))}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Atualizar Produto
                    </button>
                </form>
            )}
        </div>
    );
}

// COM CATEGORIAS
// 'use client';

// import { useEffect, useState } from 'react';
// import Produto from '@/types/Produto';
// import Categoria from '@/types/Categoria';
// import api from '@/services/api';
// import { useRouter } from 'next/navigation';

// export default function AtualizarProdutoPage() {
//   const [produtos, setProdutos] = useState<Produto[]>([]);
//   const [categorias, setCategorias] = useState<Categoria[]>([]);
//   const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
//   const [nome, setNome] = useState('');
//   const [descricao, setDescricao] = useState('');
//   const [preco, setPreco] = useState(0);
//   const [quantidade, setQuantidade] = useState(0);
//   const [categoriaId, setCategoriaId] = useState<number | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     api.get<Produto[]>('/produto/listar')
//       .then(res => setProdutos(res.data))
//       .catch(err => console.error('Erro ao buscar produtos', err));

//     api.get<Categoria[]>('/categoria/listar')
//       .then(res => setCategorias(res.data))
//       .catch(err => console.error('Erro ao buscar categorias', err));
//   }, []);

//   useEffect(() => {
//     if (produtoSelecionado) {
//       setNome(produtoSelecionado.nome);
//       setDescricao(produtoSelecionado.descricao);
//       setPreco(produtoSelecionado.preco);
//       setQuantidade(produtoSelecionado.quantidade);
//       setCategoriaId(produtoSelecionado.categoriaId ?? null);
//     }
//   }, [produtoSelecionado]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!produtoSelecionado) return;

//     try {
//       await api.put(`/produto/atualizar/${produtoSelecionado.produtoId}`, {
//         nome,
//         descricao,
//         preco,
//         quantidade,
//         categoriaId,
//       });

//       alert('Produto atualizado com sucesso!');
//       router.push('/produto/listar');
//     } catch (error) {
//       console.error(error);
//       alert('Erro ao atualizar o produto.');
//     }
//   };

//   return (
//     <main className="max-w-xl mx-auto mt-10 p-4">
//       <h1 className="text-2xl font-bold mb-6">Atualizar Produto</h1>

//       <label className="block mb-4">
//         <span className="block mb-1 font-medium">Escolha um Produto</span>
//         <select
//           className="w-full p-2 border rounded"
//           onChange={(e) => {
//             const id = parseInt(e.target.value);
//             const produto = produtos.find(p => p.produtoId === id) ?? null;
//             setProdutoSelecionado(produto);
//           }}
//           defaultValue=""
//         >
//           <option value="" disabled>-- Selecione --</option>
//           {produtos.map((produto) => (
//             <option key={produto.produtoId} value={produto.produtoId}>
//               {produto.nome}
//             </option>
//           ))}
//         </select>
//       </label>

//       {produtoSelecionado && (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             value={nome}
//             onChange={(e) => setNome(e.target.value)}
//             placeholder="Nome"
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="text"
//             value={descricao}
//             onChange={(e) => setDescricao(e.target.value)}
//             placeholder="Descrição"
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="number"
//             value={preco}
//             onChange={(e) => setPreco(parseFloat(e.target.value))}
//             placeholder="Preço"
//             className="w-full p-2 border rounded"
//             step="0.01"
//             required
//           />
//           <input
//             type="number"
//             value={quantidade}
//             onChange={(e) => setQuantidade(parseInt(e.target.value))}
//             placeholder="Quantidade"
//             className="w-full p-2 border rounded"
//             required
//           />

//           <label className="block">
//             <span className="block mb-1 font-medium">Categoria</span>
//             <select
//               className="w-full p-2 border rounded"
//               value={categoriaId ?? ''}
//               onChange={(e) => setCategoriaId(e.target.value ? parseInt(e.target.value) : null)}
//             >
//               <option value="">-- Selecione uma categoria --</option>
//               {categorias.map((cat) => (
//                 <option key={cat.categoriaId} value={cat.categoriaId}>
//                   {cat.nome}
//                 </option>
//               ))}
//             </select>
//           </label>

//           <button
//             type="submit"
//             className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
//           >
//             Atualizar Produto
//           </button>
//         </form>
//       )}

//       <div className="mt-6">
//         <a href="/" className="text-blue-600 hover:underline">← Voltar para o início</a>
//       </div>
//     </main>
//   );
// }
