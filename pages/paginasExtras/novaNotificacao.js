import { useState } from 'react';

export default function CriarNotificacaoPage() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setMensagem] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/notificacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, descricao }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar notificação');
      }

      setTitulo('');
      setMensagem('');
      setMensagemErro('');
    } catch (error) {
      setMensagemErro(error.message);
    }
  };

  return (
    <div>
      <h1>Criar Notificação</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="mensagem">Mensagem:</label>
          <textarea id="mensagem" value={descricao} onChange={(e) => setMensagem(e.target.value)} required />
        </div>
        <button type="submit">Enviar Notificação</button>
      </form>
      {mensagemErro && <p>{mensagemErro}</p>}
    </div>
  );
}
