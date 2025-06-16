'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import api from '@/services/api';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log(`Email ${email}`)
            console.log(`Email ${senha}`)
            const resposta = await api.post("/usuario/login", {
                email,
                senha,
            });
            
            const token = resposta.data;

            localStorage.setItem('token', token);
            router.push("/produto/listar");
        } catch (error: any) {
            console.error(error.message);
            alert("Login ou senha incorretos!");
        }
    };
    // ou usando o fetch(do professor)
    // const handleSubmit = async(e: React.FormEvent)=>{
    //     e.preventDefault();

    //     const resposta = await fetch("http://localhost:5247/api/usuario/login", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ email, senha }),
    //     });

    //     if (!resposta.ok) {
    //         alert("Login ou senha incorretos!");
    //         return;
    //     }

    //     const token = await resposta.text();
    //     localStorage.setItem('token', token);
    //     router.push("/produto/listar");
    // }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

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

                <div className="mb-6">
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

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
