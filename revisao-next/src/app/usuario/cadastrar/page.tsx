'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

export default function CadastroUsuarioPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [permissao, setPermissao] = useState('USUARIO');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post('/usuario/cadastrar', {
                email,
                senha,
                permissao,
            });

            alert('Usuário cadastrado com sucesso!');
            router.push('/usuario/login');
        } catch (error: any) {
            console.error(error);
            alert('Erro ao cadastrar usuário. Tente novamente.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Cadastro</h1>

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 text-sm font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="senha" className="block mb-1 text-sm font-medium">
                        Senha
                    </label>
                    <input
                        type="password"
                        id="senha"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="permissao" className="block mb-1 text-sm font-medium">
                        Permissão
                    </label>
                    <select
                        id="permissao"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={permissao}
                        onChange={(e) => setPermissao(e.target.value)}
                    >
                        <option value="USUARIO">Usuário</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
