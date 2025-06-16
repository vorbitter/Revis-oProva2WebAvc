'use client';

import { useEffect, useState } from 'react';
import Produto from '@/types/Produto';
import api from '@/services/api';

export default function Produtos() {
    const [produtos, setProdutos] = useState<Produto[] | null>(null);

    useEffect(() => {
        api
            .get<Produto[]>("/produto/listar")
            .then((resposta) => {
                setProdutos(resposta.data);
                console.table(resposta.data);
            })
            .catch((erro) => {
                console.log(erro);
            });
    }, []);

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-center">Lista de Produtos</h1>

            <ul className="bg-white rounded-xl shadow p-4 w-full max-w-lg space-y-2">
                {produtos?.map((produto) => (
                    <li
                        key={produto.produtoId}
                        className="flex justify-between border-b pb-2 last:border-none"
                    >
                        <span>{produto.nome}</span>
                        <span className="text-gray-600">R$ {produto.preco.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
