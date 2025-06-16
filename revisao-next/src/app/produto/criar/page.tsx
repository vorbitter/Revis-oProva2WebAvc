'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/services/api'
import useAuth from '@/hooks/useAuth'

export default function ProdutoCadastrar() {
    const [nome, setNome] = useState('')
    const [preco, setPreco] = useState<number | ''>('')
    const [descricao, setDescricao] = useState('')
    const [quantidade, setQuantidade] = useState<number | ''>('')
    const router = useRouter()
    useAuth();//hook que usa a instancia central do axios para redirecionar

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await api.post('/produto/cadastrar', {
                nome,
                preco: Number(preco),
                descricao,
                quantidade: Number(quantidade)
            })

            alert('Produto cadastrado com sucesso!')
            router.push('/produto/listar')
        } catch (error: any) {
            console.error(error)
            alert('Erro ao cadastrar produto.')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Cadastrar Produto</h1>

                <div className="mb-4">
                    <label htmlFor="nome" className="block mb-1 text-sm font-medium">
                        Nome
                    </label>
                    <input
                        type="text"
                        id="nome"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="preco" className="block mb-1 text-sm font-medium">
                        Preço
                    </label>
                    <input
                        type="number"
                        id="preco"
                        step="0.01"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value === '' ? '' : Number(e.target.value))}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="descricao" className="block mb-1 text-sm font-medium">
                        Descrição
                    </label>
                    <textarea
                        id="descricao"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="quantidade" className="block mb-1 text-sm font-medium">
                        Quantidade
                    </label>
                    <input
                        type="number"
                        id="quantidade"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value === '' ? '' : Number(e.target.value))}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                >
                    Cadastrar Produto
                </button>
            </form>
        </div>
    )
}
