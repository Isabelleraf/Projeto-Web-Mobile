// pages/denuncias.js

import { useState } from 'react';

export default function DenunciasPage() {
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/denuncia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ local, descricao }),
    });

    if (response.ok) {
      setMensagem('Denúncia enviada com sucesso');
    } else {
      const data = await response.json();
      setMensagem(data.error || 'Erro ao enviar denúncia');
    }
  };

  return (
    <div>
      <h1>Denúncias</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="local">Local:</label>
          <input type="text" id="titulo" value={local} onChange={(e) => setLocal(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="descricao">Descrição:</label>
          <textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </div>
        <button type="submit">Enviar Denúncia</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}