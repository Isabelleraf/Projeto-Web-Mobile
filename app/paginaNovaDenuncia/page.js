
"use client"

import Link from "next/link";
import { useState } from 'react';
import Style from "./page.module.css";
import { useRouter } from 'next/navigation';

export default function DenunciasPage() {
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/denuncias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ local, descricao }),
    });

    if (response.ok) {
      setMensagem('Denúncia enviada com sucesso');
      setTimeout(() => {
        router.push('/paginaDenuncias');
      }, 1000);
    } else {
      const data = await response.json();
      setMensagem(data.error || 'Erro ao enviar denúncia');
    }
  };

  return (
    <>
       <header className={Style.novaDenuncia}>
                <h1>Nova Denúncia</h1>
            </header>  
          
        <div className={Style.botoes}>
            <Link className={Style.botaoVoltar} href="/paginaDenuncias">Voltar</Link>
        </div>

      <div className={Style.container}>
        <form onSubmit={handleSubmit} className={Style.form}>
          <div className={Style.formGroup}>
            <label htmlFor="local" className={Style.label}>Local:</label>
            <input type="text" id="local" value={local} onChange={(e) => setLocal(e.target.value)} required className={Style.input} />
          </div>
          <div className={Style.formGroup}>
            <label htmlFor="descricao" className={Style.label}>Descrição:</label>
            <textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} required className={Style.textarea} />
          </div>
          <button type="submit" className={Style.button}>Enviar Denúncia</button>
        </form>
        {mensagem && <p className={Style.message}>{mensagem}</p>}
      </div>
    </>
  );
}
