'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import Produto from '@/types/Produto';

export default function DeletarProduto() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [produtoId, setProdutoId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get<Produto[]>('/produto/listar')
            .then((res) => setProdutos(res.data))
            .catch((err) => console.error('Erro ao buscar produtos:', err));
    }, []);

    const handleDelete = async () => {
        if (!produtoId) return alert("Selecione um produto!");

        const confirmado = confirm("Tem certeza que deseja deletar este produto?");
        if (!confirmado) return;

        try {
            setLoading(true);
            await api.delete(`/produto/deletar/${produtoId}`);
            alert("Produto deletado com sucesso!");
            setProdutos(produtos.filter(p => p.produtoId !== produtoId));
            setProdutoId(null);
        } catch (err) {
            console.error(err);
            alert("Erro ao deletar o produto!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Deletar Produto</h1>

            {produtos.length === 0 ? (
                <p className="text-gray-500">Nenhum produto disponível.</p>
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleDelete(); }}>
                    <label className="block mb-2">
                        Selecione um produto:
                        <select
                            value={produtoId ?? ''}
                            onChange={(e) => setProdutoId(Number(e.target.value))}
                            className="w-full border p-2 rounded mt-1"
                        >
                            <option value="" disabled>-- Escolha --</option>
                            {produtos.map(produto => (
                                <option key={produto.produtoId} value={produto.produtoId}>
                                    {produto.nome} - R$ {produto.preco}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-4"
                    >
                        {loading ? "Deletando..." : "Deletar Produto"}
                    </button>
                    <div className="mt-4">
                        <a href="/" className="text-blue-600 hover:underline">← Voltar para o início</a>
                    </div>
                </form>

            )}
        </div>
    );
}
