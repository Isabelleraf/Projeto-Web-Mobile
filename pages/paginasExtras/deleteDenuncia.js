// pages/denuncias.js

import { useState } from 'react';

export default function DenunciasPage() {
  const [local, setLocal] = useState('');
  const [id, setId] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/denuncia', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
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
          <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} required />
        </div>
        <button type="submit">Deletar Denúncia</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
