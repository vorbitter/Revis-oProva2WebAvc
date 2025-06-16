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
