import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function AtualizarCrianca() {
  const [idCrianca, setIdCrianca] = useState('');
  const [novoNome, setNovoNome] = useState('');
  const [novaIdade, setNovaIdade] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const criancaAtualizada = {
      nomeCrianca: novoNome,
      idade: parseInt(novaIdade, 10),
    };

    try {
      const response = await fetch(`http://localhost:8080/crianca/atualizarCrianca/${idCrianca}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(criancaAtualizada),
      });

      if (response.ok) {
        alert('Criança atualizada com sucesso!');
      } else if (response.status === 401) {
        window.location.href = '/errors/erro401';
      } else if (response.status === 404) {
        window.location.href = '/errors/erro404';
      } else if (response.status === 500) {
        window.location.href = '/errors/erro500';
      } else if (response.status === 400) {
        window.location.href = '/errors/erro400';
      } else {
        const errorMessage = await response.text();
        setErroAtualizacao(`Erro ao atualizar Criança: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      setErroAtualizacao('Erro ao atualizar Criança. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Atualizar Criança</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          ID da Criança:
          <input type="number" value={idCrianca} onChange={(e) => setIdCrianca(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Novo Nome:
          <input type="text" value={novoNome}  onChange={(e) => setNovoNome(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Nova Idade:
          <input type="number" value={novaIdade} onChange={(e) => setNovaIdade(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <button type="submit" className={styles.button}>Atualizar</button>
        <br />
        <li className={styles.button}><Link href="homeCrianca" className={styles.a}>Voltar</Link></li>
      </form>
    </div>
  );
  
}
