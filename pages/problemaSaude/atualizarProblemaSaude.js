import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function AtualizarProblemaSaude() {
  const [idProblema, setIdProblema] = useState('');
  const [nomeProblema, setNomeProblema] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const problemaSaude = {
      nomeProblema,
      descricao,
    };

    try {
      const response = await fetch(`http://localhost:8080/problemas-saude/atualizar/${idProblema}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(problemaSaude),
      });

      if (response.ok) {
        alert('Problema de saúde atualizada com sucesso!');
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
        setErroAtualizacao(`Erro ao atualizar problema de saude: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      setErroAtualizacao('Erro ao atualizar problema de saude. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Atualizar Problema de Saúde</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          ID do Problema:
          <input type="text" value={idProblema} onChange={(e) => setIdProblema(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Novo Nome do Problema:
          <input type="text" value={nomeProblema} onChange={(e) => setNomeProblema(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Nova Descrição:
          <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <button type="submit" className={styles.button}>Atualizar</button>
        <br />
        <li className={styles.button}><Link href="homeProblemaSaude" className={styles.a}>Voltar</Link></li>
      </form>
    </div>
  );
  
}
